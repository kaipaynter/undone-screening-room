import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async (req, res) => {
  try {
    // Try to serve public/index.html for app routes
    const indexPath = path.join(__dirname, "..", "public", "index.html");
    if (fs.existsSync(indexPath)) {
      const html = fs.readFileSync(indexPath, "utf-8");
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(html);
      return;
    }

    // If no index.html, try to load SSR server
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

