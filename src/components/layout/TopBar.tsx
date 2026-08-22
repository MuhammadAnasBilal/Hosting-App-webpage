'use client';

import { useState, useCallback } from 'react';
import {
  Menu, Eye, Gift, HelpCircle, Bell, Sun, Moon,
  MessageSquare, BookOpen, ListChecks, FilePlus, X,
  User, Settings, LogOut, ArrowUpRight, ChevronDown
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import { mockNotifications } from '@/data/mockData';
import '@/styles/topbar.css';

interface TopBarProps {
  onMenuClick: () => void;
  showHamburger: boolean;
}

export function TopBar({ onMenuClick, showHamburger }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const closeAll = useCallback(() => setActiveDropdown(null), []);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(prev => prev === id ? null : id);
  };

  const helpRef = useClickOutside<HTMLDivElement>(closeAll, activeDropdown === 'help');
  const rewardRef = useClickOutside<HTMLDivElement>(closeAll, activeDropdown === 'reward');
  const notifRef = useClickOutside<HTMLDivElement>(closeAll, activeDropdown === 'notifications');
  const profileRef = useClickOutside<HTMLDivElement>(closeAll, activeDropdown === 'profile');

  return (
    <header className="topbar" role="banner">


      {/* Mobile logo */}
      {showHamburger && (
        <div className="topbar__mobile-logo">
          <svg className="topbar__mobile-logo-icon" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" />
            <path d="M10 16c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="16" cy="16" r="2" fill="currentColor" />
          </svg>
          <span className="topbar__mobile-logo-text">hosting.com</span>
        </div>
      )}

      {/* Support PIN */}
      <div className="topbar__support-pin" title="Your Support PIN for quick identity verification">
        <Eye className="topbar__support-pin-icon" />
        <span>Support PIN</span>
      </div>

      <div className="topbar__spacer" />

      <div className="topbar__actions">
        {/* Get Rewarded */}
        <div style={{ position: 'relative' }} ref={rewardRef}>
          <button
            className="topbar__reward-btn"
            onClick={() => toggleDropdown('reward')}
            aria-expanded={activeDropdown === 'reward'}
            aria-haspopup="true"
          >
            <Gift size={16} />
            <span>Get rewarded</span>
          </button>
          {activeDropdown === 'reward' && (
            <div className="dropdown-panel" role="menu">
              <div className="dropdown-panel__header">Refer & Earn</div>
              <div style={{ padding: 'var(--space-4)' }}>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--base-muted-foreground)', marginBottom: 'var(--space-3)', lineHeight: 'var(--leading-relaxed)' }}>
                  Invite friends to hosting.com and <strong style={{ color: 'var(--primary)', fontWeight: 'var(--weight-bold)' as unknown as number }}>earn credits</strong> for every successful referral.
                </p>
                <button className="dropdown-panel__item dropdown-panel__item--highlight" role="menuitem">
                  <Gift size={18} />
                  <span>Start earning rewards</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <div style={{ position: 'relative' }} ref={helpRef}>
          <button
            className="topbar__icon-btn"
            onClick={() => toggleDropdown('help')}
            aria-label="Help"
            aria-expanded={activeDropdown === 'help'}
            aria-haspopup="true"
          >
            <HelpCircle />
          </button>
          {activeDropdown === 'help' && (
            <div className="dropdown-panel" role="menu">
              <button className="dropdown-panel__item dropdown-panel__item--highlight" role="menuitem">
                <MessageSquare size={18} />
                <span>Live chat</span>
              </button>
              <button className="dropdown-panel__item" role="menuitem">
                <BookOpen size={18} />
                <span>Knowledge base</span>
              </button>
              <button className="dropdown-panel__item" role="menuitem">
                <ListChecks size={18} />
                <span>Manage tickets</span>
              </button>
              <button className="dropdown-panel__item" role="menuitem">
                <FilePlus size={18} />
                <span>Create a ticket</span>
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            className={`topbar__icon-btn ${mockNotifications.some(n => !n.read) ? 'topbar__icon-btn--has-badge' : ''}`}
            onClick={() => toggleDropdown('notifications')}
            aria-label="Notifications"
            aria-expanded={activeDropdown === 'notifications'}
            aria-haspopup="true"
          >
            <Bell />
          </button>
          {activeDropdown === 'notifications' && (
            <div className="dropdown-panel notification-panel" role="menu">
              <div className="dropdown-panel__header">Notifications</div>
              {mockNotifications.length > 0 ? (
                mockNotifications.map(notif => (
                  <div
                    key={notif.id}
                    className={`notification-item ${!notif.read ? 'notification-item--unread' : ''}`}
                    role="menuitem"
                  >
                    <div className="notification-item__content">
                      <div className="notification-item__title">{notif.title}</div>
                      <div className="notification-item__message">{notif.message}</div>
                    </div>
                    <span className="notification-item__time">{notif.time}</span>
                  </div>
                ))
              ) : (
                <div className="dropdown-empty">
                  <Bell />
                  <p>No new notifications</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button
          className="topbar__icon-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>

        {/* Profile */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <button
            className="topbar__avatar-btn"
            onClick={() => toggleDropdown('profile')}
            aria-label="Account menu"
            aria-expanded={activeDropdown === 'profile'}
            aria-haspopup="true"
          >
            AB
          </button>
          {activeDropdown === 'profile' && (
            <div className="dropdown-panel" role="menu">
              <div className="dropdown-panel__header">Anas Bilal</div>
              <button className="dropdown-panel__item" role="menuitem">
                <User size={18} />
                <span>Profile</span>
              </button>
              <button className="dropdown-panel__item" role="menuitem">
                <Settings size={18} />
                <span>Settings</span>
              </button>
              <div className="dropdown-panel__separator" />
              <button className="dropdown-panel__item" role="menuitem">
                <LogOut size={18} />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
