'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus trap & escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="mobile-drawer-overlay" role="dialog" aria-modal="true" aria-label="Navigation menu">
      {/* Scrim */}
      <div
        className="mobile-drawer-scrim"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer */}
      <div className="mobile-drawer" ref={drawerRef}>
        <div className="mobile-drawer__close-row">
          <button
            className="mobile-drawer__close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>
        <Sidebar collapsed={false} onToggleCollapse={onClose} />
      </div>

      <style>{`
        .mobile-drawer-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
        }
        .mobile-drawer-scrim {
          position: absolute;
          inset: 0;
          background: var(--overlay);
          animation: scrim-in 200ms ease-out;
        }
        .mobile-drawer {
          position: relative;
          width: 280px;
          max-width: 85vw;
          height: 100%;
          background: var(--base-card);
          border-right: 1px solid var(--border);
          animation: slide-in-left 250ms cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .mobile-drawer .sidebar {
          display: flex !important;
          width: 100% !important;
          height: 100%;
          border-right: none;
          position: static;
        }
        .mobile-drawer .sidebar__collapse-btn {
          display: none;
        }
        .mobile-drawer__close-row {
          display: flex;
          justify-content: flex-end;
          padding: var(--space-2) var(--space-3);
          border-bottom: 1px solid var(--border);
        }
        .mobile-drawer__close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          color: var(--base-muted-foreground);
          transition: background 150ms, color 150ms;
        }
        .mobile-drawer__close:hover {
          background: var(--ghost-hover);
          color: var(--base-foreground);
        }
      `}</style>
    </div>
  );
}
