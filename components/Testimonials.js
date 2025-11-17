'use client';

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

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

  const carouselRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(testimonials.length);

  const loopedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => setMounted(true), []);

  const scrollToSlide = (index) => {
    if (!mounted) return;
    const carousel = carouselRef.current;
    const slides = Array.from(carousel.children);
    const target = slides[index];
    const left = target.offsetLeft - (carousel.clientWidth - target.clientWidth) / 2;
    carousel.scrollTo({ left, behavior: "smooth" });
    setCurrentIndex(index);
  };

  const scrollNext = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= loopedTestimonials.length) nextIndex = testimonials.length;
    scrollToSlide(nextIndex);
  };

  const scrollPrev = () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = testimonials.length * 2 - 1;
    scrollToSlide(prevIndex);
  };

  useEffect(() => {
    if (!mounted) return;
    scrollToSlide(currentIndex);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const carousel = carouselRef.current;
    const slides = Array.from(carousel.children);
    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.style.transform = "scale(1.05)";
        slide.style.opacity = "1";
        slide.style.boxShadow = "0 15px 30px rgba(0,0,0,0.25)";
      } else {
        slide.style.transform = "scale(0.85)";
        slide.style.opacity = "0.5";
        slide.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }
    });
  }, [currentIndex, mounted]);

  if (!mounted) return null;

  // Inline styles
  const sectionStyle = { textAlign: "center", padding: "80px 0", background: "#f7f9fc", color: "#186cb5" };
  const h1Style = { fontSize: "2.8rem", marginBottom: "50px", fontWeight: 600,color:"#186cb5" };
  const carouselWrapperStyle = { position: "relative", width: "90%", maxWidth: "1000px", margin: "0 auto" };
  const carouselStyle = {
    display: "flex",
    gap: "1.5rem",
    overflowX: "auto",
    scrollBehavior: "smooth",
    paddingBottom: "2rem",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };
  const cardStyle = {
    flex: "0 0 calc((100% - 3rem)/3)",
    background: "linear-gradient(135deg, #ffffff 0%, #e6f0ff 100%)",
    borderRadius: "20px",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.3s, opacity 0.3s, box-shadow 0.3s",
  };
  const imgWrapperStyle = { width: "90px", height: "90px", marginBottom: "20px", borderRadius: "50%", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.15)" };
  const reviewStyle = {  marginBottom: "15px", color: "#186cb5", lineHeight: 1.5 };
  const arrowBtnStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "#186cb5",
    border: "1px solid #186cb5",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    display: "grid",
    placeContent: "center",
    cursor: "pointer",
    color: "white",
    fontSize: "2rem",
    zIndex: 10,
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    transition: "transform 0.2s, opacity 0.2s",
    opacity: 0.9,
  };

  return (
    <section style={sectionStyle}>
      <h1 style={h1Style}>What People Say About Us</h1>

      <div style={carouselWrapperStyle}>
        <button
          style={{ ...arrowBtnStyle, left: "-70px" }}
          onClick={scrollPrev}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
        >
          &#10094;
        </button>

        <div style={carouselStyle} ref={carouselRef}>
          {loopedTestimonials.map((t, idx) => (
            <div key={idx} style={cardStyle}>
              <div style={imgWrapperStyle}>
                <Image src={t.img} alt={t.name} width={90} height={90} />
              </div>
              <p style={reviewStyle}>“{t.review}”</p>
              <h4 style={{ marginBottom: "5px" }}>{t.name}</h4>
              <span style={{ color: "#186cb5", fontSize: "0.9rem" }}>{t.role}</span>
            </div>
          ))}
        </div>

        <button
          style={{ ...arrowBtnStyle, right: "-70px" }}
          onClick={scrollNext}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
        >
          &#10095;
        </button>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}