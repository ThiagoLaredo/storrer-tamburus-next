'use client';

import { useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import ClientOnly from "@/components/ClientOnly";
import SlideHome from "@/components/SlideHome";
import { getProjetosDestaque } from "@/services/contentful/home";
import { initPageOpenAnimation } from "@/js/modules/animations";

export default function Home({ projetosDestaque }) {
  useEffect(() => {
    const firstImageUrl = projetosDestaque[0]?.capa;
    initPageOpenAnimation({
      firstSlideSelector: ".SlideHome_slide:first-child",
      firstSlideImageUrl: firstImageUrl,
    });
  }, [projetosDestaque]);

  return (
    <MainLayout title="Home | Storrer Tamburus" hideFooter>
      <ClientOnly fallback={<div className="h-screen w-full bg-black"></div>}>
        <SlideHome projetosDestaque={projetosDestaque} />
      </ClientOnly>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const projetosDestaque = await getProjetosDestaque();
  return { props: { projetosDestaque }, revalidate: 60 };
}
