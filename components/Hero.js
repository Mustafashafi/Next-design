import { useState } from "react";

export default function Hero({ heading, text, headingStyle, textStyle, showButtons = false, shortTextOnHome = false }) {
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

  // Decide what text to display
  const displayedText = shortTextOnHome
    ? showFullText
      ? text
      : previewText
    : text; // show full text by default if not on home

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
        <p style={textStyle}>{displayedText}</p>

        {/* Conditionally render buttons */}
        {showButtons && shortTextOnHome && (
          <div style={{ marginTop: "30px", display: "flex", gap: "20px" }}>
            {/* Primary CTA */}
<button
  onClick={handleRequestDemo}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "#ffffff"; // white
    e.target.style.color = "#186cb5";            // blue text
    e.target.style.border = "2px solid #186cb5"; // blue border
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "#186cb5";  // blue background
    e.target.style.color = "#ffffff";            // white text
    e.target.style.border = "2px solid #186cb5"; // blue border
  }}
  style={{
    padding: "12px 25px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "2px solid #186cb5",
    backgroundColor: "#186cb5",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s ease",
  }}
>
  Request a Demo
</button>


{/* Secondary CTA */}
<button
  onClick={handleLearnMore}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "#186cb5";
    e.target.style.color = "#fff";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "transparent";
    e.target.style.color = "#186cb5";
  }}
  style={{
    padding: "12px 25px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "2px solid #186cb5",
    backgroundColor: "transparent",
    color: "#186cb5",
    cursor: "pointer",
    transition: "0.3s ease",
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
