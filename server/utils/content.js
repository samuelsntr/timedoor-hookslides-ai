export const LIMITS = { input: 10000, content: 50000, heading: 160, body: 1000, summary: 2000 };
export function normalizeContent(text) {
  return String(text).replace(/\s+/g, ' ').trim().slice(0, LIMITS.content);
}
