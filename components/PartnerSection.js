import { useState } from "react";

export default function PartnerSection() {
  const [active, setActive] = useState(null);

  const partners = [
    { title: "Anyone and Everyone", content: "As an individual, you..." },
    { title: "Healthcare Providers", content: "As a healthcare provider, you..." },
    { title: "Pharmaceuticals", content: "As a pharmaceutical entity, you..." },
    { title: "Governments", content: "As a government agency, you..." },
    { title: "Employers", content: "As an employer, if you care..." },
    { title: "Insurance Companies", content: "As an insurance company, you..." },
  ];

  return (
    <section className="section partner-section0">
      <h1>Partner With Us</h1><br />
      <div className="wrap partner-container">
        <div className="partner-left">
          {partners.map((p, i) => (
            <div key={i} className="accordion-item">
              <div className="accordion-title" onClick={() => setActive(active === i ? null : i)}>
                {p.title}
              </div>
              {active === i && <div className="accordion-content">{p.content}</div>}
            </div>
          ))}
        </div>

        <div className="partner-right">
          <video src="/videos/7.mp4" autoPlay muted loop playsInline className="partner-video" />
        </div>
      </div>
    </section>
  );
}
