// // 

// import { client } from "../../services/contentful";
// import MainLayout from "../../layouts/MainLayout";
// import SwiperGallery from "../../components/SwiperGallery";

// export async function getStaticPaths() {
//   const res = await client.getEntries({ content_type: "projeto" });
//   const paths = res.items.map((item) => ({
//     params: { slug: item.fields.slug },
//   }));
//   return { paths, fallback: "blocking" }; // fallback "blocking" para ISR
// }

// export async function getStaticProps({ params }) {
//   const res = await client.getEntries({
//     content_type: "projeto",
//     "fields.slug": params.slug,
//   });

//   if (!res.items.length) {
//     return { notFound: true };
//   }

//   return {
//     props: { project: res.items[0] },
//     revalidate: 60, // ISR: revalida a cada 60s
//   };
// }

// export default function Projeto({ project }) {
//   return (
//     <MainLayout title={project.fields.titulo}>
//       <h1 className="text-4xl font-bold text-center my-8">
//         {project.fields.titulo}
//       </h1>
//       <SwiperGallery items={project.fields.gallery} />
//     </MainLayout>
//   );
// }
