

// // utils/contentfulLoader.js
// export default function contentfulLoader({ src, width, quality }) {
//   let absoluteSrc = src;

//   // Check if the src is a valid absolute URL first
//   if (!URL.canParse(src)) {
//     // If not, construct an absolute URL using the Contentful host.
//     // This is safer than simply adding "https:" as it validates the domain.
//     absoluteSrc = `https:${src}`;
    
//     // Optional: Add a second check to ensure the constructed URL is valid.
//     if (!URL.canParse(absoluteSrc)) {
//       // If it's still invalid, it's better to fail early.
//       console.error(`Invalid image src: ${src}`);
//       return src; // Or a placeholder image URL
//     }
//   }

//   const url = new URL(absoluteSrc);
//   url.search = '';
//   url.searchParams.set('w', width.toString());
//   url.searchParams.set('q', (quality || 75).toString());
//   url.searchParams.set('fm', 'webp');
//   url.searchParams.set('fit', 'scale');

//   return url.toString();
// }

// utils/contentfulLoader.js
// utils/contentfulLoader.js
export default function contentfulLoader({ src, width, quality = 50 }) { // 🔥 Padrão 50%
  const baseUrl = src.split('?')[0];
  
  const url = new URL(baseUrl);
  
  // 🔥 QUALIDADE DINÂMICA BASEADA NA LARGURA
  let optimizedQuality = quality;
  if (width <= 480) { // Mobile pequeno
    optimizedQuality = 45; // 🔥 45% para mobile pequeno
  } else if (width <= 768) { // Tablet
    optimizedQuality = 55; // 🔥 55% para tablet
  }
  // Para desktop (> 768px) usa o quality padrão (50) ou o passado como prop
  
  // 🔥 LIMITE MÁXIMO PARA MOBILE - não precisa de imagens muito grandes
  const optimizedWidth = width <= 768 ? Math.min(width, 640) : width;
  
  url.searchParams.set('w', optimizedWidth.toString());
  url.searchParams.set('q', optimizedQuality.toString());
  url.searchParams.set('fm', 'webp'); // 🔥 Volta para WebP (mais compatível)
  url.searchParams.set('fit', 'fill');
  
  console.log(`📱 Mobile Otimizado: ${optimizedWidth}px, qual: ${optimizedQuality}%`);
  
  return url.toString();
}