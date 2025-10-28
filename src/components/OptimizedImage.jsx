// 

// components/OptimizedImage.jsx
import Image from "next/image";
import contentfulLoader from "../utils/contentfulLoader";

// components/OptimizedImage.jsx
// export default function OptimizedImage({
//   src,
//   alt,
//   quality = 65, // 🔥 Reduza para 65 (balance entre qualidade e tamanho)
//   priority = false,
//   className,
//   containerClassName,
//   sizes = "100vw",
//   onLoad,
// }) {
//   if (!src) return null;

//   return (
//     <div className={containerClassName}>
//       <Image
//         src={src}
//         alt={alt}
//         fill
//         priority={priority}
//         className={className}
//         quality={quality}
//         sizes={sizes}
//         placeholder="blur"
//         blurDataURL={`${src.split('?')[0]}?w=50&q=30&fm=webp`}
//         loader={contentfulLoader}
//         onLoad={onLoad}
//       />
//     </div>
//   );
// }

// components/OptimizedImage.jsx
export default function OptimizedImage({
  src,
  alt,
  quality = 60, // 🔥 Padrão 60% (balanceado)
  priority = false,
  className,
  containerClassName,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw", // 🔥 Breakpoints lógicos
  onLoad,
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
        blurDataURL={`${src.split('?')[0]}?w=30&q=10&fm=webp`}
        loader={contentfulLoader}
        onLoad={onLoad}
      />
    </div>
  );
}