// 


'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import OptimizedImage from './OptimizedImage';
import SwiperGallery from './SwiperGallery';
import styles from '../styles/GaleriaProjetos.module.css';

export default function GaleriaProjetos({ projetos }) {
  const [animationExecuted, setAnimationExecuted] = useState(false);
  const [fadeClass, setFadeClass] = useState(styles.fadeIn);
  const isFirstMount = useRef(true);

  // 🔄 Fade + reset de animação ao trocar filtro
  useEffect(() => {
    if (!isFirstMount.current) {
      setFadeClass(styles.fadeOut);
      const timeout = setTimeout(() => {
        setAnimationExecuted(false);
        setFadeClass(styles.fadeIn);

        // 🔥 CORREÇÃO: após o fadeIn, reanima o overlay do primeiro slide
        setTimeout(() => {
          reanimateFirstSlideOverlay();
          animateFirstSlide();
        }, 250);
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [projetos]);

  // 🎬 Entrada inicial sincronizada com a animação de abertura da página
  useEffect(() => {
    if (isFirstMount.current) {
      const fadeDelay = 0.8;
      const imagens = document.querySelectorAll(`.${styles.projetoImagem}`);
      const overlays = document.querySelectorAll(`.${styles.overlay}`);

      // Começam invisíveis
      gsap.set(imagens, { opacity: 0 });
      gsap.set(overlays, { opacity: 0 });

      // Fade-in suave das imagens
      gsap.to(imagens, {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
        delay: fadeDelay,
        stagger: 0.1,
      });

      // Overlay aparece levemente depois (APENAS no carregamento inicial)
      gsap.to(overlays, {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        delay: fadeDelay + 0.4,
        stagger: 0.1,
      });

      // Depois anima título e ícone do primeiro slide
      const timer = setTimeout(() => {
        animateFirstSlide(true);
        isFirstMount.current = false;
      }, (fadeDelay + 0.6) * 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // 🔥 NOVA FUNÇÃO: Reanima apenas o overlay do primeiro slide após filtro
  const reanimateFirstSlideOverlay = () => {
    const firstSlide = document.querySelector(`.${styles.slide}.swiper-slide-active`);
    if (!firstSlide) return;

    const firstOverlay = firstSlide.querySelector(`.${styles.overlay}`);
    if (firstOverlay) {
      // Reanima o overlay do primeiro slide
      gsap.fromTo(firstOverlay,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }
      );
    }

    // 🔥 GARANTE que os outros overlays ficam visíveis
    const otherOverlays = document.querySelectorAll(`.${styles.slide}:not(.swiper-slide-active) .${styles.overlay}`);
    otherOverlays.forEach(overlay => {
      overlay.style.opacity = '1';
    });
  };

  const animateFirstSlide = (isInitial = false) => {
    if (animationExecuted && isInitial) return;

    const firstSlide = document.querySelector(`.${styles.slide}.swiper-slide-active`);
    if (!firstSlide) return;

    const title = firstSlide.querySelector(`.${styles.projetosTitulo}`);
    const plusIcon = firstSlide.querySelector(`.${styles.projetoPlus}`);
    if (!title || !plusIcon) return;

    const tl = gsap.timeline({
      onComplete: () => setAnimationExecuted(true),
    });

    // Garantir visibilidade inicial
    gsap.set([title, plusIcon], { opacity: 0, y: 30 });

    tl.to([title, plusIcon], {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
    });
  };

  const handleSlideChange = (swiper) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;

    const activeTitle = activeSlide.querySelector(`.${styles.projetosTitulo}`);
    const activePlus = activeSlide.querySelector(`.${styles.projetoPlus}`);

    if (activeTitle && activePlus) {
      gsap.fromTo(
        [activeTitle, activePlus],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
      );
    }
  };

  // 🔥 RENDER SEM ALTERAÇÃO - mantém o CSS atual
  const renderProjetoSlide = (projeto, index, handleImageLoad) => (
    <div className={`${styles.projetoSlide} ${styles.slide}`}>
      <OptimizedImage
        src={projeto.capa}
        alt={projeto.title}
        quality={75}
        priority={index < 3}
        className={styles.projetoImagem}
        containerClassName={styles.imageContainer}
        sizes="100vw"
        onLoad={handleImageLoad}
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
    <div className={`${styles.galleryWrapper} ${fadeClass}`}>
      <SwiperGallery
        items={projetos}
        renderSlide={renderProjetoSlide}
        direction="vertical"
        speed={1000}
        onSlideChange={handleSlideChange}
        onInit={() => {
          if (!isFirstMount.current) {
            reanimateFirstSlideOverlay(); // 🔥 Adicionado aqui também
            animateFirstSlide();
          }
        }}
      />
    </div>
  );
}