import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import './Contact.css';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirements: ''
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [showInstructions, setShowInstructions] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // PLACEHOLDER: Replace this URL with your deployed Google Apps Script Web App URL
  const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = t('contact.validation.nameReq');
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('contact.validation.nameLen');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t('contact.validation.emailReq');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('contact.validation.emailVal');
    }

    const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.validation.phoneReq');
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = t('contact.validation.phoneVal');
    }

    if (!formData.requirements.trim()) {
      newErrors.requirements = t('contact.validation.reqReq');
    } else if (formData.requirements.trim().length < 10) {
      newErrors.requirements = t('contact.validation.reqLen');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (APPS_SCRIPT_URL.includes('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL')) {
        // If placeholder URL is active, simulate submission for demo
        setTimeout(() => {
          setStatus('success');
          setFormData({ name: '', phone: '', email: '', requirements: '' });
        }, 1500);
      } else {
        const result = await response.json();
        if (response.ok && result.result === 'success') {
          setStatus('success');
          setFormData({ name: '', phone: '', email: '', requirements: '' });
        } else {
          setStatus('error');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      if (APPS_SCRIPT_URL.includes('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL')) {
        setTimeout(() => {
          setStatus('success');
          setFormData({ name: '', phone: '', email: '', requirements: '' });
        }, 1500);
      } else {
        setStatus('error');
      }
    }
  };

  const appsScriptCode = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Append data: [Timestamp, Name, Phone, Email, Requirements]
    sheet.appendRow([
      new Date(),
      data.name,
      data.phone,
      data.email,
      data.requirements
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
  }
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-header reveal">
          <span className="badge badge-primary">{t('contact.badge')}</span>
          <h2 className="contact-title">{t('contact.title')}</h2>
          <p className="contact-desc">{t('contact.desc')}</p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Info Details */}
          <div className="contact-info reveal stagger-1">
            <h3 className="info-title">{t('contact.channels')}</h3>
            
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon-wrapper">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="info-label">{t('contact.emailLabel')}</div>
                  <div className="info-value">
                    <a href="mailto:vishalkhamkar.dev@gmail.com">vishalkhamkar.dev@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon-wrapper">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="info-label">{t('contact.phoneLabel')}</div>
                  <div className="info-value">
                    <a href="tel:+919876543210">+91 98765 43210</a>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon-wrapper">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="info-label">{t('contact.locLabel')}</div>
                  <div className="info-value">{t('contact.locValue')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-card reveal stagger-2">
            {status === 'success' ? (
              <div className="form-success-box">
                <div className="success-icon-wrapper">
                  <CheckCircle size={48} />
                </div>
                <h4 className="success-title">{t('contact.formCard.successTitle')}</h4>
                <p className="success-text">{t('contact.formCard.successDesc')}</p>
                <button 
                  className="btn btn-secondary" 
                  style={{ marginTop: '20px' }} 
                  onClick={() => setStatus('idle')}
                >
                  {t('contact.formCard.anotherMsg')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">{t('contact.formCard.name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('contact.formCard.namePlaceholder')}
                    className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                    disabled={status === 'submitting'}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">{t('contact.formCard.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('contact.formCard.emailPlaceholder')}
                    className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                    disabled={status === 'submitting'}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">{t('contact.formCard.phone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('contact.formCard.phonePlaceholder')}
                    className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                    disabled={status === 'submitting'}
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="requirements" className="form-label">{t('contact.formCard.req')}</label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder={t('contact.formCard.reqPlaceholder')}
                    className={`form-input ${errors.requirements ? 'form-input-error' : ''}`}
                    disabled={status === 'submitting'}
                  />
                  {errors.requirements && <span className="form-error">{errors.requirements}</span>}
                </div>

                {status === 'error' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', marginBottom: '16px', fontSize: '0.9rem' }}>
                    <AlertCircle size={18} />
                    <span>{t('contact.formCard.errorMsg')}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary form-submit-btn"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? t('contact.formCard.submitting') : t('contact.formCard.submit')}
                </button>
              </form>
            )}

            <div 
              className="setup-instructions-link"
              onClick={() => setShowInstructions(!showInstructions)}
            >
              {showInstructions ? t('contact.instructions.toggleHide') : t('contact.instructions.toggleShow')}
            </div>

            {showInstructions && (
              <div className="setup-instructions-box">
                <p style={{ fontWeight: '600', marginBottom: '8px' }}>{t('contact.instructions.title')}</p>
                <ol style={{ paddingLeft: '16px', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li>{t('contact.instructions.step1')}</li>
                  <li>{t('contact.instructions.step2')}</li>
                  <li>{t('contact.instructions.step3')}</li>
                  <li>{t('contact.instructions.step4')}</li>
                  <li>{t('contact.instructions.step5')}</li>
                  <li>{t('contact.instructions.step6')}</li>
                </ol>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: '600', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t('contact.instructions.templateLabel')}</span>
                  <button 
                    onClick={copyToClipboard}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-primary)' }}
                  >
                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    {isCopied ? t('contact.instructions.copiedBtn') : t('contact.instructions.copyBtn')}
                  </button>
                </div>
                <pre className="pre-code-box">{appsScriptCode}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
