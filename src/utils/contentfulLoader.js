

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

// utils/contentfulLoader.js - VERSÃO AVIF
export default function contentfulLoader({ src, width, quality = 55 }) {
  const baseUrl = src.split('?')[0];
  
  const url = new URL(baseUrl);
  url.searchParams.set('w', width.toString());
  url.searchParams.set('q', quality.toString());
  
  // 🔥 Tente AVIF primeiro, fallback para WebP
  const supportsAvif = typeof window !== 'undefined' 
    ? window.chrome && window.chrome.runtime 
    : true; // Assume suporte no server
  
  if (supportsAvif) {
    url.searchParams.set('fm', 'avif');
  } else {
    url.searchParams.set('fm', 'webp');
  }
  
  url.searchParams.set('fit', 'fill');
  
  return url.toString();
}