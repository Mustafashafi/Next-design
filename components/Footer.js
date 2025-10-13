'use client';
import Image from "next/image";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Logo & About */}
        <div className="footer-section">
          <div className="footer-logo">
            <Image
              src="/images/logo_color.webp"
              alt="AI4LYF"
              width={150}
              height={40}
              priority
            />
          </div>
          <p className="footer-desc">
            Empowering innovation with AI solutions that make life easier and smarter.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <div className="footer-links">
            <a href="#">Home</a>
            <a href="#about">About</a>
            <a href="#products">Products</a>
            <a href="#contact">Request Demo</a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: <a href="mailto:info@ai4lyf.com">info@ai4lyf.com</a></p>
          <p>Location: Lahore, Pakistan</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} <span>AI4LYF</span>. All Rights Reserved.
      </div>
    </footer>
  );
}
