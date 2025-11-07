import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ 
  children, 
  title = "Storrer Tamburus - Arquitetura e Design", 
  description = "Storrer Tamburus - Escritório de arquitetura e design. Projetos residenciais, comerciais e corporativos com inovação e excelência.",
  keywords = "arquitetura, design, Storrer Tamburus, projetos residenciais, arquitetura comercial, design de interiores, São Paulo",
  image = "/default-og-image.jpg",
  hideFooter = false,
  hideNav = false,
  showFilters = false,
  tipos = [],
  filtroAtivo,  
  onFiltroChange,
  theme = 'dark',
  canonicalUrl, // 🔥 URL canônica personalizada
  noindex = false, // 🔥 Para páginas que não devem ser indexadas
  structuredData, // 🔥 Dados estruturados personalizados
}) {
  const router = useRouter();
  
  // 🔥 DADOS PADRÃO PARA SEO E REDES SOCIAIS
  const seoData = {
    title: title,
    description: description,
    keywords: keywords,
    url: canonicalUrl || `https://storrertamburus.com${router.asPath}`,
    image: image,
    siteName: "Storrer Tamburus",
    locale: "pt_BR",
    twitterHandle: "@storrertamburus" // 🔥 ALTERE PARA SEU TWITTER REAL
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
        "url": "https://storrertamburus.com/logo.png"
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
        <meta property="og:url" content={seoData.url} key="og-url" />
        <meta property="og:type" content="website" key="og-type" />
        <meta property="og:site_name" content={seoData.siteName} key="og-site-name" />
        <meta property="og:locale" content={seoData.locale} key="og-locale" />
        
        {/* 🔥 TWITTER CARD */}
        <meta name="twitter:card" content="summary_large_image" key="twitter-card" />
        <meta name="twitter:title" content={seoData.title} key="twitter-title" />
        <meta name="twitter:description" content={seoData.description} key="twitter-description" />
        <meta name="twitter:image" content={seoData.image} key="twitter-image" />
        <meta name="twitter:site" content={seoData.twitterHandle} key="twitter-site" />
        <meta name="twitter:creator" content={seoData.twitterHandle} key="twitter-creator" />
        
        {/* 🔥 CANONICAL URL */}
        <link rel="canonical" href={seoData.url} key="canonical" />
        
        {/* 🔥 VIEWPORT E CHARSET */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        
        {/* 🔥 FAVICON E APP ICONS */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* 🔥 META ADICIONAIS PARA MOBILE */}
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={seoData.siteName} />
        
        {/* 🔥 SCHEMA.ORG STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData || defaultStructuredData)
          }}
          key="structured-data"
        />
      </Head>
      
      {/* 🔥 Passa o theme para Header */}
      <Header 
        hideNav={hideNav}
        showFilters={showFilters}
        tipos={tipos}
        filtroAtivo={filtroAtivo}
        onFiltroChange={onFiltroChange}
        theme={theme}
      />
      
      <main className="flex-1">{children}</main>
      
      {/* 🔥 Passa o theme para Footer */}
      {!hideFooter && <Footer theme={theme} />}
    </div>
  );
}