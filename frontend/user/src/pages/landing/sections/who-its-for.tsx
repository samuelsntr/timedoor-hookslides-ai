import creatorPhoto from "@/assets/landing/audience-creator.jpg"
import founderPhoto from "@/assets/landing/audience-founder.jpg"
import marketerPhoto from "@/assets/landing/audience-marketer.jpg"

import { Reveal } from "../reveal"

const audiences = [
  {
    name: "Content Creators",
    body: "Stay consistent without designing every post from scratch.",
    photo: creatorPhoto,
    alt: "A content creator holding a camera in a warm-lit room",
  },
  {
    name: "Founders & Entrepreneurs",
    body: "Turn what you know into something worth sharing.",
    photo: founderPhoto,
    alt: "A founder sitting indoors with a relaxed, confident expression",
  },
  {
    name: "Marketers & Social Media Managers",
    body: "Produce more without repeating the same manual work every time.",
    photo: marketerPhoto,
    alt: "A social media manager smiling while looking at her phone",
  },
]

function WhoItsFor() {
  return (
    <section className="border-y border-[#e4ddd0] bg-[#f1ece3]">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-semibold leading-[1.1] text-[#1c1a17] sm:text-4xl lg:text-5xl">
            Built for people who make things.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {audiences.map(({ name, body, photo, alt }, index) => (
            <Reveal key={name} delay={index * 80}>
              <img
                src={photo}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full rounded-2xl object-cover"
              />
              <h3 className="mt-5 text-xl font-semibold text-[#1c1a17]">{name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#5c574e]">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export { WhoItsFor }
