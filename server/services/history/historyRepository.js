import { toCarousel } from '../../models/carousel.js';

export function createHistoryRepository(db) {
  const insert = db.prepare(`INSERT INTO carousels
    (id, title, source_type, original_input, extracted_content, strategy, template, slides_json, summary, created_at, updated_at)
    VALUES (@id, @title, @sourceType, @originalInput, @extractedContent, @strategy, @template, @slidesJson, @summary, @createdAt, @updatedAt)`);
  return {
    createCarousel(record) {
      insert.run({ ...record, slidesJson: JSON.stringify(record.slides) });
      return record;
    },
    listCarousels({ page = 1, limit = 20 }) {
      const total = db.prepare('SELECT COUNT(*) AS total FROM carousels').get().total;
      const rows = db.prepare('SELECT * FROM carousels ORDER BY created_at DESC LIMIT ? OFFSET ?').all(limit, (page - 1) * limit);
      return { items: rows.map(toCarousel), total };
    },
    findCarouselById(id) { return toCarousel(db.prepare('SELECT * FROM carousels WHERE id = ?').get(id)); },
    deleteCarousel(id) { return db.prepare('DELETE FROM carousels WHERE id = ?').run(id).changes > 0; }
  };
}
