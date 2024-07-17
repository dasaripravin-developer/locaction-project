import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisConfig } from '../config/app.config';

export class RedisService {
  private readonly redisClient;

  constructor(config: RedisConfig) {
    this.redisClient = new Redis(config);
  }

  async set(key: string, value: any): Promise<void> {
    try {
      await this.redisClient.set(key, JSON.stringify(value));
      console.log(
        `redis.service - set - value - ${JSON.stringify(value)} - key - ${key} - setted in redis`,
      );
    } catch (error) {
      console.log(`redis.service - set - Exception - ${error.message}`);
      throw error;
    }
  }

  async get(key: string): Promise<any> {
    try {
      const data = await this.redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.log(`redis.service - get - Exception - ${err.message}`);
      throw err;
    }
  }
}
