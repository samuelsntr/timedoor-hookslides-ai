import { toCarousel } from '../../models/carousel.js';

export function createHistoryRepository(db) {
  const insert = db.prepare(`INSERT INTO carousels
    (id, user_id, title, source_type, original_input, extracted_content, strategy, template, slides_json, summary, caption_ideas_json, hashtags_json, created_at, updated_at)
    VALUES (@id, @userId, @title, @sourceType, @originalInput, @extractedContent, @strategy, @template, @slidesJson, @summary, @captionIdeasJson, @hashtagsJson, @createdAt, @updatedAt)`);
  return {
    createCarousel(record) {
      insert.run({ ...record, slidesJson: JSON.stringify(record.slides), captionIdeasJson: JSON.stringify(record.captionIdeas), hashtagsJson: JSON.stringify(record.hashtags) });
      return record;
    },
    listCarousels({ page = 1, limit = 20, userId }) {
      const total = db.prepare('SELECT COUNT(*) AS total FROM carousels WHERE user_id = ?').get(userId).total;
      const rows = db.prepare('SELECT * FROM carousels WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?').all(userId, limit, (page - 1) * limit);
      return { items: rows.map(toCarousel), total };
    },
    findCarouselById(id, userId) { return toCarousel(db.prepare('SELECT * FROM carousels WHERE id = ? AND user_id = ?').get(id, userId)); },
    deleteCarousel(id, userId) { return db.prepare('DELETE FROM carousels WHERE id = ? AND user_id = ?').run(id, userId).changes > 0; }
  };
}
