// utils/contentfulLoader.js
export default function contentfulLoader({ src, width, quality = 60 }) {
  const baseUrl = src.split('?')[0];
  const url = new URL(baseUrl);

  // Estratégia por dispositivo
  let optimizedQuality = quality;
  let optimizedWidth = width;

  if (width <= 360) {
    optimizedQuality = 30; // 🔥 Reduzido para 30% em mobile muito pequeno
    optimizedWidth = 360;
  } else if (width <= 480) {
    optimizedQuality = 35; // 🔥 35% para mobile
    optimizedWidth = 480;
  } else if (width <= 768) {
    optimizedQuality = 45; // 🔥 45% para tablet
    optimizedWidth = 640;
  } else if (width <= 1200) {
    optimizedQuality = 65; // 🔥 65% para desktop normal
  } else {
    optimizedQuality = 75; // 🔥 75% para desktop grande (reduzido de 80)
  }

  // Formato inteligente: AVIF para desktop, WebP para mobile
  const useAvif = width > 1024;

  url.searchParams.set('w', optimizedWidth.toString());
  url.searchParams.set('q', optimizedQuality.toString());
  url.searchParams.set('fm', useAvif ? 'avif' : 'webp');
  url.searchParams.set('fit', 'fill');

  return url.toString();
}