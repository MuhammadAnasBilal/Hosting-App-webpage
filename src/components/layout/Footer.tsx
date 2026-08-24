import '@/styles/layout.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="#" className="footer__link">Cookie Settings</a>
        <span className="footer__divider">|</span>
        <a href="#" className="footer__link">Give Feedback</a>
      </div>
      <div className="footer__version">hosting.com Panel v0.5.3</div>
    </footer>
  );
}
