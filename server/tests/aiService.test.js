import test from 'node:test';
import assert from 'node:assert/strict';
import { createAiService } from '../services/ai/aiService.js';

test('uses primary then fallback', async () => {
  const calls = [];
  const service = createAiService({
    primary: { summarize: async () => { calls.push('primary'); throw new Error('down'); } },
    fallback: { summarize: async () => { calls.push('fallback'); return 'ok'; } },
    logger: { warn() {} }
  });
  assert.equal(await service.summarize('x'), 'ok');
  assert.deepEqual(calls, ['primary', 'fallback']);
});
