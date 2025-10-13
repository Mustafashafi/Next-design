'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Image from 'next/image'; // ✅ Missing import added

export default function About() {
  return (
    <>
      <Header />

      {/* === Hero Section === */}
      <Hero  headingStyle={{
        marginTop:"100px",
          fontSize: "40px",      // ≈ text-4xl
    color: "#2e87d4ff"
        }}
        textStyle={{
          fontSize: "1.4rem",      // ≈ text-4xl
    color: "#2e87d4ff"
        }}

        
        heading="Our Vision"
        text="Transforming the status quo reactive, expensive, sporadically accessible, and episodic 'Sick care' into a predictive, preventive, personalized, continuously accessible, and affordable 'healthcare' for fuller and longer lives for all. It means changing today’s healthcare, which usually helps people after they get sick, into a system that predicts, prevents, and monitors health problems early — making healthcare more personalized, affordable, and always available so everyone can live healthier and longer lives."
      />

      {/* === Products Section === */}
      <section id="products" className="section products-section py-16 bg-gray-50">
        <div className="wrap max-w-6xl mx-auto px-6">
          <div className="product-display flex flex-col md:flex-row items-center gap-10">
            
            {/* Product Image */}
            <div className="product-img flex-shrink-0">
              <Image
                src="/images/mission.webp"
                alt="LYF Suite"
                width={500}
                height={400}
                className="rounded-xl object-cover"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="product-info max-w-xl">
              <h1 className="text-2xl font-semibold mb-4" style={{
    fontSize: "38px",      // ≈ text-4xl
    color: "#2e87d4ff"         // blue
  }}>Our Mission</h1>
              <p className="text-gray-600 leading-relaxed" style={{
    fontSize: "1.4rem",      // ≈ text-4xl
    
    color: "#2e87d4ff"         // blue
  }}>
                At AI4LYF, our mission is to make this vision possible through AI, Biosensing and Wireless Communications innovations. Our integrated wearable and ambient biosensing solutions enable harnessing the multi-sensory, multi-modal data on human health with unprecedented temporal resolution and precision. By distilling this rich data, our powerful propriety AI platform delivers in-situ, faster and predictive diagnostics and remote health monitoring solutions with reliability unmatched in the industry
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
