import Image from "next/image";
import Link from "next/link";

export default function Product() {
  return (
    <>
      {/* PRODUCTS SECTION */}
      <section id="products" className="section products-section">
        <div className="wrap">
          <h2>Our Products</h2>

          <div className="tabs">
            <button className="tab">LYF Suite</button>
            <button className="tab">DTP</button>
            <button className="tab">D-TWIN</button>
            <button className="tab">LYF-DATA</button>
          </div>
          <br />

          <div className="product-display">
            <div className="product-img">
              <Image
                src="https://ai4lyf.com/wp-content/uploads/lyfsuite.webp"
                alt="LYF Suite"
                width={500}
                height={400}
                style={{ borderRadius: "12px", objectFit: "cover" }}
                priority
              />
            </div>

            <div className="product-info">
              <h3>LYF Suite</h3>
              <p className="muted">
                LYF Suite consists of three integrated products — LYF Watch,
                Respire LYF and LYF App for individuals, plus a powerful online
                analytics platform for medics, clinicians and researchers.
                Together these products provide an end-to-end ecosystem for
                holistic health management and predictive healthcare.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
