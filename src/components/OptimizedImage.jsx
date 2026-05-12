

// components/OptimizedImage.jsx
import Image from "next/image";
import contentfulLoader from "../utils/contentfulLoader";
import { useEffect, useState, useRef } from 'react';

export default function OptimizedImage({
  src,
  alt,
  quality = 60,
  priority = false,
  className,
  containerClassName,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw",
  onLoad,
  onError
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const imgRef = useRef(null);
  const isSafariRef = useRef(false);

  useEffect(() => {
    isSafariRef.current = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    console.log('🦁 Safari detectado no cliente:', isSafariRef.current);
  }, []);

  useEffect(() => {
    if (isSafariRef.current && src) {
      const safariOptimizedSrc = contentfulLoader({ 
        src: src, 
        width: 1200, 
        quality: 70,
        format: 'webp'
      });
      setCurrentSrc(safariOptimizedSrc);
    }
  }, [src]);

  const handleError = (e) => {
    console.warn(`❌ Erro carregando imagem no Safari: ${alt}`);
    
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
      console.log(`🔄 Tentativa ${retryCount + 1} para ${alt}`);
      
      setTimeout(() => {
        const newSrc = src + (src.includes('?') ? '&' : '?') + `safari_fix=${Date.now()}`;
        setCurrentSrc(newSrc);
      }, 300 * retryCount);
    } else {
      console.error(`💥 Falha final: ${alt}`);
      setHasError(true);
      onError?.(e);
    }
  };

  useEffect(() => {
    if (isSafariRef.current && imgRef.current) {
      const timer = setTimeout(() => {
        const img = imgRef.current;
        if (img && img.src && !img.complete) {
          console.log('🔄 Forçando recarregamento no Safari...');
          const originalSrc = img.src;
          img.src = '';
          setTimeout(() => {
            img.src = originalSrc;
          }, 200);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  if (!src) return null;

  // 🔥 CORREÇÃO: Não passar `loading` quando `priority` é true
  const imageProps = {
    src: currentSrc,
    alt: alt,
    fill: true,
    priority: isSafariRef.current ? true : priority, // No Safari, forçamos priority para true?
    className: className,
    quality: quality,
    sizes: sizes,
    placeholder: "blur",
    blurDataURL: `${src.split('?')[0]}?w=30&q=10&fm=webp`,
    loader: contentfulLoader,
    onLoad: onLoad,
    onError: handleError,
    unoptimized: false,
  };

  // 🔥 Só adiciona a prop `loading` se não for priority
  // Mas note: no Safari, estamos forçando priority=true, então não devemos adicionar loading.
  if (!imageProps.priority) {
    // Se não é priority, então podemos definir loading como 'lazy' ou 'eager'
    // No Safari, queremos eager para as primeiras? Mas note que no Safari já estamos forçando priority, então não entra aqui.
    imageProps.loading = isSafariRef.current ? 'eager' : 'lazy';
  }

  return (
    <div className={containerClassName}>
      <Image {...imageProps} />
    </div>
  );
}