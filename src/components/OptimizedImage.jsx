


// components/OptimizedImage.jsx
import Image from "next/image";
import contentfulLoader from "../utils/contentfulLoader";

export default function OptimizedImage({
  src,
  alt,
  quality = 70, // 🔥 Reduzido de 75 para 70
  priority = false,
  className,
  containerClassName,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 75vw", // 🔥 Mais realista
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
        blurDataURL={`${src}?w=30&q=10&fm=webp`} // 🔥 Placeholder menor
        loader={contentfulLoader} // 🔥 ADICIONE ISSO
      />
    </div>
  );
}