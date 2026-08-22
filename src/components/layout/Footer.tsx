export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="#" className="footer__link">Cookie Settings</a>
        <span className="footer__divider">|</span>
        <a href="#" className="footer__link">Give Feedback</a>
      </div>
      <div className="footer__version">
        hosting.com Panel v0.5.3
      </div>
      <style>{`
        .footer {
          margin-top: var(--space-12);
          padding-top: var(--space-8);
          padding-bottom: var(--space-8);
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
          color: var(--base-muted-foreground);
          font-size: var(--text-xs);
        }
        .footer__links {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }
        .footer__link {
          transition: color var(--transition-fast);
        }
        .footer__link:hover {
          color: var(--primary);
        }
        .footer__divider {
          opacity: 0.5;
        }
        .footer__version {
          color: var(--base-subtle-foreground);
        }
      `}</style>
    </footer>
  );
}
