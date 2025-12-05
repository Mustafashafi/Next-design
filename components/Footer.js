'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  // Scroll smoothly to a section with header offset
  const scrollWithOffset = (targetId) => {
    const headerOffset = 80; // Same offset as your header
    const cleanId = targetId.replace("#", "");
    const section = document.getElementById(cleanId);

    if (section) {
      const elementPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = (e, targetId) => {
    e.preventDefault();

    // If already on homepage
    if (pathname === "/") {
      scrollWithOffset(targetId);
      return;
    }

    // If coming from another page, navigate to home first
    const cleanId = targetId.replace("#", "");
    router.push(`/#${cleanId}`);

    // Wait until the DOM is fully loaded, then scroll
    const interval = setInterval(() => {
      if (document.readyState === "complete") {
        clearInterval(interval);
        setTimeout(() => scrollWithOffset(targetId), 100);
      }
    }, 50);
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section footer-about">
          <Image
            src="/images/logo_color.webp"
            alt="AI4LYF"
            width={170}
            height={65}
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

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>

            <li>
              <a href="#products" onClick={(e) => handleScroll(e, "#products")}>
                Products
              </a>
            </li>

            <li>
              <a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>
                Request Demo
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section footer-contact">
          <h4>Contact</h4>
          <p><strong>Email:</strong> <a href="mailto:info@ai4lyf.com">info@ai4lyf.com</a></p>
          <p><strong>Location:</strong> USA</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} <span>AI4LYF</span>. All Rights Reserved.
      </div>
    </footer>
  );
}
