
const express = require('express');

const requestLogger = require('./middlewares/requestLogger');

const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;

// Global request logger
app.use(requestLogger);

// Parse JSON requests
app.use(express.json());

// Routes
app.use('/', homeRouter);
app.use('/user', userRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        requestId: req.requestId
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

