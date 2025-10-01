import { client } from "../services/contentful";
import MainLayout from "../layouts/MainLayout";
import SwiperGallery from "../components/SwiperGallery";
import FilterMenu from "../components/FilterMenu";
import { useState } from "react";

export async function getStaticProps() {
  const res = await client.getEntries({ content_type: "projeto" });
  return {
    props: {
      projects: res.items,
    },
    revalidate: 60,
  };
}

export default function Projetos({ projects }) {
  const [filter, setFilter] = useState("todos");

  const filteredProjects =
    filter === "todos"
      ? projects
      : projects.filter((p) => p.fields.categoria === filter);

  return (
    <MainLayout>
      <FilterMenu setFilter={setFilter} />
      <SwiperGallery items={filteredProjects} />
    </MainLayout>
  );
}
