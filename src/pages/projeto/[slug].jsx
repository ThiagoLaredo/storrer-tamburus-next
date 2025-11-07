import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { getProjetoBySlug, getAllProjetosSlugs, getTiposProjeto } from '@/services/contentful/projetos';
import ProjetoGallery from '@/components/ProjetoGallery';
import Loader from '@/components/Loader';

export default function ProjetoPage({ projeto, tipos }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  // Geração das meta tags dinâmicas
  const generateMetaDescription = () => {
    if (!projeto) return 'Projeto Storrer Tamburus - Arquitetura e Design';
    
    const { titulo, tipoDoProjeto, descricaoBreve } = projeto.fields;
    const tipoNome = tipoDoProjeto?.fields?.nome || 'Projeto';
    
    if (descricaoBreve) {
      return descricaoBreve;
    }
    
    return `Confira ${titulo}, um ${tipoNome.toLowerCase()} desenvolvido pela Storrer Tamburus. Arquitetura, design e inovação em cada projeto.`;
  };

  const getImageUrl = () => {
    if (!projeto) return '/default-og-image.jpg';

    const { galeriaDeImagens, capa } = projeto.fields;
    
    if (galeriaDeImagens && galeriaDeImagens.length > 0) {
      return `https:${galeriaDeImagens[0].fields.file.url}`;
    } else if (capa) {
      return `https:${capa.fields.file.url}`;
    }
    
    return '/default-og-image.jpg';
  };

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
  const tipoNome = tipoDoProjeto?.fields?.nome || 'Projeto';
  const metaDescription = generateMetaDescription();
  const imageUrl = getImageUrl();
  const url = `https://storrertamburus.com/projeto/${projeto.fields.slug}`;

  const getFiltroAtivo = () => {
    if (!tipoDoProjeto) return '';
    const tipoId = tipoDoProjeto.sys?.id;
    const tipoEncontrado = tipos.find(tipo => tipo.id === tipoId);
    return tipoEncontrado?.slug || '';
  };

  const filtroAtivo = getFiltroAtivo();

  return (
    <MainLayout 
      title={`${titulo} | Storrer Tamburus`}
      description={metaDescription}
      keywords={`${titulo}, ${tipoNome}, Storrer Tamburus, arquitetura, design, projeto, ${tipoNome.toLowerCase()}`}
      image={imageUrl}
      url={url}
      hideNav={true}
      showFilters={true}
      tipos={tipos}
      filtroAtivo={filtroAtivo}
      onFiltroChange={handleFiltroChange}
      hideFooter={false}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": titulo,
        "description": metaDescription,
        "image": imageUrl,
        "author": {
          "@type": "Organization",
          "name": "Storrer Tamburus",
          "url": "https://storrertamburus.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Storrer Tamburus",
          "logo": {
            "@type": "ImageObject",
            "url": "https://storrertamburus.com/logo.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url
        },
        "datePublished": projeto.sys?.createdAt || new Date().toISOString(),
        "dateModified": projeto.sys?.updatedAt || new Date().toISOString()
      }}
    >
      <ProjetoGallery 
        imagens={galeriaDeImagens}
        titulo={titulo}
      />
    </MainLayout>
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