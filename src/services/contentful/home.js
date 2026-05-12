import { fetchEntries } from './client.js';

// SUA FUNÇÃO ATUAL - mantida exatamente como está
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