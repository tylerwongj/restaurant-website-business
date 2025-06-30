#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

class PreviewServer {
  constructor() {
    this.clientProjectsPath = path.join(__dirname, '../client-projects');
    this.server = null;
    this.port = 3000;
  }

  startServer(clientName, options = {}) {
    try {
      const clientFolder = this.sanitizeClientName(clientName);
      const clientPath = path.join(this.clientProjectsPath, clientFolder);
      
      if (!fs.existsSync(clientPath)) {
        throw new Error(`Client '${clientFolder}' not found`);
      }

      const websitePath = path.join(clientPath, 'generated/website');
      if (!fs.existsSync(websitePath)) {
        throw new Error(`Generated website not found. Run generate-website.js first.`);
      }

      this.port = options.port || 3000;
      
      console.log(`🌐 Starting preview server for ${clientName}...`);
      console.log(`📁 Serving: ${websitePath}`);

      this.server = http.createServer((req, res) => {
        this.handleRequest(req, res, websitePath, clientName);
      });

      this.server.listen(this.port, () => {
        console.log(`✅ Server running at http://localhost:${this.port}`);
        console.log('');
        console.log('📱 Preview URLs:');
        console.log(`   Homepage: http://localhost:${this.port}/`);
        console.log(`   Menu: http://localhost:${this.port}/menu.html`);
        console.log('');
        console.log('🛑 Press Ctrl+C to stop server');
      });

      // Handle server shutdown
      process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down preview server...');
        this.server.close(() => {
          console.log('✅ Server stopped');
          process.exit(0);
        });
      });

    } catch (error) {
      console.error('❌ Error starting preview server:', error.message);
      process.exit(1);
    }
  }

  handleRequest(req, res, websitePath, clientName) {
    const parsedUrl = url.parse(req.url);
    let filePath = parsedUrl.pathname;

    // Default to index.html
    if (filePath === '/') {
      filePath = '/index.html';
    }

    // Remove leading slash
    if (filePath.startsWith('/')) {
      filePath = filePath.slice(1);
    }

    const fullPath = path.join(websitePath, filePath);

    // Security check - ensure we're serving from website directory
    if (!fullPath.startsWith(websitePath)) {
      this.send404(res);
      return;
    }

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      this.send404(res);
      return;
    }

    // Determine content type
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = this.getContentType(ext);

    try {
      const content = fs.readFileSync(fullPath);
      
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      
      res.end(content);

      // Log request
      const timestamp = new Date().toLocaleTimeString();
      console.log(`${timestamp} - ${req.method} ${req.url} - 200`);

    } catch (error) {
      console.error(`Error serving ${fullPath}:`, error.message);
      this.send500(res);
    }
  }

  getContentType(ext) {
    const types = {
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

    return types[ext] || 'text/plain';
  }

  send404(res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>404 - Not Found</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          h1 { color: #e74c3c; }
        </style>
      </head>
      <body>
        <h1>404 - Page Not Found</h1>
        <p>The requested file could not be found.</p>
        <p><a href="/">Return to homepage</a></p>
      </body>
      </html>
    `);
  }

  send500(res) {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>500 - Server Error</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          h1 { color: #e74c3c; }
        </style>
      </head>
      <body>
        <h1>500 - Server Error</h1>
        <p>An error occurred while serving the requested file.</p>
        <p><a href="/">Return to homepage</a></p>
      </body>
      </html>
    `);
  }

  openBrowser(port) {
    const url = `http://localhost:${port}`;
    
    // Try to open browser (platform-specific)
    const { exec } = require('child_process');
    
    let command;
    switch (process.platform) {
      case 'darwin': // macOS
        command = `open ${url}`;
        break;
      case 'win32': // Windows
        command = `start ${url}`;
        break;
      default: // Linux
        command = `xdg-open ${url}`;
        break;
    }

    exec(command, (error) => {
      if (error) {
        console.log(`💡 Manual: Open ${url} in your browser`);
      } else {
        console.log(`🚀 Browser opened to ${url}`);
      }
    });
  }

  sanitizeClientName(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  static listActiveServers() {
    // In a more advanced implementation, you could track active servers
    console.log('📊 Active Preview Servers');
    console.log('');
    console.log('💡 To view active servers, check running processes:');
    console.log('   ps aux | grep preview-server');
  }
}

// CLI Usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🍽️  Restaurant Preview Server

Usage:
  node preview-server.js <client-name> [options]
  node preview-server.js --list

Options:
  --port <number>    Server port (default: 3000)
  --open             Open browser automatically
  --list             List active servers

Examples:
  node preview-server.js "Mario's Italian Kitchen"
  node preview-server.js "Joe's Diner" --port 8080 --open
  node preview-server.js --list

Features:
  - Live preview of generated websites
  - Serves all static assets
  - Mobile-friendly testing
  - Real-time file serving
  - Auto browser opening

Use Cases:
  - Client demos and approval
  - Mobile testing
  - Cross-browser verification
  - Development preview
  - Stakeholder reviews
`);
    process.exit(1);
  }

  if (args[0] === '--list') {
    PreviewServer.listActiveServers();
    process.exit(0);
  }

  const preview = new PreviewServer();
  const clientName = args[0];
  
  // Parse options
  const options = {};
  let openBrowser = false;

  for (let i = 1; i < args.length; i++) {
    switch (args[i]) {
      case '--port':
        options.port = parseInt(args[++i]);
        break;
      case '--open':
        openBrowser = true;
        break;
    }
  }

  preview.startServer(clientName, options);
  
  if (openBrowser) {
    setTimeout(() => {
      preview.openBrowser(options.port || 3000);
    }, 1000); // Wait for server to start
  }
}

module.exports = PreviewServer;