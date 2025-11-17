"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Product() {
  const products = {
    "LYF Suite": {
      image: "https://ai4lyf.com/wp-content/uploads/lyfsuite.webp",
      title: "LYF Suite",
      description:
        "LYF Suite consists of three integrated products — LYF Watch, Respire LYF and LYF App for individuals, plus a powerful online analytics platform for medics, clinicians and researchers. Together these products provide an end-to-end ecosystem for holistic health management and predictive healthcare.",
    },
    DTP: {
      image: "/mission.webp",
      title: "DTP",
      description:
        "DTP (Digital Therapeutic Platform) offers personalized health insights and remote monitoring tools that empower users to manage chronic conditions effectively with AI-driven recommendations.",
    },
    "D-TWIN": {
      image: "https://ai4lyf.com/wp-content/uploads/dtwin.webp",
      title: "D-TWIN",
      description:
        "D-TWIN creates a digital twin of an individual's health metrics, allowing predictive simulations and health forecasting to enhance preventive care and medical research.",
    },
    "LYF-DATA": {
      image: "https://ai4lyf.com/wp-content/uploads/lyfdata.webp",
      title: "LYF-DATA",
      description:
        "LYF-DATA is an advanced analytics platform that aggregates and visualizes health data from multiple sources, helping clinicians and researchers derive valuable insights.",
    },
  };

  const [activeTab, setActiveTab] = useState("LYF Suite");
  const current = products[activeTab];

 
  useEffect(() => {
    const handleProductChange = (event) => {
      const productKey = event.detail;
      if (products[productKey]) {
        setActiveTab(productKey);
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("selectProduct", handleProductChange);
    return () => window.removeEventListener("selectProduct", handleProductChange);
  }, []);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const selectedProduct = params.get("selectedProduct");

      if (selectedProduct && products[selectedProduct]) {
        setActiveTab(selectedProduct);

        
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

        
        window.dispatchEvent(new CustomEvent("selectProduct", { detail: selectedProduct }));

        
        const url = new URL(window.location.href);
        url.searchParams.delete("selectedProduct");
        window.history.replaceState({}, "", url.toString());
      }
    }
  }, []);

  return (
    <>
      <section id="products" className="section products-section">
        <div className="wrap">
          <h2>Our Products</h2>

         
          <div className="tabs">
            {Object.keys(products).map((key) => (
              <button
                key={key}
                className={`tab ${activeTab === key ? "active" : ""}`}
                onClick={() => setActiveTab(key)}
              >
                {key}
              </button>
            ))}
          </div>
          <br />

         
          <div className="product-display flex items-center gap-10 mt-6 flex-wrap md:flex-nowrap">
            
            <div className="product-img w-full md:w-1/2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.image}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={current.image}
                    alt={current.title}
                    width={500}
                    height={400}
                    style={{
                      borderRadius: "12px",
                      objectFit: "cover",
                      width: "100%",
                      height: "auto",
                    }}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Text */}
            <div className="product-info w-full md:w-1/2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3>{current.title}</h3>
                  <p className="muted">{current.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .tabs {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .tab {
          background: #186cb5;
          
          padding: 15px 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          
        }
        .tab.active {
          background: #3ca4ffff;
          color: white;
          font-weight: 600;
        }
        .tab:hover {
          background: #3ca4ffff;
          color: white;
        }
        .muted {
          color: #555;
          line-height: 1.6;
        }
      `}</style>
    </>
  );
}
