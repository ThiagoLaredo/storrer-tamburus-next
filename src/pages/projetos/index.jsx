import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import GaleriaProjetos from '@/components/GaleriaProjetos';
import styles from '@/styles/Projetos.module.css';
import { getAllProjetos, getTiposProjeto } from '@/services/contentful/projetos';
import MainLayout from "@/layouts/MainLayout";

export default function ProjetosPage({ projetos, tipos }) {
  const router = useRouter();
  const [filtroAtivo, setFiltroAtivo] = useState('todos');

  // ✅ LÊ O FILTRO DA URL - página principal /projetos/
  useEffect(() => {
    if (router.isReady) {
      // Na página /projetos/, sempre mostra "todos"
      setFiltroAtivo('todos');
    }
  }, [router.isReady]);

  // ✅ ATUALIZA A URL QUANDO O FILTRO MUDAR
  const handleFiltroChange = (novoFiltro) => {
    if (novoFiltro === 'todos') {
      router.push('/projetos/', undefined, { shallow: true });
    } else {
      router.push(`/projetos/${novoFiltro}/`, undefined, { shallow: true });
    }
  };

  const projetosFiltrados = projetos.filter(projeto => 
    filtroAtivo === 'todos' ? true : projeto.tipoSlug === filtroAtivo
  );

  return (
    <>
      <Head>
        <title>Projetos | Storrer Tamburus</title>
        <meta name="description" content="Explore todos os projetos de arquitetura da Storrer Tamburus. Projetos residenciais, comerciais e corporativos." />
      </Head>

      <MainLayout 
        title="Projetos | Storrer Tamburus"
        hideNav={true}
        showFilters={true}
        tipos={tipos}
        filtroAtivo={filtroAtivo}
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

export async function getStaticProps() {
  try {
    const [projetos, tipos] = await Promise.all([
      getAllProjetos(),
      getTiposProjeto()
    ]);

    return { 
      props: { 
        projetos,
        tipos
      }, 
      revalidate: 60 
    };
  } catch (error) {
    console.error('Erro no getStaticProps:', error);
    return { 
      props: { 
        projetos: [],
        tipos: []
      } 
    };
  }
}