import './CSS/AboutUs.css';
import React from 'react';

// Import images
import teamImage from '../Components/Assets/Team.jpg';
import storeImage from '../Components/Assets/Cstore.jpg';
import sustainabilityImage from '../Components/Assets/Sustainability.jpg';
import heroBgImage from '../Components/Assets/Team.jpg';

const AboutUs = () => {
  const heroStyle = {
    background: `linear-gradient(rgba(13, 35, 150, 0.8), rgba(13, 35, 150, 0.9)), url(${heroBgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div className="about-us-container">
      <div className="about-us-hero" style={heroStyle}>
        <div className="hero-content">
          <h1>About HexOP</h1>
          <p>Redefining Online Shopping Since 2025</p>
        </div>
      </div>

      <section className="mission-section">
        <div className="mission-content">
          <div className="mission-text">
            <h2>Our Vision</h2>
            <p>
              At HexOP, we're revolutionizing the online shopping experience by connecting consumers with premium products from around the world. We believe shopping should be more than a transaction—it should be an experience that delights and inspires.
            </p>
            <p>
              We curate collections of fashion, electronics, home decor, and lifestyle products that combine quality, style, and value to meet the evolving needs of our global customer base.
            </p>
          </div>
          <div className="mission-image">
            <img src={storeImage} alt="HexOP Shopping Experience" />
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="team-content">
          <div className="team-image">
            <img src={teamImage} alt="HexOP Team" />
          </div>
          <div className="team-text">
            <h2>The Team Behind HexOP</h2>
            <p>
              Our diverse team of e-commerce experts, tech innovators, and customer experience specialists work together to create a seamless shopping journey. With backgrounds spanning retail, technology, and design, we combine our expertise to push the boundaries of what online shopping can be.
            </p>
            <p>
              Founded by a group of entrepreneurs who saw the opportunity to blend technology with personalized service, HexOP has grown from a small startup to a trusted shopping destination for customers in over 30 countries.
            </p>
          </div>
        </div>
      </section>

      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-content">
          <div className="values-text">
            <div className="value-item">
              <h3>Customer-First Approach</h3>
              <p>Every decision we make starts with our customers' needs and desires. We constantly gather feedback to improve and adapt our offerings.</p>
            </div>
            <div className="value-item">
              <h3>Quality Assurance</h3>
              <p>We rigorously vet all products on our platform to ensure they meet our high standards for quality, durability, and value.</p>
            </div>
            <div className="value-item">
              <h3>Innovation</h3>
              <p>From our AI-powered recommendation engine to our virtual try-on technology, we're always exploring new ways to enhance the shopping experience.</p>
            </div>
            <div className="value-item">
              <h3>Sustainability</h3>
              <p>We're committed to reducing our environmental impact through eco-friendly packaging, carbon-neutral shipping options, and partnerships with sustainable brands.</p>
            </div>
          </div>
          <div className="values-image">
            <img src={sustainabilityImage} alt="Sustainable Practices" />
          </div>
        </div>
      </section>

      <section className="commitment-section">
        <h2>Our Commitment to You</h2>
        <div className="commitment-cards">
          <div className="commitment-card">
            <div className="card-icon">🔍</div>
            <h3>Transparent Pricing</h3>
            <p>No hidden fees or surprise charges. What you see is what you pay.</p>
          </div>
          <div className="commitment-card">
            <div className="card-icon">🛡️</div>
            <h3>Secure Shopping</h3>
            <p>State-of-the-art encryption and security protocols protect your data.</p>
          </div>
          <div className="commitment-card">
            <div className="card-icon">⚡</div>
            <h3>Fast Delivery</h3>
            <p>Multiple shipping options to get your products to you when you need them.</p>
          </div>
          <div className="commitment-card">
            <div className="card-icon">💬</div>
            <h3>24/7 Support</h3>
            <p>Our customer service team is always ready to assist you.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;