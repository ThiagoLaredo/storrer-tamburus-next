

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
// utils/contentfulLoader.js
export default function contentfulLoader({ src, width, quality = 60 }) { // 🔥 Padrão 60%
  const baseUrl = src.split('?')[0];
  
  const url = new URL(baseUrl);
  
  // 🔥 ESTRATÉGIA INTELIGENTE POR RESOLUÇÃO
  let optimizedQuality = quality;
  let optimizedWidth = width;
  
  if (width <= 640) { // Mobile pequeno
    optimizedQuality = 50; // 🔥 50% para mobile
  } else if (width <= 1024) { // Tablet
    optimizedQuality = 60; // 🔥 60% para tablet
  } else { // Desktop
    optimizedQuality = 70; // 🔥 70% para desktop
  }
  
  // 🔥 FORMATO INTELIGENTE - AVIF para desktop, WebP para mobile
  const useAvif = width > 1024; // AVIF apenas para desktop
  
  url.searchParams.set('w', optimizedWidth.toString());
  url.searchParams.set('q', optimizedQuality.toString());
  url.searchParams.set('fm', useAvif ? 'avif' : 'webp'); // 🔥 Formato adequado
  url.searchParams.set('fit', 'fill');
  
  console.log(`🎯 ${useAvif ? 'Desktop' : 'Mobile'}: ${optimizedWidth}px, qual: ${optimizedQuality}%, formato: ${useAvif ? 'avif' : 'webp'}`);
  
  return url.toString();
}