import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", form);
    setSubmitted(true);
  };

  return (
    <div className="contact">
      <h1>Contact Us</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send</button>
        </form>
      ) : (
        <p>✅ Thanks for contacting us! We’ll get back to you soon.</p>
      )}
    </div>
  );
}

export default Contact;
