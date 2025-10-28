// 

// components/OptimizedImage.jsx
import Image from "next/image";
import contentfulLoader from "../utils/contentfulLoader";

// components/OptimizedImage.jsx
export default function OptimizedImage({
  src,
  alt,
  quality = 75, // 🔥 Reduza para 75 (balance entre qualidade e tamanho)
  priority = false,
  className,
  containerClassName,
  sizes = "100vw",
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
        blurDataURL={`${src.split('?')[0]}?w=50&q=30&fm=webp`}
        loader={contentfulLoader}
        onLoad={onLoad}
      />
    </div>
  );
}