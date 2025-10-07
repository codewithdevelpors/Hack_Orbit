import React from "react";
import "./TermsOfService.css";

function TermsOfService() {
  return (
    <div className="terms-of-service">
      <div className="legal-container">
        <header className="legal-header">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>
        </header>

        <div className="legal-content">
          <section className="legal-section">
            <h2>🌟 Welcome to HackOrbit</h2>
            <p>
              Welcome to HackOrbit, your premier destination for discovering, downloading, and sharing amazing code resources! 
              By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>
          </section>

          <section className="legal-section">
            <h2>✅ Acceptance of Terms</h2>
            <p>
              By accessing HackOrbit, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service 
              and our Privacy Policy. If you do not agree to these terms, please do not use our service.
            </p>
            <ul>
              <li>These terms apply to all users, including visitors, registered users, and contributors</li>
              <li>You must be at least 13 years old to use HackOrbit</li>
              <li>You are responsible for ensuring your use complies with applicable laws</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>🎯 Service Description</h2>
            <p>HackOrbit provides:</p>
            <ul>
              <li><strong>Free Code Resources:</strong> Access to Python, HTML/CSS, and other programming files</li>
              <li><strong>Premium Content:</strong> Paid programs and advanced code resources</li>
              <li><strong>Search & Discovery:</strong> Advanced search functionality to find relevant code</li>
              <li><strong>Rating System:</strong> Community-driven ratings and reviews</li>
              <li><strong>Download Services:</strong> Secure file download capabilities</li>
              <li><strong>Preview Features:</strong> Code preview before download</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>👤 User Responsibilities</h2>
            
            <h3>Acceptable Use</h3>
            <p>You agree to use HackOrbit responsibly and ethically:</p>
            <ul>
              <li>Use downloaded code in compliance with applicable licenses</li>
              <li>Provide honest and constructive ratings and reviews</li>
              <li>Respect intellectual property rights</li>
              <li>Use the platform for legitimate educational and development purposes</li>
            </ul>

            <h3>Prohibited Activities</h3>
            <p>You must NOT:</p>
            <ul>
              <li>Upload malicious code, viruses, or harmful content</li>
              <li>Attempt to hack, disrupt, or compromise our systems</li>
              <li>Use automated tools to scrape or download content in bulk</li>
              <li>Share your account credentials with others</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on others' intellectual property rights</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>📁 Content and Intellectual Property</h2>
            
            <h3>Our Content</h3>
            <ul>
              <li>HackOrbit owns the platform, design, and original content</li>
              <li>Our logo, branding, and interface are protected by copyright</li>
              <li>You may not reproduce our platform or create derivative works</li>
            </ul>

            <h3>User-Generated Content</h3>
            <ul>
              <li>You retain ownership of code you upload or contribute</li>
              <li>By uploading, you grant us a license to display and distribute your content</li>
              <li>You represent that you have the right to share uploaded content</li>
              <li>We reserve the right to remove content that violates our policies</li>
            </ul>

            <h3>Downloaded Content</h3>
            <ul>
              <li>Downloaded code may be subject to specific licenses</li>
              <li>You are responsible for complying with all applicable licenses</li>
              <li>Some content may be for educational use only</li>
              <li>Commercial use may require additional permissions</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>💳 Payment and Pricing</h2>
            
            <h3>Free Content</h3>
            <ul>
              <li>Many resources on HackOrbit are completely free</li>
              <li>Free content is supported by advertisements</li>
              <li>No payment required for basic platform access</li>
            </ul>

            <h3>Premium Content</h3>
            <ul>
              <li>Some advanced resources require payment</li>
              <li>Prices are clearly displayed before purchase</li>
              <li>All sales are final unless otherwise specified</li>
              <li>Refunds may be available for technical issues</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>🛡️ Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Our data practices are detailed in our Privacy Policy, which includes:
            </p>
            <ul>
              <li>How we collect and use your information</li>
              <li>Cookie and tracking policies</li>
              <li>Your rights regarding your data</li>
              <li>Security measures we implement</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>⚠️ Disclaimers and Limitations</h2>
            
            <h3>Service Availability</h3>
            <ul>
              <li>We strive for 99.9% uptime but cannot guarantee uninterrupted service</li>
              <li>Maintenance and updates may temporarily affect availability</li>
              <li>We reserve the right to modify or discontinue features</li>
            </ul>

            <h3>Content Accuracy</h3>
            <ul>
              <li>We do not guarantee the accuracy or functionality of all code</li>
              <li>Users should test and verify code before implementation</li>
              <li>Community ratings help assess code quality</li>
            </ul>

            <h3>Limitation of Liability</h3>
            <p>
              HackOrbit and its operators shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages arising from your use of the platform.
            </p>
          </section>

          <section className="legal-section">
            <h2>🔄 Modifications to Terms</h2>
            <p>
              We may update these Terms of Service from time to time. When we do:
            </p>
            <ul>
              <li>We'll update the "Last updated" date</li>
              <li>Significant changes will be announced on our platform</li>
              <li>Continued use constitutes acceptance of new terms</li>
              <li>You can always find the latest version on this page</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>⚖️ Dispute Resolution</h2>
            <p>
              In the unlikely event of a dispute:
            </p>
            <ul>
              <li>We encourage direct communication to resolve issues</li>
              <li>Most problems can be solved through our support channels</li>
              <li>We're committed to fair and prompt resolution</li>
              <li>Legal disputes will be governed by applicable local laws</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>🚫 Termination</h2>
            <p>
              Either party may terminate this agreement:
            </p>
            <ul>
              <li><strong>You:</strong> Can stop using HackOrbit at any time</li>
              <li><strong>We:</strong> May suspend accounts for terms violations</li>
              <li><strong>Effect:</strong> Termination doesn't affect previously downloaded content</li>
              <li><strong>Data:</strong> We may retain some data as required by law</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>📞 Contact Information</h2>
            <p>
              Questions about these Terms of Service? We're here to help!
            </p>
            <div className="contact-info">
              <p><strong>HackOrbit Legal Team</strong></p>
              <p>📧 Email: codewithdevelpors@gmail.com</p>
              <p>🌐 Website: <a href="/">HackOrbit</a></p>
              <p>📍 Response time: Within 48 hours</p>
              <p>💬 We're committed to clear communication and fair resolution</p>
            </div>
          </section>

          <div className="legal-footer">
            <p>
              <strong>Thank you for being part of the HackOrbit community! Together, we're building an amazing platform for developers worldwide. 🚀</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;