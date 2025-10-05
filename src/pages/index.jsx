import MainLayout from "@/layouts/MainLayout";
import ClientOnly from "@/components/ClientOnly";
import SlideHome from "@/components/SlideHome";
import { getProjetosDestaque } from "@/services/contentful";

export default function Home({ projetosDestaque }) {
  return (
    <MainLayout title="Home | Storrer Tamburus">
      <ClientOnly fallback={<div className="h-screen w-full bg-black"></div>}>
        <SlideHome projetosDestaque={projetosDestaque} />
      </ClientOnly>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const projetosDestaque = await getProjetosDestaque();
  return { props: { projetosDestaque }, revalidate: 60 };
}
