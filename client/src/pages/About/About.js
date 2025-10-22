import React from "react";
import { useTranslation } from 'react-i18next';
import "./About.css";

function About() {
  const { t } = useTranslation();

  return (
    <div className="about">
      <div className="legal-container">
        <header className="legal-header">
          <h1>{t('aboutTitle')}</h1>
          <p className="tagline">{t('aboutTagline')}</p>
        </header>

        <div className="legal-content">
          <section className="legal-section">
            <h2>{t('welcomeTitle')}</h2>
            <p>
              {t('welcomeText')}
            </p>
          </section>

          <section className="legal-section">
            <h2>{t('missionTitle')}</h2>
            <p>
              {t('missionText')}
            </p>
            <ul>
              {t('missionPoints', { returnObjects: true }).map((point, index) => (
                <li key={index}><strong>{point.split(':')[0]}:</strong> {point.split(':')[1]}</li>
              ))}
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t('specialTitle')}</h2>

            <h3>{t('freePremiumTitle')}</h3>
            <ul>
              {t('freePremiumPoints', { returnObjects: true }).map((point, index) => (
                <li key={index}><strong>{point.split(':')[0]}:</strong> {point.split(':')[1]}</li>
              ))}
            </ul>

            <h3>{t('smartDiscoveryTitle')}</h3>
            <ul>
              {t('smartDiscoveryPoints', { returnObjects: true }).map((point, index) => (
                <li key={index}><strong>{point.split(':')[0]}:</strong> {point.split(':')[1]}</li>
              ))}
            </ul>

            <h3>{t('userExperienceTitle')}</h3>
            <ul>
              {t('userExperiencePoints', { returnObjects: true }).map((point, index) => (
                <li key={index}><strong>{point.split(':')[0]}:</strong> {point.split(':')[1]}</li>
              ))}
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t('communityTitle')}</h2>
            <p>
              {t('communityText')}
            </p>
            <ul>
              {t('communityPoints', { returnObjects: true }).map((point, index) => (
                <li key={index}><strong>{point.split(':')[0]}:</strong> {point.split(':')[1]}</li>
              ))}
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t('journeyTitle')}</h2>
            <p>
              {t('journeyText')}
            </p>

            <h3>{t('milestonesTitle')}</h3>
            <ul>
              {t('milestonesPoints', { returnObjects: true }).map((point, index) => (
                <li key={index}><strong>{point.split(':')[0]}:</strong> {point.split(':')[1]}</li>
              ))}
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t('valuesTitle')}</h2>

            <h3>{t('educationFirstTitle')}</h3>
            <p>
              {t('educationFirstText')}
            </p>

            <h3>{t('communityDrivenTitle')}</h3>
            <p>
              {t('communityDrivenText')}
            </p>

            <h3>{t('openAccessTitle')}</h3>
            <p>
              {t('openAccessText')}
            </p>

            <h3>{t('innovationTitle')}</h3>
            <p>
              {t('innovationText')}
            </p>
          </section>


          <section className="legal-section">
            <h2>{t('roadmapTitle')}</h2>
            <p>
              {t('roadmapText')}
            </p>
            <ul>
              {t('roadmapPoints', { returnObjects: true }).map((point, index) => (
                <li key={index}><strong>{point.split(':')[0]}:</strong> {point.split(':')[1]}</li>
              ))}
            </ul>
          </section>

          <section className="legal-section">
            <h2>{t('contactTitle')}</h2>
            <p>
              {t('contactText')}
            </p>
            <div className="contact-info">
              <p><strong>{t('contactInfo.team')}</strong></p>
              <p>📧 Email: {t('contactInfo.email')}</p>
              <p>📞 Phone: {t('contactInfo.phone')}</p>
              <p>💬 Support: {t('contactInfo.support')}</p>
              <p>🌐 Website: <a href="/">{t('contactInfo.website')}</a></p>
              <p>📱 {t('contactInfo.updates')}</p>
              <p>⏰ {t('contactInfo.response')}</p>
            </div>
          </section>

          <div className="legal-footer">
            <p>
              <strong>{t('footerText')}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
