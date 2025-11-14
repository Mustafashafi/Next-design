'use client';

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./QuickGuide.module.css";

export default function QuickGuide({ title, pdf, images }) {
  const carouselRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(images.length); // start at middle

  // Duplicate slides for looping effect
  const loopedImages = [...images, ...images, ...images];

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
    if (nextIndex >= loopedImages.length) {
      nextIndex = images.length; // wrap to middle
    }
    scrollToSlide(nextIndex);
  };

  const scrollPrev = () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = images.length * 2 - 1; // wrap to middle
    }
    scrollToSlide(prevIndex);
  };

  // Initial scroll to middle slide
  useEffect(() => {
    if (!mounted) return;
    scrollToSlide(currentIndex);
  }, [mounted]);

  // Update scaling for middle slide
  useEffect(() => {
    if (!mounted) return;
    const carousel = carouselRef.current;
    const slides = Array.from(carousel.children);
    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.style.transform = "scale(1)";
        slide.style.opacity = "1";
      } else {
        slide.style.transform = "scale(0.7)";
        slide.style.opacity = "0.5";
      }
    });
  }, [currentIndex, mounted]);

  if (!mounted) return null;

  return (
    <section className={styles.quickGuides}>
      <h1>{title}</h1>
      {pdf && (
        <button
          onClick={() => window.open(pdf, "_blank")}
          className={styles.downloadBtn}
        >
          Download PDF Brochure
        </button>
      )}

      <div className={styles.carouselWrapper}>
        <button className={styles.prevBtn} onClick={scrollPrev}>
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="white" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        <div className={styles.carousel} ref={carouselRef}>
          {loopedImages.map((src, idx) => (
            <div className={styles.slide} key={idx}>
              <div className={styles.img}>
                <Image
                  src={src}
                  alt={`Guide ${idx + 1}`}
                  width={400}
                  height={300}
                  className={styles.image}
                />
              </div>
            </div>
          ))}
        </div>

        <button className={styles.nextBtn} onClick={scrollNext}>
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="white" viewBox="0 0 24 24" >
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
