'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Sidebar } from './Sidebar';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  // Reset all state when the drawer closes externally
  useEffect(() => {
    if (!isOpen) {
      setTranslateX(0);
      setIsDragging(false);
      setIsClosing(false);
    }
  }, [isOpen]);

  // Animate the drawer sliding out, then fire onClose
  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    setTranslateX(-500);
    setTimeout(onClose, 400); // matches the CSS transition duration
  }, [isClosing, onClose]);

  // Close on Escape key + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  // Swipe left to close
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    currentX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentX.current = e.touches[0].clientX;
    const delta = currentX.current - startX.current;
    if (delta < 0) setTranslateX(delta); // only drag left
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const delta = currentX.current - startX.current;
    if (delta < -50) {
      handleClose();
    } else {
      setTranslateX(0); // snap back if not dragged far enough
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`mobile-drawer-overlay${isClosing ? ' closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Dark backdrop — tap outside to close */}
      <div className="mobile-drawer-scrim" onClick={handleClose} aria-hidden="true" />

      {/* Sidebar panel */}
      <div
        className="mobile-drawer"
        ref={drawerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: translateX < 0 ? `translateX(${translateX}px)` : undefined,
          transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        <Sidebar collapsed={false} onToggleCollapse={handleClose} />
      </div>
    </div>
  );
}
