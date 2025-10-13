import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";

import Footer from "../components/Footer";
import Brands from "../components/Brands";
import Product from "../components/Product";
import Expertise from "../components/Expertise";
import PartnerSection from "../components/PartnerSection";
import PartnerChart from "../components/PartnerChart";
import PartnerWhy from "../components/PartnerWhy";
import QuickGuide from "../components/QuickGuide";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <Hero heading="Start living to your fullest with LYF Suite." text=" LYF Suite is redefining how we care for our health — moving from reactive sick care to predictive health care.
By combining Artificial Intelligence, biosensing technologies, and real-time connectivity, LYF Suite empowers you to monitor, understand, and improve your well-being before problems arise.
 Experience a smarter, proactive approach to health that helps you live longer, stronger, and happier."/>
      <Brands></Brands>
      <Services />
      <Product />
      <Expertise />
      <PartnerSection />
      <PartnerChart />
      <PartnerWhy />
      <QuickGuide
        title="LYF Suite Quick Guide"
        pdf="/LYF-Suite-Brochure.pdf"
      />
      <QuickGuide
        title="Respire LYF Quick Guide"
        pdf="/Respire-LYF-Broucher.pdf"
      />
     <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
