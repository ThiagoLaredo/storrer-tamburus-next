// pages/projetos.jsx
'use client';

import { useState } from 'react';
import GaleriaProjetos from '@/components/GaleriaProjetos';
import styles from '@/styles/Projetos.module.css';
import { getAllProjetos } from '@/services/contentful/projetos';
import { getTiposProjeto } from '@/services/contentful/projetos';
import MainLayout from "@/layouts/MainLayout";

// Componente principal
export default function ProjetosPage({ projetos, tipos }) {
  const [filtroAtivo, setFiltroAtivo] = useState(tipos[0]?.slug || '');

  const projetosFiltrados = projetos.filter(projeto => 
    filtroAtivo ? projeto.tipoSlug === filtroAtivo : true
  );

  return (
    <MainLayout 
      title="Projetos | Storrer Tamburus" 
      hideNav={true}           // 🔥 Esconde menu normal
      showFilters={true}       // 🔥 MOSTRA filtros no header
      tipos={tipos}            // 🔥 Passa tipos para filtros
      filtroAtivo={filtroAtivo} // 🔥 Passa estado
      onFiltroChange={setFiltroAtivo} // 🔥 Passa handler
      hideFooter={false}
    >
      <main className={styles.projetosPage}>
        {/* 🔥 REMOVE o Filtros component antigo - agora está no header */}
        <GaleriaProjetos projetos={projetosFiltrados} />
      </main>
    </MainLayout>
  );
}

// Busca dados no servidor
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