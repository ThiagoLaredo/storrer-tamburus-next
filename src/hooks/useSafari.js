// hooks/useSafari.js
import { useState, useEffect } from 'react';

export function useSafari() {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    console.log('🔍 UserAgent:', navigator.userAgent);
    console.log('🦁 É Safari?', isSafari);
    setIsSafari(isSafari);
  }, []);

  return isSafari;
}