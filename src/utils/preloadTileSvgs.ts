import { miscTileSvgs, rawTileSvgLookup } from "../assets/tiles";

export function preloadTileSvgs(options?: {
  batchSize?: number;
  delayMs?: number;
}) {
  const { batchSize = 10, delayMs = 50 } = options ?? {};

  Object.values(miscTileSvgs).forEach((url) => {
    const img = new Image();
    img.src = url;
  });

  // Preload face-up tiles in small batches
  const urls = Object.values(rawTileSvgLookup);
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);

    setTimeout(() => {
      batch.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    }, (i / batchSize) * delayMs);
  }
}
