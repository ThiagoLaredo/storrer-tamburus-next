// hooks/useImageLoader.js
import { useState, useEffect } from 'react';

export const useImageLoader = (src) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) {
      setError(true);
      return;
    }

    const img = new Image();
    img.src = src;

    const handleLoad = () => {
      setLoaded(true);
      setError(false);
    };

    const handleError = () => {
      setError(true);
      setLoaded(false);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src]);

  return { loaded, error };
};