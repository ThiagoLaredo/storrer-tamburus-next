import { fetchEntries } from './client.js';

// Função para buscar TODOS os projetos (com informações de tipo)
export async function getAllProjetos() {
  const response = await fetchEntries('projeto');
  
  return response.items.map(item => {
    const capaId = item.fields.capa?.sys?.id;
    const capaAsset = response.includes?.Asset?.find((a) => a.sys.id === capaId);

    let capaUrl = '';
    let blurDataURL = ''; // 🔥 Nova variável para o placeholder

    if (capaAsset?.fields?.file?.url) {
      const urlBase = `https:${capaAsset.fields.file.url}`;
      
      // Imagem principal otimizada
      capaUrl = `${urlBase}?w=1920&fm=webp&q=80`;
      
      // 🔥 Placeholder: imagem miniatura para o efeito blur
      blurDataURL = `${urlBase}?w=10&h=6&fit=fill&fm=webp&q=30`;
    }

    // Tipo do projeto - IMPORTANTE para os filtros
    let tipoSlug = 'sem-tipo';
    if (item.fields?.tipoDoProjeto?.sys?.id) {
      const tipoId = item.fields.tipoDoProjeto.sys.id;
      const tipoAsset = response.includes?.Entry?.find((e) => e.sys.id === tipoId);
      if (tipoAsset?.fields?.slug) {
        tipoSlug = tipoAsset.fields.slug;
      }
    }

    return {
      id: item.sys.id,
      title: item.fields.titulo || '',
      slug: item.fields.slug || '',
      capa: capaUrl,
      blurDataURL: blurDataURL, // 🔥 Adiciona o placeholder
      tipoSlug: tipoSlug,
      destaque: item.fields.destaque || false
    };
  });
}

export async function getTiposProjeto() {
  const response = await fetchEntries('tipoDeProjeto');
  
  const tipos = response.items.map(item => ({
    id: item.sys.id,
    nome: item.fields.nome || '',
    slug: item.fields.slug || ''
  }));

  // Ordenar os tipos: comercial, corporativo, residencial
  const ordemDesejada = ['comercial', 'corporativo', 'residencial'];
  tipos.sort((a, b) => {
    return ordemDesejada.indexOf(a.slug) - ordemDesejada.indexOf(b.slug);
  });

  return tipos;
}

// Buscar projeto individual pelo slug com todas as informações
export async function getProjetoBySlug(slug) {
  try {
    const response = await fetchEntries('projeto', {
      'fields.slug': slug,
      limit: 1,
      include: 2 // INCLUI entradas linked (tipoDoProjeto, galeriaDeImagens)
    });

    return response.items[0] || null;
  } catch (error) {
    console.error('Erro ao buscar projeto por slug:', error);
    return null;
  }
}

// Buscar apenas slugs para geração estática
export async function getAllProjetosSlugs() {
  try {
    const response = await fetchEntries('projeto', {
      select: 'fields.slug',
      limit: 1000,
    });

    return response.items;
  } catch (error) {
    console.error('Erro ao buscar slugs dos projetos:', error);
    return [];
  }
}