// export default function contentfulLoader({ src, width, quality }) {
//   if (!src) return '';

//   const params = new URLSearchParams({
//     w: width?.toString() || '800',
//     q: quality?.toString() || '75',
//     fm: 'webp',
//   });

//   return `${src}?${params.toString()}`;
// }

// utils/contentfulLoader.js
export default function contentfulLoader({ src, width, quality }) {
  let absoluteSrc = src;

  // Check if the src is a valid absolute URL first
  if (!URL.canParse(src)) {
    // If not, construct an absolute URL using the Contentful host.
    // This is safer than simply adding "https:" as it validates the domain.
    absoluteSrc = `https:${src}`;
    
    // Optional: Add a second check to ensure the constructed URL is valid.
    if (!URL.canParse(absoluteSrc)) {
      // If it's still invalid, it's better to fail early.
      console.error(`Invalid image src: ${src}`);
      return src; // Or a placeholder image URL
    }
  }

  const url = new URL(absoluteSrc);
  url.search = '';
  url.searchParams.set('w', width.toString());
  url.searchParams.set('q', (quality || 75).toString());
  url.searchParams.set('fm', 'webp');
  url.searchParams.set('fit', 'scale');

  return url.toString();
}