import React, { useState } from 'react'
import { toast } from 'react-toastify'

export const ContactUs = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  function changeHandler(e){
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function submitHandler(e){
    e.preventDefault();

    toast.success("Message sent successfully 🚀");

    setFormData({
      name: '',
      email: '',
      message: ''
    });
  }

  return (
    <div className="contact_wrapper">

      {/* Heading */}
      <div className="contact_header">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you!</p>
      </div>

      <div className="contact_container">

        {/* Form Section */}
        <form className="contact_form" onSubmit={submitHandler}>
          <input 
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={changeHandler}
            required
          />

          <input 
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={changeHandler}
            required
          />

          <textarea 
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={changeHandler}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>

        {/* Contact Info */}
        <div className="contact_info">
          <h3>Get in Touch</h3>
          <p><strong>Address:</strong> ShopEase Store 742 Evergreen Terrace Springfield, IL 62704 USA</p>
          <p><strong>Email:</strong> support@shopease.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p>Our team will respond within 24 hours.</p>
        </div>

      </div>

    </div>
  )
}