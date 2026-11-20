
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Log directory and file
const logDirectory = path.join(__dirname, '..', 'logs');
const logFile = path.join(logDirectory, 'request.log');


fs.mkdirSync(logDirectory, { recursive: true });


const logStream = fs.createWriteStream(logFile, {
    flags: 'a'
});

logStream.on('error', (error) => {
    console.error('Log stream error:', error.message);
});

// Request logger middleware
const requestLogger = (req, res, next) => {

    const requestId = crypto.randomUUID();
    const startTime = process.hrtime.bigint();

    
    req.requestId = requestId;
    res.setHeader('X-Request-ID', requestId);

    
    res.once('finish', () => {

        const endTime = process.hrtime.bigint();

        const duration = Number(endTime - startTime) / 1e6;

        const logEntry = {
            timestamp: new Date().toISOString(),
            requestId,
            method: req.method,
            path: req.path,
            ip: req.ip,
            statusCode: res.statusCode,
            durationMs: Number(duration.toFixed(2))
        };

        
        logStream.write(JSON.stringify(logEntry) + '\n');
    });

    next();
};

module.exports = requestLogger;
