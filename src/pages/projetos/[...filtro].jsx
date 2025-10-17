import { useRouter } from 'next/router';
import Head from 'next/head';
import GaleriaProjetos from '@/components/GaleriaProjetos';
import styles from '@/styles/Projetos.module.css';
import { getAllProjetos, getTiposProjeto } from '@/services/contentful/projetos';
import MainLayout from "@/layouts/MainLayout";

export default function ProjetosFiltroPage({ projetos, tipos, filtroSlug }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  // ✅ NAVEGAÇÃO ENTRE FILTROS
  const handleFiltroChange = (novoFiltro) => {
    if (novoFiltro === 'todos') {
      router.push('/projetos/');
    } else {
      router.push(`/projetos/${novoFiltro}/`);
    }
  };

  const projetosFiltrados = projetos.filter(projeto => 
    projeto.tipoSlug === filtroSlug
  );

  const tipoAtivo = tipos.find(tipo => tipo.slug === filtroSlug);
  const pageTitle = `${tipoAtivo?.nome || 'Projetos'} | Storrer Tamburus`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`Confira nossos projetos de ${tipoAtivo?.nome.toLowerCase() || 'arquitetura'}.`} />
      </Head>

      <MainLayout 
        title={pageTitle}
        hideNav={true}
        showFilters={true}
        tipos={tipos}
        filtroAtivo={filtroSlug}
        onFiltroChange={handleFiltroChange}
        hideFooter={false}
      >
        <main className={styles.projetosPage}>
          <GaleriaProjetos projetos={projetosFiltrados} />
        </main>
      </MainLayout>
    </>
  );
}

export async function getStaticPaths() {
  const tipos = await getTiposProjeto();
  
  const paths = tipos.map((tipo) => ({
    params: { filtro: [tipo.slug] },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const [projetos, tipos] = await Promise.all([
    getAllProjetos(),
    getTiposProjeto()
  ]);

  const filtroSlug = params.filtro[0];

  return {
    props: {
      projetos,
      tipos,
      filtroSlug,
    },
    revalidate: 60,
  };
}