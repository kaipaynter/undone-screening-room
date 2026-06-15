export default async (req, res) => {
  try {
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
    res.status(500).setHeader("Content-Type", "text/html").send(`
      <!DOCTYPE html>
      <html>
        <head><title>Error</title></head>
        <body>
          <h1>Server Error</h1>
          <p>${error instanceof Error ? error.message : String(error)}</p>
          <pre>${error instanceof Error ? error.stack : ""}</pre>
        </body>
      </html>
    `);
  }
};
