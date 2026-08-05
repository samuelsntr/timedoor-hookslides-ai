import { OUTPUT_RULES } from './outputRules.js';
import { STRATEGY_GUIDELINES } from './strategyGuidelines.js';

export function buildCarouselPrompt({ brief, strategy, template }) {
  return `You are an expert Instagram carousel copywriter. Using the editorial brief below, write the final carousel. Return valid JSON only, with keys title, summary, slides. The slides array must contain exactly six objects in this exact order and types: hook, context, value, value, takeaway, cta. Each object has type, heading, body. Template: ${template}.

${OUTPUT_RULES}

${STRATEGY_GUIDELINES[strategy]}

<EDITORIAL_BRIEF>
${JSON.stringify(brief)}
</EDITORIAL_BRIEF>`;
}
