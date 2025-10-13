import Image from "next/image";

export default function Vision() {
  return (
    <section id="about" className="vision">
      <div className="vision-image">
        <Image
          src="/images/girl.png"   // Make sure the file name matches exactly (case-sensitive)
          alt="Doctor"
          width={400}                 // adjust as needed
          height={400}                // adjust as needed
          style={{ objectFit: "cover", borderRadius: "12px" }}
        />
      </div>

      <div className="vision-text">
        <h2 style={{color:"#186cb5"}}>Our  Mission</h2>
        <p style={{fontSize:"22px",width:"125%",color:"#186cb5"}}>
          At AI4LYF, our mission is to make this vision possible through AI, Biosensing and Wireless Communications innovations. Our integrated wearable and ambient biosensing solutions enable harnessing the multi-sensory, multi-modal data on human health with unprecedented temporal resolution and precision. By distilling this rich data, our powerful propriety AI platform delivers in-situ, faster and predictive diagnostics and remote health monitoring solutions with reliability unmatched in the industry.
        </p>

      </div>
    </section>
  );
}
