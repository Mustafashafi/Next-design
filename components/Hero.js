import { useState } from "react";

export default function Hero({ heading, text, headingStyle, textStyle, showButtons = false, shortTextOnHome = false }) {
  const [showFullText, setShowFullText] = useState(false);

  const previewText = text.length > 150 ? text.slice(0, 150) + "..." : text;

  const handleLearnMore = () => {
    setShowFullText(!showFullText);
  };

  const handleRequestDemo = () => {
    const contactSection = document.getElementById("contact");
    const headerOffset = 100;

    if (contactSection) {
      const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const displayedText = shortTextOnHome ? (showFullText ? text : previewText) : text;

  const buttonBase = {
    padding: "12px 28px",
    fontSize: "1rem",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    fontWeight: "600",
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
      <div className="hero-text" style={{ maxWidth: "600px" }}>
        <h1 style={headingStyle}>{heading}</h1>
        <p style={textStyle}>{displayedText}</p>

        {showButtons && shortTextOnHome && (
          <div style={{ marginTop: "30px", display: "flex", gap: "20px" }}>
            {/* Primary Button */}
            <button
              onClick={handleRequestDemo}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#ffffff";
                e.target.style.color = "#186cb5";
                e.target.style.border = "2px solid #186cb5";
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 6px 18px rgba(24,108,181,0.35)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#186cb5";
                e.target.style.color = "#ffffff";
                e.target.style.border = "2px solid #186cb5";
                e.target.style.transform = "translateY(0px)";
                e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
              }}
              style={{
                ...buttonBase,
                backgroundColor: "#186cb5",
                color: "#ffffff",
                border: "2px solid #186cb5",
              }}
            >
              Request a Demo
            </button>

            {/* Secondary Button */}
            <button
              onClick={handleLearnMore}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#186cb5";
                e.target.style.color = "#ffffff";
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 6px 18px rgba(24,108,181,0.35)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#186cb5";
                e.target.style.transform = "translateY(0px)";
                e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              style={{
                ...buttonBase,
                backgroundColor: "transparent",
                color: "#186cb5",
                border: "2px solid #186cb5",
              }}
            >
              {showFullText ? "Show Less" : "Learn More"}
            </button>
          </div>
        )}
      </div>

      <div className="hero-image"></div>
    </section>
  );
}
