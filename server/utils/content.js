export const LIMITS = { input: 10000, content: 50000, heading: 160, body: 1000, summary: 2000, briefField: 300, briefListMax: 6 };
export function normalizeContent(text) {
  return String(text).replace(/\s+/g, ' ').trim().slice(0, LIMITS.content);
}

// strip markdown code fences (```json ... ```) and leading prose so JSON.parse() works
// ponytail: regex-based extraction; if a model ever nests JSON in prose, switch to brace-matching
export function extractJson(text) {
  const fenced = String(text).match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : String(text);
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');
  return start >= 0 && end > start ? candidate.slice(start, end + 1) : candidate;
}
