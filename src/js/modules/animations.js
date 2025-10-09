import { gsap } from "gsap";

// Pré-carrega imagens para evitar flash
export function preloadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = resolve;
    img.onerror = resolve; // continua mesmo se falhar
  });
}

// export async function initPageOpenAnimation({
//   firstSlideSelector = ".SlideHome_slide:first-child",
//   firstSlideImageUrl = null,
//   overlaySelector = ".SlideHome_sliderOverlay"
// } = {}) {
//   // Pré-carrega a primeira imagem do slider
//   if (firstSlideImageUrl) {
//     await preloadImage(firstSlideImageUrl);
//   }

//   const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

//   // Logo entra primeiro
//   tl.fromTo("header .logo", 
//     { opacity: 0, y: -20 }, 
//     { opacity: 1, y: 0, duration: 1 }
//   );

//   // Header inteiro entra logo depois
//   tl.fromTo(
//     "header",
//     { y: -50, opacity: 0 },
//     { y: 0, opacity: 1, duration: 1 },
//     "-=0.7"
//   );

//   // Primeira imagem do slider
//   tl.fromTo(
//     firstSlideSelector,
//     { opacity: 0, scale: 1.05 },
//     { opacity: 1, scale: 1, duration: 1 },
//     "-=0.5"
//   );

//   // Overlay entra DEPOIS da imagem estar totalmente visível
//   tl.fromTo(
//     overlaySelector,
//     { opacity: 0 },
//     { opacity: 1, duration: 0.8, ease: "power2.out" },
//     "-=0.2" // Inicia 0.2s antes do final da animação da imagem
//   );

//   // Footer entra por último
//   tl.fromTo(
//     "footer", 
//     { y: 50, opacity: 0 }, 
//     { y: 0, opacity: 1 }, 
//     "-=0.5"
//   );

//   return tl;
// }


// js/modules/animations.js
export async function initPageOpenAnimation({
  firstSlideSelector = ".SlideHome_slide:first-child",
  firstSlideImageUrl = null,
  overlaySelector = ".SlideHome_sliderOverlay"
} = {}) {
  if (firstSlideImageUrl) {
    await preloadImage(firstSlideImageUrl);
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

  // Logo entra primeiro
  tl.fromTo("header .logo", 
    { opacity: 0, y: -20 }, 
    { opacity: 1, y: 0, duration: 1 }
  );

  // 🔥 FILTROS entram junto com o header
  tl.fromTo(
    "header .filtroBtn",
    { opacity: 0, x: 20 },
    { opacity: 1, x: 0, duration: 0.8, stagger: 0.1 },
    "-=0.5" // Sobreposição com a animação do logo
  );

  // Header inteiro entra logo depois
  tl.fromTo(
    "header",
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 },
    "-=0.7"
  );

  // Primeira imagem do slider
  tl.fromTo(
    firstSlideSelector,
    { opacity: 0, scale: 1.05 },
    { opacity: 1, scale: 1, duration: 1 },
    "-=0.5"
  );

  // Overlay entra DEPOIS da imagem
  tl.fromTo(
    overlaySelector,
    { opacity: 0 },
    { opacity: 1, duration: 0.8, ease: "power2.out" },
    "-=0.2"
  );

  // Footer entra por último
  tl.fromTo(
    "footer", 
    { y: 50, opacity: 0 }, 
    { y: 0, opacity: 1 }, 
    "-=0.5"
  );

  // 🔥 MENU DO FOOTER animação específica
  tl.fromTo(
    "footer .menuFooter li",
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
    "-=0.3"
  );

  return tl;
}