import { useEffect, useRef, useState } from "react"

/** Adds `is-visible` once the element scrolls into view. Fires once, then disconnects. */
function useInView<T extends HTMLElement = HTMLDivElement>(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setInView(true)
        observer.disconnect()
      },
      { rootMargin, threshold: 0.05 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, inView }
}

export { useInView }
