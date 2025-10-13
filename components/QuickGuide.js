import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function QuickGuide({ title, pdf }) {
  return (
    <section className="section quick-guides"><br /><br />
      <div className="wrap">
        <h1>{title}</h1>
        <button
          onClick={() => window.open(pdf, "_blank")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download PDF Brochure
        </button>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className="quick-guides-swiper"
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
        >
          {[1, 2, 3, 4, 5].map((num) => {
            // Use .png for 1 and 5, .jpg for others
            const ext = [1, 5].includes(num) ? "png" : "jpg";
            return (
              <SwiperSlide key={num}>
                <div className="guide-card">
                  <Image
                    src={`/${num}.${ext}`}
                    alt={`Guide ${num}`}
                    width={400} // adjust to your image size
                    height={300}
                    className="rounded shadow-md object-cover"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
