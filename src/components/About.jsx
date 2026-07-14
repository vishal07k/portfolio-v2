import React from 'react';
import { Cpu, Layout, Server } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import './About.css';

export default function About() {
  const { t } = useLanguage();

  const backendSkills = [
    "Java (8/11/17)", "Spring Boot", "Spring Security", "RESTful APIs", 
    "Hibernate / JPA", "Microservices Architecture", "JUnit / Mockito"
  ];

  const frontendSkills = [
    "React.js", "JavaScript (ES6+)", "CSS Modules & Vanilla CSS", 
    "State Management", "Fetch API / Axios", "Responsive UI/UX"
  ];

  const toolsSkills = [
    "MySQL", "PostgreSQL", "Git / GitHub", "Docker", 
    "Maven", "Postman", "Agile Methodologies"
  ];

  const milestones = Array.isArray(t('about.milestones')) ? t('about.milestones') : [];

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-header reveal">
          <span className="badge badge-secondary">{t('about.badge')}</span>
          <h2 className="about-title">{t('about.title')}</h2>
          <p className="about-desc">{t('about.desc')}</p>
        </div>

        <div className="about-grid">
          {/* Left Side: Background & Experience */}
          <div className="about-story reveal stagger-1">
            <h3 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>{t('about.approachTitle')}</h3>
            <p className="about-story-text">
              {t('about.approachText1')}
            </p>
            <p className="about-story-text">
              {t('about.approachText2')}
            </p>

            <h3 style={{ fontSize: '1.6rem', marginTop: '20px', marginBottom: '12px' }}>{t('about.timelineTitle')}</h3>
            <div className="about-timeline">
              {milestones.map((milestone, index) => (
                <div key={index} className="timeline-item">
                  <span className="timeline-dot"></span>
                  <div className="timeline-date">{milestone.date}</div>
                  <div className="timeline-title">{milestone.title}</div>
                  <p className="timeline-desc">{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Core Tech Stack Category Cards */}
          <div className="skills-container">
            <div className="skill-category-card reveal stagger-2">
              <div className="category-title-wrapper">
                <Server size={22} className="category-icon" />
                <h4 className="category-title">{t('about.stackBackend')}</h4>
              </div>
              <div className="skills-tags-grid">
                {backendSkills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skill-category-card reveal stagger-3">
              <div className="category-title-wrapper">
                <Layout size={22} className="category-icon" />
                <h4 className="category-title">{t('about.stackFrontend')}</h4>
              </div>
              <div className="skills-tags-grid">
                {frontendSkills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skill-category-card reveal stagger-4">
              <div className="category-title-wrapper">
                <Cpu size={22} className="category-icon" />
                <h4 className="category-title">{t('about.stackDatabase')}</h4>
              </div>
              <div className="skills-tags-grid">
                {toolsSkills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
