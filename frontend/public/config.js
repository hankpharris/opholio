// This script injects runtime configuration into the frontend
window.__BACKEND_URL__ = "http://localhost:" + (window.BACKEND_PORT || "3001");
