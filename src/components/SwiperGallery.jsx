// components/GaleriaProjetos.jsx
'use client';

import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Mousewheel, Keyboard, Pagination, Autoplay, EffectFade } from 'swiper/modules'; // Adicione Virtual e EffectFade

import 'swiper/css';
import 'swiper/css/virtual'; // Adicione este estilo
import 'swiper/css/pagination';
import 'swiper/css/effect-fade'; // Adicione este estilo

export default function GaleriaProjetos({ projetos }) {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (projetos.length > 0 && swiperRef.current) {
      setTimeout(() => {
        animateFirstSlide();
        swiperRef.current.swiper.update(); // Força atualização do Swiper
      }, 100);
    }
  }, [projetos]);

  // ... mantenha suas funções de animação ...

  return (
    <div className="galeria-projetos">
      <Swiper
        ref={swiperRef}
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        speed={1000}
        modules={[Virtual, Mousewheel, Keyboard, Pagination, Autoplay, EffectFade]} // Adicione Virtual e EffectFade
        virtual={true} // Habilita virtual se estiver usando
        effect="fade" // Habilita efeito fade
        fadeEffect={{ crossFade: true }} // Configura crossfade
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
          clickable: true,
          type: 'bullets' // Especifica o tipo de paginação
        }}
        onSlideChange={handleSlideChange}
        onSlideChangeTransitionStart={handleSlideChangeTransitionStart}
        onInit={(swiper) => {
          animateFirstSlide();
          swiper.update(); // Atualiza o Swiper após inicialização
        }}
        className="projetos-swiper"
        style={{ height: '100vh' }} // Garante altura total
      >
        {/* ... seus slides ... */}
      </Swiper>
    </div>
  );
}