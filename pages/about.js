'use client';


import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

import Vision from '../components/Vision';
import Team from '../components/Team';
import Chat from '../components/Chat';
import OurStory from "../components/OurStory";

export default function About() {
  return (
    <>
      <Header />

      <Hero
        headingStyle={{ marginTop: "100px", fontSize: "40px", color: "#186cb5" }}
        textStyle={{ fontSize: "1.4rem", color: "#186cb5" }}
        heading="Our Vision"
        text="Transforming the status quo reactive, expensive, sporadically accessible, and episodic 'Sick care' into a predictive, preventive, personalized, continuously accessible, and affordable 'healthcare' for fuller and longer lives for all. It means changing today’s healthcare, which usually helps people after they get sick, into a system that predicts, prevents, and monitors health problems early — making healthcare more personalized, affordable, and always available so everyone can live healthier and longer lives."
      />

      <Vision />

     <OurStory />

      
      <Team />
      
      <Chat />
      <Footer />
    </>
  );
}
