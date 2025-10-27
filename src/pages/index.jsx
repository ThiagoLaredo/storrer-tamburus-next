// 'use client';

// import { useEffect } from "react";
// import MainLayout from "@/layouts/MainLayout";
// import ClientOnly from "@/components/ClientOnly";
// import SlideHome from "@/components/SlideHome";
// import { getProjetosDestaque } from "@/services/contentful/home";
// import { initPageOpenAnimation } from "@/js/modules/animations";

// export default function Home({ projetosDestaque }) {
//   useEffect(() => {
//     const firstImageUrl = projetosDestaque[0]?.capa;
//     initPageOpenAnimation({
//       firstSlideSelector: ".SlideHome_slide:first-child",
//       firstSlideImageUrl: firstImageUrl,
//     });
//   }, [projetosDestaque]);

//   return (
//     <MainLayout title="Home | Storrer Tamburus" hideFooter>
//       <ClientOnly fallback={<div className="h-screen w-full bg-black"></div>}>
//         <SlideHome projetosDestaque={projetosDestaque} />
//       </ClientOnly>
      
//     </MainLayout>
//   );
// }

// export async function getStaticProps() {
//   const projetosDestaque = await getProjetosDestaque();
//   return { props: { projetosDestaque }, revalidate: 60 };
// }


'use client';

import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import ClientOnly from "@/components/ClientOnly";
import SlideHome from "@/components/SlideHome";
import Loader from "@/components/Loader";
import { getProjetosDestaque } from "@/services/contentful/home";
import { initPageOpenAnimation } from "@/js/modules/animations";

export default function Home({ projetosDestaque }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const initHome = async () => {
      // Mostrar loading
      setIsLoading(true);
      
      // Aguardar um pouco para o loading ser visível
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Inicializar animação
      const firstImageUrl = projetosDestaque[0]?.capa;
      initPageOpenAnimation({
        firstSlideSelector: ".SlideHome_slide:first-child",
        firstSlideImageUrl: firstImageUrl,
      });
      
      // Esconder loading e mostrar conteúdo
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 100);
    };

    initHome();
  }, [projetosDestaque]);

  return (
    <MainLayout title="Home | Storrer Tamburus" hideFooter>
      {/* Loading */}
      {isLoading && <Loader />}
      
      {/* Conteúdo com transição */}
      <div style={{
        opacity: showContent ? 1 : 0,
        transition: 'opacity 0.6s ease-in-out'
      }}>
        <ClientOnly fallback={<div className="h-screen w-full bg-black"></div>}>
          <SlideHome projetosDestaque={projetosDestaque} />
        </ClientOnly>
      </div>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const projetosDestaque = await getProjetosDestaque();
  return { props: { projetosDestaque }, revalidate: 60 };
}