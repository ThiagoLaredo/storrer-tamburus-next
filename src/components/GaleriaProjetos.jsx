
// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { gsap } from 'gsap';
// import OptimizedImage from './OptimizedImage';
// import SwiperGallery from './SwiperGallery';
// import Loader from './Loader';
// import styles from '../styles/GaleriaProjetos.module.css';
// import contentfulLoader from '../utils/contentfulLoader'; // 🔥 Importe o contentfulLoader

// export default function GaleriaProjetos({ projetos }) {
//   const [animationExecuted, setAnimationExecuted] = useState(false);
//   const [fadeClass, setFadeClass] = useState(styles.fadeIn);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loadedImages, setLoadedImages] = useState(new Set());
//   const isFirstMount = useRef(true);
  
//   const slidesRef = useRef([]);
//   const timelineRef = useRef(null);

//   // 🔥 CORREÇÃO: useEffect DE PRÉ-CARREGAMENTO DENTRO DO COMPONENTE
//   useEffect(() => {
//     // Pré-carrega as primeiras 3 imagens imediatamente
//     if (projetos?.length > 0) {
//       const preloadImages = [];
      
//       // Primeira imagem - máxima prioridade
//       if (projetos[0]?.capa) {
//         const img1 = new Image();
//         img1.src = contentfulLoader({ 
//           src: projetos[0].capa, 
//           width: 800, 
//           quality: 60 
//         });
//         preloadImages.push(img1);
//       }
      
//       // Segunda e terceira imagens - alta prioridade
//       for (let i = 1; i <= 2; i++) {
//         if (projetos[i]?.capa) {
//           const img = new Image();
//           img.src = contentfulLoader({ 
//             src: projetos[i].capa, 
//             width: 800, 
//             quality: 50 
//           });
//           preloadImages.push(img);
//         }
//       }
//     }
//   }, [projetos]);

//   const handleImageLoad = (index) => {
//     setLoadedImages(prev => new Set(prev).add(index));
    
//     if (index === 0 && isFirstMount.current) {
//       const timer = setTimeout(() => {
//         animateFirstSlideContent();
//       }, 100);
//       return () => clearTimeout(timer);
//     }
//   };

//   const animateFirstSlideContent = () => {
//     const firstSlide = slidesRef.current[0];
//     if (!firstSlide) return;

//     const firstImage = firstSlide.querySelector(`.${styles.projetoImagem}`);
//     const firstOverlay = firstSlide.querySelector(`.${styles.overlay}`);
//     const firstTitle = firstSlide.querySelector(`.${styles.projetosTitulo}`);
//     const firstPlus = firstSlide.querySelector(`.${styles.projetoPlus}`);

//     if (firstImage && firstOverlay && firstTitle && firstPlus) {
//       const tl = gsap.timeline();
      
//       tl.set(firstImage, { opacity: 1 })
//         .to(firstOverlay, { 
//           opacity: 0.7, 
//           duration: 1, 
//           ease: 'power2.out' 
//         })
//         .to([firstTitle, firstPlus], { 
//           opacity: 1, 
//           y: 0, 
//           duration: 0.9, 
//           ease: 'power3.out',
//           stagger: 0.1 
//         }, '-=0.6');

//       timelineRef.current = tl;
      
//       setAnimationExecuted(true);
//       isFirstMount.current = false;
//     }
//   };

//   // 🔄 Fade + reset de animação ao trocar filtro
//   useEffect(() => {
//     if (!isFirstMount.current) {
//       setIsLoading(true);
//       setFadeClass(styles.fadeOut);
      
//       const timeout = setTimeout(() => {
//         setAnimationExecuted(false);
//         setFadeClass(styles.fadeIn);

//         setTimeout(() => {
//           animateSlidesAfterFilter();
//           setIsLoading(false);
//         }, 250);
//       }, 250);
      
//       return () => clearTimeout(timeout);
//     }
//   }, [projetos]);

//   const animateSlidesAfterFilter = () => {
//     if (slidesRef.current.length > 0) {
//       const firstSlide = slidesRef.current[0];
//       if (firstSlide) {
//         const firstImage = firstSlide.querySelector(`.${styles.projetoImagem}`);
//         const firstOverlay = firstSlide.querySelector(`.${styles.overlay}`);
//         const firstTitle = firstSlide.querySelector(`.${styles.projetosTitulo}`);
//         const firstPlus = firstSlide.querySelector(`.${styles.projetoPlus}`);

//         if (firstImage && firstOverlay && firstTitle && firstPlus) {
//           gsap.set([firstOverlay, firstTitle, firstPlus], { 
//             opacity: 0
//           });
          
//           gsap.set(firstTitle, { y: 30 });
//           gsap.set(firstPlus, { y: 30 });

//           const tl = gsap.timeline();
          
//           if (firstImage.complete) {
//             gsap.set(firstImage, { opacity: 1 });
//           }
          
//           tl.to(firstOverlay, { 
//             opacity: 0.7, 
//             duration: 0.6, 
//             ease: 'power2.out' 
//           })
//           .to([firstTitle, firstPlus], { 
//             opacity: 1, 
//             y: 0, 
//             duration: 0.7, 
//             ease: 'power3.out',
//             stagger: 0.1 
//           }, '-=0.3');

//           setAnimationExecuted(true);
//         }
//       }
//     }
//   };

//   const handleSlideChange = (swiper) => {
//     if (swiper.__lastChange && Date.now() - swiper.__lastChange < 300) return;
//     swiper.__lastChange = Date.now();

//     const activeIndex = swiper.activeIndex;
//     const activeSlide = swiper.slides[activeIndex];
//     if (!activeSlide) return;

//     const activeImage = activeSlide.querySelector(`.${styles.projetoImagem}`);
//     const activeOverlay = activeSlide.querySelector(`.${styles.overlay}`);
//     const activeTitle = activeSlide.querySelector(`.${styles.projetosTitulo}`);
//     const activePlus = activeSlide.querySelector(`.${styles.projetoPlus}`);

//     if (activeOverlay && activeTitle && activePlus) {
//       gsap.killTweensOf([activeOverlay, activeTitle, activePlus]);
      
//       if (activeImage && loadedImages.has(activeIndex)) {
//         gsap.set(activeImage, { opacity: 1 });
//       }
      
//       gsap.set([activeTitle, activePlus], { opacity: 0 });
//       gsap.set(activeOverlay, { opacity: 0 });
//       gsap.set(activeTitle, { y: 30 });
//       gsap.set(activePlus, { y: 30 });
      
//       gsap.to(activeOverlay, { opacity: 0.7, duration: 0.6, ease: 'power2.out' });
//       gsap.to([activeTitle, activePlus], { 
//         y: 0, 
//         opacity: 1, 
//         duration: 0.8, 
//         ease: 'power3.out', 
//         stagger: 0.1,
//         delay: 0.1 
//       });
//     }
//   };

//   const handleGalleryInit = (swiper) => {
//     const images = document.querySelectorAll(`.${styles.projetoImagem}`);
//     images.forEach((img, index) => {
//       if (img.complete && loadedImages.has(index)) {
//         gsap.set(img, { opacity: 1 });
//       }
//     });

//     if (!isFirstMount.current) {
//       animateSlidesAfterFilter();
//     }
//   };

//   // 🔥 ATUALIZADO: renderProjetoSlide com melhor tratamento
//   const renderProjetoSlide = (projeto, index) => (
//     <div 
//       ref={el => {
//         if (el) {
//           slidesRef.current[index] = el;
//         }
//       }}
//       className={`${styles.projetoSlide} ${styles.slide}`}
//     >
//       <div className={styles.slideContent}>
//         <OptimizedImage
//           src={projeto.capa}
//           alt={projeto.title}
//           quality={index < 3 ? 65 : 45}
//           priority={index < 2}
//           loading={index < 3 ? "eager" : "lazy"}
//           className={styles.projetoImagem}
//           containerClassName={styles.imageContainer}
//           sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 80vw"
//           onLoad={() => handleImageLoad(index)}
//           onError={(e) => {
//             console.warn(`Erro ao carregar imagem ${index}:`, projeto.title);
//             setTimeout(() => {
//               e.target.src = contentfulLoader({ 
//                 src: projeto.capa, 
//                 width: 600, 
//                 quality: 40 
//               });
//             }, 1000);
//           }}
//         />
//         <div className={styles.overlay} />
//         <Link href={`/projeto/${projeto.slug}`} className={styles.projetoLink}>
//           <h3 className={styles.projetosTitulo}>{projeto.title}</h3>
//           <span className={styles.projetoPlus}>
//             <svg width="30" height="60" viewBox="0 0 30 60" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path
//                 d="M6.13 16.45L8.78 13.8L23.23 28.24C23.46 28.47 23.65 28.75 23.77 29.05C23.9 29.36 23.96 29.68 23.96 30.01C23.96 30.34 23.9 30.66 23.77 30.97C23.65 31.27 23.46 31.54 23.23 31.77L8.78 46.22L6.13 43.57L19.69 30.01L6.13 16.45Z"
//                 fill="#F3ED4F"
//               />
//             </svg>
//           </span>
//         </Link>
//       </div>
//     </div>
//   );

//   if (!projetos?.length) {
//     return (
//       <div className={styles.semProjetosContainer}>
//         <p className={styles.semProjetos}>Nenhum projeto encontrado</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {isLoading && <Loader />}
//       <div className={`${styles.galleryWrapper} ${fadeClass}`}>
//         <SwiperGallery
//           items={projetos}
//           renderSlide={renderProjetoSlide}
//           direction="vertical"
//           speed={1000}
//           onSlideChange={handleSlideChange}
//           onInit={handleGalleryInit} 
//         />
//       </div>
//     </>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import OptimizedImage from './OptimizedImage';
import SwiperGallery from './SwiperGallery';
import Loader from './Loader';
import styles from '../styles/GaleriaProjetos.module.css';
import contentfulLoader from '../utils/contentfulLoader';

export default function GaleriaProjetos({ projetos }) {
  const [animationExecuted, setAnimationExecuted] = useState(false);
  const [fadeClass, setFadeClass] = useState(styles.fadeIn);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const isFirstMount = useRef(true);
  
  const slidesRef = useRef([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (projetos?.length > 0) {
      const preloadImages = [];
      
      if (projetos[0]?.capa) {
        const img1 = new Image();
        img1.src = contentfulLoader({ 
          src: projetos[0].capa, 
          width: 800, 
          quality: 60 
        });
        preloadImages.push(img1);
      }
      
      for (let i = 1; i <= 2; i++) {
        if (projetos[i]?.capa) {
          const img = new Image();
          img.src = contentfulLoader({ 
            src: projetos[i].capa, 
            width: 800, 
            quality: 50 
          });
          preloadImages.push(img);
        }
      }
    }
  }, [projetos]);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set(prev).add(index));
    
    if (index === 0 && isFirstMount.current) {
      const timer = setTimeout(() => {
        animateFirstSlideContent();
      }, 100);
      return () => clearTimeout(timer);
    }
  };

  const animateFirstSlideContent = () => {
    const firstSlide = slidesRef.current[0];
    if (!firstSlide) return;

    const firstImage = firstSlide.querySelector(`.${styles.projetoImagem}`);
    const firstOverlay = firstSlide.querySelector(`.${styles.overlay}`);
    const firstTitle = firstSlide.querySelector(`.${styles.projetosTitulo}`);
    const firstPlus = firstSlide.querySelector(`.${styles.projetoPlus}`);

    if (firstImage && firstOverlay && firstTitle && firstPlus) {
      const tl = gsap.timeline();
      
      tl.set(firstImage, { opacity: 1 })
        .to(firstOverlay, { 
          opacity: 0.7, 
          duration: 1, 
          ease: 'power2.out' 
        })
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

  useEffect(() => {
    if (!isFirstMount.current) {
      setIsLoading(true);
      setFadeClass(styles.fadeOut);
      
      const timeout = setTimeout(() => {
        setAnimationExecuted(false);
        setFadeClass(styles.fadeIn);

        setTimeout(() => {
          animateSlidesAfterFilter();
          setIsLoading(false);
        }, 250);
      }, 250);
      
      return () => clearTimeout(timeout);
    }
  }, [projetos]);

  const animateSlidesAfterFilter = () => {
    if (slidesRef.current.length > 0) {
      const firstSlide = slidesRef.current[0];
      if (firstSlide) {
        const firstImage = firstSlide.querySelector(`.${styles.projetoImagem}`);
        const firstOverlay = firstSlide.querySelector(`.${styles.overlay}`);
        const firstTitle = firstSlide.querySelector(`.${styles.projetosTitulo}`);
        const firstPlus = firstSlide.querySelector(`.${styles.projetoPlus}`);

        if (firstImage && firstOverlay && firstTitle && firstPlus) {
          gsap.set([firstOverlay, firstTitle, firstPlus], { 
            opacity: 0
          });
          
          gsap.set(firstTitle, { y: 30 });
          gsap.set(firstPlus, { y: 30 });

          const tl = gsap.timeline();
          
          if (firstImage.complete) {
            gsap.set(firstImage, { opacity: 1 });
          }
          
          tl.to(firstOverlay, { 
            opacity: 0.7, 
            duration: 0.6, 
            ease: 'power2.out' 
          })
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
      
      if (activeImage && loadedImages.has(activeIndex)) {
        gsap.set(activeImage, { opacity: 1 });
      }
      
      gsap.set([activeTitle, activePlus], { opacity: 0 });
      gsap.set(activeOverlay, { opacity: 0 });
      gsap.set(activeTitle, { y: 30 });
      gsap.set(activePlus, { y: 30 });
      
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

  const handleGalleryInit = (swiper) => {
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

  // 🔥 ATUALIZADO: Remove completamente a prop 'loading' - agora controlada pelo OptimizedImage
  const renderProjetoSlide = (projeto, index) => (
    <div 
      ref={el => {
        if (el) {
          slidesRef.current[index] = el;
        }
      }}
      className={`${styles.projetoSlide} ${styles.slide}`}
    >
      <div className={styles.slideContent}>
        <OptimizedImage
          src={projeto.capa}
          alt={projeto.title}
          quality={index < 3 ? 65 : 45}
          priority={index < 2} // 🔥 Apenas priority - o loading é controlado internamente
          className={styles.projetoImagem}
          containerClassName={styles.imageContainer}
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 80vw"
          onLoad={() => handleImageLoad(index)}
          onError={(e) => {
            console.warn(`Erro ao carregar imagem ${index}:`, projeto.title);
            setTimeout(() => {
              e.target.src = contentfulLoader({ 
                src: projeto.capa, 
                width: 600, 
                quality: 40 
              });
            }, 1000);
          }}
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