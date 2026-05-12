

// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Mousewheel, Keyboard, Pagination, Autoplay } from 'swiper/modules';
// import styles from '../styles/GaleriaProjetos.module.css';
// import { useSafari } from '../hooks/useSafari'; // 🔥 Importe o hook

// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';

// export default function SwiperGallery({ 
//   items, 
//   renderSlide,
//   direction = 'vertical',
//   speed = 1000,
//   onSlideChange,
//   onInit
// }) {
//   const swiperRef = useRef(null);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const isSafari = useSafari(); // 🔥 Use o hook

//   // 🔥 Efeito específico para Safari - força carregamento completo
//   useEffect(() => {
//     if (isSafari && isInitialized && swiperRef.current?.swiper) {
//       console.log('🚀 Inicializando Swiper com otimizações Safari...');
      
//       const swiper = swiperRef.current.swiper;
      
//       // Função para forçar carregamento de todas as imagens visíveis
//       const loadAllVisibleImages = () => {
//         const slidesToLoad = Array.from({ length: Math.min(5, items.length) }, (_, i) => i);
        
//         slidesToLoad.forEach(index => {
//           const slide = swiper.slides[index];
//           if (slide) {
//             const images = slide.querySelectorAll('img');
//             images.forEach(img => {
//               if (img.src && !img.complete) {
//                 // Força o carregamento
//                 const originalSrc = img.src;
//                 img.src = originalSrc;
//               }
//             });
//           }
//         });
//       };

//       // Executa após a inicialização
//       setTimeout(loadAllVisibleImages, 500);
      
//       // Também executa após cada transição
//       swiper.on('slideChange', loadAllVisibleImages);
      
//       return () => {
//         swiper.off('slideChange', loadAllVisibleImages);
//       };
//     }
//   }, [isSafari, isInitialized, items.length]);

//   // 🔥 Configuração do Swiper - desativa lazy no Safari
//   const swiperConfig = {
//     ref: swiperRef,
//     direction: direction,
//     slidesPerView: 1,
//     spaceBetween: 0,
//     speed: speed,
//     mousewheel: { 
//       enabled: true, 
//       forceToAxis: true, 
//       sensitivity: isSafari ? 1.5 : 1.2,
//       thresholdDelta: isSafari ? 10 : 5,
//       eventsTarget: 'container'
//     },
//     keyboard: { 
//       enabled: true, 
//       onlyInViewport: true 
//     },
//     pagination: { 
//       el: `.${styles.pagination}`,
//       clickable: true,
//       bulletClass: styles.bullet,
//       bulletActiveClass: styles.bulletActive
//     },
//     // 🔥 Desativa lazy loading no Safari
//     lazy: isSafari ? false : {
//       enabled: true,
//       loadPrevNext: true,
//       loadPrevNextAmount: 2,
//       loadOnTransitionStart: true,
//     },
//     preloadImages: isSafari, // 🔥 Força pré-carregamento no Safari
//     watchSlidesProgress: !isSafari, // 🔥 Desativa no Safari
//     modules: [Mousewheel, Keyboard, Pagination, Autoplay],
//     onSlideChange: onSlideChange,
//     onInit: (swiper) => {
//       setIsInitialized(true);
//       onInit?.(swiper);
//     },
//     observer: true,
//     observeParents: true,
//     observeSlideChildren: !isSafari, // 🔥 Desativa no Safari
//     resizeObserver: true,
//     threshold: isSafari ? 15 : 5,
//     shortSwipes: false,
//     longSwipes: false,
//     className: styles.projetosSwiper
//   };

//   // ... (mantenha o resto do código original) ...

//   return (
//     <div className={styles.galeriaProjetos}>
//       <Swiper {...swiperConfig}>
//         {items.map((item, index) => (
//           <SwiperSlide key={item.slug || item.id || index} className={styles.slide}>
//             {renderSlide(item, index)}
//           </SwiperSlide>
//         ))}
//         <div className={styles.pagination}></div>
//       </Swiper>
//     </div>
//   );
// }

'use client';

import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination, Autoplay } from 'swiper/modules';
import styles from '../styles/GaleriaProjetos.module.css';
import { useSafari } from '../hooks/useSafari';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function SwiperGallery({ 
  items, 
  renderSlide,
  direction = 'vertical',
  speed = 1000,
  onSlideChange,
  onInit
}) {
  const swiperRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const isSafari = useSafari();

  // 🔥 Efeito específico para Safari
  useEffect(() => {
    if (isSafari && isInitialized && swiperRef.current?.swiper) {
      console.log('🚀 Inicializando Swiper com otimizações Safari...');
      
      const swiper = swiperRef.current.swiper;
      
      const loadAllVisibleImages = () => {
        const slidesToLoad = Array.from({ length: Math.min(5, items.length) }, (_, i) => i);
        
        slidesToLoad.forEach(index => {
          const slide = swiper.slides[index];
          if (slide) {
            const images = slide.querySelectorAll('img');
            images.forEach(img => {
              if (img.src && !img.complete) {
                const originalSrc = img.src;
                img.src = originalSrc;
              }
            });
          }
        });
      };

      setTimeout(loadAllVisibleImages, 500);
      swiper.on('slideChange', loadAllVisibleImages);
      
      return () => {
        swiper.off('slideChange', loadAllVisibleImages);
      };
    }
  }, [isSafari, isInitialized, items.length]);

  // Configuração do Swiper
  const swiperConfig = {
    ref: swiperRef,
    direction: direction,
    slidesPerView: 1,
    spaceBetween: 0,
    speed: speed,
    mousewheel: { 
      enabled: true, 
      forceToAxis: true, 
      sensitivity: isSafari ? 1.5 : 1.2,
      thresholdDelta: isSafari ? 10 : 5,
      eventsTarget: 'container'
    },
    keyboard: { 
      enabled: true, 
      onlyInViewport: true 
    },
    pagination: { 
      el: `.${styles.pagination}`,
      clickable: true,
      bulletClass: styles.bullet,
      bulletActiveClass: styles.bulletActive
    },
    lazy: isSafari ? false : {
      enabled: true,
      loadPrevNext: true,
      loadPrevNextAmount: 2,
      loadOnTransitionStart: true,
    },
    preloadImages: isSafari,
    watchSlidesProgress: !isSafari,
    modules: [Mousewheel, Keyboard, Pagination, Autoplay],
    onSlideChange: onSlideChange,
    onInit: (swiper) => {
      setIsInitialized(true);
      onInit?.(swiper);
    },
    observer: true,
    observeParents: true,
    observeSlideChildren: !isSafari,
    resizeObserver: true,
    threshold: isSafari ? 15 : 5,
    // 🔥 CORREÇÃO: Ativar swipes para mobile
    shortSwipes: true,
    longSwipes: true,
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,
    className: styles.projetosSwiper
  };

  useEffect(() => {
    if (isInitialized && swiperRef.current?.swiper) {
      const swiper = swiperRef.current.swiper;
      
      setTimeout(() => {
        swiper.update();
        
        if (swiper.lazy && !isSafari) {
          swiper.lazy.load();
        }
        
        const activeIndex = swiper.activeIndex;
        const slidesToPreload = [activeIndex];
        
        for (let i = 1; i <= 2; i++) {
          if (activeIndex + i < items.length) slidesToPreload.push(activeIndex + i);
          if (activeIndex - i >= 0) slidesToPreload.push(activeIndex - i);
        }
        
        slidesToPreload.forEach(index => {
          const slide = swiper.slides[index];
          if (slide) {
            const images = slide.querySelectorAll('img');
            images.forEach(img => {
              if (img.dataset.src && !img.src) {
                img.src = img.dataset.src;
              }
            });
          }
        });
      }, 100);
    }
  }, [isInitialized, items.length, isSafari]);

  useEffect(() => {
    if (swiperRef.current?.swiper && isInitialized) {
      const swiper = swiperRef.current.swiper;
      
      swiper.slideTo(0, 0);
      swiper.update();
      
      setTimeout(() => {
        if (swiper.lazy && !isSafari) {
          swiper.lazy.load();
        }
      }, 50);
    }
  }, [items, isInitialized, isSafari]);

  return (
    <div className={styles.galeriaProjetos}>
      <Swiper {...swiperConfig}>
        {items.map((item, index) => (
          <SwiperSlide key={item.slug || item.id || index} className={styles.slide}>
            {renderSlide(item, index)}
          </SwiperSlide>
        ))}
        <div className={styles.pagination}></div>
      </Swiper>
    </div>
  );
}