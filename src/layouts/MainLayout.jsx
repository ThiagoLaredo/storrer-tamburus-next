// layouts/MainLayout.jsx
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

// layouts/MainLayout.jsx
export default function MainLayout({ 
  children, 
  title = "Storrer Tamburus", 
  hideFooter = false,
  hideNav = false,
  showFilters = false,  // 🔥 Nova prop
  tipos = [],           // 🔥 Props para filtros
  filtroAtivo,          // 🔥 Props para filtros  
  onFiltroChange        // 🔥 Props para filtros
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Estúdio Storrer Tamburus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* 🔥 Passa todas as props para o Header */}
      <Header 
        hideNav={hideNav}
        showFilters={showFilters}
        tipos={tipos}
        filtroAtivo={filtroAtivo}
        onFiltroChange={onFiltroChange}
      />
      
      <main className="flex-1">{children}</main>
      
      {!hideFooter && <Footer />}
    </div>
  );
}