'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import styles from './SlideHome.module.css';

export default function SlideHome({ projetosDestaque }) {
  const slidesRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!projetosDestaque || projetosDestaque.length === 0) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % projetosDestaque.length;

      gsap.to(slidesRef.current[currentIndex], {
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });
      gsap.to(slidesRef.current[nextIndex], {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      });

      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, projetosDestaque]);

  return (
    <section className={styles.slider}>
      {projetosDestaque?.map((projeto, index) => (
        <div
          key={projeto.sys?.id || index}
          ref={(el) => {
            if (el && !slidesRef.current.includes(el)) slidesRef.current.push(el);
          }}
          className={styles.slide}
          style={{ opacity: index === 0 ? 1 : 0 }}
        >
          {projeto.capa ? (
            <Image
              src={projeto.capa}
              alt={projeto.title || "Projeto sem título"}
              fill
              className={styles.slideImage}
              priority={index === 0}
              sizes="100vw"
            />
          ) : (
            <div className={styles.slideFallback}>Sem imagem</div>
          )}
        </div>
      ))}

      <div className={styles.sliderOverlay} />
    </section>
  );
}
