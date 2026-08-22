'use client';

import { Ticket, Plus } from 'lucide-react';

export function WelcomeHeader() {
  return (
    <div className="welcome-header">
      <div className="welcome-header__left">
        <h1 className="welcome-header__title">
          Welcome back, <span className="welcome-header__name">Anas Bilal</span>
        </h1>
      </div>
      <div className="welcome-header__actions">
        <button className="welcome-header__btn welcome-header__btn--ghost">
          <Ticket size={16} />
          <span>Manage support tickets</span>
        </button>
        <button className="welcome-header__btn welcome-header__btn--primary">
          <Plus size={16} />
          <span>Place new order</span>
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
        .welcome-header__title {
          font-size: var(--text-3xl);
          font-weight: var(--weight-semibold);
          color: var(--base-foreground);
          line-height: var(--leading-tight);
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
        }
        .welcome-header__btn--primary:hover {
          filter: brightness(0.92);
          transform: scale(0.98);
        }
        @media (max-width: 639px) {
          .welcome-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .welcome-header__title {
            font-size: var(--text-2xl);
          }
          .welcome-header__actions {
            width: 100%;
          }
          .welcome-header__btn {
            flex: 1;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
