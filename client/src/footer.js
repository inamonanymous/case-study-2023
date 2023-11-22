import React from 'react';
import './styles/footer.css';
const Footer = () => {
  return (
    <footer>
    <div class="footer-content">
      <div class="contact-info">
        <h3>Connect with Us:</h3>
        <p>Email: schoopdogg@edu.com</p>
        <p>Phone: +63 956-604-6623</p>
      </div>
      <div class="team-info">
        <h3>Meet the Team:</h3>
        <p>Hannah Grampa: Project Manager</p>
        <p>Stephen Aguilar: Software Engineer</p>
        <p>Kervie Perquesa: Manuscript Editor</p>
      </div>
      <div class="stay-connected">
        <h3>Stay Connected:</h3>
        <p>Follow us on LinkedIn | Twitter | Instagram</p>
      </div>
      <div class="address-info">
        <h3>Address:</h3>
        <p>Mamatid, Cabuyao, Laguna</p>
      </div>
      <div class="about-info">
        <h3>About the System:</h3>
        <p>
          The system is dedicated to monitor and optimize school gym needs,
          ensuring a seamless and efficient experience for students and staff.
          We strive to enhance the educational environment by providing
          top-notch solutions for managing and maintaining school fitness
          facilities.
        </p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
