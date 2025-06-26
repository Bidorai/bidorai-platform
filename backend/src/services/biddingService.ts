type Bid = {
  userId: number;
  amount: number;
  timestamp: number;
};

type BiddingRound = {
  id: string;
  menuId: number;
  restaurantId: number;
  bids: Bid[];
  startTime: number;
  endTime: number;
  isActive: boolean;
};

const rounds: Record<string, BiddingRound> = {};

export function startBiddingRound(id: string, menuId: number, restaurantId: number, durationMs: number = 4 * 60 * 1000): BiddingRound {
  const now = Date.now();
  const round: BiddingRound = {
    id,
    menuId,
    restaurantId,
    bids: [],
    startTime: now,
    endTime: now + durationMs,
    isActive: true,
  };
  rounds[id] = round;
  setTimeout(() => {
    round.isActive = false;
  }, durationMs);
  return round;
}

export function placeBid(roundId: string, userId: number, amount: number): boolean {
  const round = rounds[roundId];
  if (!round || !round.isActive) return false;
  round.bids.push({ userId, amount, timestamp: Date.now() });
  return true;
}

export function getWinningBid(roundId: string): Bid | null {
  const round = rounds[roundId];
  if (!round) return null;
  if (round.bids.length === 0) return null;
  return round.bids.reduce((max, bid) => (bid.amount > max.amount ? bid : max), round.bids[0]);
}

export function getBiddingRound(roundId: string): BiddingRound | undefined {
  return rounds[roundId];
} 