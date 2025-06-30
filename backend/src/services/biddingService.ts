import { Pool } from 'pg';
import { redis, getRedisClient } from '../config/redis';

export class BiddingService {
  private pool: Pool;
  
  constructor(pool: Pool) {
    this.pool = pool;
  }

  async createBiddingSession(menuId: number, duration: number = 3) {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + duration * 60000);
    
    const result = await this.pool.query(
      `INSERT INTO bidding_sessions (menu_id, start_time, end_time, status) 
       VALUES ($1, $2, $3, 'active') RETURNING *`,
      [menuId, startTime, endTime]
    );
    
    // Store in Redis for real-time access (if available)
    const redisClient = getRedisClient();
    if (redisClient) {
      try {
        await redisClient.setEx(
          `bidding:${result.rows[0].id}`,
          duration * 60,
          JSON.stringify(result.rows[0])
        );
      } catch (error) {
        console.warn('Failed to store bidding session in Redis:', error);
      }
    }
    
    return result.rows[0];
  }

  async placeBid(sessionId: number, userId: number, amount: number) {
    // Validate session is active
    const session = await this.getActiveSession(sessionId);
    if (!session) throw new Error('Invalid or expired session');
    
    // Create bid
    const result = await this.pool.query(
      `INSERT INTO bids (user_id, menu_id, amount, status) 
       VALUES ($1, $2, $3, 'active') RETURNING *`,
      [userId, session.menu_id, amount]
    );
    
    // Update Redis with current highest bid (if available)
    const redisClient = getRedisClient();
    if (redisClient) {
      try {
        await redisClient.zAdd(`bids:${sessionId}`, [{
          score: amount,
          value: `${userId}:${result.rows[0].id}`
        }]);
      } catch (error) {
        console.warn('Failed to update Redis with bid:', error);
      }
    }
    
    return result.rows[0];
  }

  async getActiveSession(sessionId: number) {
    // Try to get from Redis first (if available)
    const redisClient = getRedisClient();
    if (redisClient) {
      try {
        const cached = await redisClient.get(`bidding:${sessionId}`);
        if (cached) return JSON.parse(cached);
      } catch (error) {
        console.warn('Failed to get session from Redis:', error);
      }
    }
    
    // Fallback to database
    const result = await this.pool.query(
      `SELECT * FROM bidding_sessions 
       WHERE id = $1 AND status = 'active' AND end_time > NOW()`,
      [sessionId]
    );
    
    return result.rows[0];
  }

  async endSession(sessionId: number) {
    // Get highest bid from Redis (if available)
    const redisClient = getRedisClient();
    let highestBids: any[] = [];
    
    if (redisClient) {
      try {
        highestBids = await redisClient.zRangeWithScores(`bids:${sessionId}`, 0, 0, { REV: true });
      } catch (error) {
        console.warn('Failed to get bids from Redis, falling back to database:', error);
      }
    }
    
    // If Redis failed or is unavailable, get highest bid from database
    if (highestBids.length === 0) {
      const result = await this.pool.query(
        `SELECT b.* FROM bids b
         JOIN bidding_sessions bs ON bs.menu_id = b.menu_id
         WHERE bs.id = $1 AND b.created_at >= bs.start_time
         ORDER BY b.amount DESC LIMIT 1`,
        [sessionId]
      );
      
      if (result.rows.length > 0) {
        const highestBid = result.rows[0];
        highestBids = [{
          value: `${highestBid.user_id}:${highestBid.id}`,
          score: highestBid.amount
        }];
      }
    }
    
    if (highestBids.length > 0) {
      const { value: bidKey, score: amount } = highestBids[0];
      const [userId, bidId] = bidKey.split(':');
      
      // Update session with winner
      await this.pool.query(
        `UPDATE bidding_sessions 
         SET status = 'completed', winning_bid_id = $1 
         WHERE id = $2`,
        [bidId, sessionId]
      );
      
      // Create second chance offers for other bidders
      await this.createSecondChanceOffers(sessionId, parseInt(bidId), parseFloat(amount.toString()));
    } else {
      // No bids - mark as completed
      await this.pool.query(
        `UPDATE bidding_sessions SET status = 'completed' WHERE id = $1`,
        [sessionId]
      );
    }
    
    // Clean up Redis (if available)
    if (redisClient) {
      try {
        await redisClient.del(`bidding:${sessionId}`);
        await redisClient.del(`bids:${sessionId}`);
      } catch (error) {
        console.warn('Failed to clean up Redis:', error);
      }
    }
  }

  async createSecondChanceOffers(sessionId: number, winningBidId: number, winningAmount: number) {
    // Get all non-winning bids
    const result = await this.pool.query(
      `SELECT b.*, bs.menu_id FROM bids b
       JOIN bidding_sessions bs ON bs.id = $1
       WHERE b.id != $2 AND b.created_at >= bs.start_time`,
      [sessionId, winningBidId]
    );
    
    const discountedPrice = winningAmount * 0.95; // 5% less than winning bid
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    for (const bid of result.rows) {
      await this.pool.query(
        `INSERT INTO second_chance_offers 
         (bidding_session_id, user_id, original_bid_id, offered_price, discount_percentage, expires_at)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [sessionId, bid.user_id, bid.id, discountedPrice, 20, expiresAt]
      );
    }
  }
} 