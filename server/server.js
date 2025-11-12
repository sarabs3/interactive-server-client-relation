const http = require('http');

// Configuration
const PORT = 3001;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    // Log incoming request
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    // Route handling
    if (req.url === '/' && req.method === 'GET') {
        // Root endpoint
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: "Welcome to NodeJs Server",
            success: true,
            users: []
        }));
    }
    if(req.url === "/api/hello" && req.method === "GET") {
        // Root endpoint
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: "Hello from the server"
        }));

    }
});


// Start the server
server.listen(PORT, HOST, () => {
    console.log('=================================');
    console.log(`Server is running!`);
    console.log(`Host: http://${HOST}:${PORT}`);
    console.log('=================================');
    console.log('Available endpoints:');
    console.log(`  GET  http://${HOST}:${PORT}/`);
    console.log(`  GET  http://${HOST}:${PORT}/api/hello`);
    console.log(`  GET  http://${HOST}:${PORT}/api/time`);
    console.log(`  POST http://${HOST}:${PORT}/api/echo`);
    console.log('=================================');
});













































// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please close the other application or use a different port.`);
    } else {
        console.error('Server error:', error);
    }
});

// Handle process termination
process.on('SIGTERM', () => {
    console.log('\nSIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\nSIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});









// Create HTTP server
const server2 = http.createServer((req, res) => {
    // Set CORS headers to allow requests from the frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Log incoming request
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    // Route handling
    if (req.url === '/' && req.method === 'GET') {
        // Root endpoint
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Welcome to the Simple Node.js Server!',
            timestamp: new Date().toISOString(),
            endpoints: {
                '/': 'Home endpoint',
                '/api/hello': 'Returns a greeting message',
                '/api/time': 'Returns current server time',
                '/api/echo': 'POST - Echoes back your data'
            }
        }));
    }
    else if (req.url === '/api/hello' && req.method === 'GET') {
        // Hello endpoint
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Hello from the server!',
            server: 'Node.js',
            timestamp: new Date().toISOString()
        }));
    }
    else if (req.url === '/api/time' && req.method === 'GET') {
        // Time endpoint
        const now = new Date();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            currentTime: now.toISOString(),
            localTime: now.toLocaleString(),
            timestamp: now.getTime()
        }));
    }
    else if (req.url === '/api/echo' && req.method === 'POST') {
        // Echo endpoint - echoes back the posted data
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Echo from server',
                    receivedData: data,
                    timestamp: new Date().toISOString()
                }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: 'Invalid JSON',
                    message: error.message
                }));
            }
        });
    }
    else {
        // 404 - Not Found
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: 'Not Found',
            message: `The endpoint ${req.url} does not exist`,
            availableEndpoints: ['/', '/api/hello', '/api/time', '/api/echo']
        }));
    }
});

