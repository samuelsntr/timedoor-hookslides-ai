import creatorPhoto from "@/assets/landing/audience-creator-photo.jpg"
import founderPhoto from "@/assets/landing/audience-founder-photo.jpg"
import marketerPhoto from "@/assets/landing/audience-marketer-photo.jpg"

import { Reveal } from "../reveal"

const audiences = [
  {
    name: "Content Creators",
    body: "Grow your audience faster. Turn your daily thoughts into viral carousels without touching a design tool.",
    photo: creatorPhoto,
    alt: "A content creator holding a camera in a creative studio",
    hoverShadow: "hover:shadow-[0_24px_48px_-12px_rgba(226,75,44,0.25)] hover:ring-[#e24b2c]/20",
  },
  {
    name: "Founders & Entrepreneurs",
    body: "Build thought leadership. Turn your industry expertise into professional, branded assets in minutes.",
    photo: founderPhoto,
    alt: "A focused founder working on a laptop by a bright window",
    hoverShadow: "hover:shadow-[0_24px_48px_-12px_rgba(109,94,247,0.25)] hover:ring-[#6D5EF7]/20",
  },
  {
    name: "Marketers & Managers",
    body: "Fill your content calendar instantly. Repurpose long-form content into weeks of engaging social posts.",
    photo: marketerPhoto,
    alt: "A social media manager organizing tasks on a tablet",
    hoverShadow: "hover:shadow-[0_24px_48px_-12px_rgba(79,142,247,0.25)] hover:ring-[#4F8EF7]/20",
  },
]

function WhoItsFor() {
  return (
    <section className="border-y border-[#e4ddd0] bg-[#f1ece3]">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold leading-[1.15] tracking-tight text-[#1c1a17] sm:text-4xl lg:text-5xl">
              Built for teams and creators who need to post consistently.
            </h2>
            <p className="mt-5 text-lg text-[#5c574e]">
              Scale your content output without hiring a designer or burning your weekends.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {audiences.map(({ name, body, photo, alt, hoverShadow }, index) => (
            <Reveal key={name} delay={index * 150}>
              <div 
                className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 ${hoverShadow}`}
              >
                {/* Image Container */}
                <div className="relative mb-8 aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-[#f1ece3]">
                  <img
                    src={photo}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-1 flex-col">
                  <h3 className="text-xl font-bold tracking-tight text-[#1c1a17] transition-colors group-hover:text-[#e24b2c]">
                    {name}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#5c574e]">
                    {body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export { WhoItsFor }
