import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ 
  children, 
  title = "Storrer Tamburus", 
  hideFooter = false,
  hideNav = false,
  showFilters = false,
  tipos = [],
  filtroAtivo,  
  onFiltroChange,
  theme = 'dark' // 🔥 NOVA PROP: 'dark' ou 'light'
}) {
  return (
    <div className="flex flex-col flex-center min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Estúdio Storrer Tamburus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* 🔥 Passa o theme para Header */}
      <Header 
        hideNav={hideNav}
        showFilters={showFilters}
        tipos={tipos}
        filtroAtivo={filtroAtivo}
        onFiltroChange={onFiltroChange}
        theme={theme} // 🔥 NOVO
      />
      
      <main className="flex-1">{children}</main>
      
      {/* 🔥 Passa o theme para Footer */}
      {!hideFooter && <Footer theme={theme} />}
    </div>
  );
}