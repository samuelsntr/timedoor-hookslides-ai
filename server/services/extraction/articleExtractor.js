import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import { AppError } from '../../constants/errors.js';
import { normalizeContent } from '../../utils/content.js';
import { isAllowedRemoteUrl } from '../../utils/url.js';

export function createArticleExtractor({ fetchImpl = fetch } = {}) {
  return async function extractArticle(url) {
    if (!(await isAllowedRemoteUrl(url))) throw new AppError('Article URL is not allowed.', { status: 400, code: 'INVALID_URL' });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      const response = await fetchImpl(url, { signal: controller.signal, headers: { accept: 'text/html' } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      const article = new Readability(new JSDOM(html, { url }).window.document).parse();
      if (!article?.textContent?.trim()) throw new Error('No readable article content');
      return { sourceType: 'article', title: article.title || 'Untitled article', content: normalizeContent(article.textContent), author: article.byline || null, publishedAt: null };
    } catch (error) {
      throw new AppError('Article extraction failed.', { status: 502, code: 'EXTRACTION_ERROR', details: { cause: error.name === 'AbortError' ? 'timeout' : 'upstream' } });
    } finally { clearTimeout(timeout); }
  };
}
