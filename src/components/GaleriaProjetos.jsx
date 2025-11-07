'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import OptimizedImage from './OptimizedImage';
import SwiperGallery from './SwiperGallery';
import Loader from './Loader';
import styles from '../styles/GaleriaProjetos.module.css';

// 🔥 CONFIGURAÇÃO GSAP OTIMIZADA
if (typeof window !== 'undefined') {
  gsap.config({
    force3D: true,
    autoSleep: 60,
    nullTargetWarn: false,
  });
}

export default function GaleriaProjetos({ projetos }) {
  const [animationExecuted, setAnimationExecuted] = useState(false);
  const [fadeClass, setFadeClass] = useState(styles.fadeIn);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const isFirstMount = useRef(true);
  
  const slidesRef = useRef([]);
  const timelineRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  // 🔥 RASTREAR IMAGENS CARREGADAS
  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set(prev).add(index));
    
    // Se é a primeira imagem e primeira montagem, iniciar animação
    if (index === 0 && isFirstMount.current) {
      const timer = setTimeout(() => {
        animateFirstSlideContent();
      }, 100);
      return () => clearTimeout(timer);
    }
  };

  // 🔥 ANIMAÇÃO DO CONTEÚDO DO PRIMEIRO SLIDE (imagem já carregada)
  const animateFirstSlideContent = () => {
    const firstSlide = slidesRef.current[0];
    if (!firstSlide) return;

    const firstImage = firstSlide.querySelector(`.${styles.projetoImagem}`);
    const firstOverlay = firstSlide.querySelector(`.${styles.overlay}`);
    const firstTitle = firstSlide.querySelector(`.${styles.projetosTitulo}`);
    const firstPlus = firstSlide.querySelector(`.${styles.projetoPlus}`);

    if (firstImage && firstOverlay && firstTitle && firstPlus) {
      const tl = gsap.timeline();
      
      // 🔥 IMAGEM JÁ DEVE ESTAR VISÍVEL (pelo handleImageLoad)
      tl.set(firstImage, { opacity: 1 })
        // OVERLAY aparece depois da imagem
        .to(firstOverlay, { 
          opacity: 0.7, 
          duration: 1, 
          ease: 'power2.out' 
        })
        // TÍTULO e PLUS aparecem por último
        .to([firstTitle, firstPlus], { 
          opacity: 1, 
          y: 0, 
          duration: 0.9, 
          ease: 'power3.out',
          stagger: 0.1 
        }, '-=0.6');

      timelineRef.current = tl;
      
      setAnimationExecuted(true);
      isFirstMount.current = false;
    }
  };

  // 🔄 Fade + reset de animação ao trocar filtro - CORRIGIDO
  useEffect(() => {
    if (!isFirstMount.current) {
      setIsLoading(true);
      setFadeClass(styles.fadeOut);
      
      const timeout = setTimeout(() => {
        setAnimationExecuted(false);
        setFadeClass(styles.fadeIn);

        setTimeout(() => {
          // 🔥 ANIMAR NOVOS SLIDES APÓS FILTRAGEM
          animateSlidesAfterFilter();
          setIsLoading(false);
        }, 250);
      }, 250);
      
      return () => clearTimeout(timeout);
    }
  }, [projetos]);

  // 🔥 ANIMAR SLIDES APÓS FILTRAGEM
  const animateSlidesAfterFilter = () => {
    if (slidesRef.current.length > 0) {
      const firstSlide = slidesRef.current[0];
      if (firstSlide) {
        const firstImage = firstSlide.querySelector(`.${styles.projetoImagem}`);
        const firstOverlay = firstSlide.querySelector(`.${styles.overlay}`);
        const firstTitle = firstSlide.querySelector(`.${styles.projetosTitulo}`);
        const firstPlus = firstSlide.querySelector(`.${styles.projetoPlus}`);

        if (firstImage && firstOverlay && firstTitle && firstPlus) {
          // 🔥 RESETAR ESTADO
          gsap.set([firstImage, firstOverlay, firstTitle, firstPlus], { 
            opacity: 0,
            y: 30 
          });

          // 🔥 ANIMAÇÃO PARA FILTRAGEM
          const tl = gsap.timeline();
          
          tl.to(firstImage, { 
            opacity: 1, 
            duration: 0.8, 
            ease: 'power2.out' 
          })
          .to(firstOverlay, { 
            opacity: 0.7, 
            duration: 0.6, 
            ease: 'power2.out' 
          }, '-=0.4')
          .to([firstTitle, firstPlus], { 
            opacity: 1, 
            y: 0, 
            duration: 0.7, 
            ease: 'power3.out',
            stagger: 0.1 
          }, '-=0.3');

          setAnimationExecuted(true);
        }
      }
    }
  };

  const handleSlideChange = (swiper) => {
    if (swiper.__lastChange && Date.now() - swiper.__lastChange < 300) return;
    swiper.__lastChange = Date.now();

    const activeIndex = swiper.activeIndex;
    const activeSlide = swiper.slides[activeIndex];
    if (!activeSlide) return;

    const activeImage = activeSlide.querySelector(`.${styles.projetoImagem}`);
    const activeOverlay = activeSlide.querySelector(`.${styles.overlay}`);
    const activeTitle = activeSlide.querySelector(`.${styles.projetosTitulo}`);
    const activePlus = activeSlide.querySelector(`.${styles.projetoPlus}`);

    if (activeOverlay && activeTitle && activePlus) {
      gsap.killTweensOf([activeOverlay, activeTitle, activePlus]);
      
      // 🔥 SE IMAGEM JÁ CARREGOU, MOSTRAR OVERLAY E CONTEÚDO
      if (activeImage && loadedImages.has(activeIndex)) {
        gsap.set(activeImage, { opacity: 1 });
      }
      
      gsap.set([activeTitle, activePlus], { y: 30, opacity: 0 });
      gsap.set(activeOverlay, { opacity: 0 });
      
      gsap.to(activeOverlay, { opacity: 0.7, duration: 0.6, ease: 'power2.out' });
      gsap.to([activeTitle, activePlus], { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out', 
        stagger: 0.1,
        delay: 0.1 
      });
    }
  };

  // 🔥 CORRIGIDO: handleGalleryInit sem overlay pré-carregado
  const handleGalleryInit = (swiper) => {
    swiperInstanceRef.current = swiper;
    
    // 🔥 NÃO DEFINIR OVERLAY AQUI - será controlado por animação
    // Apenas garantir que imagens carregadas estejam visíveis
    const images = document.querySelectorAll(`.${styles.projetoImagem}`);
    images.forEach((img, index) => {
      if (img.complete && loadedImages.has(index)) {
        gsap.set(img, { opacity: 1 });
      }
    });

    if (!isFirstMount.current) {
      animateSlidesAfterFilter();
    }
  };

  // 🔥 RENDER COM CONTROLE DE CARREGAMENTO
  const renderProjetoSlide = (projeto, index) => (
    <div 
      ref={el => {
        if (el) {
          slidesRef.current[index] = el;
        }
      }}
      className={`${styles.projetoSlide} ${styles.slide}`}
    >
      <OptimizedImage
        src={projeto.capa}
        alt={projeto.title}
        quality={55}
        priority={index === 0}
        loading={index === 0 ? "eager" : "lazy"}
        className={styles.projetoImagem}
        containerClassName={styles.imageContainer}
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 100vw" 
        onLoad={() => handleImageLoad(index)}
      />
      <div className={styles.overlay} />
      <Link href={`/projeto/${projeto.slug}`} className={styles.projetoLink}>
        <h3 className={styles.projetosTitulo}>{projeto.title}</h3>
        <span className={styles.projetoPlus}>
          <svg width="30" height="60" viewBox="0 0 30 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.13 16.45L8.78 13.8L23.23 28.24C23.46 28.47 23.65 28.75 23.77 29.05C23.9 29.36 23.96 29.68 23.96 30.01C23.96 30.34 23.9 30.66 23.77 30.97C23.65 31.27 23.46 31.54 23.23 31.77L8.78 46.22L6.13 43.57L19.69 30.01L6.13 16.45Z"
              fill="#F3ED4F"
            />
          </svg>
        </span>
      </Link>
    </div>
  );

  if (!projetos?.length) {
    return (
      <div className={styles.semProjetosContainer}>
        <p className={styles.semProjetos}>Nenhum projeto encontrado</p>
      </div>
    );
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={`${styles.galleryWrapper} ${fadeClass}`}>
        <SwiperGallery
          items={projetos}
          renderSlide={renderProjetoSlide}
          direction="vertical"
          speed={1000}
          onSlideChange={handleSlideChange}
          onInit={handleGalleryInit} 
        />
      </div>
    </>
  );
}