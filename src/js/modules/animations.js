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


export function initPageOpenAnimation() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

  // === PAGINATION ===
  tl.fromTo(
    ".swiper-pagination",
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.6 },
    "-=0.3"
  );

  // === FOOTER ===
  tl.fromTo(
    "footer",
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    "-=0.3"
  );

  tl.fromTo(
    "footer ul li",
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
    "-=0.4"
  );

  tl.fromTo(
    "footer .instagramFooter",
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5 },
    "-=0.3"
  );
}
