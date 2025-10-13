// // src/utils/contentfulLoader.js
// export const contentfulLoader = ({ src, width, quality }) => {
//   // Garante que só aplica o loader para imagens do Contentful
//   if (src.startsWith("https://images.ctfassets.net")) {
//     const params = [`w=${width}`, `q=${quality || 75}`, `fm=webp`];
//     return `${src}?${params.join("&")}`;
//   }

//   // Caso contrário (ícones locais, etc), retorna o src original
//   return src;
// };

export default function contentfulLoader({ src, width, quality }) {
  if (!src) return '';

  const params = new URLSearchParams({
    w: width?.toString() || '800',
    q: quality?.toString() || '75',
    fm: 'webp',
  });

  return `${src}?${params.toString()}`;
}
