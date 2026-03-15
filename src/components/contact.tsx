import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="section-label">Contact</div>
      <h2 className="section-title">연락하기</h2>
      <div className="contact-links">
        <a
          href="https://github.com/jjuy00"
          target="_blank"
          rel="noreferrer"
          className="contact-item"
        >
          <span className="contact-icon">🐙</span>
          <span>github.com/jjuy00</span>
        </a>
        <a href="mailto:pjy7244@gmail.com" className="contact-item">
          <span className="contact-icon">✉️</span>
          <span>pjy7244@gmail.com</span>
        </a>
      </div>
    </section>
  );
}