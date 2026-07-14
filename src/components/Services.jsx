import React from 'react';
import { Globe, Code2, Smartphone, GraduationCap, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import './Services.css';

export default function Services() {
  const { t } = useLanguage();

  const serviceIcons = [
    { icon: <Globe size={26} />, themeClass: "icon-box-blue" },
    { icon: <Code2 size={26} />, themeClass: "icon-box-teal" },
    { icon: <Smartphone size={26} />, themeClass: "icon-box-purple" },
    { icon: <GraduationCap size={26} />, themeClass: "icon-box-blue" },
    { icon: <Sparkles size={26} />, themeClass: "icon-box-teal" }
  ];

  const serviceTranslations = Array.isArray(t('services.list')) ? t('services.list') : [];

  // Safely pair translated texts with local icons
  const serviceList = serviceTranslations.map((service, index) => ({
    ...service,
    ...(serviceIcons[index] || serviceIcons[0])
  }));

  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="services-header reveal">
          <span className="badge badge-accent">{t('services.badge')}</span>
          <h2 className="services-title font-heading">{t('services.title')}</h2>
          <p className="services-desc">{t('services.desc')}</p>
        </div>

        <div className="services-container-grid">
          {serviceList.map((service, index) => (
            <div 
              key={index} 
              className={`service-card reveal stagger-${(index % 3) + 1}`}
            >
              <div className={`service-icon-box ${service.themeClass}`}>
                {service.icon}
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-text">{service.description}</p>
              <a href="#contact" className="service-link">
                {t('services.discuss')} <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
