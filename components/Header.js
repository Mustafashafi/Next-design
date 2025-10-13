'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, Mail, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
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
