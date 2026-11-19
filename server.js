const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3000;

const createLimiter = (message) => {
    return rateLimit({
        windowMs: 60 * 1000,
        max: 10,
        message: message,
        standardHeaders: true,
        legacyHeaders: false,
    });
};

const homeLimiter = createLimiter('Too many requests to the home route. Please try again later.');
const userLimiter = createLimiter('Too many requests to the user route. Please try again later.');

let homeRequestCount = 0;
let userRequestCount = 0;

app.get('/', homeLimiter, (req, res) => {
    homeRequestCount++;
    res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1>Welcome to the Home Route</h1>
            <p>Your IP: <strong>${req.ip}</strong></p>
	   <p>Server status : ONLINE</p>    
            <p>Total Home Requests: <strong>${homeRequestCount}</strong></p>
        </div>
    `);
});

app.get('/user', userLimiter, (req, res) => {
    userRequestCount++;
    res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1>Welcome to the User Route</h1>
	 <p>Server status : online</p>
            <p>Total User Requests Count: <strong>${userRequestCount}</strong></p>
        </div>
    `);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
