import { test, expect } from "@playwright/test";

test.describe("SDET Challenge API Tests", () => {
  const base = process.env.API_BASE_URL || "http://localhost:3000";

  test("GET /api/logs returns correct JSON structure", async ({ request }) => {
    const res = await request.get(`${base}/api/logs`);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.logs).toBeTruthy();
    if (body.length) {
      const log = body[0];
      expect(log).toHaveProperty("timestamp");
      expect(log).toHaveProperty("level");
      expect(log).toHaveProperty("message");
    }
  });

  

  test("GET / returns status information", async ({ request }) => {
    const res = await request.get(`${base}/`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("message", "SDET Challenge API is running");
  });

  test("Validate response schemas and status codes", async ({ request }) => {
    const output = {
      "message": "SDET Challenge API is running",
      "endpoints": {
          "logs": "/api/logs",
          "docs": "/api-docs"
      }
  }
    const schema = Object.keys(output);
    const res = await request.get(`${base}/`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    schema.forEach((key) => expect(body).toHaveProperty(key))
  });

  test("Test error handling – invalid endpoints", async ({ request }) => {
    const res = await request.get(`${base}/no-such-route`);
    expect(res.status()).toBe(404);
  });

  test("Test invalid method handling (POST on GET-only)", async ({
    request,
  }) => {
    const res = await request.post(`${base}/logs`);
    expect([404, 405]).toContain(res.status());
  });

  test("Performance – concurrent requests", async ({ request }) => {
    const responses = await Promise.all(
      Array.from({ length: 20 }, () => request.get(`${base}/api/logs`))
    );
    for (const r of responses) {
      expect(r.ok()).toBeTruthy();
    }
  });
});
