// 'use client';

// import { useRef, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Mousewheel, Keyboard, Pagination, Autoplay } from 'swiper/modules';
// import Image from 'next/image';
// import Link from 'next/link';
// import { gsap } from 'gsap';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';

// export default function GaleriaProjetos({ projetos }) {
//   const swiperRef = useRef(null);

//   useEffect(() => {
//     if (projetos.length > 0) {
//       // Pequeno delay para garantir que o Swiper está inicializado
//       setTimeout(() => {
//         animateFirstSlide();
//       }, 100);
//     }
//   }, [projetos]);

// // components/GaleriaProjetos.jsx - FUNÇÕES CORRIGIDAS
// const animateFirstSlide = () => {
//   const firstSlide = document.querySelector('.swiper-slide-active');
//   if (!firstSlide) return;

//   const title = firstSlide.querySelector('.projetos-titulo');
//   const plusIcon = firstSlide.querySelector('.projeto-plus');
  
//   if (title && plusIcon) {
//     // Garante que o primeiro slide está visível
//     gsap.set([title, plusIcon], { opacity: 1, y: 0 });
//   }
// };

// const handleSlideChange = (swiper) => {
//   // Animação de ENTRADA do slide ativo (não de saída do anterior)
//   const activeSlide = swiper.slides[swiper.activeIndex];
//   if (activeSlide) {
//     const activeTitle = activeSlide.querySelector('.projetos-titulo');
//     const activePlus = activeSlide.querySelector('.projeto-plus');
    
//     if (activeTitle && activePlus) {
//       // ANIMAÇÃO DE ENTRADA: aparece vindo de baixo
//       gsap.fromTo([activeTitle, activePlus], 
//         { y: 30, opacity: 0 }, // Começa invisível e abaixo
//         { 
//           y: 0, 
//           opacity: 1, 
//           duration: 0.8, 
//           ease: 'power3.out', 
//           stagger: 0.1 
//         }
//       );
//     }
//   }
// };

// const handleSlideChangeTransitionStart = (swiper) => {
//   // Animação de SAÍDA do slide atual
//   const currentSlide = swiper.slides[swiper.previousIndex];
//   if (currentSlide) {
//     const currentTitle = currentSlide.querySelector('.projetos-titulo');
//     const currentPlus = currentSlide.querySelector('.projeto-plus');
    
//     if (currentTitle && currentPlus) {
//       // ANIMAÇÃO DE SAÍDA: some subindo
//       gsap.to([currentTitle, currentPlus], {
//         y: -20,
//         opacity: 0,
//         duration: 0.4,
//         ease: 'power1.in'
//       });
//     }
//   }
// };

//   if (projetos.length === 0) {
//     return (
//       <div className="sem-projetos-container">
//         <p className="sem-projetos">Nenhum projeto encontrado</p>
//       </div>
//     );
//   }

//   return (
//     <div className="galeria-projetos">
//       <Swiper
//         ref={swiperRef}
//         direction="vertical"
//         slidesPerView={1}
//         spaceBetween={0}
//         speed={1000}
//         mousewheel={{
//           enabled: true,
//           forceToAxis: true,
//           sensitivity: 1.2,
//           thresholdDelta: 5
//         }}
//         keyboard={{ 
//           enabled: true,
//           onlyInViewport: true 
//         }}
//         pagination={{ 
//           el: '.swiper-pagination',
//           clickable: true 
//         }}
//         modules={[Mousewheel, Keyboard, Pagination, Autoplay]}
//         onSlideChange={handleSlideChange}
//         onSlideChangeTransitionStart={handleSlideChangeTransitionStart}
//         onInit={animateFirstSlide}
//         className="projetos-swiper"
//       >
//         {projetos.map((projeto, index) => (
//           <SwiperSlide key={projeto.slug || index}>
//             <div className="projeto-slide">
//               {projeto.capa ? (
//                 <Image
//                   src={projeto.capa}
//                   alt={projeto.title}
//                   fill
//                   className="projeto-imagem"
//                   priority={index === 0}
//                   sizes="100vw"
//                 />
//               ) : (
//                 <div className="projeto-imagem placeholder" />
//               )}
              
//               <div className="overlay" />
              
//                 <Link href={`/projetos/${projeto.slug}`} className="projeto-link">
//                   <h3 className="projetos-titulo">{projeto.title}</h3>
//                   <span className="projeto-plus">
//                     <i className="fa-solid fa-chevron-right" />
//                   </span>
//                 </Link>
//             </div>
//           </SwiperSlide>
//         ))}
        
//         {/* Pagination container */}
//         <div className="swiper-pagination"></div>
//       </Swiper>
//     </div>
//   );
// }


'use client';

import { useRef, useEffect, useState } from 'react'; // 🔥 Adicione useState
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Função para pré-carregar imagem
const preloadImage = (url) =>
  new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    const img = new window.Image();
    img.src = url;
    img.onload = resolve;
    img.onerror = resolve;
  });

  export default function GaleriaProjetos({ projetos }) {
    const swiperRef = useRef(null);
    const [firstImageLoaded, setFirstImageLoaded] = useState(false);
    const [animationExecuted, setAnimationExecuted] = useState(false); // 🔥 Novo estado
  
    useEffect(() => {
      if (projetos.length > 0 && projetos[0].capa && !animationExecuted) {
        // Pré-carrega a primeira imagem ANTES de animar
        preloadImage(projetos[0].capa).then(() => {
          setFirstImageLoaded(true);
          // 🔥 REMOVE o setTimeout daqui - a animação será pelo onInit
        });
      }
    }, [projetos, animationExecuted]); // 🔥 Adicione animationExecuted como dependência
  
    // 🔥 ANIMAÇÃO DE ENTRADA IGUAL À HOME
    const animateFirstSlide = () => {
      // 🔥 Evita execução dupla
      if (animationExecuted) return;
      
      const firstSlide = document.querySelector('.swiper-slide-active');
      const overlay = document.querySelector('.overlay');
      
      if (!firstSlide) return;
  
      const image = firstSlide.querySelector('.projeto-imagem');
      const title = firstSlide.querySelector('.projetos-titulo');
      const plusIcon = firstSlide.querySelector('.projeto-plus');
      
      if (image && title && plusIcon) {
        setAnimationExecuted(true); // 🔥 Marca como executada
        
        // Timeline para animação sequencial
        const tl = gsap.timeline();
        
        // 1. Imagem com scale (igual à home)
        tl.fromTo(
          image,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
        )
        // 2. Overlay aparece depois (com delay)
        .to(overlay, {
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out"
        }, "-=0.8")
        // 3. Título e ícone entram por último
        .fromTo([title, plusIcon], 
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: 'power3.out', 
            stagger: 0.1 
          },
          "-=0.3"
        );
      }
    };
  
    // ... resto do código permanece igual ...

  const handleSlideChange = (swiper) => {
    // Animação de ENTRADA do slide ativo
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (activeSlide) {
      const activeTitle = activeSlide.querySelector('.projetos-titulo');
      const activePlus = activeSlide.querySelector('.projeto-plus');
      
      if (activeTitle && activePlus) {
        gsap.fromTo([activeTitle, activePlus], 
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: 'power3.out', 
            stagger: 0.1 
          }
        );
      }
    }
  };

  const handleSlideChangeTransitionStart = (swiper) => {
    // Animação de SAÍDA do slide atual
    const currentSlide = swiper.slides[swiper.previousIndex];
    if (currentSlide) {
      const currentTitle = currentSlide.querySelector('.projetos-titulo');
      const currentPlus = currentSlide.querySelector('.projeto-plus');
      
      if (currentTitle && currentPlus) {
        gsap.to([currentTitle, currentPlus], {
          y: -20,
          opacity: 0,
          duration: 0.4,
          ease: 'power1.in'
        });
      }
    }
  };

// 🔥 Loading state melhorado
// 🔥 Loading state com SVG animado
if (!firstImageLoaded && projetos.length > 0) {
  return (
    <div className="loading-container">
      <div className="loading-content">
        {/* Logo */}
        <div className="loading-logo">Storrer Tamburus</div>
        
        {/* SVG Animado */}
        <div className="loading-spinner">
          <svg 
            width="60" 
            height="60" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="loading-svg"
          >
            <path 
              opacity="0.5" 
              d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z" 
              fill="#E7DF59"
            />
            <path 
              d="M20 12H22C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12Z" 
              fill="#E7DF59"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

  if (projetos.length === 0) {
    return (
      <div className="sem-projetos-container">
        <p className="sem-projetos">Nenhum projeto encontrado</p>
      </div>
    );
  }

  return (
    <div className="galeria-projetos">
      <Swiper
        ref={swiperRef}
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        speed={1000}
        mousewheel={{
          enabled: true,
          forceToAxis: true,
          sensitivity: 1.2,
          thresholdDelta: 5
        }}
        keyboard={{ 
          enabled: true,
          onlyInViewport: true 
        }}
        pagination={{ 
          el: '.swiper-pagination',
          clickable: true 
        }}
        modules={[Mousewheel, Keyboard, Pagination, Autoplay]}
        onSlideChange={handleSlideChange}
        onSlideChangeTransitionStart={handleSlideChangeTransitionStart}
        onInit={animateFirstSlide}
        className="projetos-swiper"
      >
        {projetos.map((projeto, index) => (
          <SwiperSlide key={projeto.slug || index}>
            <div className="projeto-slide">
              {projeto.capa ? (
                <Image
                  src={projeto.capa}
                  alt={projeto.title}
                  fill
                  className="projeto-imagem"
                  priority={index === 0}
                  placeholder="blur"
                  blurDataURL={projeto.blurDataURL} // 🔥 Agora está disponível
                  sizes="100vw"
                />
              ) : (
                <div className="projeto-imagem placeholder" />
              )}
              
              <div className="overlay" style={{ opacity: 0 }} />
              
              <Link href={`/projetos/${projeto.slug}`} className="projeto-link">
                <h3 className="projetos-titulo">{projeto.title}</h3>
                <span className="projeto-plus">
                <svg width="30" height="60" viewBox="0 0 30 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.12997 16.45L8.78247 13.8L23.23 28.2425C23.4629 28.4739 23.6477 28.7491 23.7738 29.0522C23.8999 29.3553 23.9648 29.6804 23.9648 30.0087C23.9648 30.337 23.8999 30.6621 23.7738 30.9652C23.6477 31.2684 23.4629 31.5436 23.23 31.775L8.78247 46.225L6.13247 43.575L19.6925 30.0125L6.12997 16.45Z" fill="#F3ED4F"/>
                </svg>
                </span>
              </Link>
            </div>
          </SwiperSlide>
        ))}
        
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
}