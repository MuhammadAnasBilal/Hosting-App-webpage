'use client';

import { useState, useMemo } from 'react';
import { Search, Lightbulb, ShoppingCart } from 'lucide-react';
import { tldCards, domainCategories, mockDomainResults } from '@/data/mockData';
import '@/styles/domain-search.css';

export function DomainSearchHero() {
  const [query, setQuery] = useState('');
  const [ideaMode, setIdeaMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      setShowResults(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().replace(/\s+/g, '');
    return mockDomainResults.map(r => ({
      ...r,
      domain: r.domain.replace('yourbusiness', q || 'yourbusiness'),
    }));
  }, [query]);

  // Duplicate TLD cards for seamless loop
  const tldRow1 = [...tldCards, ...tldCards];
  const tldRow2 = [...tldCards.slice().reverse(), ...tldCards.slice().reverse()];

  return (
    <section className="domain-hero" aria-labelledby="domain-hero-title">
      <div className="domain-hero__header">
        <h2 className="domain-hero__title" id="domain-hero-title">
          Lock in a new domain for <span>your business</span>
        </h2>
        <p className="domain-hero__subtitle">
          Search for the perfect domain to represent your brand or business.
        </p>
      </div>

      {/* Glass search bar */}
      <div className="domain-search">
        <div className="domain-search__bar">
          <input
            className="domain-search__input"
            type="text"
            placeholder={ideaMode ? 'Describe your business idea…' : 'Start with a keyword'}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowResults(false); }}
            onKeyDown={handleKeyDown}
            aria-label="Search for a domain"
          />
          <button
            className="domain-search__btn"
            onClick={handleSearch}
            aria-label="Search"
          >
            <Search />
          </button>
        </div>

        {/* Idea mode toggle */}
        <div className="domain-search__toggle">
          <Lightbulb size={14} />
          <span>Idea mode</span>
          <button
            className={`domain-search__toggle-switch ${ideaMode ? 'domain-search__toggle-switch--active' : ''}`}
            onClick={() => setIdeaMode(!ideaMode)}
            role="switch"
            aria-checked={ideaMode}
            aria-label="Toggle idea mode"
          />
        </div>

        {/* Category chips */}
        <div className="domain-search__categories" role="listbox" aria-label="Business category filter">
          {domainCategories.map(cat => (
            <button
              key={cat}
              className={`domain-search__chip ${activeCategory === cat ? 'domain-search__chip--active' : ''}`}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              role="option"
              aria-selected={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search results */}
      {showResults && filteredResults.length > 0 && (
        <div className="domain-results" role="list" aria-label="Domain search results">
          {filteredResults.map(result => (
            <div key={result.domain} className="domain-result" role="listitem">
              <span className="domain-result__name">{result.domain}</span>
              <div className="domain-result__right">
                <span className={`domain-result__status ${result.available ? 'domain-result__status--available' : 'domain-result__status--taken'}`}>
                  {result.available ? 'Available' : 'Taken'}
                </span>
                <span className="domain-result__price">{result.price}</span>
                {result.available ? (
                  <button className="domain-result__add-btn" aria-label={`Add ${result.domain} to cart`}>
                    <ShoppingCart size={12} />
                    Add
                  </button>
                ) : (
                  <span className="domain-result__add-btn domain-result__add-btn--disabled">
                    Unavailable
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TLD Marquee */}
      <div className="marquee-wrapper" aria-hidden="true">
        <div className="marquee-row marquee-row--left">
          {tldRow1.map((tld, i) => (
            <div key={`l-${i}`} className="tld-card">
              <span className="tld-card__name">{tld.tld}</span>
              <span className="tld-card__original-price">{tld.originalPrice}</span>
              <span className="tld-card__sale-price">{tld.salePrice}</span>
              {tld.popular && <span className="tld-card__popular">Popular</span>}
            </div>
          ))}
        </div>
        <div className="marquee-row marquee-row--right">
          {tldRow2.map((tld, i) => (
            <div key={`r-${i}`} className="tld-card">
              <span className="tld-card__name">{tld.tld}</span>
              <span className="tld-card__original-price">{tld.originalPrice}</span>
              <span className="tld-card__sale-price">{tld.salePrice}</span>
              {tld.popular && <span className="tld-card__popular">Popular</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
