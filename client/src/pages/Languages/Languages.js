import React from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '../../i18n';
import { STORAGE_KEYS } from '../../constants';
import './Languages.css';

/**
 * Languages Page Component
 *
 * Displays a list of 20 top languages for user selection.
 * When a language is clicked, it changes the app's language using i18next.
 */
function Languages() {
  const { t, i18n } = useTranslation();

  /**
   * Handle language selection
   * @param {string} languageCode - The code of the selected language
   */
  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    // Persist the selected language in localStorage
    localStorage.setItem(STORAGE_KEYS.language, languageCode);
    // Optionally, navigate back or show a success message
    // For now, just change the language
  };

  return (
    <div className="languages-page">
      <div className="languages-container">
        <h1 className="languages-title">{t('selectLanguage')}</h1>
        <p className="languages-subtitle">
          {t('currentLanguage')}: {languages.find(lang => lang.code === i18n.language)?.nativeName || 'English'}
        </p>

        <div className="languages-grid">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`language-button ${i18n.language === language.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <span className="language-native">{language.nativeName}</span>
              <span className="language-name">({language.name})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Languages;
