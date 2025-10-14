import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Team() {
  const testimonials = [
    {
      name: "Dr. Sarah Ahmed",
      role: "Healthcare Specialist",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Omar Khan",
      role: "Government Health Advisor",
      img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Aisha Al-Mutairi",
      role: "Clinical Researcher",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Dr. Michael Rivera",
      role: "AI in Medicine Researcher",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=90",
    },
    {
      name: "Dr. Alex Chen",
      role: "Biomedical Engineer",
      img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="wrap">
        <h1>Meet Our Team</h1>
        <Swiper
          style={{ margin: "0px 40px" }}
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          pagination={{ clickable: true }}
          navigation
          loop={true}
          className="testimonials-swiper"
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="testimonial-card" style={{padding:"50px 0px"}}>
                <div className="testimonial-img-wrapper">
                  <Image
                    src={t.img}
                    alt={t.name}
                    width={120}
                    height={120}
                    className="testimonial-img"
                  />
                </div>
                <h4>{t.name}</h4>
                <span>{t.role}</span>
              </div>
              <br />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
