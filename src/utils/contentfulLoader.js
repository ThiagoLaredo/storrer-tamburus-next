// utils/contentfulLoader.js
export default function contentfulLoader({ src, width, quality = 50 }) {
  const baseUrl = src.split('?')[0];
  
  const url = new URL(baseUrl);
  
  // 🔥 ESTRATÉGIA AGRESSIVA PARA MOBILE
  let optimizedQuality = quality;
  
  if (width <= 480) {
    optimizedQuality = 40; // 🔥 40% para mobile pequeno
  } else if (width <= 768) {
    optimizedQuality = 45; // 🔥 45% para tablet
  } else {
    optimizedQuality = 60; // 60% para desktop
  }
  
  url.searchParams.set('w', width.toString());
  url.searchParams.set('q', optimizedQuality.toString());
  url.searchParams.set('fm', 'webp');
  url.searchParams.set('fit', 'fill');
  
  return url.toString();
}