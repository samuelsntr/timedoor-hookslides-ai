export function toCarousel(row) {
  if (!row) return null;
  return {
    id: row.id, title: row.title, sourceType: row.source_type,
    originalInput: row.original_input, extractedContent: row.extracted_content,
    strategy: row.strategy, template: row.template, slides: JSON.parse(row.slides_json),
    summary: row.summary, createdAt: row.created_at, updatedAt: row.updated_at
  };
}
