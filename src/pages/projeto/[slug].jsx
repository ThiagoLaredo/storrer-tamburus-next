import { useRouter } from 'next/router';
import Head from 'next/head';
import MainLayout from '@/layouts/MainLayout';
import { getProjetoBySlug, getAllProjetosSlugs, getTiposProjeto } from '@/services/contentful/projetos';
import ProjetoGallery from '@/components/ProjetoGallery';
import styles from '@/styles/Projeto.module.css';

export default function ProjetoPage({ projeto, tipos }) {
  const router = useRouter();

  // ✅ NAVEGAÇÃO PARA PÁGINA DE PROJETOS
  const handleFiltroChange = (novoFiltro) => {
    if (novoFiltro === 'todos') {
      router.push('/projetos/');
    } else {
      router.push(`/projetos/${novoFiltro}/`);
    }
  };

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  if (!projeto) {
    return (
      <MainLayout title="Projeto não encontrado">
        <div>Projeto não encontrado</div>
      </MainLayout>
    );
  }

  const { titulo, galeriaDeImagens, tipoDoProjeto } = projeto.fields;

  // ✅ DETERMINA FILTRO ATIVO
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
        <div className={styles.projetoPage}>
          <ProjetoGallery 
            imagens={galeriaDeImagens}
            titulo={titulo}
          />
        </div>
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