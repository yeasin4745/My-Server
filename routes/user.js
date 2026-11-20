const express = require('express');
const rateLimit = require('express-rate-limit');

const router = express.Router();

const userLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 10,
    message: {
        error: 'Too many requests to the user route.',
        retry: 'Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

let userRequestCount = 0;

router.get('/' , userLimiter, (req, res) => {
    userRequestCount++;

    res.status(200).json({
        success: true,
        message: 'Welcome to the User Route',
        data: {
            serverStatus: 'Online',
            totalRequests: userRequestCount
        }
    });
});

module.exports = router;
