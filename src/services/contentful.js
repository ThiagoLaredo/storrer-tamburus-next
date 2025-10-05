// const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
// const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
// const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master';
// const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

// export async function fetchEntries(contentType, queryParams = {}) {
//   let url = `${BASE_URL}/entries?access_token=${ACCESS_TOKEN}&content_type=${contentType}`;
  
//   const fixedParams = { include: 2 };
//   const allParams = { ...fixedParams, ...queryParams };
//   const params = new URLSearchParams();

//   for (const [key, value] of Object.entries(allParams)) {
//     if (value !== undefined && value !== null) {
//       params.append(key, key === 'fields.destaque' ? (value ? 'true' : 'false') : value);
//     }
//   }

//   url += `&${params.toString()}`;

//   try {
//     const res = await fetch(url);
//     if (!res.ok) throw new Error(`Erro ${res.status}: ${await res.text()}`);
//     return await res.json();
//   } catch (error) {
//     console.error('[Contentful] Falha na requisição:', error.message);
//     return { items: [], includes: {} };
//   }
// }

// // Função específica para home (apenas destaque)
// export async function getProjetosDestaque(limit = 8) {
//   const response = await fetchEntries('projeto', { 'fields.destaque': true, limit });

//   const destaques = response.items.map(item => {
//     const capaId = item.fields.capa?.sys?.id;
//     const capaAsset = response.includes?.Asset?.find(a => a.sys.id === capaId);

//     const capaUrl = capaAsset?.fields?.file?.url
//       ? `https:${capaAsset.fields.file.url}?w=1920&fm=webp&q=80` // otimização
//       : '';

//     return {
//       id: item.sys.id,
//       title: item.fields.titulo || '',
//       slug: item.fields.slug || '',
//       capa: capaUrl,
//     };
//   });

//   return destaques;
// }


import { createClient } from "contentful";

// Client oficial do Contentful
export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
});

// Função genérica para buscar entries
export async function fetchEntries(contentType, queryParams = {}) {
  try {
    const fixedParams = { include: 2, content_type: contentType };
    const allParams = { ...fixedParams, ...queryParams };
    const res = await client.getEntries(allParams);
    return res;
  } catch (error) {
    console.error("[Contentful] Falha na requisição:", error.message);
    return { items: [], includes: {} };
  }
}

// Função para projetos em destaque
export async function getProjetosDestaque(limit = 8) {
  const response = await fetchEntries("projeto", {
    "fields.destaque": true,
    limit,
  });

  const destaques = response.items.map((item) => {
    const capaId = item.fields.capa?.sys?.id;
    const capaAsset = response.includes?.Asset?.find(
      (a) => a.sys.id === capaId
    );

    const capaUrl = capaAsset?.fields?.file?.url
      ? `https:${capaAsset.fields.file.url}?w=1920&fm=webp&q=80`
      : "";

    return {
      id: item.sys.id,
      title: item.fields.titulo || "",
      slug: item.fields.slug || "",
      capa: capaUrl,
    };
  });

  return destaques;
}
