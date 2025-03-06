import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/contact`,
        formData
      );
      setResponseMessage(response.data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      console.error("Error sending message:", error);
      setResponseMessage("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact">
      <div className="container box">
        <div className="row">
          {/* Left Side - Image */}
          <div className="col-lg-5 col-md-6 col-12">
            <img
              src="/images/contact-image.webp"
              alt="Contact Us"
              className="img-fluid"
            />
          </div>

          {/* Right Side - Contact Form */}
          <div className="col-lg-6 col-md-6 col-12 p-lg-5 p-2 my-5">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                className="form-control"
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
            {responseMessage && <p className="mt-3">{responseMessage}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
