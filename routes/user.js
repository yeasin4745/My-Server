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

router.get('/', userLimiter, (req, res) => {
    userRequestCount++;

    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>User - My Server</title>
        </head>
        <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1>Welcome to the User Route</h1>
            <p>Server Status: <strong>Online</strong></p>
            <p>Total User Requests: <strong>${userRequestCount}</strong></p>
        </body>
        </html>
    `);
});

module.exports = router;
