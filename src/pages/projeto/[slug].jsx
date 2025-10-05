import { client } from "../../services/contentful";
import MainLayout from "../../layouts/MainLayout";
import SwiperGallery from "../../components/SwiperGallery";

export async function getStaticPaths() {
  const res = await client.getEntries({ content_type: "projeto" });
  const paths = res.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await client.getEntries({
    content_type: "projeto",
    "fields.slug": params.slug,
  });
  return { props: { project: res.items[0] } };
}

export default function Projeto({ project }) {
  return (
    <MainLayout>
      <h1 className="text-4xl font-bold text-center my-8">{project.fields.title}</h1>
      <SwiperGallery items={project.fields.gallery} />
    </MainLayout>
  );
}
