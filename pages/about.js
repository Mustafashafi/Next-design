'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Image from 'next/image'; // ✅ Missing import added
import Vision from '../components/Vision';

export default function About() {
  return (
    <>
      <Header />

      {/* === Hero Section === */}
      <Hero  headingStyle={{
        marginTop:"100px",
          fontSize: "40px",      // ≈ text-4xl
    color: "#186cb5"
        }}
        textStyle={{
          fontSize: "1.4rem",      // ≈ text-4xl
    color: "#186cb5"
        }}

        
        heading="Our Vision"
        text="Transforming the status quo reactive, expensive, sporadically accessible, and episodic 'Sick care' into a predictive, preventive, personalized, continuously accessible, and affordable 'healthcare' for fuller and longer lives for all. It means changing today’s healthcare, which usually helps people after they get sick, into a system that predicts, prevents, and monitors health problems early — making healthcare more personalized, affordable, and always available so everyone can live healthier and longer lives."
      />
<Vision />
      

      <Footer />
    </>
  );
}
