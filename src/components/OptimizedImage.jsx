// // components/OptimizedImage.jsx - VERSÃO COM FILL
// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';

// export default function OptimizedImage({ 
//   src, 
//   alt, 
//   quality = 80,
//   priority = false,
//   className = '',
//   containerClassName = '',
//   onLoad
// }) {
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const handleImageLoad = () => {
//     setImageLoaded(true);
//     if (onLoad) {
//       onLoad();
//     }
//   };

//   const getOptimizedUrl = (imageUrl, q) => {
//     if (!imageUrl) return '';
    
//     try {
//       const url = new URL(imageUrl);
//       url.searchParams.set('q', q.toString());
//       url.searchParams.set('fit', 'fill');
//       return url.toString();
//     } catch {
//       return imageUrl;
//     }
//   };

//   if (!src) {
//     return (
//       <div className={`image-fallback ${className}`}>
//         <span>Imagem não disponível</span>
//       </div>
//     );
//   }

//   return (
//     <div className={`${containerClassName} ${imageLoaded ? 'loaded' : 'loading'}`}>
//       <Image
//         src={getOptimizedUrl(src, quality)}
//         alt={alt}
//         fill // 🔥 USA FILL EM VEZ DE WIDTH/HEIGHT
//         quality={quality}
//         placeholder="blur"
//         blurDataURL={getOptimizedUrl(src, 10)}
//         sizes="100vw"
//         priority={priority}
//         className={className}
//         onLoad={handleImageLoad}
//       />
//     </div>
//   );
// }

// components/OptimizedImage.jsx
import Image from "next/image";

export default function OptimizedImage({
  src,
  alt,
  quality = 75,
  priority = false,
  className,
  containerClassName,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1400px",
}) {
  if (!src) return null;

  return (
    <div className={containerClassName}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={className}
        quality={quality}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={`${src}?w=10&h=10&fit=thumb`}
      />
    </div>
  );
}
