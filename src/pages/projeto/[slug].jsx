// 


// src/pages/projeto/[slug].jsx
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { getProjetoBySlug, getAllProjetosSlugs, getTiposProjeto } from '@/services/contentful/projetos';
import ProjetoGallery from '@/components/ProjetoGallery';
import Loader from '@/components/Loader';

export default function ProjetoPage({ projeto, tipos }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Controle de loading para mudanças de rota
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  const handleFiltroChange = (novoFiltro) => {
    if (novoFiltro === 'todos') {
      router.push('/projetos/');
    } else {
      router.push(`/projetos/${novoFiltro}/`);
    }
  };

  // Loading durante fallback ou transições
  if (router.isFallback || isLoading) {
    return <Loader />;
  }

  if (!projeto) {
    return (
      <MainLayout title="Projeto não encontrado">
        <div>Projeto não encontrado</div>
      </MainLayout>
    );
  }

  const { titulo, galeriaDeImagens, tipoDoProjeto } = projeto.fields;

  const getFiltroAtivo = () => {
    if (!tipoDoProjeto) return '';
    const tipoId = tipoDoProjeto.sys?.id;
    const tipoEncontrado = tipos.find(tipo => tipo.id === tipoId);
    return tipoEncontrado?.slug || '';
  };

  const filtroAtivo = getFiltroAtivo();

  return (
    <>
      <Head>
        <title>{titulo} | Storrer Tamburus</title>
      </Head>

      <MainLayout 
        title={`${titulo} | Storrer Tamburus`}
        hideNav={true}
        showFilters={true}
        tipos={tipos}
        filtroAtivo={filtroAtivo}
        onFiltroChange={handleFiltroChange}
        hideFooter={false}
      >
        <ProjetoGallery 
          imagens={galeriaDeImagens}
          titulo={titulo}
        />
      </MainLayout>
    </>
  );
}

export async function getStaticPaths() {
  const projetos = await getAllProjetosSlugs();
  
  const paths = projetos.map((projeto) => ({
    params: { slug: projeto.fields.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const [projeto, tipos] = await Promise.all([
    getProjetoBySlug(params.slug),
    getTiposProjeto()
  ]);

  if (!projeto) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      projeto,
      tipos,
    },
    revalidate: 60,
  };
}