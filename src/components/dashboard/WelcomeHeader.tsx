'use client';

import { Ticket, Plus, Menu } from 'lucide-react';

export function WelcomeHeader() {
  return (
    <div className="welcome-header">
      <div className="welcome-header__left">
        <button 
          className="welcome-header__hamburger"
          onClick={() => window.dispatchEvent(new Event('openMobileDrawer'))}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="welcome-header__title">
          Welcome back, <span className="welcome-header__name">Anas Bilal</span>
        </h1>
      </div>
      <div className="welcome-header__actions">
        <button className="welcome-header__btn welcome-header__btn--ghost">
          <Ticket size={20} />
          <span className="welcome-header__btn-text">Manage tickets</span>
        </button>
        <button className="welcome-header__btn welcome-header__btn--primary">
          <Plus size={20} />
          <span className="welcome-header__btn-text">Place new order</span>
        </button>
      </div>

      <style>{`
        .welcome-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
          flex-wrap: wrap;
        }
        .welcome-header__left {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          flex: 1;
          min-width: 0;
        }
        .welcome-header__hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          color: var(--base-foreground);
          background: transparent;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          transition: background var(--transition-fast);
        }
        .welcome-header__hamburger:hover {
          background: var(--ghost-hover);
        }
        .welcome-header__title {
          font-size: var(--text-3xl);
          font-weight: var(--weight-semibold);
          color: var(--base-foreground);
          line-height: var(--leading-tight);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .welcome-header__name {
          color: var(--primary);
          font-weight: var(--weight-bold);
        }
        .welcome-header__actions {
          display: flex;
          gap: var(--space-3);
          flex-wrap: wrap;
        }
        .welcome-header__btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          font-size: var(--text-sm);
          font-weight: var(--weight-medium);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 150ms ease-out;
        }
        .welcome-header__btn--ghost {
          color: var(--base-foreground);
          background: var(--secondary);
          border: 1px solid var(--border);
        }
        .welcome-header__btn--ghost:hover {
          border-color: var(--primary);
          background: var(--primary-glow);
          color: var(--primary);
        }
        .welcome-header__btn--primary {
          background: var(--primary);
          color: var(--primary-foreground);
          border: 1px solid var(--primary);
        }
        .welcome-header__btn--primary:hover {
          filter: brightness(0.92);
          transform: scale(0.98);
        }
        
        @media (max-width: 639px) {
          .welcome-header {
            flex-direction: row;
            flex-wrap: nowrap;
            gap: var(--space-2);
          }
          .welcome-header__hamburger {
            display: flex;
          }
          .welcome-header__title {
            font-size: var(--text-lg);
          }
          .welcome-header__actions {
            flex-wrap: nowrap;
            gap: var(--space-2);
            flex-shrink: 0;
          }
          .welcome-header__btn {
            width: 40px;
            height: 40px;
            padding: 0;
            justify-content: center;
          }
          .welcome-header__btn-text {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
