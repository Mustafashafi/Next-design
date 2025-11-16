import { useState } from "react";

export default function Hero({ heading, text, headingStyle, textStyle, showButtons = false }) {
  const [showFullText, setShowFullText] = useState(false);

  // Short preview text (first 150 chars)
  const previewText = text.length > 150 ? text.slice(0, 150) + "..." : text;

  const handleLearnMore = () => {
    setShowFullText(!showFullText);
  };

  const handleRequestDemo = () => {
    // Scroll smoothly to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="hero"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "50px 100px",
      }}
    >
      {/* Hero Text Section */}
      <div className="hero-text" style={{ maxWidth: "600px" }}>
        <h1 style={headingStyle}>{heading}</h1>
        <p style={textStyle}>{showFullText ? text : previewText}</p>

        {/* Conditionally render buttons */}
        {showButtons && (
          <div style={{ marginTop: "30px", display: "flex", gap: "20px" }}>
            {/* Primary CTA */}
            <button
              onClick={handleRequestDemo}
              style={{
                padding: "12px 25px",
                fontSize: "1rem",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#0070f3",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Request a Demo
            </button>

            {/* Secondary CTA */}
            <button
              onClick={handleLearnMore}
              style={{
                padding: "12px 25px",
                fontSize: "1rem",
                borderRadius: "5px",
                border: "2px solid #0070f3",
                backgroundColor: "transparent",
                color: "#0070f3",
                cursor: "pointer",
              }}
            >
              {showFullText ? "Show Less" : "Learn More"}
            </button>
          </div>
        )}
      </div>

      {/* Hero Image Section */}
      <div className="hero-image" style={{ maxWidth: "500px" }}>
        {/* You can add an image here */}
      </div>
    </section>
  );
}
