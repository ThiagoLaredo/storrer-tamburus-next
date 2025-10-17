// 

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import GaleriaProjetos from '@/components/GaleriaProjetos';
import styles from '@/styles/Projetos.module.css';
import { getAllProjetos } from '@/services/contentful/projetos';
import { getTiposProjeto } from '@/services/contentful/projetos';
import MainLayout from "@/layouts/MainLayout";

// Componente principal
export default function ProjetosPage({ projetos, tipos }) {
  const router = useRouter();
  const [filtroAtivo, setFiltroAtivo] = useState(tipos[0]?.slug || '');

  // 🔥 LÊ O FILTRO DA URL QUANDO A PÁGINA CARREGA
  useEffect(() => {
    if (router.isReady && router.query.filtro) {
      const filtroDaUrl = router.query.filtro;
      // Verifica se o filtro da URL é válido
      const filtroValido = tipos.find(tipo => tipo.slug === filtroDaUrl);
      if (filtroValido) {
        setFiltroAtivo(filtroDaUrl);
      }
    }
  }, [router.isReady, router.query.filtro, tipos]);

  // 🔥 ATUALIZA A URL QUANDO O FILTRO MUDAR (sem recarregar a página)
  const handleFiltroChange = (novoFiltro) => {
    setFiltroAtivo(novoFiltro);
    
    // Atualiza a URL sem recarregar a página
    const params = new URLSearchParams();
    if (novoFiltro && novoFiltro !== 'todos') {
      params.set('filtro', novoFiltro);
    }
    
    const novaUrl = params.toString() ? `/projetos?${params.toString()}` : '/projetos';
    router.push(novaUrl, novaUrl, { shallow: true });
  };

  const projetosFiltrados = projetos.filter(projeto => 
    filtroAtivo && filtroAtivo !== 'todos' ? projeto.tipoSlug === filtroAtivo : true
  );

  return (
    <MainLayout 
      title="Projetos | Storrer Tamburus" 
      hideNav={true}
      showFilters={true}
      tipos={tipos}
      filtroAtivo={filtroAtivo}
      onFiltroChange={handleFiltroChange} // 🔥 Usa a nova função
      hideFooter={false}
    >
      <main className={styles.projetosPage}>
        <GaleriaProjetos projetos={projetosFiltrados} />
      </main>
    </MainLayout>
  );
}

// Busca dados no servidor (mantido igual)
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