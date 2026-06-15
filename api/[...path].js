import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async (req, res) => {
  try {
    // Serve static files from public/assets/
    const requestPath = req.url.split("?")[0];
    if (requestPath.startsWith("/assets/")) {
      const filePath = path.join(__dirname, "..", "public", requestPath);
      console.log(`[STATIC] Requested: ${requestPath}, Full path: ${filePath}`);
      
      // Security: prevent directory traversal
      const publicDir = path.join(__dirname, "..", "public");
      if (!filePath.startsWith(publicDir)) {
        console.log(`[STATIC] Security check failed`);
        res.status(403).send("Forbidden");
        return;
      }
      
      try {
        const stats = fs.statSync(filePath);
        console.log(`[STATIC] File found, size: ${stats.size}`);
        
        if (stats.isFile()) {
          const file = fs.readFileSync(filePath);
          const ext = path.extname(requestPath);
          const mimeTypes = {
            ".js": "application/javascript",
            ".css": "text/css",
            ".json": "application/json",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".gif": "image/gif",
            ".svg": "image/svg+xml",
            ".woff": "font/woff",
            ".woff2": "font/woff2",
            ".ttf": "font/ttf",
            ".eot": "application/vnd.ms-fontobject",
          };
          const contentType = mimeTypes[ext] || "application/octet-stream";
          console.log(`[STATIC] Serving with Content-Type: ${contentType}`);
          res.setHeader("Content-Type", contentType);
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          res.send(file);
          return;
        }
      } catch (err) {
        console.log(`[STATIC] File error: ${err.message}, continuing to SSR`);
        // File not found or read error, continue to SSR handler
      }
    }

    // Import the built server dynamically
    const serverModule = await import("../dist/server/server.js");
    const handler = serverModule.default;

    if (!handler || !handler.fetch) {
      throw new Error("Server handler not found");
    }

    // Build the full URL
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const url = `${protocol}://${host}${req.url || "/"}`;

    // Prepare body
    let body;
    if (req.method !== "GET" && req.method !== "HEAD" && req.body) {
      body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    }

    // Create Web API Request
    const request = new Request(url, {
      method: req.method || "GET",
      headers: req.headers,
      body,
    });

    // Call server
    const response = await handler.fetch(request);

    // Copy response headers
    for (const [key, value] of response.headers) {
      res.setHeader(key, value);
    }

    // Send response
    const buffer = await response.arrayBuffer();
    res.status(response.status).send(Buffer.from(buffer));
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).setHeader("Content-Type", "text/html").send(`<!DOCTYPE html>
<html><head><title>Server Error</title></head>
<body><h1>Something went wrong</h1><p>An unexpected error occurred. Please try again later.</p></body></html>`);
  }
};
