import { fetchEntries } from './client.js';

export async function getAllProjetos() {
  const response = await fetchEntries('projeto');
  
  return response.items.map(item => {
    const capaId = item.fields.capa?.sys?.id;
    const capaAsset = response.includes?.Asset?.find((a) => a.sys.id === capaId);

    let capaUrl = '';
    let blurDataURL = '';

    if (capaAsset?.fields?.file?.url) {
      const urlBase = `https:${capaAsset.fields.file.url}`;
      
      // 🔥 URL LIMPA - SEM PARÂMETROS (o loader vai adicionar)
      capaUrl = urlBase;
      
      // 🔥 PLACEHOLDER OTIMIZADO
      blurDataURL = `${urlBase}?w=20&q=10&fm=webp`;
    }

    // ... resto do código permanece igual
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
      blurDataURL: blurDataURL,
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