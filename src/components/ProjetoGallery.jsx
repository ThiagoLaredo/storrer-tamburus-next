'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import OptimizedImage from './OptimizedImage';
import SwiperGallery from './SwiperGallery';
import styles from '../styles/Projeto.module.css';

export default function ProjetoGallery({ imagens, titulo }) {
  const [animationExecuted, setAnimationExecuted] = useState(false);
  const isFirstMount = useRef(true);

  // 🎬 Entrada inicial sincronizada
  useEffect(() => {
    if (isFirstMount.current && imagens.length > 0) {
      const fadeDelay = 0.8;
      const imagensElements = document.querySelectorAll(`.${styles.projetoImagem}`);
      const overlays = document.querySelectorAll(`.${styles.overlay}`);

      // Começam invisíveis
      gsap.set(imagensElements, { opacity: 0 });
      gsap.set(overlays, { opacity: 0 });

      // Fade-in suave das imagens
      gsap.to(imagensElements, {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
        delay: fadeDelay,
        stagger: 0.1,
      });

      // Overlay aparece levemente depois
      gsap.to(overlays, {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        delay: fadeDelay + 0.4,
        stagger: 0.1,
      });

      // Anima o título
      const timer = setTimeout(() => {
        animateTitle();
        isFirstMount.current = false;
      }, (fadeDelay + 0.6) * 1000);
      return () => clearTimeout(timer);
    }
  }, [imagens]);

  const animateTitle = () => {
    if (animationExecuted) return;

    const tituloElement = document.querySelector(`.${styles.projetoTitulo}`);
    const barraElement = document.querySelector(`.${styles.tituloBarra}`);
    
    if (!tituloElement || !barraElement) return;

    const tl = gsap.timeline({
      onComplete: () => setAnimationExecuted(true),
    });

    // Animação da barra (cresce de baixo para cima)
    tl.fromTo(barraElement, 
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 0.8, ease: 'power3.out' }
    )
    // Animação do texto (fade in + slide up)
    .fromTo(tituloElement.querySelector(`.${styles.tituloTexto}`),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      "-=0.4" // sobrepõe um pouco com a animação da barra
    );
  };

  const handleSlideChange = (swiper) => {
    // Para página de projeto, podemos manter o título sempre visível
    console.log('Slide changed to:', swiper.activeIndex);
  };

  const renderProjetoSlide = (imagem, index, handleImageLoad) => (
    <div className={`${styles.projetoSlide} ${styles.slide}`}>
      <OptimizedImage
        src={`https:${imagem.fields.file.url}`}
        alt={imagem.fields.title || imagem.fields.description || titulo}
        quality={80}
        priority={index < 3}
        className={styles.projetoImagem}
        containerClassName={styles.imageContainer}
        sizes="100vw"
        onLoad={handleImageLoad}
      />
      <div className={styles.overlay} />
    </div>
  );

  if (!imagens?.length) {
    return null;
  }

  // Configurações específicas para página de projeto
  const swiperConfig = {
    direction: 'vertical',
    speed: 1000,
    mousewheel: { 
      enabled: true, 
      forceToAxis: true, 
      sensitivity: 1.2, 
      thresholdDelta: 5 
    },
    keyboard: { enabled: true },
    pagination: {
      el: `.${styles.pagination}`,
      clickable: true,
      bulletClass: styles.bullet,
      bulletActiveClass: styles.bulletActive
    },
    onSlideChange: handleSlideChange,
    onInit: () => {
      if (!isFirstMount.current) animateTitle();
    }
  };

  return (
    <div className={styles.galleryWrapper}>
      {/* 🔥 O TÍTULO DEVE ESTAR AQUI - FORA DO SWIPER */}
      <div className={styles.projetoTitulo}>
        <span className={styles.tituloBarra}></span>
        <h1 className={styles.tituloTexto}>{titulo}</h1>
      </div>

      <SwiperGallery
        items={imagens}
        renderSlide={renderProjetoSlide}
        config={swiperConfig}
      />
    </div>
  );
}