import { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { BottomSheet } from '@/components/ui/BottomSheet';

interface DropdownPanelProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  children: ReactNode;
}

export function DropdownPanel({ 
  isOpen, 
  onClose, 
  className = '', 
  headerContent, 
  footerContent, 
  children 
}: DropdownPanelProps) {
  const isMobile = useIsMobile();
  
  if (!isOpen) return null;

  if (isMobile) {
    return (
      <BottomSheet 
        isOpen={isOpen} 
        onClose={onClose} 
        headerContent={headerContent}
        footerContent={footerContent}
        className={className}
      >
        {children}
      </BottomSheet>
    );
  }

  return (
    <div className={`dropdown-panel ${className}`} role="menu">
      {headerContent && <div className="dropdown-panel__header">{headerContent}</div>}
      <div className="dropdown-panel__content">
        {children}
      </div>
      {footerContent && <div className="dropdown-panel__footer">{footerContent}</div>}
    </div>
  );
}
