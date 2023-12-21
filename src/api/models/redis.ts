import Redis from 'ioredis';
import { config } from '@config';

const redis = new Redis(config.redisURL);

export default redis;
