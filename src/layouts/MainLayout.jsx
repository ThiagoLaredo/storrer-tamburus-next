import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ 
  children, 
  title = "Storrer Tamburus - Arquitetura e Design", 
  description = "Storrer Tamburus - Escritório de arquitetura e design. Projetos residenciais, comerciais e corporativos com inovação e excelência.",
  keywords = "arquitetura, design, Storrer Tamburus, projetos residenciais, arquitetura comercial, design de interiores, São Paulo",
  image = "https://storrertamburus.com.br/default-og-image.jpg", // ✅ URL absoluta
  hideFooter = false,
  hideNav = false,
  showFilters = false,
  tipos = [],
  filtroAtivo,  
  onFiltroChange,
  theme = 'dark',
  canonicalUrl,
  noindex = false,
  structuredData,
  ogImageWidth = 1200, // 🔥 NOVO
  ogImageHeight = 630, // 🔥 NOVO
  ogImageAlt = "Storrer Tamburus - Arquitetura e Design", // 🔥 NOVO
  twitterCardType = "summary_large_image", // 🔥 NOVO
}) {
  const router = useRouter();
  const siteUrl = "https://storrertamburus.com.br/";
  
  // 🔥 CONSTRUIR URL COMPLETA DA IMAGEM
  const getFullImageUrl = (imgPath) => {
    // Se já for uma URL completa
    if (imgPath.startsWith('http')) return imgPath;
    
    // Se for um caminho relativo ou absoluto no site
    if (imgPath.startsWith('/')) {
      return `${siteUrl}${imgPath}`;
    }
    
    // Padrão
    return `${siteUrl}/${imgPath}`;
  };
  
  // 🔥 DADOS PADRÃO PARA SEO E REDES SOCIAIS
  const seoData = {
    title: title,
    description: description,
    keywords: keywords,
    url: canonicalUrl || `${siteUrl}${router.asPath}`,
    image: getFullImageUrl(image), // ✅ Agora com URL absoluta
    siteName: "Storrer Tamburus",
    locale: "pt_BR",
    twitterHandle: "@storrertamburus",
    ogImageWidth: ogImageWidth,
    ogImageHeight: ogImageHeight,
    ogImageAlt: ogImageAlt,
    twitterCardType: twitterCardType
  };

  // 🔥 DADOS ESTRUTURADOS PADRÃO
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": seoData.title,
    "description": seoData.description,
    "url": seoData.url,
    "publisher": {
      "@type": "Organization",
      "name": "Storrer Tamburus",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo/logo.png`
      }
    }
  };

  return (
    <div>
      <Head>
        {/* 🔥 METADADOS BÁSICOS */}
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} key="description" />
        <meta name="keywords" content={seoData.keywords} key="keywords" />
        
        {/* 🔥 CONTROLE DE INDEXAÇÃO */}
        {noindex ? (
          <meta name="robots" content="noindex, nofollow" key="robots" />
        ) : (
          <meta name="robots" content="index, follow, max-image-preview:large" key="robots" />
        )}
        
        {/* 🔥 OPEN GRAPH - FACEBOOK, LINKEDIN, WHATSAPP */}
        <meta property="og:title" content={seoData.title} key="og-title" />
        <meta property="og:description" content={seoData.description} key="og-description" />
        <meta property="og:image" content={seoData.image} key="og-image" />
        <meta property="og:image:width" content={seoData.ogImageWidth.toString()} key="og-image-width" />
        <meta property="og:image:height" content={seoData.ogImageHeight.toString()} key="og-image-height" />
        <meta property="og:image:alt" content={seoData.ogImageAlt} key="og-image-alt" />
        <meta property="og:url" content={seoData.url} key="og-url" />
        <meta property="og:type" content="website" key="og-type" />
        <meta property="og:site_name" content={seoData.siteName} key="og-site-name" />
        <meta property="og:locale" content={seoData.locale} key="og-locale" />
        
        {/* 🔥 TWITTER CARD */}
        <meta name="twitter:card" content={seoData.twitterCardType} key="twitter-card" />
        <meta name="twitter:title" content={seoData.title} key="twitter-title" />
        <meta name="twitter:description" content={seoData.description} key="twitter-description" />
        <meta name="twitter:image" content={seoData.image} key="twitter-image" />
        <meta name="twitter:image:alt" content={seoData.ogImageAlt} key="twitter-image-alt" />
        <meta name="twitter:site" content={seoData.twitterHandle} key="twitter-site" />
        <meta name="twitter:creator" content={seoData.twitterHandle} key="twitter-creator" />
        
        {/* 🔥 META TAG PARA LINKEDIN (recomendado) */}
        <meta name="image" property="og:image" content={seoData.image} key="linkedin-image" />
        
        {/* 🔥 CANONICAL URL */}
        <link rel="canonical" href={seoData.url} key="canonical" />
        
        {/* 🔥 VIEWPORT E CHARSET */}
        <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
        <meta charSet="utf-8" key="charset" />
        
        {/* 🔥 FAVICON E APP ICONS */}
        <link rel="icon" href="/favicon.ico" data-next-head="" />
        <link rel="icon" type="image/png" href="/images/favicon/favicon-32x32.png" data-next-head="" />
        
        {/* 🔥 META ADICIONAIS PARA MOBILE */}
        <meta name="theme-color" content="#000000" key="theme-color" />
        <meta name="mobile-web-app-capable" content="yes" key="mobile-web-app" />
        <meta name="apple-mobile-web-app-capable" content="yes" key="apple-mobile-web-app" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" key="apple-status-bar" />
        <meta name="apple-mobile-web-app-title" content={seoData.siteName} key="apple-app-title" />
        
        {/* 🔥 SCHEMA.ORG STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData || defaultStructuredData)
          }}
          key="structured-data"
        />
      </Head>
      
      <Header 
        hideNav={hideNav}
        showFilters={showFilters}
        tipos={tipos}
        filtroAtivo={filtroAtivo}
        onFiltroChange={onFiltroChange}
        theme={theme}
      />
      
      <main className="flex-1">{children}</main>
      
      {!hideFooter && <Footer theme={theme} />}
    </div>
  );
}