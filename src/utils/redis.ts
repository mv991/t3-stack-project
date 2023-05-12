

const Redis = require('ioredis');
const redis = new Redis({
    
    port: 6379,
    password: 'mysecretpassword'
});


export default redis;