"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

type Projeto = {
  title: string;
  slug: string;
  capa: string;
};

type Props = { projetos: Projeto[] };

export default function ProjetosSwiper({ projetos }: Props) {
  return (
    <Swiper
      direction="vertical"
      modules={[Pagination, Mousewheel, Keyboard]}
      pagination={{ clickable: true }}
      mousewheel
      keyboard
      className="projetos-swiper"
    >
      {projetos.map(p => (
        <SwiperSlide key={p.slug}>
          <Image src={p.capa} alt={p.title} fill className="object-cover" />
          <div className="overlay">
            <Link href={`/projetos/${p.slug}`}>
              <h3>{p.title}</h3>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
