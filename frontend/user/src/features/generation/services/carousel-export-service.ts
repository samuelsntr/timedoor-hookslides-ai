import type { Slide, Template } from "../types"

const SLIDE_WIDTH = 1080
const SLIDE_HEIGHT = 1350

/**
 * Exports the current carousel preview DOM to a ZIP of 1080x1350 PNGs.
 * ZIP download happens only after all six PNGs are generated.
 */
export async function exportCarousel(carousel: { slides: Slide[] }, template: Template) {
  /**
   * Make sure web fonts are completely loaded
   * before cloning the preview DOM.
   */
  if (document.fonts?.ready) {
    await document.fonts.ready
  }

  /**
   * Only select actual preview/export slides.
   *
   * Template thumbnails are inside buttons and are
   * explicitly excluded.
   */
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>(
      "[data-carousel-slide]",
    ),
  ).filter((node) => !node.closest("button"))

  if (nodes.length !== 6) {
    throw new Error(`Expected 6 slides, found ${nodes.length}.`)
  }

  const files: { name: string; data: Uint8Array }[] = []

  /**
   * Export each slide independently.
   *
   * Nothing is added to the ZIP until the PNG
   * has been successfully generated.
   */
  for (let i = 0; i < 6; i += 1) {
    const node = nodes[i]

    let svg: string

    try {
      svg = await renderPreviewSvg(node)
    } catch {
      svg = renderSlideSvg(carousel.slides[i], i, template)
    }

    if (!svg) {
      throw new Error(`Unable to render slide ${i + 1}.`)
    }

    const image = await loadImage(dataUrlFromSvg(svg))

    /**
     * FINAL EXPORT DIMENSION
     *
     * Always exactly:
     *
     * 1080 x 1350
     */
    const canvas = document.createElement("canvas")
    canvas.width = SLIDE_WIDTH
    canvas.height = SLIDE_HEIGHT

    const context = canvas.getContext("2d", { alpha: true })

    if (!context) {
      throw new Error(`Unable to create canvas for slide ${i + 1}.`)
    }

    context.clearRect(0, 0, SLIDE_WIDTH, SLIDE_HEIGHT)

    context.drawImage(image, 0, 0, SLIDE_WIDTH, SLIDE_HEIGHT)

    /**
     * Validate actual canvas dimensions
     * before generating PNG.
     */
    if (canvas.width !== SLIDE_WIDTH || canvas.height !== SLIDE_HEIGHT) {
      throw new Error(`Invalid canvas dimensions for slide ${i + 1}.`)
    }

    const png = await canvasToPng(canvas)

    const pngData = await blobToUint8Array(png)

    if (!pngData.length) {
      throw new Error(`Empty PNG for slide ${i + 1}.`)
    }

    files.push({
      name: `carousel-${String(i + 1).padStart(2, "0")}.png`,
      data: pngData,
    })
  }

  /**
   * Never create/download a partial ZIP.
   *
   * The ZIP is created only after all 6
   * PNG files have been generated successfully.
   */
  if (files.length !== 6) {
    throw new Error("Export did not produce all 6 slides.")
  }

  const output = makeZip(files)

  if (!output.size) {
    throw new Error("Generated ZIP is empty.")
  }

  const downloadUrl = URL.createObjectURL(output)

  try {
    const link = document.createElement("a")

    link.href = downloadUrl
    link.download = "carousel-export.zip"

    document.body.appendChild(link)
    link.click()
    link.remove()
  } finally {
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000)
  }
}

function crc32(bytes: Uint8Array) {
  let crc = 0xffffffff

  for (const byte of bytes) {
    crc ^= byte

    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
    }
  }

  return (crc ^ 0xffffffff) >>> 0
}

function makeZip(files: { name: string; data: Uint8Array }[]) {
  const encoder = new TextEncoder()
  const local: Uint8Array[] = []
  const central: Uint8Array[] = []
  let offset = 0

  const write16 = (
    view: DataView,
    position: number,
    value: number,
  ) => {
    view.setUint16(position, value, true)
  }

  const write32 = (
    view: DataView,
    position: number,
    value: number,
  ) => {
    view.setUint32(position, value, true)
  }

  for (const file of files) {
    const name = encoder.encode(file.name)

    const header = new Uint8Array(30 + name.length)
    const view = new DataView(header.buffer)

    write32(view, 0, 0x04034b50)
    write16(view, 4, 20)
    write16(view, 8, 0)
    write16(view, 10, 0)
    write32(view, 14, crc32(file.data))
    write32(view, 18, file.data.length)
    write32(view, 22, file.data.length)
    write16(view, 26, name.length)
    write16(view, 28, 0)

    header.set(name, 30)

    local.push(header, file.data)

    const entry = new Uint8Array(46 + name.length)
    const entryView = new DataView(entry.buffer)

    write32(entryView, 0, 0x02014b50)
    write16(entryView, 4, 20)
    write16(entryView, 6, 20)
    write16(entryView, 8, 0)
    write16(entryView, 10, 0)
    write32(entryView, 16, crc32(file.data))
    write32(entryView, 20, file.data.length)
    write32(entryView, 24, file.data.length)
    write16(entryView, 28, name.length)
    write32(entryView, 42, offset)

    entry.set(name, 46)

    central.push(entry)

    offset += header.length + file.data.length
  }

  const centralSize = central.reduce(
    (size, entry) => size + entry.length,
    0,
  )

  const end = new Uint8Array(22)
  const endView = new DataView(end.buffer)

  write32(endView, 0, 0x06054b50)
  write16(endView, 8, files.length)
  write16(endView, 10, files.length)
  write32(endView, 12, centralSize)
  write32(endView, 16, offset)

  const zipParts = [...local, ...central, end].map(
    (part) =>
      part.buffer.slice(
        part.byteOffset,
        part.byteOffset + part.byteLength,
      ) as ArrayBuffer,
  )

  return new Blob(zipParts, {
    type: "application/zip",
  })
}

function escapeSvg(text: string) {
  return text.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[character] ?? character,
  )
}

function wrapSvg(text: string, maxChars: number) {
  const words = text.trim().split(/\s+/)
  const lines: string[] = []
  let line = ""

  for (const word of words) {
    if (
      (line + " " + word).trim().length > maxChars &&
      line
    ) {
      lines.push(line)
      line = word
    } else {
      line = (line + " " + word).trim()
    }
  }

  if (line) {
    lines.push(line)
  }

  return lines
}

/**
 * Fallback SVG renderer.
 *
 * The primary export path uses the rendered preview DOM.
 * This fallback exists only in case DOM -> SVG serialization fails.
 *
 * Export size is always 1080x1350.
 */
function renderSlideSvg(
  slide: Slide,
  index: number,
  template: Template,
) {
  const palette =
    template === "bold-accent"
      ? {
        background:
          index === 0 || index === 5
            ? "#EFDCCE"
            : "#F3E7DC",
        text: "#2B211D",
        secondary: "#76645A",
        accent: "#B96852",
      }
      : template === "minimalist"
        ? {
          background:
            index === 5 ? "#F2E9DE" : "#F7F2EA",
          text: "#38332F",
          secondary: "#81766D",
          accent: "#B99A91",
        }
        : {
          background:
            index === 5 ? "#E5D9C9" : "#EDE3D5",
          text: "#30342D",
          secondary: "#766C62",
          accent: "#7D927E",
        }

  const titleLines = wrapSvg(
    slide.title,
    template === "bold-accent" ? 22 : 28,
  )

  const descriptionLines = wrapSvg(
    slide.description,
    template === "bold-accent" ? 42 : 48,
  )

  const center =
    (template === "minimalist" && index === 4) ||
    (template === "bold-accent" && index === 4) ||
    (template === "data-focused" && index === 0)

  const titleX = center
    ? 540
    : template === "bold-accent" && index === 1
      ? 950
      : template === "minimalist" && index === 3
        ? 950
        : 86

  const anchor = center
    ? "middle"
    : (template === "bold-accent" && index === 1) ||
      (template === "minimalist" && index === 3)
      ? "end"
      : "start"

  const titleY =
    index === 0 ? 400 : index === 5 ? 480 : 450

  const title = titleLines
    .map(
      (line, lineIndex) =>
        `<text x="${titleX}" y="${titleY + lineIndex * 68}" text-anchor="${anchor}" font-family="Arial,sans-serif" font-size="64" font-weight="700" fill="${palette.text}">${escapeSvg(
          line,
        )}</text>`,
    )
    .join("")

  const description = descriptionLines
    .map(
      (line, lineIndex) =>
        `<text x="${titleX}" y="${titleY +
        titleLines.length * 68 +
        72 +
        lineIndex * 48
        }" text-anchor="${anchor}" font-family="Arial,sans-serif" font-size="32" fill="${palette.secondary}">${escapeSvg(
          line,
        )}</text>`,
    )
    .join("")

  const dots = Array.from(
    { length: 6 },
    (_, dot) =>
      `<circle cx="${850 + dot * 28}" cy="1270" r="6" fill="${dot === index
        ? palette.accent
        : palette.secondary
      }" opacity="${dot === index ? 1 : 0.3}"/>`,
  ).join("")

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SLIDE_WIDTH}" height="${SLIDE_HEIGHT}" viewBox="0 0 ${SLIDE_WIDTH} ${SLIDE_HEIGHT}">
    <rect width="${SLIDE_WIDTH}" height="${SLIDE_HEIGHT}" fill="${palette.background}"/>
    ${title}
    ${description}
    <rect
      x="86"
      y="${titleY + titleLines.length * 68 + 32}"
      width="80"
      height="8"
      fill="${palette.accent}"
    />
    <text
      x="86"
      y="1273"
      font-family="Arial,sans-serif"
      font-size="24"
      fill="${palette.secondary}"
    >${String(index + 1).padStart(2, "0")}</text>
    ${dots}
  </svg>`
}

/**
 * Fetches the Google Fonts CSS for the export fonts, then rewrites every
 * woff2 URL into a base64 data URI. The returned CSS is fully self-contained
 * so it resolves inside an <img>-loaded SVG, where external requests fail.
 */
let exportFontsPromise: Promise<string> | undefined

function inlineExportFonts(): Promise<string> {
  if (exportFontsPromise) {
    return exportFontsPromise
  }

  exportFontsPromise = (async () => {
    const cssUrl =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Inter:wght@400..700&display=swap"
    const cssResponse = await fetch(cssUrl)

    if (!cssResponse.ok) {
      throw new Error("Unable to load export fonts.")
    }

    const css = await cssResponse.text()
    const urls = Array.from(
      css.matchAll(/url\((https:\/\/[^)]+)\)/g),
    )

    const inlined = await Promise.all(
      urls.map(async ([, url]) => {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error("Unable to load export font file.")
        }

        const bytes = new Uint8Array(
          await response.arrayBuffer(),
        )
        let binary = ""

        for (const byte of bytes) {
          binary += String.fromCharCode(byte)
        }

        return {
          url,
          dataUri: `data:font/woff2;base64,${btoa(binary)}`,
        }
      }),
    )

    return inlined.reduce(
      (result, { url, dataUri }) =>
        result.replaceAll(url, dataUri),
      css,
    )
  })()

  return exportFontsPromise
}

/**
 * Serializes the actual rendered preview DOM.
 *
 * IMPORTANT:
 * - The source DOM is already a fixed 1080x1350 canvas.
 * - Preview scaling happens only on the parent transform.
 * - The export clone removes that visual transform.
 * - Computed styles are copied into the clone so Tailwind/CSS
 *   styles are preserved inside the SVG foreignObject.
 */
async function renderPreviewSvg(node: HTMLElement) {
  const clone = node.cloneNode(true) as HTMLElement
  const fontCss = await inlineExportFonts()

  const copyStyles = (
    source: Element,
    target: Element,
  ) => {
    const computed = getComputedStyle(source)

    const container = source.closest<HTMLElement>(".slide-card")
    const containerWidth = container?.offsetWidth ?? SLIDE_WIDTH
    const containerHeight = container?.offsetHeight ?? SLIDE_HEIGHT

    for (
      let index = 0;
      index < computed.length;
      index += 1
    ) {
      const property = computed.item(index)

      if (property) {
        const value = computed
          .getPropertyValue(property)
          .replaceAll("cqw", `${containerWidth / 100}px`)
          .replaceAll("cqh", `${containerHeight / 100}px`)

        ; (target as HTMLElement).style.setProperty(
          property,
          value,
        )
      }
    }

    const textNode =
      source.childNodes.length === 1 &&
        source.firstChild?.nodeType === Node.TEXT_NODE
        ? source.firstChild
        : null

    if (textNode && target instanceof HTMLElement) {
      const text = textNode.textContent ?? ""
      const lines: string[] = []
      let line = ""
      let previousTop: number | undefined
      const range = document.createRange()

      for (let index = 0; index < text.length; index += 1) {
        range.setStart(textNode, index)
        range.setEnd(textNode, index + 1)
        const top = range.getBoundingClientRect().top

        if (previousTop !== undefined && top > previousTop + 1) {
          lines.push(line)
          line = ""
        }

        line += text[index]
        previousTop = top
      }

      if (line) {
        lines.push(line)
      }

      if (lines.length > 1) {
        target.textContent = lines.join("\n")
        target.style.whiteSpace = "pre-line"
      }
    }

    Array.from(source.children).forEach(
      (child, childIndex) => {
        const targetChild =
          target.children[childIndex]

        if (targetChild) {
          copyStyles(child, targetChild)
        }
      },
    )

  }

  copyStyles(node, clone)
  await inlineImages(clone)

  /**
   * The exported design canvas is ALWAYS 1080x1350.
   *
   * The preview's CSS transform is intentionally removed.
   * This ensures cqw/cqh and absolute positioning inside
   * SlideRenderer resolve against the real design canvas.
   */
  clone.style.cssText += `
    ;display:block;
    position:relative;
    left:0;
    top:0;
    margin:0;
    padding:0;
    width:${SLIDE_WIDTH}px;
    height:${SLIDE_HEIGHT}px;
    max-width:none;
    max-height:none;
    min-width:${SLIDE_WIDTH}px;
    min-height:${SLIDE_HEIGHT}px;
    container-type:size;
    transform:none;
    transform-origin:top left;
    border-radius:0;
    overflow:hidden;
  `

  const markup =
    new XMLSerializer().serializeToString(clone)

  return `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="${SLIDE_WIDTH}"
    height="${SLIDE_HEIGHT}"
    viewBox="0 0 ${SLIDE_WIDTH} ${SLIDE_HEIGHT}"
  >
    <defs>
      <style type="text/css"><![CDATA[
        ${fontCss}
      ]]></style>
      <clipPath id="slide">
        <rect
          x="0"
          y="0"
          width="${SLIDE_WIDTH}"
          height="${SLIDE_HEIGHT}"
        />
      </clipPath>
    </defs>

    <foreignObject
      x="0"
      y="0"
      width="${SLIDE_WIDTH}"
      height="${SLIDE_HEIGHT}"
      clip-path="url(#slide)"
    >
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style="
          display:block;
          position:relative;
          width:${SLIDE_WIDTH}px;
          height:${SLIDE_HEIGHT}px;
          margin:0;
          padding:0;
          overflow:hidden;
        "
      >
        <style>${fontCss}</style>
        ${markup}
      </div>
    </foreignObject>
  </svg>`
}

async function inlineImages(root: HTMLElement) {
  const images = Array.from(root.querySelectorAll<HTMLImageElement>("img"))

  await Promise.all(images.map(async (image) => {
    if (!image.src || image.src.startsWith("data:")) return

    const response = await fetch(image.src)
    if (!response.ok) throw new Error("Unable to load export image.")

    const blob = await response.blob()
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = () => reject(new Error("Unable to encode export image."))
      reader.readAsDataURL(blob)
    })

    image.setAttribute("src", dataUrl)
  }))
}

function dataUrlFromSvg(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    svg,
  )}`
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>(
    (resolve, reject) => {
      const image = new Image()

      image.onload = () => resolve(image)

      image.onerror = () =>
        reject(
          new Error("Unable to load exported SVG."),
        )

      image.src = src
    },
  )
}

function blobToUint8Array(blob: Blob) {
  return blob
    .arrayBuffer()
    .then(
      (buffer) =>
        new Uint8Array(buffer),
    )
}

function canvasToPng(canvas: HTMLCanvasElement) {
  return new Promise<Blob>(
    (resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(
              new Error(
                "Unable to create PNG.",
              ),
            )
            return
          }

          resolve(blob)
        },
        "image/png",
        1,
      )
    },
  )
}
