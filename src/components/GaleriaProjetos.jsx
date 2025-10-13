// components/GaleriaProjetos.jsx - VERSÃO FUNCIONAL
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import OptimizedImage from './OptimizedImage';
import SwiperGallery from './SwiperGallery';
import styles from '../styles/GaleriaProjetos.module.css';


export default function GaleriaProjetos({ projetos }) {
  const [animationExecuted, setAnimationExecuted] = useState(false);

  const animateFirstSlide = () => {
  if (animationExecuted) return;

  const firstSlide = document.querySelector(`.${styles.slide}.swiper-slide-active`);
  if (!firstSlide) return;

  const overlay = firstSlide.querySelector(`.${styles.overlay}`);
  const image = firstSlide.querySelector(`.${styles.projetoImagem}`);
  const title = firstSlide.querySelector(`.${styles.projetosTitulo}`);
  const plusIcon = firstSlide.querySelector(`.${styles.projetoPlus}`);

  if (!image || !title || !plusIcon) return;

  // garante que somente essa imagem comece em opacity 0 (inline, sem afetar CSS global)
  const prevInlineOpacity = image.style.opacity; // para restaurar depois (caso haja)
  image.style.opacity = '0';
  // opcional: força também transform/scale inicial para evitar "piscar" de layout
  image.style.transform = 'scale(1.05)';

  const tl = gsap.timeline({
    onComplete: () => {
      // limpa o inline style que colocamos (volta ao normal)
      image.style.opacity = prevInlineOpacity || '';
      image.style.transform = '';
      setAnimationExecuted(true);
    }
  });

  tl.fromTo(
    image,
    { opacity: 0, scale: 1.05 },
    { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
  )
  .to(overlay, {
    opacity: 1,
    duration: 0.8,
    delay: 0.3,
    ease: "power2.out"
  }, "-=0.8")
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
};

  const handleSlideChange = (swiper) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (activeSlide) {
      const activeTitle = activeSlide.querySelector(`.${styles.projetosTitulo}`);
      const activePlus = activeSlide.querySelector(`.${styles.projetoPlus}`);
      
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

//   const renderProjetoSlide = (projeto, index, onImageLoad) => (
//   <div className={styles.projetoSlide}>
//     <OptimizedImage
//       src={projeto.capa}
//       alt={projeto.title}
//       quality={index < 3 ? 75 : 65} // 🔥 Qualidade progressiva
//       priority={index < 3} // 🔥 Apenas 3 primeiras com prioridade
//       className={styles.projetoImagem}
//       containerClassName={styles.imageContainer}
//       sizes="(max-width: 640px) 95vw, (max-width: 1024px) 80vw, 70vw" // 🔥 Tamanhos específicos
//       onLoad={onImageLoad}
//     />
//     {/* ... resto do código ... */}
//   </div>
// );


// components/GaleriaProjetos.jsx
const renderProjetoSlide = (projeto, index) => {
  const handleImageLoad = () => {
    // Dispara animateFirstSlide apenas para a primeira imagem
    if (index === 0 && !animationExecuted) {
      // Pequeno delay para garantir que o DOM atualizou
      setTimeout(animateFirstSlide, 100);
    }
  };

  return (
    <div className={styles.projetoSlide}>
      <OptimizedImage
        src={projeto.capa}
        alt={projeto.title}
        quality={index < 3 ? 75 : 65}
        priority={index < 3}
        className={styles.projetoImagem}
        containerClassName={styles.imageContainer}
        sizes="(max-width: 640px) 95vw, (max-width: 1024px) 80vw, 70vw"
        onLoad={handleImageLoad} // 🔥 Controla o timing da animação
      />
      
      <div className={styles.overlay} style={{ opacity: 0 }} />
      
      <Link href={`/projetos/${projeto.slug}`} className={styles.projetoLink}>
        <h3 className={styles.projetosTitulo}>{projeto.title}</h3>
        <span className={styles.projetoPlus}>
          <svg width="30" height="60" viewBox="0 0 30 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.12997 16.45L8.78247 13.8L23.23 28.2425C23.4629 28.4739 23.6477 28.7491 23.7738 29.0522C23.8999 29.3553 23.9648 29.6804 23.9648 30.0087C23.9648 30.337 23.8999 30.6621 23.7738 30.9652C23.6477 31.2684 23.4629 31.5436 23.23 31.775L8.78247 46.225L6.13247 43.575L19.6925 30.0125L6.12997 16.45Z" fill="#F3ED4F"/>
          </svg>
        </span>
      </Link>
    </div>
  );
};

  if (projetos.length === 0) {
    return (
      <div className={styles.semProjetosContainer}>
        <p className={styles.semProjetos}>Nenhum projeto encontrado</p>
      </div>
    );
  }

  return (
    <div className={styles.galeriaProjetos}>
      <SwiperGallery
        items={projetos}
        renderSlide={renderProjetoSlide}
        direction="vertical"
        speed={1000}
        onSlideChange={handleSlideChange}
        onInit={animateFirstSlide}
      />
    </div>
  );
}