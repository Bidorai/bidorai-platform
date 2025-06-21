import redis from '../config/redis';

export class CacheManager {
  private static instance: CacheManager;
  private constructor() {}

  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    await redis.set(key, JSON.stringify(value), { EX: ttl });
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  async delete(key: string): Promise<void> {
    await redis.del(key);
  }

  async increment(key: string, incrementBy: number = 1): Promise<number> {
    return await redis.incrby(key, incrementBy);
  }

  async decrement(key: string, decrementBy: number = 1): Promise<number> {
    return await redis.decrby(key, decrementBy);
  }

  async exists(key: string): Promise<boolean> {
    return (await redis.exists(key)) === 1;
  }

  async expire(key: string, seconds: number): Promise<void> {
    await redis.expire(key, seconds);
  }
}
