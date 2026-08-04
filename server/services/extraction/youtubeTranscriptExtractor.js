import { YoutubeTranscript } from 'youtube-transcript';
import { AppError } from '../../constants/errors.js';
import { normalizeContent } from '../../utils/content.js';

export function parseYouTubeId(value) {
  const url = new URL(value);
  if (url.hostname === 'youtu.be') return url.pathname.slice(1);
  if (url.pathname === '/watch') return url.searchParams.get('v');
  const match = url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/);
  return match?.[1] || null;
}

export function createYouTubeExtractor({ transcriptClient = YoutubeTranscript } = {}) {
  return async function extractYouTubeTranscript(value) {
    let id;
    try { id = parseYouTubeId(value); } catch { id = null; }
    if (!id) throw new AppError('Invalid YouTube URL.', { status: 400, code: 'INVALID_URL' });
    try {
      const segments = await transcriptClient.fetchTranscript(id);
      const content = normalizeContent(segments.map((segment) => segment.text).join(' '));
      if (!content) throw new Error('Empty transcript');
      return { sourceType: 'youtube', title: 'YouTube transcript', content };
    } catch { throw new AppError('YouTube transcript extraction failed.', { status: 502, code: 'EXTRACTION_ERROR' }); }
  };
}
