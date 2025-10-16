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

  useEffect(() => {
    const sectionIds = ['services', 'expertise', 'products', 'contact'];
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

  // ✅ Fixed: Handle product click from any page
  const handleProductClick = (e, productName) => {
    e.preventDefault();
    setShowProducts(false);

    if (pathname !== '/') {
      // If not on home, go to home with query + hash
      const encoded = encodeURIComponent(productName);
      router.push(`/?selectedProduct=${encoded}#products`);
      return;
    }

    // If already on home, just dispatch event + scroll
    window.dispatchEvent(new CustomEvent("selectProduct", { detail: productName }));
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      {/* --- Top Bar --- */}
      <div className="top-bar">
        <span><Clock size={16} /> Sun–Mon: 10:00am to 9:00pm</span>
        <div>
          <a href="mailto:info@ai4lyf.com"><Mail size={16} /> info@ai4lyf.com</a>
          <a href="tel:+8801765896254"><Phone size={16} /> +8801765896254</a>
        </div>
      </div>

      {/* --- Navbar --- */}
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

          {/* ✅ Products Dropdown */}
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

      {/* --- Dropdown Styling --- */}
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
          color: #333;
          text-decoration: none;
          display: block;
        }
      `}</style>
    </header>
  );
}
