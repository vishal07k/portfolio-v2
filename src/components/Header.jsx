import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <a href="#hero" className="logo" onClick={closeMenu}>
          Vishal Khamkar<span className="logo-dot"></span>
        </a>

        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <a href="#about" className="nav-link" onClick={closeMenu}>{t('nav.about')}</a>
          <a href="#services" className="nav-link" onClick={closeMenu}>{t('nav.services')}</a>
          <a href="#contact" className="nav-link" onClick={closeMenu}>{t('nav.contact')}</a>
          <a href="#contact" className="btn btn-primary mobile-cta" onClick={closeMenu}>
            <MessageSquare size={18} />
            {t('nav.talk')}
          </a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="lang-select"
            aria-label="Select Language"
          >
            <option value="en">English (EN)</option>
            <option value="hi">हिन्दी (HI)</option>
            <option value="mr">मराठी (MR)</option>
          </select>

          <div className="nav-actions">
            <a href="#contact" className="btn btn-secondary">
              <MessageSquare size={16} />
              {t('nav.talk')}
            </a>
          </div>

          <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle Navigation">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
