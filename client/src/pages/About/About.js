import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about">
      <div className="legal-container">
        <header className="legal-header">
          <h1>About HackOrbit</h1>
          <p className="tagline">Your Ultimate Destination for Amazing Code Resources 🚀</p>
        </header>

        <div className="legal-content">
          <section className="legal-section">
            <h2>🌟 Welcome to HackOrbit</h2>
            <p>
              HackOrbit is more than just a code repository – it's a thriving community where developers,
              students, and coding enthusiasts come together to discover, share, and learn from amazing code resources.
              Whether you're a beginner taking your first steps in programming or an experienced developer looking
              for inspiration, HackOrbit has something special for you.
            </p>
          </section>

          <section className="legal-section">
            <h2>🎯 Our Mission</h2>
            <p>
              We believe that great code should be accessible to everyone. Our mission is to democratize programming
              education and accelerate software development by providing a platform where:
            </p>
            <ul>
              <li><strong>Quality Code is Free:</strong> Access thousands of well-documented, tested code examples</li>
              <li><strong>Learning is Interactive:</strong> Preview code before downloading to understand its functionality</li>
              <li><strong>Community Drives Quality:</strong> User ratings and reviews help identify the best resources</li>
              <li><strong>Discovery is Easy:</strong> Advanced search and categorization make finding code effortless</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>✨ What Makes Us Special</h2>
            
            <h3>🆓 Free & Premium Resources</h3>
            <ul>
              <li><strong>Python Programs:</strong> From basic scripts to advanced applications</li>
              <li><strong>Web Development:</strong> HTML, CSS, and JavaScript projects</li>
              <li><strong>Premium Content:</strong> Advanced, professionally crafted code solutions</li>
              <li><strong>Educational Focus:</strong> Code designed for learning and understanding</li>
            </ul>

            <h3>🔍 Smart Discovery</h3>
            <ul>
              <li><strong>Intelligent Search:</strong> Find exactly what you need with our advanced search</li>
              <li><strong>Category Filtering:</strong> Browse by programming language and complexity</li>
              <li><strong>Rating System:</strong> Community-driven quality assessment</li>
              <li><strong>Preview Feature:</strong> See code structure before downloading</li>
            </ul>

            <h3>🎨 User Experience</h3>
            <ul>
              <li><strong>Modern Interface:</strong> Clean, intuitive design that works on all devices</li>
              <li><strong>Dark Mode:</strong> Easy on the eyes for those long coding sessions</li>
              <li><strong>Fast Downloads:</strong> Quick and reliable file delivery</li>
              <li><strong>Mobile Friendly:</strong> Access your favorite code on any device</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>👥 Our Community</h2>
            <p>
              HackOrbit is powered by an amazing community of developers who believe in sharing knowledge:
            </p>
            <ul>
              <li><strong>Students:</strong> Learning programming fundamentals and best practices</li>
              <li><strong>Educators:</strong> Teaching with real-world, practical examples</li>
              <li><strong>Professionals:</strong> Sharing expertise and accelerating development</li>
              <li><strong>Hobbyists:</strong> Exploring new technologies and building cool projects</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>🚀 Our Journey</h2>
            <p>
              HackOrbit was born from a simple idea: programming should be accessible, enjoyable, and collaborative.
              We started as a small project to help developers find quality code examples, and we've grown into a
              comprehensive platform that serves thousands of users worldwide.
            </p>
            
            <h3>Key Milestones</h3>
            <ul>
              <li><strong>Launch:</strong> Started with a collection of Python and web development resources</li>
              <li><strong>Community Growth:</strong> Expanded to include user ratings and reviews</li>
              <li><strong>Platform Evolution:</strong> Added advanced search, categories, and premium content</li>
              <li><strong>Mobile Optimization:</strong> Made the platform fully responsive and mobile-friendly</li>
              <li><strong>Future Vision:</strong> Continuously improving based on community feedback</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>💡 Our Values</h2>
            
            <h3>🎓 Education First</h3>
            <p>
              Every piece of code on our platform is selected or created with learning in mind. We believe that
              understanding code is just as important as using it.
            </p>

            <h3>🤝 Community Driven</h3>
            <p>
              Our users are our greatest asset. Community feedback, ratings, and contributions shape the direction
              of our platform.
            </p>

            <h3>🔓 Open Access</h3>
            <p>
              We're committed to keeping high-quality programming resources accessible to everyone, regardless of
              their background or financial situation.
            </p>

            <h3>⚡ Innovation</h3>
            <p>
              We continuously evolve our platform with new features, better user experience, and cutting-edge
              technology to serve our community better.
            </p>
          </section>


          <section className="legal-section">
            <h2>🎯 Future Roadmap</h2>
            <p>
              We're constantly working to improve HackOrbit. Here's what's coming:
            </p>
            <ul>
              <li><strong>AI-Powered Recommendations:</strong> Personalized code suggestions</li>
              <li><strong>Interactive Tutorials:</strong> Step-by-step coding guides</li>
              <li><strong>Code Playground:</strong> Test and modify code directly in the browser</li>
              <li><strong>Collaboration Tools:</strong> Share and work on code with others</li>
              <li><strong>Mobile App:</strong> Native mobile applications for iOS and Android</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>📞 Get in Touch</h2>
            <p>
              We love hearing from our community! Whether you have questions, suggestions, or just want to say hello:
            </p>
            <div className="contact-info">
              <p><strong>HackOrbit Team</strong></p>
              <p>📧 Email: hello@codegalaxy.com</p>
              <p>💬 Support: support@codegalaxy.com</p>
              <p>🌐 Website: <a href="/">HackOrbit</a></p>
              <p>📱 Follow us for updates and coding tips</p>
              <p>⏰ We typically respond within 24 hours</p>
            </div>
          </section>

          <div className="legal-footer">
            <p>
              <strong>Join thousands of developers who trust HackOrbit for their coding journey.
              Together, we're building the future of programming education! 🌟</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
