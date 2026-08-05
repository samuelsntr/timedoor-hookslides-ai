import test from 'node:test';
import assert from 'node:assert/strict';
import { OUTPUT_RULES } from '../prompts/outputRules.js';
import { STRATEGY_GUIDELINES } from '../prompts/strategyGuidelines.js';
import { STRATEGIES } from '../constants/values.js';

test('output rules cover source-grounding and voice', () => {
  assert.match(OUTPUT_RULES, /untrusted/i);
  assert.match(OUTPUT_RULES, /warm/i);
  assert.match(OUTPUT_RULES, /Instagram/i);
});

test('every strategy has guidelines', () => {
  for (const strategy of STRATEGIES) {
    assert.equal(typeof STRATEGY_GUIDELINES[strategy], 'string');
    assert.ok(STRATEGY_GUIDELINES[strategy].length > 0);
  }
});
