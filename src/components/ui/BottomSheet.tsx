import { useState, useRef, useEffect, ReactNode } from 'react';
import '@/styles/bottom-sheet.css';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  className?: string;
}

export function BottomSheet({ 
  isOpen, 
  onClose, 
  children, 
  headerContent, 
  footerContent,
  className = ''
}: BottomSheetProps) {
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  
  useEffect(() => {
    if (!isOpen) {
      setTranslateY(0);
      setIsDragging(false);
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTranslateY(800); // Slide down smoothly
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setTranslateY(0);
    }, 400); // Smooth transition duration
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;
    
    // Only allow dragging downwards
    if (deltaY > 0) {
      setTranslateY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const deltaY = currentY.current - startY.current;
    
    // Threshold to close is 100px
    if (deltaY > 100) {
      handleClose();
    } else {
      setTranslateY(0);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className={`bottom-sheet__backdrop ${isClosing ? 'closing' : ''}`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div 
        className={`bottom-sheet ${className}`}
        style={{ 
          transform: `translateY(${translateY}px)`,
          transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
        role="dialog"
        aria-modal="true"
      >
        <div 
          className="bottom-sheet__drag-area"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="bottom-sheet__grabber" />
          {headerContent && (
            <div className="bottom-sheet__header">
              {headerContent}
            </div>
          )}
        </div>
        
        <div className="bottom-sheet__content">
          {children}
        </div>

        {footerContent && (
          <div className="bottom-sheet__footer">
            {footerContent}
          </div>
        )}
      </div>
    </>
  );
}
