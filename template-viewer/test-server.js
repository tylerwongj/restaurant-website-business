#!/usr/bin/env node

/**
 * Simple HTTP server for testing the Template Gallery
 * Run with: node test-server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const BASE_DIR = path.resolve(__dirname, '..');

// MIME types for common file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return mimeTypes[ext] || 'application/octet-stream';
}

function serveFile(res, filePath, mimeType) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }
        
        res.writeHead(200, { 
            'Content-Type': mimeType,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let filePath = parsedUrl.pathname;
    
    // Handle root request - redirect to template-viewer
    if (filePath === '/') {
        filePath = '/template-viewer/';
    }
    
    // Handle directory requests - serve index.html
    if (filePath.endsWith('/')) {
        filePath += 'index.html';
    }
    
    // Construct full file path
    const fullPath = path.join(BASE_DIR, filePath);
    
    // Security check - ensure we're not serving files outside the base directory
    if (!fullPath.startsWith(BASE_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Access denied');
        return;
    }
    
    // Check if file exists
    fs.stat(fullPath, (err, stats) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found: ' + filePath);
            return;
        }
        
        if (stats.isDirectory()) {
            // Try to serve index.html from directory
            const indexPath = path.join(fullPath, 'index.html');
            fs.stat(indexPath, (err) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Directory listing not available');
                    return;
                }
                serveFile(res, indexPath, 'text/html');
            });
        } else {
            // Serve the file
            const mimeType = getMimeType(fullPath);
            serveFile(res, fullPath, mimeType);
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Template Gallery Test Server running at:`);
    console.log(`   http://localhost:${PORT}/template-viewer/`);
    console.log(`   http://localhost:${PORT}/templates/`);
    console.log('');
    console.log('📁 Serving files from:', BASE_DIR);
    console.log('🎯 Template Gallery:', `http://localhost:${PORT}/template-viewer/`);
    console.log('');
    console.log('Press Ctrl+C to stop the server');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down server...');
    server.close(() => {
        console.log('✅ Server stopped');
        process.exit(0);
    });
});

module.exports = server;