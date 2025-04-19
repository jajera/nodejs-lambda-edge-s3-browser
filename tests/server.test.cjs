const http = require('http');
const assert = require('assert');

// 🔁 Start the server
require('../server.cjs');

const req = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/browser?prefix=',
    method: 'GET'
}, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        assert.strictEqual(res.statusCode, 200);
        assert.ok(data.includes('Index of'));
        console.log('✅ Passed: /browser?prefix= returns 200');
    });
});

req.on('error', err => {
    console.error('❌ Error:', err);
});

req.end();
