import { useState } from "react";

export default function Expertise() {
  const [active, setActive] = useState(null);

  const titles = [
    "Epidemic and Pandemic Management",
    "Holistic  and Health Management",
    "Remote Patient Monitoring (RPM)",
    "Digitized, Accelerated Clinical Trials",
    "Wireless Medical Device Testing and Evaluation",
    "Bespoke Data Collection Campaigns",
  ];

  const descriptions = [
    "AI4LYF helps predict, manage, and mitigate epidemics and pandemics using real-time health analytics and AI forecasting tools.",
    "We provide holistic health solutions that integrate lifestyle, nutrition, and preventive diagnostics to maintain well-being.",
    "Our RPM technology enables continuous patient health tracking from anywhere, improving outcomes and lowering costs.",
    "Accelerate your clinical trials with our AI-driven participant analysis and digitized workflow automation.",
    "We specialize in testing, evaluation, and certification of wireless medical devices under global compliance standards.",
    "Our custom campaigns ensure accurate medical data collection for research, product validation, and AI model training.",
  ];

  return (
    <section id="expertise" className="section expertise-section">
      <div className="wrap">
        <h2>Our Expertise</h2>
        <div className="expertise-grid">
          {titles.map((title, i) => (
            <div className="expert-card" key={i}>
              <video src={`/videos/${i + 1}.mp4`} autoPlay loop muted playsInline className="expert-video" />
              <div className="expert-text">
                <h4>{title}</h4>
                <button className="btn-outline small" onClick={() => setActive(active === i ? null : i)}>
                  {active === i ? "Show Less" : "Read More"}
                </button>
              </div>
              {active === i && <p className="expert-description">{descriptions[i]}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
