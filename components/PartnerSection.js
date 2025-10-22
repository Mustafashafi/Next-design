import { useState } from "react";

export default function PartnerSection() {
  const [active, setActive] = useState(null);

  const partners = [
    { title: "Anyone and Everyone", content: "As an individual, you, your loved ones, and anyone around you can join us in taking care of personal health by wearing the LYF Watch and using the LYF APP, which provides a comprehensive health management solution." },
    { title: "Healthcare Providers", content: "As a healthcare provider, you can improve your clinical outcomes and quality of care and decrease the burden of the medical diagnosis team by leveraging only actionable insights from our LYF Suite-based RPM and clinical decision assistant platform." },
    { title: "Pharmaceuticals", content: "As a pharmaceutical entity, you can leverage our LYF Suite for site-free, diverse, and cost-effective recruitment and management of study participants. It provides tools for remote, continuous monitoring of participants eliminating most travel requirements to a clinical site. Thus, it can help you accelerate, decentralize, diversify, and digitize clinical trials, thereby substantially reducing the cost and time to market for new therapies and devices." },
    { title: "Governments", content: "As a government agency, you can take advantage of our LYF Suite for comprehensive healthcare management at national level and can also use it for the management of epidemics and pandemics." },
    { title: "Employers", content: "It does not matter if it is a small business or a conglomerate; as an employer, if you care for your employees’ health, our LYF Watch and LYF APP can help you offer that care." },
    { title: "Insurance Companies", content: "As a researcher in the healthcare industry, you can license our LYF Suite that can be customized to meet your specific data collection needs. We also offer end-to-end data collection services, where we can design, manage and complete data collection campaign from target segments of the populations to meet your research needs." },
  ];

  return (
    <section className="section partner-section0" id="partner">
      <h1>Partner With Us</h1><br />
      <div className="wrap partner-container">
        <div className="partner-left">
          {partners.map((p, i) => (
            <div key={i} className="accordion-item">
              <div
                className="accordion-title"
                onClick={() => setActive(active === i ? null : i)}
                style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}
              >
                {p.title}
                <span>{active === i ? "▲" : "▼"}</span> 
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
