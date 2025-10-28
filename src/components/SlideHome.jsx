// 'use client';

// import { useEffect, useRef, useState } from "react";
// import NextImage from "next/image";
// import { gsap } from "gsap";
// import styles from './SlideHome.module.css';

// // Função para pré-carregar imagem nativa
// const preloadImage = (url) =>
//   new Promise((resolve) => {
//     if (typeof window === "undefined") return resolve(); // ignora no server
//     const img = new window.Image();
//     img.src = url;
//     img.onload = resolve;
//     img.onerror = resolve;
//   });

// export default function SlideHome({ projetosDestaque }) {
//   const slidesRef = useRef([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

// // Animação de entrada de slide - VERSÃO CORRIGIDA
//   const animateSlideIn = (index) => {
//     const slide = slidesRef.current[index];
//     const overlay = document.querySelector(`.${styles.sliderOverlay}`);
    
//     if (!slide) return;

//     // Animação do slide
//     gsap.fromTo(
//       slide,
//       { opacity: 0, scale: 1.05 },
//       { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
//     );

//     // Animação do overlay (começa um pouco depois)
//     if (overlay) {
//       gsap.to(overlay, {
//         opacity: 1,
//         duration: 0.8,
//         delay: 0.3, // Pequeno delay para aparecer depois da imagem
//         ease: "power2.out"
//       });
//     }
//   };

//   // Inicial: anima o primeiro slide após preload
//   useEffect(() => {
//     if (!projetosDestaque || projetosDestaque.length === 0) return;

//     const firstSlideUrl = projetosDestaque[0].capa;
//     if (firstSlideUrl) {
//       preloadImage(firstSlideUrl).then(() => {
//         animateSlideIn(0);
//       });
//     } else {
//       animateSlideIn(0);
//     }
//   }, [projetosDestaque]);

//   // Troca automática de slides - VERSÃO GSAP COMPLETA
//   useEffect(() => {
//     if (!projetosDestaque || projetosDestaque.length <= 1) return;

//     const interval = setInterval(() => {
//       const nextIndex = (currentIndex + 1) % projetosDestaque.length;
//       const overlay = document.querySelector(`.${styles.sliderOverlay}`);

//       // Timeline para transição perfeita
//       const tl = gsap.timeline();

//       // 1. Fade out do slide atual + overlay
//       tl.to([slidesRef.current[currentIndex], overlay], {
//         opacity: 0,
//         duration: 0.6,
//         ease: "power2.inOut"
//       })
//       // 2. Fade in do próximo slide + overlay (COM OVERLAP)
//       .to(slidesRef.current[nextIndex], {
//         opacity: 1,
//         duration: 0.8,
//         ease: "power2.out"
//       }, "-=0.3") // Começa 0.3s ANTES do anterior terminar
//       .to(overlay, {
//         opacity: 1,
//         duration: 0.7,
//         ease: "power2.out"
//       }, "-=0.5"); // Overlay aparece durante a transição

//       setCurrentIndex(nextIndex);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [currentIndex, projetosDestaque]);
//   return (
//     <section className={styles.slider}>
//       {projetosDestaque?.map((projeto, index) => (
//         <div
//           key={projeto.sys?.id || index}
//           ref={(el) => {
//             if (el && !slidesRef.current.includes(el)) slidesRef.current.push(el);
//           }}
//           className={styles.slide}
//           style={{ opacity: 0 }}
//         >
//           {projeto.capa ? (
//             <NextImage
//               src={projeto.capa}
//               alt={projeto.title || "Projeto sem título"}
//               fill
//               className={styles.slideImage}
//               quality={55}
//               priority={index === 0} // prioridade na primeira imagem
//               sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 100vw"
//             />
//           ) : (
//             <div className={styles.slideFallback}>Sem imagem</div>
//           )}
//         </div>
//       ))}

//       <div className={styles.sliderOverlay} />
//     </section>
//   );
// }

// components/SlideHome.jsx
'use client';

import { useEffect, useRef, useState } from "react";
import OptimizedImage from "./OptimizedImage"; // 🔥 APENAS ESTA LINHA MUDOU
import { gsap } from "gsap";
import styles from './SlideHome.module.css';

// Função para pré-carregar imagem nativa
const preloadImage = (url) =>
  new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    const img = new window.Image();
    img.src = url;
    img.onload = resolve;
    img.onerror = resolve;
  });

export default function SlideHome({ projetosDestaque }) {
  const slidesRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Animação de entrada de slide
  const animateSlideIn = (index) => {
    const slide = slidesRef.current[index];
    const overlay = document.querySelector(`.${styles.sliderOverlay}`);
    
    if (!slide) return;

    gsap.fromTo(
      slide,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    );

    if (overlay) {
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out"
      });
    }
  };

  // Inicial: anima o primeiro slide após preload
  useEffect(() => {
    if (!projetosDestaque || projetosDestaque.length === 0) return;

    const firstSlideUrl = projetosDestaque[0].capa;
    if (firstSlideUrl) {
      preloadImage(firstSlideUrl).then(() => {
        animateSlideIn(0);
      });
    } else {
      animateSlideIn(0);
    }
  }, [projetosDestaque]);

  // Troca automática de slides
  useEffect(() => {
    if (!projetosDestaque || projetosDestaque.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % projetosDestaque.length;
      const overlay = document.querySelector(`.${styles.sliderOverlay}`);

      const tl = gsap.timeline();
      tl.to([slidesRef.current[currentIndex], overlay], {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut"
      })
      .to(slidesRef.current[nextIndex], {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3")
      .to(overlay, {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out"
      }, "-=0.5");

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
          style={{ opacity: 0 }}
        >
          {projeto.capa ? (
            <OptimizedImage // 🔥 SUBSTITUI NextImage POR OptimizedImage
              src={projeto.capa}
              alt={projeto.title || "Projeto sem título"}
              quality={50} // 🔥 REDUZIDO PARA 50%
              priority={index === 0}
              className={styles.slideImage}
              containerClassName={styles.slide} // 🔥 USA A CLASSE EXISTENTE
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 100vw"
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
