export default function Hero({heading , text , headingStyle, textStyle}) {
  return (
    <section id="home" className="hero">
      <div className="hero-text">
        <h1 style={headingStyle}>{heading}</h1>
        <p style={textStyle}>
         {text}
        </p>

      </div>

      <div className="hero-image">
        
      </div>
    </section>
  );
}
