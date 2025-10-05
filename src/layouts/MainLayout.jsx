import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ children, title = "Storrer Tamburus" }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Estúdio Storrer Tamburus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
