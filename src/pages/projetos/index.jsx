// 

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import MainLayout from "@/layouts/MainLayout";
import styles from '@/styles/Projetos.module.css';
import Loader from '@/components/Loader'; // 🔥 Importe o Loader
import { getAllProjetos, getTiposProjeto } from '@/services/contentful/projetos';

export default function ProjetosPage({ projetos, tipos }) {
  const router = useRouter();

  // 🔥 REDIRECIONAMENTO IMEDIATO para comercial
  useEffect(() => {
    router.replace('/projetos/comercial/');
  }, [router]);

  // 🔥 PÁGINA DE FALLBACK (enquanto redireciona)
  return (
    <>
      <Head>
        <title>Projetos | Storrer Tamburus</title>
        <meta name="description" content="Explore todos os projetos de arquitetura da Storrer Tamburus." />
      </Head>

      <MainLayout 
        title="Projetos | Storrer Tamburus"
        hideNav={true}
        showFilters={true}
        tipos={tipos}
        filtroAtivo="comercial"
        onFiltroChange={(novoFiltro) => {
          router.push(`/projetos/${novoFiltro}/`);
        }}
        hideFooter={false}
      >
        <main className={styles.projetosPage}>
          <Loader /> {}
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