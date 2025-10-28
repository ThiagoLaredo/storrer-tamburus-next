'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import OptimizedImage from './OptimizedImage';
import SwiperGallery from './SwiperGallery';
import Loader from './Loader';
import styles from '../styles/GaleriaProjetos.module.css';

export default function GaleriaProjetos({ projetos }) {
  const [animationExecuted, setAnimationExecuted] = useState(false);
  const [fadeClass, setFadeClass] = useState(styles.fadeIn);
  const [isLoading, setIsLoading] = useState(false);
  const [lcpImageLoaded, setLcpImageLoaded] = useState(false); // 🔥 Novo estado para LCP
  const isFirstMount = useRef(true);

  // 🔄 Fade + reset de animação ao trocar filtro
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

  // 🎬 Entrada inicial - NOVA ORDEM: IMAGEM → OVERLAY → ELEMENTOS
  useEffect(() => {
    if (isFirstMount.current) {
      const fadeDelay = 0.8;
      const imagens = document.querySelectorAll(`.${styles.projetoImagem}`);
      const overlays = document.querySelectorAll(`.${styles.overlay}`);
      const titles = document.querySelectorAll(`.${styles.projetosTitulo}`);
      const plusIcons = document.querySelectorAll(`.${styles.projetoPlus}`);

      // Começam todos invisíveis
      gsap.set(imagens, { opacity: 0 });
      gsap.set(overlays, { opacity: 0 });
      gsap.set(titles, { opacity: 0, y: 20 });
      gsap.set(plusIcons, { opacity: 0, y: 20 });

      // 🔥 1. IMAGENS PRIMEIRO - sem delay
      gsap.to(imagens, {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        delay: fadeDelay,
        stagger: 0.1,
      });

      // 🔥 2. OVERLAY DEPOIS - com delay após as imagens
      gsap.to(overlays, {
        opacity: 0.7,
        duration: 1,
        ease: 'power2.out',
        delay: fadeDelay + 0.4, // 0.4s depois das imagens
        stagger: 0.1,
      });

      // 🔥 3. TÍTULO E ÍCONE POR ÚLTIMO - apenas no slide ativo
      const timer = setTimeout(() => {
        animateFirstSlide(true);
        isFirstMount.current = false;
      }, (fadeDelay + 0.8) * 1000); // Aumentado para 0.8s após fadeDelay
      
      return () => clearTimeout(timer);
    }
  }, []);

  // 🔥 FUNÇÃO OTIMIZADA: Reanima na ordem correta após filtro
  const reanimateFirstSlideOverlay = () => {
    const firstSlide = document.querySelector(`.${styles.slide}.swiper-slide-active`);
    if (!firstSlide) return;

    const firstImage = firstSlide.querySelector(`.${styles.projetoImagem}`);
    const firstOverlay = firstSlide.querySelector(`.${styles.overlay}`);

    if (firstImage && firstOverlay) {
      // 1. Garante que a imagem está visível
      gsap.set(firstImage, { opacity: 1 });
      
      // 2. Anima o overlay depois
      gsap.fromTo(firstOverlay,
        { opacity: 0 },
        { 
          opacity: 0.7, 
          duration: 0.8, 
          ease: 'power2.out',
          delay: 0.2 // Pequeno delay após a imagem
        }
      );
    }

    // Outros overlays mantêm opacidade
    const otherOverlays = document.querySelectorAll(`.${styles.slide}:not(.swiper-slide-active) .${styles.overlay}`);
    otherOverlays.forEach(overlay => {
      overlay.style.opacity = '0.7';
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

    // 🔥 ANIMAÇÃO COM DELAY - depois do overlay
    tl.to([title, plusIcon], {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
      delay: 0.3 // Delay após o overlay
    });
  };

  const handleSlideChange = (swiper) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;

    const activeImage = activeSlide.querySelector(`.${styles.projetoImagem}`);
    const activeOverlay = activeSlide.querySelector(`.${styles.overlay}`);
    const activeTitle = activeSlide.querySelector(`.${styles.projetosTitulo}`);
    const activePlus = activeSlide.querySelector(`.${styles.projetoPlus}`);

    if (activeImage && activeOverlay && activeTitle && activePlus) {
      const tl = gsap.timeline();
      
      // 🔥 ORDEM NA TROCA DE SLIDE: Imagem → Overlay → Título/Ícone
      tl
        .set(activeImage, { opacity: 1 }) // Imagem já está visível
        .fromTo(activeOverlay,
          { opacity: 0 },
          { opacity: 0.7, duration: 0.6, ease: 'power2.out' },
          "-=0.1" // Começa ligeiramente antes do final da imagem
        )
        .fromTo(
          [activeTitle, activePlus],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
          "-=0.2" // Começa durante a animação do overlay
        );
    }
  };

  // Função para pré-carregar overlays durante o loading
  const handleGalleryInit = (swiper) => {
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
    // 🔥 Marcar que a imagem LCP (a primeira) carregou
    setLcpImageLoaded(true);
    console.log('✅ Imagem LCP carregada');
    
    // Opcional: Disparar analytics de performance
    if (window.performance) {
      const lcpEntry = performance.getEntriesByType('largest-contentful-paint');
      if (lcpEntry.length > 0) {
        console.log('LCP:', lcpEntry[0].startTime);
      }
    }
  };

  const renderProjetoSlide = (projeto, index) => (
    <div className={`${styles.projetoSlide} ${styles.slide}`}>
      <OptimizedImage
        src={projeto.capa}
        alt={projeto.title}
        quality={65} // 🔥 Qualidade única já que são fullscreen
        priority={index === 0} // 🔥 APENAS a primeira com priority
        loading={index === 0 ? "eager" : "lazy"} // 🔥 Primeira eager, resto lazy
        className={styles.projetoImagem}
        containerClassName={styles.imageContainer}
        sizes="100vw" // 🔥 Como é fullscreen, sempre 100vw
        onLoad={index === 0 ? handleImageLoad : undefined} // 🔥 Só a primeira
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