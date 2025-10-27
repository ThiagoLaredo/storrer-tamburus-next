import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react'; // 🔥 ADICIONE ESTA IMPORT
import GaleriaProjetos from '@/components/GaleriaProjetos';
import styles from '@/styles/Projetos.module.css';
import { getAllProjetos, getTiposProjeto } from '@/services/contentful/projetos';
import MainLayout from "@/layouts/MainLayout";

export default function ProjetosFiltroPage({ projetos, tipos, filtroSlug }) {
  const router = useRouter();

  // 🔥 VERIFICAÇÃO DE SEGURANÇA - se por algum motivo não for comercial, redireciona
  useEffect(() => {
    if (router.isReady && filtroSlug !== 'comercial' && router.asPath === '/projetos/') {
      router.replace('/projetos/comercial/');
    }
  }, [router.isReady, filtroSlug, router]);

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

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

  // 🔥 ADICIONE o path vazio para capturar /projetos/
  paths.push({ 
    params: { filtro: [] } 
  });

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

  // 🔥 FORÇA comercial como padrão em TODAS as situações
  let filtroSlug = 'comercial'; // 🔥 VALOR PADRÃO

  // Se veio um filtro na URL, usa ele
  if (params.filtro && params.filtro.length > 0) {
    filtroSlug = params.filtro[0];
  }

  // 🔥 VERIFICA se o filtro é válido, se não for, força comercial
  const filtroValido = tipos.find(tipo => tipo.slug === filtroSlug);
  if (!filtroValido) {
    filtroSlug = 'comercial';
  }

  return {
    props: {
      projetos,
      tipos,
      filtroSlug, // 🔥 SEMPRE será comercial ou um filtro válido
    },
    revalidate: 60,
  };
}