
// Pré-carrega imagens para evitar flash
export function preloadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = resolve;
    img.onerror = resolve; // continua mesmo se falhar
  });
}
