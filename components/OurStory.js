'use client';

import Image from "next/image";

export default function OurStory() {
  return (
    <>
      {/* ---------------- OUR STORY SECTION ---------------- */}
      <section className="our-story-section">
        <div className="our-story-container">
          <div className="story-text">
            <h1>Our Story</h1>
            <p>
              AI4LYF began with a simple realization: most health systems react too late.
              Chronic conditions develop silently. Early signs are missed. People get care
              only after something goes wrong.
            </p>
            <p>
              We set out to change that. Combining biosensing technology, AI, and clinical
              expertise, we created LYF Suite—a platform that predicts, monitors, and
              supports health proactively.
            </p>
            <p>
              Today, LYF Suite helps individuals, families, healthcare providers, and
              organizations take control of well-being in a smarter, continuous way.
            </p>
          </div>

          <div className="story-image">
            <Image
              src="/images/about.png"
              alt="Story Illustration"
              width={500}
              height={350}
              unoptimized={true}
              style={{
                width: "80%",
                height: "auto",
                borderRadius: "16px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
              }}
            />
          </div>
        </div>
      </section>

      {/* ---------------- OUR VALUES SECTION ---------------- */}
      <section className="our-values-section">
        <h1>Our Values</h1>
        <p className="values-subtext">These are the principles guiding everything we do</p>

        <div className="values-grid">
          <div className="value-card">
            <h2>💡 Innovation</h2>
            <p>We push boundaries to bring futuristic health solutions to today.</p>
          </div>

          <div className="value-card">
            <h2>🎯 Accuracy</h2>
            <p>Our technology is grounded in validated data and scientific rigor.</p>
          </div>

          <div className="value-card">
            <h2>💙 Compassion</h2>
            <p>Health technology should be human-first—built for care, empathy, and impact.</p>
          </div>
        </div>

        <div className="values-grid values-bottom">
          <div className="value-card">
            <h2>🔒 Privacy</h2>
            <p>Your data is yours. We protect it with industry-leading security.</p>
          </div>

          <div className="value-card">
            <h2>💬 Transparency</h2>
            <p>We communicate openly—with partners, caregivers, and communities.</p>
          </div>
        </div>
      </section>

      <style>{`
        .our-story-section {
          width: 100%;
          padding: 60px 20px;
          background: #f0efef38;
        }

        .our-story-container {
          max-width: 1100px;
          margin: auto;
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
          align-items: center;
        }

        .story-text {
          flex: 1;
          min-width: 300px;
          color: #186cb5;
        }

        .story-text h1 {
          font-size: 40px;
          font-weight: 700;
          color: #186cb5;
        }

        .story-text p {
          margin-top: 15px;
          line-height: 1.6;
          font-size: 22px;
        }

        .story-image {
          flex: 1;
          min-width: 300px;
          display: flex;
          justify-content: center;
        }

        .our-values-section {
          max-width: 1100px;
          margin: 60px auto;
          text-align: center;
          padding: 0 20px;
        }

        .our-values-section h1 {
          font-size: 40px;
          font-weight: 700;
          color: #186cb5;
        }

        .values-subtext {
          margin-top: 10px;
          color: #186cb5;
          font-size: 20px;
        }

        .values-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin-top: 40px;
        }

        .value-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 30px;
          width: 300px;
          text-align: left;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .value-card h2 {
          font-size: 24px;
          margin-bottom: 10px;
          color: #186cb5;
        }

        .value-card p {
          color: #186cb5;
          line-height: 1.5;
          font-size:17px;
        }

        /* Hover Effect */
        .value-card:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 15px 25px rgba(0,0,0,0.2);
        }

        @media(max-width: 600px) {
          .story-image img {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
