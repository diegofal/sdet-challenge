import { test, expect } from "@playwright/test";
import countLogLevels, { LogLevelCounts, LogLevel } from "../src/logParser";

test.describe("Log Parser Integration Tests", () => {
  const base = process.env.API_BASE_URL || "http://localhost:3000/api";

  test("Empty logs returns zero counts", async () => {
    const emptyLogs = [];
    const counts = countLogLevels(emptyLogs as any);
    expect(counts).toEqual({ INFO: 0, WARN: 0, ERROR: 0 });
  });

  test("Mixed level logs are counted correctly", async () => {
    const logs = [
      { level: "INFO" },
      { level: "ERROR" },
      { level: "INFO" },
      { level: "WARN" },
      { level: "ERROR" },
    ];
    const counts = countLogLevels(logs as any);
    expect(counts).toEqual({ INFO: 2, WARN: 1, ERROR: 2 });
  });

  test("Invalid log format throws or ignores", () => {
    const badLogs = [{ lvl: "INFO" }, null, {}];
    expect(() => countLogLevels(badLogs as any)).toThrow();
  });

  test("Fetch logs from API and parse", async ({ request }) => {
    const res = await request.get(`${base}/logs`);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    const logs: string[] = body.logs;
    const counts = countLogLevels(logs);
    expect(Array.isArray(logs)).toBeTruthy();

    // Validate that countLogLevels returns a number for each present level
    const validLevels = ["INFO", "WARN", "ERROR"];

    for (const level of validLevels) {
      if (logs.some((line) => line.includes(`[${level}]`))) {
        expect(counts[level]).toBeGreaterThanOrEqual(1);
        expect(typeof counts[level]).toBe("number");
      } else {
        // Accept either undefined or 0 if level is not present
        expect([undefined, 0]).toContain(counts[level]);
      }
    }
  });
});
