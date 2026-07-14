import React, { useState, useEffect } from 'react';
import { ArrowRight, Cpu, Database } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import './Hero.css';

export default function Hero() {
  const { t } = useLanguage();
  const [wordIndex, setWordIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");

  const wordsList = Array.isArray(t('hero.words')) ? t('hero.words') : ["Engineer"];

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("fade-out");
      setTimeout(() => {
        setWordIndex((prevIndex) => (prevIndex + 1) % wordsList.length);
        setFadeState("fade-in");
      }, 300); // sync with Hero.css transition duration (0.3s)
    }, 3000); // Switch word every 3 seconds

    return () => clearInterval(interval);
  }, [wordsList.length]);

  const highlightText = t('hero.engineerHighlight').replace('{word}', wordsList[wordIndex] || wordsList[0]);

  return (
    <section id="hero" className="hero">
      <div className="bg-mesh">
        <div className="mesh-circle-1"></div>
        <div className="mesh-circle-2"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <span className="badge badge-primary">{t('hero.badge')}</span>
          
          <h1 className="hero-title">
            {t('hero.envision')}<br />
            <span className={`hero-title-highlight ${fadeState}`}>
              {highlightText}
            </span><br />
            {t('hero.reality')}
          </h1>

          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>

          <div className="hero-ctas">
            <a href="#contact" className="btn btn-primary">
              {t('hero.ctaPrimary')}
              <ArrowRight size={18} />
            </a>
            <a href="#services" className="btn btn-secondary">
              {t('hero.ctaSecondary')}
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">5+</span>
              <span className="stat-label">{t('hero.statExp')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">50+</span>
              <span className="stat-label">{t('hero.statProj')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">{t('hero.statSat')}</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img 
              src="/hero_abstract.jpg" 
              alt="Vishal Khamkar - Software Architecture Illustration" 
              className="hero-image"
              loading="eager"
            />
          </div>

          {/* Floating premium glass cards */}
          <div className="glass-tag glass-tag-1">
            <div className="glass-icon-wrapper glass-icon-blue">
              <Cpu size={20} />
            </div>
            <div>
              <div className="glass-tag-title">Java & Spring Boot</div>
              <div className="glass-tag-subtitle">Robust Microservices</div>
            </div>
          </div>

          <div className="glass-tag glass-tag-2">
            <div className="glass-icon-wrapper glass-icon-teal">
              <Database size={20} />
            </div>
            <div>
              <div className="glass-tag-title">React Ecosystem</div>
              <div className="glass-tag-subtitle">Premium Frontend UX</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
