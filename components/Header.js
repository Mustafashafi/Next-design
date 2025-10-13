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

      let foundSection = 'home';
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

  const handleSectionClick = (sectionId) => {
    if (pathname !== '/') {
      router.push('/' + (sectionId ? `#${sectionId}` : ''));
    } else {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="top-bar">
        <span><Clock size={16} /> Sun–Mon: 10:00am to 9:00pm</span>
        <div>
          <a href="mailto:info@example.com"><Mail size={16} /> info@example.com</a>
          <a href="tel:+8801765896254"><Phone size={16} /> +8801765896254</a>
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
            <Link
              href="/#services"
              scroll={false}
              onClick={(e) => { e.preventDefault(); handleSectionClick('services'); }}
              style={{ color: activeSection === 'services' ? linkColor : 'inherit' }}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/#expertise"
              scroll={false}
              onClick={(e) => { e.preventDefault(); handleSectionClick('expertise'); }}
              style={{ color: activeSection === 'expertise' ? linkColor : 'inherit' }}
            >
              Expertise
            </Link>
          </li>
          <li>
            <Link
              href="/#partner"
              scroll={false}
              onClick={(e) => { e.preventDefault(); handleSectionClick('partner'); }}
              style={{ color: activeSection === 'partner' ? linkColor : 'inherit' }}
            >
              Partner
            </Link>
          </li>
          <li>
            <Link
              href="/#testimonials"
              scroll={false}
              onClick={(e) => { e.preventDefault(); handleSectionClick('testimonials'); }}
              style={{ color: activeSection === 'testimonials' ? linkColor : 'inherit' }}
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              scroll={false}
              onClick={(e) => { e.preventDefault(); handleSectionClick('contact'); }}
              className="contact-link"
              style={{ color: activeSection === 'contact' ? linkColor : 'inherit' }}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
