// components/SwiperGallery.jsx - VERSÃO CORRIGIDA
'use client';

import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination, Autoplay } from 'swiper/modules';
import styles from '../styles/GaleriaProjetos.module.css'; // 🔥 IMPORTE OS ESTILOS

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
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [hasUpdated, setHasUpdated] = useState(false);

  // Contador para imagens carregadas
  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  useEffect(() => {
    if (imagesLoaded === items.length && 
        items.length > 0 && 
        swiperRef.current && 
        !hasUpdated) {
      
      console.log('Todas as imagens carregadas, atualizando Swiper...');
      setHasUpdated(true);
      
      setTimeout(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
          swiperRef.current.swiper.update();
          swiperRef.current.swiper.updateSize();
          swiperRef.current.swiper.updateSlides();
          console.log('Swiper atualizado!');
        }
      }, 300);
    }
  }, [imagesLoaded, items.length, hasUpdated]);

  return (
    <div className={styles.galeriaProjetos}> {/* 🔥 USE A CLASE DO MODULE */}
      <Swiper
        ref={swiperRef}
        direction={direction}
        slidesPerView={1}
        spaceBetween={0}
        speed={speed}
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
          el: `.${styles.pagination}`, // 🔥 USE A CLASSE DO MODULE
          clickable: true,
          bulletClass: styles.bullet, // 🔥 ADICIONE ISSO
          bulletActiveClass: styles.bulletActive // 🔥 ADICIONE ISSO
        }}
        modules={[Mousewheel, Keyboard, Pagination, Autoplay]}
        onSlideChange={onSlideChange}
        onInit={onInit}
        observer={true}
        observeParents={true}
        observeSlideChildren={true}
        resizeObserver={true}
        className={styles.projetosSwiper} // 🔥 USE A CLASSE DO MODULE
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.slug || item.id || index} className={styles.slide}> {/* 🔥 ADICIONE A CLASSE */}
            {renderSlide(item, index, handleImageLoad)}
          </SwiperSlide>
        ))}
        
        <div className={styles.pagination}></div> {/* 🔥 USE A CLASSE DO MODULE */}
      </Swiper>
    </div>
  );
}