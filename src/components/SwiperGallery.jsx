
'use client';

import { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination, Autoplay } from 'swiper/modules';
import styles from '../styles/GaleriaProjetos.module.css';

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

  // Dispara quando uma imagem do slide termina de carregar
  const handleImageLoad = () => setImagesLoaded(prev => prev + 1);

  // Atualiza Swiper após todas as imagens carregarem
  useEffect(() => {
    if (imagesLoaded === items.length && items.length > 0 && swiperRef.current && !hasUpdated) {
      setHasUpdated(true);
      setTimeout(() => {
        if (swiperRef.current?.swiper) {
          swiperRef.current.swiper.update();
          swiperRef.current.swiper.updateSize();
          swiperRef.current.swiper.updateSlides();
        }
      }, 300);
    }
  }, [imagesLoaded, items.length, hasUpdated]);

  // Reinicia no slide 0 sempre que os items mudarem (filtro aplicado)
  useEffect(() => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(0, 0);
    }
    setImagesLoaded(0);
    setHasUpdated(false);
  }, [items]);

  return (
    <div className={styles.galeriaProjetos}>
      <Swiper
        ref={swiperRef}
        direction={direction}
        slidesPerView={1}
        spaceBetween={0}
        speed={speed}
        mousewheel={{ enabled: true, forceToAxis: true, sensitivity: 1.2, thresholdDelta: 5 }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        pagination={{ 
          el: `.${styles.pagination}`,
          clickable: true,
          bulletClass: styles.bullet,
          bulletActiveClass: styles.bulletActive
        }}
        modules={[Mousewheel, Keyboard, Pagination, Autoplay]}
        onSlideChange={onSlideChange}
        onInit={onInit}
        observer={true}
        observeParents={true}
        observeSlideChildren={true}
        resizeObserver={true}
        className={styles.projetosSwiper}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.slug || item.id || index} className={styles.slide}>
            {renderSlide(item, index, handleImageLoad)}
          </SwiperSlide>
        ))}
        <div className={styles.pagination}></div>
      </Swiper>
    </div>
  );
}
