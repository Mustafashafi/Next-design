'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleScroll = (e, targetId) => {
    e.preventDefault();

    // If we're already on the homepage, just scroll smoothly
    if (pathname === "/") {
      const section = document.querySelector(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on another page, go to home and then scroll
      router.push("/" + targetId);
      setTimeout(() => {
        const section = document.querySelector(targetId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 800);
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Logo & About */}
        <div className="footer-section footer-about">
          <Image
            src="/images/logo_color.webp"
            alt="AI4LYF"
            width={160}
            height={45}
            priority
            className="footer-logo"
          />
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
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>

            {/* About goes to another page */}
            <li><Link href="/about">About</Link></li>

            {/* Products and Request Demo scroll to sections on home page */}
            <li><a href="#products" onClick={(e) => handleScroll(e, "#products")}>Products</a></li>
            <li><a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>Request Demo</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section footer-contact">
          <h4>Contact</h4>
          <p><strong>Email:</strong> <a href="mailto:info@ai4lyf.com">info@ai4lyf.com</a></p>
          <p><strong>Location:</strong> Lahore, Pakistan</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} <span>AI4LYF</span>. All Rights Reserved.
      </div>
    </footer>
  );
}
