export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Request a Demo</h2>
          <p className="contact-subtitle">
            Transform your business with <span>AI-powered insights</span>.  
            Fill out the form below and our team will reach out shortly.
          </p>
        </div>

        <form className="contact-form" action="https://ai4lyf.com/#contact" method="post">
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
    </section>
  );
}
