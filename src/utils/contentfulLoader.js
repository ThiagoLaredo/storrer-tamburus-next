// 



// utils/contentfulLoader.js
export default function contentfulLoader({ src, width, quality = 60, format }) {
  const baseUrl = src.split('?')[0];
  const url = new URL(baseUrl);

  // Estratégia básica - sem detecção de browser (feita no client)
  let optimizedQuality = quality;
  let optimizedWidth = width;

  if (width <= 360) {
    optimizedQuality = 30;
    optimizedWidth = 360;
  } else if (width <= 480) {
    optimizedQuality = 35;
    optimizedWidth = 480;
  } else if (width <= 768) {
    optimizedQuality = 45;
    optimizedWidth = 640;
  } else if (width <= 1200) {
    optimizedQuality = 65;
  } else {
    optimizedQuality = 75;
  }

  // Usa o formato especificado ou padrão WebP
  const imageFormat = format || 'webp';

  url.searchParams.set('w', optimizedWidth.toString());
  url.searchParams.set('q', optimizedQuality.toString());
  url.searchParams.set('fm', imageFormat);
  url.searchParams.set('fit', 'fill');

  return url.toString();
}