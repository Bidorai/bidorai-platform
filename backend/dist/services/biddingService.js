"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiddingService = void 0;
const redis_1 = require("../config/redis");
class BiddingService {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async createBiddingSession(menuId, duration = 3) {
        const startTime = new Date();
        const endTime = new Date(startTime.getTime() + duration * 60000);
        const result = await this.pool.query(`INSERT INTO bidding_sessions (menu_id, start_time, end_time, status) 
       VALUES ($1, $2, $3, 'active') RETURNING *`, [menuId, startTime, endTime]);
        // Store in Redis for real-time access
        await redis_1.redis.setEx(`bidding:${result.rows[0].id}`, duration * 60, JSON.stringify(result.rows[0]));
        return result.rows[0];
    }
    async placeBid(sessionId, userId, amount) {
        // Validate session is active
        const session = await this.getActiveSession(sessionId);
        if (!session)
            throw new Error('Invalid or expired session');
        // Create bid
        const result = await this.pool.query(`INSERT INTO bids (user_id, menu_id, amount, status) 
       VALUES ($1, $2, $3, 'active') RETURNING *`, [userId, session.menu_id, amount]);
        // Update Redis with current highest bid
        await redis_1.redis.zAdd(`bids:${sessionId}`, [{
                score: amount,
                value: `${userId}:${result.rows[0].id}`
            }]);
        return result.rows[0];
    }
    async getActiveSession(sessionId) {
        const cached = await redis_1.redis.get(`bidding:${sessionId}`);
        if (cached)
            return JSON.parse(cached);
        const result = await this.pool.query(`SELECT * FROM bidding_sessions 
       WHERE id = $1 AND status = 'active' AND end_time > NOW()`, [sessionId]);
        return result.rows[0];
    }
    async endSession(sessionId) {
        // Get highest bid
        const highestBids = await redis_1.redis.zRangeWithScores(`bids:${sessionId}`, 0, 0, { REV: true });
        if (highestBids.length > 0) {
            const { value: bidKey, score: amount } = highestBids[0];
            const [userId, bidId] = bidKey.split(':');
            // Update session with winner
            await this.pool.query(`UPDATE bidding_sessions 
         SET status = 'completed', winning_bid_id = $1 
         WHERE id = $2`, [bidId, sessionId]);
            // Create second chance offers for other bidders
            await this.createSecondChanceOffers(sessionId, parseInt(bidId), parseFloat(amount.toString()));
        }
        else {
            // No bids - mark as completed
            await this.pool.query(`UPDATE bidding_sessions SET status = 'completed' WHERE id = $1`, [sessionId]);
        }
        // Clean up Redis
        await redis_1.redis.del(`bidding:${sessionId}`);
        await redis_1.redis.del(`bids:${sessionId}`);
    }
    async createSecondChanceOffers(sessionId, winningBidId, winningAmount) {
        // Get all non-winning bids
        const result = await this.pool.query(`SELECT b.*, bs.menu_id FROM bids b
       JOIN bidding_sessions bs ON bs.id = $1
       WHERE b.id != $2 AND b.created_at >= bs.start_time`, [sessionId, winningBidId]);
        const discountedPrice = winningAmount * 0.95; // 5% less than winning bid
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        for (const bid of result.rows) {
            await this.pool.query(`INSERT INTO second_chance_offers 
         (bidding_session_id, user_id, original_bid_id, offered_price, discount_percentage, expires_at)
         VALUES ($1, $2, $3, $4, $5, $6)`, [sessionId, bid.user_id, bid.id, discountedPrice, 20, expiresAt]);
        }
    }
}
exports.BiddingService = BiddingService;
