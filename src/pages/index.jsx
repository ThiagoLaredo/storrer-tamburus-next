'use client';
import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import ClientOnly from "@/components/ClientOnly";
import SlideHome from "@/components/SlideHome";
import Loader from "@/components/Loader";
import { getProjetosDestaque } from "@/services/contentful/home";

export default function Home({ projetosDestaque, featuredImage }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const initHome = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 100);
    };

    initHome();
  }, [projetosDestaque]);

  return (
    <MainLayout 
      title="Storrer Tamburus - Arquitetura e Design em São Paulo"
      description="Escritório de arquitetura e design Storrer Tamburus. Projetos residenciais, comerciais e corporativos com excelência e inovação. Confie em nossos arquitetos."
      keywords="arquitetura São Paulo, design de interiores, projetos arquitetônicos, Storrer Tamburus, arquiteto, reforma, construção"
      image={featuredImage || "https://storrertamburus.com.br/og-home-image.jpg"} // 🔥 URL ABSOLUTA AQUI TAMBÉM
      hideFooter={true}
      theme="dark"
    >
      {isLoading && <Loader />}
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
  
  let featuredImage = "https://storrertamburus.com.br/og-home-image.jpg"; {/* 🔥 URL ABSOLUTA AQUI TAMBÉM */}
  if (projetosDestaque && projetosDestaque.length > 0) {
    const primeiroProjeto = projetosDestaque[0];
    if (primeiroProjeto.fields?.capa?.fields?.file?.url) {
      featuredImage = `https:${primeiroProjeto.fields.capa.fields.file.url}?w=1200&h=630&fit=fill`;
    }
  }

  return { 
    props: { 
      projetosDestaque,
      featuredImage 
    }, 
    revalidate: 60 
  };
}