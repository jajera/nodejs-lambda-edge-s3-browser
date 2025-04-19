// server.cjs
const http = require('http');
const url = require('url');
const { handler } = require('./lambda-edge-browser');

http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url);
    const uri = parsedUrl.pathname;
    const querystring = parsedUrl.query || '';

    const event = {
        Records: [
            {
                cf: {
                    request: {
                        uri,
                        querystring,
                        method: req.method,
                        headers: {},
                    }
                }
            }
        ]
    };

    try {
        const response = await handler(event);
        res.writeHead(
            parseInt(response.status),
            response.statusDescription,
            Object.fromEntries(
                Object.entries(response.headers || {}).map(([k, v]) => [k, v[0].value])
            )
        );
        res.end(response.body);
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Local handler error:\n' + err.stack);
    }
}).listen(3000, () => {
    console.log('🚀 Local test server running at http://localhost:3000/browser?prefix=');
});
