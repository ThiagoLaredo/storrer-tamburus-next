import { useState, useEffect } from 'react';
import { getAllProjetos } from '@/services/contentful/projetos';
import { getTiposProjeto } from '@/services/contentful/projetos';

export function useProjetosData() {
  const [projetos, setProjetos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);
        
        // Carrega projetos e tipos em paralelo
        const [projetosData, tiposData] = await Promise.all([
          getAllProjetos(),
          getTiposProjeto()
        ]);

        setProjetos(projetosData);
        setTipos(tiposData);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao carregar dados:', err);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  return { projetos, tipos, loading, error };
}