const express = require('express');
const rateLimit = require('express-rate-limit');

const router = express.Router();

const homeLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 10,
    message: {
        error: 'Too many requests to the home route.',
        retry: 'Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

let homeRequestCount = 0;

router.get('/', homeLimiter, (req, res) => {
    homeRequestCount++;

    res.status(200).json({
success: true,
message: "Welcome to home route",
data:{
 status:"online",
 ip:req.ip,
 totalRequest:homeRequestCount
 }
})
});
module.exports = router;
