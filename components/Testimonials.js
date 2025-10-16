import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Dr. Sarah Ahmed",
      role: "Healthcare Specialist",
      review:
        "AI4LYF’s predictive health insights have transformed how we approach patient monitoring and preventive care.",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Omar Khan",
      role: "Government Health Advisor",
      review:
        "Our department used AI4LYF’s AI-powered analytics for epidemic management.",
      img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Aisha Al-Mutairi",
      role: "Clinical Researcher",
      review:
        "The LYF Suite streamlined our clinical trials and improved the accuracy of patient outcome predictions.",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Dr. Michael Rivera",
      role: "AI in Medicine Researcher",
      review:
        "AI4LYF’s advanced algorithms helped us identify health risks earlier than traditional diagnostic tools.",
      img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=90",
    },
    {
      name: "Dr. Alex Chen",
      role: "Biomedical Engineer",
      review:
        "Integrating AI4LYF’s predictive models into hospital systems has enhanced decision-making for critical care.",
      img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="wrap">
        <h1>What People Say About Us</h1><br />
        <Swiper style={{margin:"0px 50px"}}
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
        ><br />
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="testimonial-card">
                <div className="testimonial-img-wrapper">
                  <Image
                    src={t.img}
                    alt={t.name}
                    width={120}
                    height={120}
                    className="testimonial-img"
                  />
                </div>
                <p className="testimonial-text">“{t.review}”</p>
                <h4>{t.name}</h4>
                <span>{t.role}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
