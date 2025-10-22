'use client';
import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function QuickGuide({ title, pdf }) {
  const guides = [1, 2, 3, 4, 5];

 
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="quick-guides">
      <h1>{title}</h1>
      <button onClick={() => window.open(pdf, "_blank")}>
        Download PDF Brochure
      </button>

     
      <div className="swiper-buttons">
        <div ref={prevRef} className="custom-prev">&#10094;</div>
        <div ref={nextRef} className="custom-next">&#10095;</div>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={25}
        slidesPerView={4}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        }}
      >
        {guides.map((num) => {
          const ext = [1, 5].includes(num) ? "png" : "jpg";
          return (
            <SwiperSlide key={num}>
              <div className="guide-card">
                <Image
                  src={`/${num}.${ext}`}
                  alt={`Guide ${num}`}
                  width={400}
                  height={300}
                  className="rounded shadow-md object-cover"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
