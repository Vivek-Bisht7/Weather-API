const redis = require('redis');

const client = redis.createClient(process.env.REDIS_URL);

client.on('error',err=>console.log('Redis client error',err));

client.connect();

module.exports = client;