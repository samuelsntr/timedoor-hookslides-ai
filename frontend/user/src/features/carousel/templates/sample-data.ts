import type { Carousel } from "./types"

/**
 * Real output from the generator (server/data/hookslides.sqlite, carousels table).
 * Kept verbatim so the landing page shows what the product actually produces.
 */
const SAMPLE_CAROUSEL: Carousel = {
  title: "Turn Your Chaotic Feed into a Cohesive Brand in 4 Steps",
  sourceType: "topic",
  strategy: "actionable_value",
  template: "template_1",
  slides: [
    {
      type: "hook",
      heading: "Ready for a simple Instagram plan?",
      body: "A quick, doable framework turns a messy feed into a brand-ready grid. Save this and start today.",
    },
    {
      type: "context",
      heading: "Why structure matters",
      body: "Without a clear plan, posts feel scattered and engagement stalls. A cohesive feed signals professionalism and keeps followers coming back.",
    },
    {
      type: "value",
      heading: "Step 1: Know your audience & pick a theme",
      body: "Identify who you're speaking to and how you use Instagram. Then choose one visual style or topic that ties every post together.",
    },
    {
      type: "value",
      heading: "Step 2: Upgrade visuals & craft bite-size captions",
      body: "Use high-quality, consistent lighting. Pair short, hook-filled captions with a quick question or CTA.",
    },
    {
      type: "takeaway",
      heading: "Your 4-step checklist",
      body: "Define audience & theme. Use strong visuals. Write bite-size captions. Mix Feed, Stories and Reels on a realistic schedule.",
    },
    {
      type: "cta",
      heading: "Your turn!",
      body: "Comment the first step you'll try and save so you can revisit this checklist whenever you need a content boost.",
    },
  ],
  captionIdeas: [
    "Feeling stuck with your feed? Try this 4-step checklist and watch your brand come together. 💡",
    "A tidy Instagram grid isn't magic — it's a plan. Swipe through, pick a step, and start today! ✨",
    "From chaos to cohesive in four moves. Which step are you tackling first? Drop a comment! 👇",
  ],
  hashtags: [
    "#InstagramTips",
    "#ContentStrategy",
    "#Branding",
    "#SocialMediaTips",
    "#CreatorCommunity",
    "#FeedDesign",
  ],
}

export { SAMPLE_CAROUSEL }
