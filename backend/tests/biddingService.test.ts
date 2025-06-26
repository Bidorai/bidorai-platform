import { startBiddingRound, placeBid, getWinningBid } from '../src/services/biddingService';

describe('Bidding Service', () => {
  it('should start a bidding round and accept bids', () => {
    const round = startBiddingRound('test-round', 1, 1, 1000);
    expect(round.isActive).toBe(true);
    expect(placeBid('test-round', 1, 50)).toBe(true);
    expect(placeBid('test-round', 2, 60)).toBe(true);
    const winner = getWinningBid('test-round');
    expect(winner).toBeTruthy();
    expect(winner?.userId).toBe(2);
    expect(winner?.amount).toBe(60);
  });

  it('should not accept bids after round ends', (done) => {
    const round = startBiddingRound('short-round', 1, 1, 100);
    setTimeout(() => {
      expect(placeBid('short-round', 1, 100)).toBe(false);
      done();
    }, 150);
  });
}); 