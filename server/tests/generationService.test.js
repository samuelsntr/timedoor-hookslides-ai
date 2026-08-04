import test from 'node:test';
import assert from 'node:assert/strict';
import { createGenerationService } from '../services/generation/generationService.js';

const slides = [['hook', 'h'], ['context', 'c'], ['value', 'v1'], ['value', 'v2'], ['takeaway', 't'], ['cta', 'cta']].map(([type, heading]) => ({ type, heading, body: 'body' }));
test('runs pipeline and persists valid output', async () => {
  const calls = [];
  const service = createGenerationService({
    contentService: { extractContent: async () => { calls.push('extract'); return { content: 'content' }; } },
    aiService: { summarize: async () => { calls.push('summarize'); return 'summary'; }, generateCarousel: async () => { calls.push('generate'); return JSON.stringify({ title: 'Title', summary: 'Summary', slides }); } },
    historyRepository: { createCarousel: (record) => { calls.push('save'); return record; } },
    clock: () => new Date('2026-08-04T00:00:00.000Z'), createId: () => 'id'
  });
  const result = await service.generate({ input: 'input', sourceType: 'topic', strategy: 'viral_hook', template: 'template_1' });
  assert.deepEqual(calls, ['extract', 'summarize', 'generate', 'save']);
  assert.equal(result.slides.length, 6);
});
