const express = require('express');

const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;

// Home route
app.use('/', homeRouter);

// User route
app.use('/user', userRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
