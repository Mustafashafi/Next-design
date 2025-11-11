'use client';
import { useState } from "react";
import Image from "next/image";

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(null);

  const cardData = [
    {
      title: "Neurology Clinic",
      description: "Improve your strength through many programs.",
      image: "/4.1.png",
      extra: "🧠 Our Neurology Clinic offers brain and nerve system treatments.",
    },
    {
      title: "Pathology Clinic",
      description: "It is a long established fact that a reader will be distracted.",
      image: "/2.png",
      extra: "🔬 We perform lab testing and diagnostic evaluations efficiently.",
    },
    {
      title: "Pediatric Clinic",
      description: "When looking at its layout, the point of using Lorem Ipsum is that it.",
      image: "/3.png",
      extra: "👶 Our Pediatric experts ensure your child’s health and happiness.",
    },
    {
      title: "Health Clinic",
      description: "This program is designed for those who exercise daily.",
      image: "/4.png",
      extra: "💪 We provide personalized wellness and fitness consultations.",
    },
  ];

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="services">
      <div className="service-header text-center">
        <h1>Services For Your Health</h1>
        <p>Service we provide for you with the following information — pick your best option</p>
        <button className="book-btn" onClick={handleScrollToContact}>
          Book an Appointment
        </button>
      </div>

      <div className="service-cards">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`card ${activeIndex === index ? "active" : ""}`}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <Image
              src={card.image}
              alt={card.title}
              width={300}          
              height={200}         
              className="card-image"
              style={{ objectFit: "cover" }}
            />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="card-extra-text">
          <p>{cardData[activeIndex].extra}</p>
        </div>
      )}
    </section>
  );
}
