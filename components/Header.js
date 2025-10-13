'use client';
import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, Mail, Phone } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0); // if scroll > 0, set true
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link href="/about" className={pathname === '/about' ? 'active' : ''}>About</Link>
          </li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact" className="contact-link">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
}
