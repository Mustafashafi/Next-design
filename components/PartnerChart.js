import Image from "next/image";

export default function PartnerChart() {
  return (
    <section className="section partner-section">
      <div className="wrap">
        <div className="partner-content">
          <div className="partner-text">
            <h1>Let&apos;s work together because:</h1>
            <br />
            <p className="muted">
              Countless studies confirm that the top killer diseases, as reported by WHO in this chart, can be prevented or better managed through continuous instead of episodic health monitoring, early diagnosis, preventive care and holistic health management. 
              AI4LYF&apos;s products are precisely designed to achieve that goal. Let&apos;s save lives together, starting from you and inspiring others around!
            </p>
          </div>
          <div className="partner-image">
            <Image
              src="/images/medical.png"
              alt="WHO chart"
              width={600}
              height={400}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>
        </div>
      </div><br /><br /><br /><br />
    </section>
  );
}
