import { AppError } from '../../constants/errors.js';
import { validateCarousel } from '../../validators/carousel.js';
import { validateEditorialBrief } from '../../validators/editorialBrief.js';

export function createGenerationService({ contentService, aiService, historyRepository, clock = () => new Date(), createId }) {
  return {
    async generate({ input, sourceType, strategy, template }) {
      const extracted = await contentService.extractContent({ sourceType, input });
      const summary = await aiService.summarize(extracted.content);

      let briefJson;
      try { briefJson = JSON.parse(await aiService.createEditorialBrief({ summary, strategy })); }
      catch { throw new AppError('AI returned invalid editorial brief.', { status: 502, code: 'AI_OUTPUT_ERROR' }); }
      const briefResult = validateEditorialBrief(briefJson);
      if (!briefResult.success) throw new AppError('AI returned invalid editorial brief.', { status: 502, code: 'AI_OUTPUT_ERROR' });

      let generated;
      try { generated = JSON.parse(await aiService.generateCarousel({ brief: briefResult.data, strategy, template })); }
      catch { throw new AppError('AI returned invalid carousel data.', { status: 502, code: 'AI_OUTPUT_ERROR' }); }
      const result = validateCarousel({ ...generated, sourceType, strategy, template });
      if (!result.success) throw new AppError('AI returned invalid carousel data.', { status: 502, code: 'AI_OUTPUT_ERROR' });

      const now = clock().toISOString();
      const record = { id: createId(), ...result.data, originalInput: input, extractedContent: extracted.content, createdAt: now, updatedAt: now };
      historyRepository.createCarousel(record);
      return record;
    }
  };
}
