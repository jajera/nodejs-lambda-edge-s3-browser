# nodejs-lambda-edge-s3-browser

CloudFront Lambda@Edge S3 browser in Node.js with local dev support.

## Features

- 📁 Browse public S3 bucket contents by prefix
- 🛝 Folder-style navigation via `/browser?prefix=...`
- ↻ Redirect-based proxy for file access (`/proxy/...`)
- 🧪 Local dev server for testing
- 🚀 Compatible with Lambda@Edge (viewer-request event)

## Local Development

Start the server:

```bash
node lambda-edge-browser.js
```

Open your browser to:

```
http://localhost:3000/browser?prefix=
```

## Environment Variables

- `S3_BASE_URL`: Base URL of the public S3 bucket (default: `https://geonet-open-data.s3-ap-southeast-2.amazonaws.com`)

## Deploy to Lambda@Edge

This script is compatible with the `viewer-request` event type.

- Runtime: `nodejs18.x`
- Handler: `index.handler` (or match your entry file)
- Region: `us-east-1` (required for Lambda@Edge)

## URL Behavior

- `/`: Redirects to `/browser`
- `/browser?prefix=folder/`: Lists folder contents
- `/proxy/key`: Redirects to the file in S3
- Folder links auto-navigate, file links open in a new tab

## License

MIT
