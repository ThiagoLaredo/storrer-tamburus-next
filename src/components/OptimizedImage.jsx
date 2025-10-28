// 

// components/OptimizedImage.jsx
import Image from "next/image";
import contentfulLoader from "../utils/contentfulLoader";

export default function OptimizedImage({
  src,
  alt,
  quality = 90, // Aumente a qualidade padrão
  priority = false,
  className,
  containerClassName,
  sizes = "100vw", // Para fullscreen
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