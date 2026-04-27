import { handleJSONMessage, handlePlaintextMessage } from "./controllers";

/**
 * Main application entry point using Bun.serve.
 * Configures the HTTP server, defines API routes, and manages static file serving.
 */
const server = Bun.serve({
  port: 3000,

  /**
   * Primary fetch handler for all incoming HTTP requests.
   * Implements a simple router for API endpoints and a fallback for static assets.
   * @param {Request} req - The incoming web request.
   * @returns {Promise<Response>} The handled response (API, File, or 404).
   */
  async fetch(req) {
    const url = new URL(req.url);

    // --- API Routing ---
    // Handle plaintext message production
    if (url.pathname === "/api/newMessage" && req.method === "POST")
      return handlePlaintextMessage(req);

    // Handle automated JSON user event production
    if (url.pathname === "/api/sendJSON" && req.method === "POST")
      return handleJSONMessage();

    // --- Static File Serving ---
    // Default to index.html for root requests
    let filePath = url.pathname === "/" ? "/index.html" : url.pathname;
    const file = Bun.file(`./static${filePath}`);

    // Check for existence in the static directory to prevent 500 errors
    if (await file.exists()) {
      return new Response(file);
    }

    // Fallback if no route or file matches
    return new Response("File Not Found", { status: 404 });
  },
});

console.log(`Server running at http://${server.hostname}:${server.port}`);
