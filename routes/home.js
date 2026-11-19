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

    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Home - My Server</title>
        </head>
        <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1>Welcome to the Home Route</h1>
            <p>Server Status: <strong>Online</strong></p>
            <p>Your IP: <strong>${req.ip}</strong></p>
            <p>Total Home Requests: <strong>${homeRequestCount}</strong></p>
        </body>
        </html>
    `);
});

module.exports = router;
