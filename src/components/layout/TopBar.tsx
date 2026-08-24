'use client';

import { useCallback, useState } from 'react';
import {
  Menu, Eye, Gift, HelpCircle, Bell, Sun, Moon,
  BookOpen, ListChecks, FilePlus,
  User, Settings, LogOut,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import { DropdownPanel } from './DropdownPanel';
import { mockNotifications } from '@/data/mockData';
import '@/styles/topbar.css';

interface TopBarProps {
  onMenuClick: () => void;
  showHamburger: boolean;
}

// Union type makes it clear what dropdown IDs are valid
type DropdownId = 'reward' | 'help' | 'notifications' | 'profile';
type NotifTab   = 'all' | 'unread' | 'read';

export function TopBar({ onMenuClick, showHamburger }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const [activeDropdown, setActiveDropdown] = useState<DropdownId | null>(null);
  const [activeNotifTab, setActiveNotifTab] = useState<NotifTab>('all');

  const closeAll = useCallback(() => setActiveDropdown(null), []);
  const toggle   = (id: DropdownId) => setActiveDropdown(prev => (prev === id ? null : id));

  // Each ref closes the dropdown when a click happens outside that specific anchor
  const rewardRef  = useClickOutside<HTMLDivElement>(closeAll, activeDropdown === 'reward');
  const helpRef    = useClickOutside<HTMLDivElement>(closeAll, activeDropdown === 'help');
  const notifRef   = useClickOutside<HTMLDivElement>(closeAll, activeDropdown === 'notifications');
  const profileRef = useClickOutside<HTMLDivElement>(closeAll, activeDropdown === 'profile');

  // Pre-compute counts so JSX stays clean
  const unreadCount = mockNotifications.filter(n => !n.read).length;
  const readCount   = mockNotifications.filter(n =>  n.read).length;

  const filteredNotifs =
    activeNotifTab === 'unread' ? mockNotifications.filter(n => !n.read) :
    activeNotifTab === 'read'   ? mockNotifications.filter(n =>  n.read) :
    mockNotifications;

  return (
    <header className="topbar" role="banner">

      {/* Mobile: hamburger button + brand logo */}
      {showHamburger && (
        <>
          <button className="topbar__hamburger" onClick={onMenuClick} aria-label="Open navigation menu">
            <Menu size={22} />
          </button>
          <div className="topbar__mobile-logo">
            <svg className="topbar__mobile-logo-icon" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="currentColor" />
              <path d="M10 10v12 M10 16h6 M16 10v12 M22 14v8 M22 10v2" stroke="var(--base-card)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="topbar__mobile-logo-text">Host-IN</span>
          </div>
        </>
      )}

      {/* Support PIN */}
      <div className="topbar__support-pin" title="Your Support PIN for quick identity verification">
        <Eye className="topbar__support-pin-icon" />
        <span>Support PIN</span>
      </div>

      <div className="topbar__spacer" />

      <div className="topbar__actions">

        {/* ── Get Rewarded ────────────────────────────── */}
        <div className="topbar__dropdown-anchor" ref={rewardRef}>
          <button
            className="topbar__reward-btn"
            onClick={() => toggle('reward')}
            aria-expanded={activeDropdown === 'reward'}
            aria-haspopup="true"
          >
            <Gift size={16} />
            <span>Get rewarded</span>
          </button>
          <DropdownPanel isOpen={activeDropdown === 'reward'} onClose={closeAll} headerContent="Refer & Earn">
            <div className="reward-panel-body">
              <p className="reward-panel-body__text">
                Invite friends to hosting.com and <strong>earn credits</strong> for every successful referral.
              </p>
              <button className="dropdown-panel__item dropdown-panel__item--highlight" role="menuitem">
                <Gift size={18} />
                <span>Start earning rewards</span>
              </button>
            </div>
          </DropdownPanel>
        </div>

        {/* ── Help & Support ──────────────────────────── */}
        <div className="topbar__dropdown-anchor" ref={helpRef}>
          <button
            className="topbar__icon-btn"
            onClick={() => toggle('help')}
            aria-label="Help"
            aria-expanded={activeDropdown === 'help'}
            aria-haspopup="true"
          >
            <HelpCircle />
          </button>
          <DropdownPanel
            isOpen={activeDropdown === 'help'}
            onClose={closeAll}
            headerContent="Help & Support"
            footerContent={
              <>
                <button className="dropdown-panel__footer-btn dropdown-panel__footer-btn--ghost" onClick={closeAll}>
                  Cancel
                </button>
                <button
                  className="dropdown-panel__footer-btn dropdown-panel__footer-btn--primary"
                  onClick={() => { closeAll(); window.dispatchEvent(new CustomEvent('open-orbi')); }}
                >
                  Live Chat
                </button>
              </>
            }
          >
            <button className="dropdown-panel__item" role="menuitem"><BookOpen size={18} /><span>Knowledge base</span></button>
            <button className="dropdown-panel__item" role="menuitem"><ListChecks size={18} /><span>Manage tickets</span></button>
            <button className="dropdown-panel__item" role="menuitem"><FilePlus size={18} /><span>Create a ticket</span></button>
          </DropdownPanel>
        </div>

        {/* ── Notifications ───────────────────────────── */}
        <div className="topbar__dropdown-anchor" ref={notifRef}>
          <button
            className={`topbar__icon-btn${unreadCount > 0 ? ' topbar__icon-btn--has-badge' : ''}`}
            onClick={() => toggle('notifications')}
            aria-label="Notifications"
            aria-expanded={activeDropdown === 'notifications'}
            aria-haspopup="true"
          >
            <Bell />
          </button>
          <DropdownPanel
            isOpen={activeDropdown === 'notifications'}
            onClose={closeAll}
            className="notification-panel"
            headerContent={
              <>
                Notifications
                {/* Tab bar filters the notification list */}
                <div className="dropdown-panel__tabs">
                  {(['all', 'unread', 'read'] as NotifTab[]).map(tab => (
                    <div
                      key={tab}
                      className={`dropdown-panel__tab${activeNotifTab === tab ? ' dropdown-panel__tab--active' : ''}`}
                      onClick={() => setActiveNotifTab(tab)}
                    >
                      {tab === 'all'    && `All (${mockNotifications.length})`}
                      {tab === 'unread' && `Unread (${unreadCount})`}
                      {tab === 'read'   && `Read (${readCount})`}
                    </div>
                  ))}
                </div>
              </>
            }
            footerContent={
              <>
                <button className="dropdown-panel__footer-btn dropdown-panel__footer-btn--ghost" onClick={closeAll}>Close</button>
                <button className="dropdown-panel__footer-btn dropdown-panel__footer-btn--primary">Refresh</button>
              </>
            }
          >
            {filteredNotifs.length > 0 ? (
              filteredNotifs.map(notif => (
                <div
                  key={notif.id}
                  className={`notification-item${!notif.read ? ' notification-item--unread' : ''}`}
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
                <p>No notifications in this category</p>
              </div>
            )}
          </DropdownPanel>
        </div>

        {/* ── Theme toggle (desktop only) ─────────────── */}
        <button
          className="topbar__icon-btn topbar__hide-on-mobile"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>

        <div className="topbar__divider" />

        {/* ── Profile / Account ───────────────────────── */}
        <div className="topbar__dropdown-anchor" ref={profileRef}>
          <button
            className="topbar__avatar-btn"
            onClick={() => toggle('profile')}
            aria-label="Account menu"
            aria-expanded={activeDropdown === 'profile'}
            aria-haspopup="true"
          >
            AB
          </button>
          <DropdownPanel isOpen={activeDropdown === 'profile'} onClose={closeAll} headerContent="Anas Bilal">
            <button className="dropdown-panel__item" role="menuitem"><User size={18} /><span>Profile</span></button>
            <button className="dropdown-panel__item" role="menuitem"><Settings size={18} /><span>Settings</span></button>
            <div className="dropdown-panel__separator" />
            <button className="dropdown-panel__item" role="menuitem"><LogOut size={18} /><span>Log out</span></button>
          </DropdownPanel>
        </div>

      </div>
    </header>
  );
}
