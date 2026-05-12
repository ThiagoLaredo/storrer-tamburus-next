import { createClient } from "contentful";

// Client oficial do Contentful - MESMO que você já tem
export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
});

// Função genérica para buscar entries - MESMA que você já tem
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