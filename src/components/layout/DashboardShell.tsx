'use client';

import { useState, useCallback } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileDrawer } from './MobileDrawer';
import { useIsMobile, useIsDesktop } from '@/hooks/useMediaQuery';
import '@/styles/layout.css';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setDrawerOpen(prev => !prev);
    } else {
      setCollapsed(prev => !prev);
    }
  }, [isMobile]);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const effectiveCollapsed = !isDesktop || collapsed;

  return (
    <div className={`dashboard-shell ${effectiveCollapsed && !isMobile ? 'dashboard-shell--collapsed' : ''}`}>
      {!isMobile && (
        <Sidebar
          collapsed={effectiveCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      )}
      <TopBar
        onMenuClick={toggleSidebar}
        showHamburger={isMobile}
      />
      <main className="main-content" id="main-content">
        <div className="main-content__inner">
          {children}
        </div>
      </main>
      {isMobile && (
        <MobileDrawer
          isOpen={drawerOpen}
          onClose={closeDrawer}
        />
      )}
    </div>
  );
}
