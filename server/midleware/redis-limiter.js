import { RateLimiterRedis } from 'rate-limiter-flexible'
import { promisifyAll } from 'bluebird'
import redis from 'redis'

promisifyAll(redis)

const redisCnn = redis.createClient({
    host: process.env.REDIS_DB,
    port: 6379,
    enable_offline_queue: false
})


const rateLimiter = new RateLimiterRedis({
    redis: redisCnn,
    keyPrefix: 'middleware',
    points: 30,
    duration: 1,
});

const rateLimiterMiddleware = (req, res, next) => {

    rateLimiter.consume(req.ip)
        .then(() => {
            next()
        })
        .catch(() => {
            res.status(429).send('Too Many Requests')
        });
};

export default rateLimiterMiddleware