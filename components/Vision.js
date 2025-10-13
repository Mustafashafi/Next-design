import Image from "next/image";

export default function Vision() {
  return (
    <section id="about" className="vision">
      <div className="vision-image">
        <Image
          src="/images/Capture.png"   // Make sure the file name matches exactly (case-sensitive)
          alt="Doctor"
          width={400}                 // adjust as needed
          height={400}                // adjust as needed
          style={{ objectFit: "cover", borderRadius: "12px" }}
        />
      </div>

      <div className="vision-text">
        <h2>Our Vision And Mission</h2>
        <p>
          We denounce with righteous indignation and dislike men who are so beguiled
          by pleasure of the moment, blinded by desire, that they cannot foresee
          the pain and trouble. Pleasure of the moment, blinded by desire, that they cannot foresee
          the pain and trouble. Pleasure of the moment, blinded by desire, that they cannot foresee
          the pain and trouble.
        </p>

        <p>✅ No Dislike Men</p>
        <p>💚 Pleasure of the Area</p>
        <br />

        <button className="learn-btn">Learn More</button>
      </div>
    </section>
  );
}
