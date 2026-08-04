import test from 'node:test';
import assert from 'node:assert/strict';
import { createContentService } from '../services/extraction/contentService.js';
import { parseYouTubeId, createYouTubeExtractor } from '../services/extraction/youtubeTranscriptExtractor.js';

test('dispatches topic without network', async () => {
  const service = createContentService({ articleExtractor: () => assert.fail(), youtubeExtractor: () => assert.fail() });
  assert.equal((await service.extractContent({ sourceType: 'topic', input: '  hello   world ' })).content, 'hello world');
});
test('parses supported YouTube URL forms', () => {
  assert.equal(parseYouTubeId('https://www.youtube.com/watch?v=abc'), 'abc');
  assert.equal(parseYouTubeId('https://youtu.be/abc'), 'abc');
  assert.equal(parseYouTubeId('https://youtube.com/embed/abc'), 'abc');
});
test('joins transcript segments', async () => {
  const extract = createYouTubeExtractor({ transcriptClient: { fetchTranscript: async () => [{ text: 'one' }, { text: 'two' }] } });
  assert.equal((await extract('https://youtu.be/abc')).content, 'one two');
});
