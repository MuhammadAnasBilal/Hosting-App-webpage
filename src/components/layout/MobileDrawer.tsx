'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  useEffect(() => {
    if (!isOpen) {
      setTranslateX(0);
      setIsDragging(false);
    }
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    currentX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentX.current = e.touches[0].clientX;
    const deltaX = currentX.current - startX.current;
    
    // Only allow dragging left to close
    if (deltaX < 0) {
      setTranslateX(deltaX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const deltaX = currentX.current - startX.current;
    
    if (deltaX < -50) {
      onClose(); // Close sidebar
    } else {
      setTranslateX(0); // Reset visual position
    }
  };

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
      {/* Scrim — clicking outside closes */}
      <div
        className="mobile-drawer-scrim"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer panel */}
      <div 
        className="mobile-drawer" 
        ref={drawerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: translateX < 0 ? `translateX(${translateX}px)` : undefined,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s ease'
        }}
      >
        <Sidebar collapsed={false} onToggleCollapse={onClose} />
      </div>

      <style>{`
        .mobile-drawer-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
        }
        .mobile-drawer-scrim {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
          animation: scrim-in 200ms ease-out;
        }
        @keyframes scrim-in {
          from { opacity: 0; }
          to   { opacity: 1; }
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
        @keyframes slide-in-left {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
        .mobile-drawer .sidebar {
          display: flex !important;
          width: 100% !important;
          height: 100%;
          border-right: none;
          position: static;
        .mobile-drawer .sidebar__collapse-btn {
          display: none;
        }
      `}</style>
    </div>
  );
}
