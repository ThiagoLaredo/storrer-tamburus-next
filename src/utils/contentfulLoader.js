// utils/contentfulLoader.js
export default function contentfulLoader({ src, width, quality = 40 }) { // 🔥 Padrão 40%
  const baseUrl = src.split('?')[0];
  
  const url = new URL(baseUrl);
  
  // 🔥 ESTRATÉGIA SUPER AGRESSIVA PARA MOBILE
  let optimizedQuality = quality;
  let optimizedWidth = width;
  
  if (width <= 480) { // Mobile pequeno
    optimizedQuality = 35; // 🔥 35% para mobile pequeno
    optimizedWidth = Math.min(width, 480); // 🔥 Máximo 480px
  } else if (width <= 768) { // Tablet
    optimizedQuality = 40; // 🔥 40% para tablet  
    optimizedWidth = Math.min(width, 640); // 🔥 Máximo 640px
  } else { // Desktop
    optimizedQuality = 55; // 55% para desktop (reduzido também)
  }
  
  url.searchParams.set('w', optimizedWidth.toString());
  url.searchParams.set('q', optimizedQuality.toString());
  url.searchParams.set('fm', 'webp');
  url.searchParams.set('fit', 'fill');
  
  return url.toString();
}