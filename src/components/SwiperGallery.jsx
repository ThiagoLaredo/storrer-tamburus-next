"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/virtual";

export default function SwiperGallery({ items }) {
  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      spaceBetween={10}
      virtual
      style={{ height: "100vh" }}
    >
      {items.map((item) => (
        <SwiperSlide key={item.sys.id}>
          <img
            src={item.fields.image.fields.file.url}
            alt={item.fields.title}
            className="w-full h-full object-cover"
          />
          <h2 className="absolute bottom-4 left-4 text-white text-2xl bg-black/50 p-2 rounded">
            {item.fields.title}
          </h2>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
