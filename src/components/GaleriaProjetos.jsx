// components/GaleriaProjetos.jsx - VERSÃO CORRIGIDA
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
  const [lcpImageLoaded, setLcpImageLoaded] = useState(false);
  const isFirstMount = useRef(true);
  
  // 🔥 REFS PARA EVITAR QUERIES NO DOM
  const slidesRef = useRef([]);
  const timelineRef = useRef(null);

  // 🔥 LIMPAR TIMELINE NO UNMOUNT
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  // 🔄 Fade + reset de animação ao trocar filtro - OTIMIZADO
  useEffect(() => {
    if (!isFirstMount.current) {
      setIsLoading(true);
      setFadeClass(styles.fadeOut);
      
      const timeout = setTimeout(() => {
        setAnimationExecuted(false);
        setFadeClass(styles.fadeIn);

        setTimeout(() => {
          reanimateFirstSlideOverlay();
          animateFirstSlide();
          setIsLoading(false);
        }, 250);
      }, 250);
      
      return () => clearTimeout(timeout);
    }
  }, [projetos]);

  // 🎬 Entrada inicial - OTIMIZADA
  useEffect(() => {
    if (isFirstMount.current) {
      const fadeDelay = 0.8;

      // 🔥 USAR REFS EM VEZ DE QUERIES DIRETAS
      // Aguardar um pouco para garantir que o DOM está renderizado
      const timer = setTimeout(() => {
        if (slidesRef.current.length > 0) {
          const firstSlide = slidesRef.current[0];
          if (firstSlide) {
            const firstImage = firstSlide.querySelector(`.${styles.projetoImagem}`);
            const firstOverlay = firstSlide.querySelector(`.${styles.overlay}`);
            const firstTitle = firstSlide.querySelector(`.${styles.projetosTitulo}`);
            const firstPlus = firstSlide.querySelector(`.${styles.projetoPlus}`);

            if (firstImage && firstOverlay && firstTitle && firstPlus) {
              // 🔥 TIMELINE ÚNICA - MAIS EFICIENTE
              const tl = gsap.timeline({ delay: fadeDelay });
              
              tl
                .set([firstImage, firstOverlay, firstTitle, firstPlus], { opacity: 0 })
                .to(firstImage, { opacity: 1, duration: 1.2, ease: 'power2.out' })
                .to(firstOverlay, { opacity: 0.7, duration: 1, ease: 'power2.out' }, '-=0.8')
                .to([firstTitle, firstPlus], { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.9, 
                  ease: 'power3.out',
                  stagger: 0.1 
                }, '-=0.4');

              timelineRef.current = tl;
            }
          }

          animateFirstSlide(true);
          isFirstMount.current = false;
        }
      }, 100); // Pequeno delay para garantir renderização
      
      return () => clearTimeout(timer);
    }
  }, []);

  // 🔥 FUNÇÃO OTIMIZADA: Reanima sem reflow
  const reanimateFirstSlideOverlay = () => {
    const firstSlide = slidesRef.current[0];
    if (!firstSlide) return;

    const firstOverlay = firstSlide.querySelector(`.${styles.overlay}`);
    if (firstOverlay) {
      // 🔥 ANIMAÇÃO SIMPLES SEM LAYOUT THRASHING
      gsap.to(firstOverlay, { 
        opacity: 0.7, 
        duration: 0.8, 
        ease: 'power2.out',
        overwrite: true // 🔥 EVITA CONFLITOS
      });
    }
  };

  const animateFirstSlide = (isInitial = false) => {
    if (animationExecuted && isInitial) return;

    const firstSlide = slidesRef.current[0];
    if (!firstSlide) return;

    const title = firstSlide.querySelector(`.${styles.projetosTitulo}`);
    const plusIcon = firstSlide.querySelector(`.${styles.projetoPlus}`);
    if (!title || !plusIcon) return;

    // 🔥 TIMELINE OTIMIZADA
    const tl = gsap.timeline({
      onComplete: () => setAnimationExecuted(true),
    });

    tl.to([title, plusIcon], {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
      delay: 0.3
    });

    timelineRef.current = tl;
  };

  const handleSlideChange = (swiper) => {
    // 🔥 DEBOUNCE PARA EVITAR MUITOS REFLOWS
    if (swiper.__lastChange && Date.now() - swiper.__lastChange < 300) return;
    swiper.__lastChange = Date.now();

    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;

    const activeOverlay = activeSlide.querySelector(`.${styles.overlay}`);
    const activeTitle = activeSlide.querySelector(`.${styles.projetosTitulo}`);
    const activePlus = activeSlide.querySelector(`.${styles.projetoPlus}`);

    if (activeOverlay && activeTitle && activePlus) {
      // 🔥 ANIMAÇÃO MAIS SIMPLES
      gsap.killTweensOf([activeOverlay, activeTitle, activePlus]);
      
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

  // 🔥 ADICIONAR FUNÇÃO handleGalleryInit QUE ESTAVA FALTANDO
  const handleGalleryInit = (swiper) => {
    // Inicializar overlays com opacidade
    const overlays = document.querySelectorAll(`.${styles.overlay}`);
    overlays.forEach(overlay => {
      overlay.style.opacity = '0.7';
    });

    if (!isFirstMount.current) {
      reanimateFirstSlideOverlay();
      animateFirstSlide();
    }
  };

  const handleImageLoad = () => {
    setLcpImageLoaded(true);
  };

  // 🔥 RENDER OTIMIZADO COM REFS
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
        onLoad={index === 0 ? handleImageLoad : undefined}
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