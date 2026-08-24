import { ArrowRight, Sparkles } from 'lucide-react';
import '@/styles/promo.css';

export function PromoBanner() {
  return (
    <div className="promo-banner promo-banner--primary grain" tabIndex={0} role="link" aria-label="Browse products">
      <div className="promo-banner__content">
        <div className="promo-banner__text">
          <span className="promo-banner__tag">Online presence</span>
          <h2 className="promo-banner__title">
            Find the right product for you
          </h2>
          <p className="promo-banner__description">
            Browse our complete catalogue. Discover the tools and services to power you.
          </p>
        </div>
        <button className="promo-banner__cta">
          <span>Browse products</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
