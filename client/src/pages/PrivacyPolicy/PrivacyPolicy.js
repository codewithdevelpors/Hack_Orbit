import React from "react";
import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
      <div className="legal-container">
        <header className="legal-header">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>
        </header>

        <div className="legal-content">
          <section className="legal-section">
            <h2>🛡️ Your Privacy Matters</h2>
            <p>
              At HackOrbit, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
            </p>
          </section>

          <section className="legal-section">
            <h2>📊 Information We Collect</h2>
            
            <h3>Information You Provide</h3>
            <ul>
              <li><strong>Search Queries:</strong> We store your search terms to improve our search functionality and provide better results</li>
              <li><strong>Ratings & Reviews:</strong> When you rate files, we collect your ratings to help other users discover quality content</li>
              <li><strong>Download History:</strong> We track downloads to provide usage statistics and improve our service</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <ul>
              <li><strong>Usage Data:</strong> Pages visited, time spent, and interaction patterns</li>
              <li><strong>Device Information:</strong> Browser type, operating system, and screen resolution</li>
              <li><strong>Preferences:</strong> Theme settings (light/dark mode) stored locally in your browser</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>🎯 How We Use Your Information</h2>
            <ul>
              <li><strong>Service Improvement:</strong> Analyze usage patterns to enhance user experience</li>
              <li><strong>Content Curation:</strong> Use search data to improve our file categorization and recommendations</li>
              <li><strong>Quality Assurance:</strong> Monitor ratings to maintain high-quality content standards</li>
              <li><strong>Technical Support:</strong> Diagnose and resolve technical issues</li>
              <li><strong>Analytics:</strong> Generate anonymous usage statistics for platform optimization</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>🔒 Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information:
            </p>
            <ul>
              <li><strong>Encryption:</strong> All data transmission is encrypted using HTTPS</li>
              <li><strong>Secure Storage:</strong> Data is stored in secure, monitored databases</li>
              <li><strong>Access Control:</strong> Limited access to personal data on a need-to-know basis</li>
              <li><strong>Regular Updates:</strong> We regularly update our security protocols</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>🍪 Cookies and Local Storage</h2>
            <p>
              HackOrbit uses cookies and local storage to enhance your experience:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
              <li><strong>Preference Cookies:</strong> Remember your theme and display preferences</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
            </ul>
            <p>
              You can control cookie settings through your browser preferences. Note that disabling cookies may affect site functionality.
            </p>
          </section>

          <section className="legal-section">
            <h2>🤝 Third-Party Services</h2>
            <p>
              We may use third-party services for:
            </p>
            <ul>
              <li><strong>Analytics:</strong> To understand user behavior and improve our service</li>
              <li><strong>Content Delivery:</strong> To ensure fast and reliable file downloads</li>
              <li><strong>Advertising:</strong> To display relevant ads that support our free content</li>
            </ul>
            <p>
              These services have their own privacy policies, and we encourage you to review them.
            </p>
          </section>

          <section className="legal-section">
            <h2>👤 Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request information about the data we have collected about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate personal information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
              <li><strong>Opt-out:</strong> Opt out of certain data collection practices</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>👶 Children's Privacy</h2>
            <p>
              HackOrbit is designed for general audiences and does not knowingly collect personal information from children under 13. 
              If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
            </p>
          </section>

          <section className="legal-section">
            <h2>🔄 Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify users of any material changes by:
            </p>
            <ul>
              <li>Updating the "Last updated" date at the top of this policy</li>
              <li>Posting a notice on our homepage</li>
              <li>Sending notifications for significant changes</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>📞 Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="contact-info">
              <p><strong>HackOrbit Team</strong></p>
              <p>📧 Email: codewithdevelpors@gmail.com</p>
              <p>📞 Phone: +923258247828</p>
              <p>🌐 Website: <a href="/">HackOrbit</a></p>
              <p>📍 We're committed to responding to your inquiries within 48 hours</p>
            </div>
          </section>

          <div className="legal-footer">
            <p>
              <strong>Thank you for trusting HackOrbit with your data. We're committed to maintaining your privacy while providing you with the best coding resources!</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;