import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-wrapper">
        {/* LEFT SIDE - TEXT CONTENT */}
        <div className="contact-text" style={{ marginTop: "-400px" }}>
          <h2 className="contact-title">Let’s Work Together</h2>
          <p className="contact-subtitle">
            Have a project in mind? Let’s discuss how <span>AI can transform</span> your business.
            Fill out the form and our team will reach out shortly.
          </p>

          <div className="contact-details">
            <p>
              <Mail className="contact-icon" style={{marginRight:"10px"}} />
              <strong>Email:</strong> info@ai4lyf.com
            </p>
            <p>
              <Phone className="contact-icon" style={{marginRight:"10px"}}/>
              <strong>Phone:</strong> +8801765896254
            </p>
            <p>
              <MapPin className="contact-icon" style={{marginRight:"10px"}}/>
              <strong>Office:</strong> Lahore, Pakistan
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - FORM CARD */}
        <div className="contact-form-card">
          <form className="contact-form" action="#" method="post">
            <div className="form-row">
              <input name="first" type="text" placeholder="First Name" required />
              <input name="last" type="text" placeholder="Last Name" required />
            </div>

            <div className="form-row">
              <input name="email" type="email" placeholder="Work Email" required />
              <input name="company" type="text" placeholder="Company / Organization" required />
            </div>

            <div className="form-row">
              <input name="product" type="text" placeholder="Product / Service of Interest" />
              <input name="country" type="text" placeholder="Country / Region" />
            </div>

            <textarea
              name="message"
              rows="5"
              placeholder="Tell us about your project or AI goals..."
            ></textarea>

            <button className="btn-submit" type="submit">
              Submit Information
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
