export default function Hero({heading , text}) {
  return (
    <section id="home" className="hero">
      <div className="hero-text">
        <h1>{heading}</h1>
        <p>
         {text}
        </p>

      </div>

      <div className="hero-image">
        
      </div>
    </section>
  );
}
