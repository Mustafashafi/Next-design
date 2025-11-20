'use client';
import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Clock, Mail, Phone, ChevronDown } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showProducts, setShowProducts] = useState(false);

  // Scroll listener using getBoundingClientRect for accurate detection
  useEffect(() => {
    const sectionIds = ['services', 'expertise', 'products', 'contact'];

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);

      let foundSection = 'home';
      for (let i = 0; i < sectionIds.length; i++) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 90 && rect.bottom > 90) { // 90px = header height offset
            foundSection = sectionIds[i];
            break;
          }
        }
      }
      setActiveSection(foundSection);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // recalc on resize
    handleScroll(); // initialize on mount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const linkColor = 'white';

  const handleSectionClick = (sectionId) => {
    const headerOffset = 80; // header height
    if (pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        const elementPosition = section.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    } else {
      router.push(`/?scrollTo=${sectionId}`);
    }
  };

  useEffect(() => {
    if (pathname !== "/") return;
    const params = new URLSearchParams(window.location.search);
    const target = params.get("scrollTo");
    if (!target) return;
    setTimeout(() => handleSectionClick(target), 300);
  }, [pathname]);

  const handleProductClick = (e, productName) => {
    e.preventDefault();
    setShowProducts(false);
    if (pathname === '/') {
      window.dispatchEvent(new CustomEvent("selectProduct", { detail: productName }));
      handleSectionClick("products");
    } else {
      const encoded = encodeURIComponent(productName);
      router.push(`/?selectedProduct=${encoded}#products`);
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="top-bar">
        <span><Clock size={16} /> Sun–Mon: 10:00am to 9:00pm</span>
        <div>
          <a href="mailto:info@ai4lyf.com"><Mail size={16} /> info@ai4lyf.com</a>
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
              onClick={(e) => { e.preventDefault(); router.push('/'); }}
              className={activeSection === 'home' && pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              onClick={(e) => { e.preventDefault(); router.push('/about'); }}
              className={pathname === '/about' ? 'active' : ''}
            >
              About
            </Link>
          </li>

          <li
            className="dropdown"
            onMouseEnter={() => setShowProducts(true)}
            onMouseLeave={() => setShowProducts(false)}
          >
            <button className="dropdown-btn">
              Products
              <ChevronDown size={16} className="dropdown-icon" />
            </button>

            {showProducts && (
              <ul className="dropdown-menu">
                <li><a href="#products" onClick={(e) => handleProductClick(e, "LYF Suite")}>LYF SUITE</a></li>
                <li><a href="#products" onClick={(e) => handleProductClick(e, "DTP")}>DTP</a></li>
                <li><a href="#products" onClick={(e) => handleProductClick(e, "D-TWIN")}>D-TWIN</a></li>
                <li><a href="#products" onClick={(e) => handleProductClick(e, "LYF-DATA")}>LYF DATA</a></li>
              </ul>
            )}
          </li>

          <li>
            <Link
              href="/#services"
              scroll={false}
              onClick={(e) => { e.preventDefault(); handleSectionClick('services'); }}
              className={activeSection === 'services' && pathname === '/' ? 'active' : ''}
            >
              Services
            </Link>
          </li>

          <li>
            <Link
              href="/#expertise"
              scroll={false}
              onClick={(e) => { e.preventDefault(); handleSectionClick('expertise'); }}
              className={activeSection === 'expertise' && pathname === '/' ? 'active' : ''}
            >
              Expertise
            </Link>
          </li>

          <li>
            <Link
              href="/#contact"
              scroll={false}
              onClick={(e) => { e.preventDefault(); handleSectionClick('contact'); }}
              className={activeSection === 'contact' && pathname === '/' ? 'active' : ''}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        .dropdown {
          position: relative;
        }
        .dropdown-btn {
          background: none;
          border: none;
          color: inherit;
          font: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s ease;
        }
        .dropdown-btn:hover {
          color: ${linkColor};
        }
        .dropdown-icon {
          margin-top: 2px;
          transition: transform 0.2s ease;
        }
        .dropdown:hover .dropdown-icon {
          transform: rotate(180deg);
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 8px 0;
          list-style: none;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          min-width: 200px;
          z-index: 10;
        }
        .dropdown-menu li {
          padding: 8px 16px;
        }
        .dropdown-menu li:hover {
          background: #f0f8ff;
        }
        .dropdown-menu a {
          color: #186cb5;
          text-decoration: none;
          display: block;
        }

        /* Active link underline with smooth transition */
        .nav-links li a {
          transition: border-bottom 0.3s ease;
        }
        .nav-links li a.active {
          color: white;
          border-bottom: 2px solid white;
          padding-bottom: 2px;
        }
      `}</style>
    </header>
  );
}
