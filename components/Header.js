'use client';
import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Clock, Mail, Phone } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home'); // default active section

  useEffect(() => {
    const sectionIds = ['services', 'expertise', 'partner', 'testimonials', 'contact'];

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let foundSection = 'home'; // default
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && scrollPosition >= section.offsetTop) {
          foundSection = sectionIds[i];
          break;
        }
      }

      setActiveSection(foundSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkColor = '#186cb5';

  // Function to handle clicking a section link
  const handleSectionClick = (sectionId) => {
    if (pathname !== '/') {
      // Navigate to Home page first
      router.push('/' + (sectionId ? `#${sectionId}` : ''));
    } else {
      // Scroll to section if already on Home
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="top-bar">
        <span><Clock size={16} /> Sun–Mon: 10:00am to 9:00pm</span>
        <div>
          <a ><Mail size={16} /> info@example.com</a>
          <a ><Phone size={16} /> +8801765896254</a>
        </div>
      </div>

      <nav className="navbar">
        <div className="logo">
          <Link href="/">
            <Image
              src="/images/logo_color.webp"
              alt="Doctors Logo"
              width={140}
              height={50}
              priority
            />
          </Link>
        </div>

        <ul className="nav-links">
          <li>
            <Link
              href="/"
              style={{ color: activeSection === 'home' && pathname === '/' ? linkColor : 'inherit' }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              style={{ color: pathname === '/about' ? linkColor : 'inherit' }}
            >
              About
            </Link>
          </li>
          <li>
            <a
              href="/#services"
              onClick={(e) => { e.preventDefault(); handleSectionClick('services'); }}
              style={{ color: activeSection === 'services' ? linkColor : 'inherit' }}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="/#expertise"
              onClick={(e) => { e.preventDefault(); handleSectionClick('expertise'); }}
              style={{ color: activeSection === 'expertise' ? linkColor : 'inherit' }}
            >
              Expertise
            </a>
          </li>
          <li>
            <a
              href="/#partner"
              onClick={(e) => { e.preventDefault(); handleSectionClick('partner'); }}
              style={{ color: activeSection === 'partner' ? linkColor : 'inherit' }}
            >
              Partner
            </a>
          </li>
          <li>
            <a
              href="/#testimonials"
              onClick={(e) => { e.preventDefault(); handleSectionClick('testimonials'); }}
              style={{ color: activeSection === 'testimonials' ? linkColor : 'inherit' }}
            >
              Testimonials
            </a>
          </li>
          <li>
            <a
              href="/#contact"
              className="contact-link"
              onClick={(e) => { e.preventDefault(); handleSectionClick('contact'); }}
              style={{ color: activeSection === 'contact' ? linkColor : 'inherit' }}
            >
              Contact Us
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
