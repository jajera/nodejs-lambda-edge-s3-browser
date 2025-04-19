const http = require('http');
const assert = require('assert');
const { spawn } = require('child_process');

const server = spawn('node', ['server.cjs'], {
  stdio: ['ignore', 'inherit', 'inherit'],
});

setTimeout(() => {
  const req = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/browser?prefix=',
    method: 'GET'
  }, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        assert.strictEqual(res.statusCode, 200);
        assert.ok(data.includes('Index of'));
        console.log('✅ Passed: /browser?prefix= returns 200');
      } catch (err) {
        console.error('❌ Test failed:', err);
        process.exitCode = 1;
      } finally {
        server.kill(); // ✅ kill the server process after test
      }
    });
  });

  req.on('error', err => {
    console.error('❌ Error:', err);
    server.kill();
    process.exit(1);
  });

  req.end();
}, 1000); // Wait 1 second to ensure server is ready
