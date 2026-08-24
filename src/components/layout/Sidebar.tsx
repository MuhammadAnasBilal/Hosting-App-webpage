'use client';

import { useState } from 'react';
import {
  Home, Mail, Layers, Package, Globe, AtSign, Server, Inbox,
  Cpu, MoreHorizontal, Network, Zap, Sparkles, Receipt,
  ShoppingCart, FileText, CreditCard, FileCheck, Wallet, Coins,
  Heart, ChevronDown, ChevronLeft, Sun, Moon, Menu, ShoppingBag,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { primaryNavItems, productsGroup, utilityNavItems, billingGroup } from '@/data/mockData';
import type { NavItem } from '@/types';
import '@/styles/sidebar.css';

// Maps icon string names (from mockData) to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, Mail, Layers, Package, Globe, AtSign, Server, Inbox,
  Cpu, MoreHorizontal, Network, Zap, Sparkles, Receipt,
  ShoppingCart, FileText, CreditCard, FileCheck, Wallet, Coins, Heart,
};

function getIcon(name: string) {
  return iconMap[name] ?? Package; // fallback to Package if name not found
}

// ─── Shared nav item button ────────────────────────────────────────────────
// Extracted to avoid repeating the same render pattern for every nav section.

interface NavItemButtonProps {
  item: NavItem;
  activeId: string;
  collapsed: boolean;
  onSelect: (id: string) => void;
}

function NavItemButton({ item, activeId, collapsed, onSelect }: NavItemButtonProps) {
  const Icon = getIcon(item.icon);
  return (
    <button
      className={`nav-item${activeId === item.id ? ' nav-item--active' : ''}`}
      onClick={() => onSelect(item.id)}
      title={collapsed ? item.label : undefined} // show tooltip when collapsed
      aria-current={activeId === item.id ? 'page' : undefined}
    >
      <Icon className="nav-item__icon" />
      <span className="nav-item__label">{item.label}</span>
    </button>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const [productsOpen, setProductsOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  return (
    <aside
      className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`}
      aria-label="Main navigation"
    >
      {/* Logo row — hamburger visible on mobile only */}
      <div className="sidebar__logo">
        <button className="sidebar__mobile-close" onClick={onToggleCollapse} aria-label="Close menu">
          <Menu size={22} />
        </button>
        <svg className="sidebar__logo-icon" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="currentColor" />
          <path d="M10 10v12 M10 16h6 M16 10v12 M22 14v8 M22 10v2" stroke="var(--base-card)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="sidebar__logo-text">Host-IN</span>
      </div>

      {/* Place new order CTA */}
      <div className="sidebar__cta">
        <button className="sidebar__cta-btn" aria-label="Place new order">
          <ShoppingBag size={18} className="sidebar__cta-icon" />
          <span className="sidebar__cta-btn-text">Place new order</span>
        </button>
      </div>

      {/* Scrollable navigation */}
      <nav className="sidebar__nav">

        {primaryNavItems.map(item => (
          <NavItemButton key={item.id} item={item} activeId={activeId} collapsed={collapsed} onSelect={setActiveId} />
        ))}

        <div className="nav-separator" />

        {/* Products & Services collapsible group */}
        <div className={`nav-group${productsOpen ? ' nav-group--open' : ''}`}>
          <button className="nav-group__header" onClick={() => setProductsOpen(o => !o)} aria-expanded={productsOpen}>
            <Layers className="nav-group__header-icon" />
            <span className="nav-group__label">{productsGroup.label}</span>
            <ChevronDown className="nav-group__chevron" />
          </button>
          <div className="nav-group__items" role="group">
            {productsGroup.items.map(item => (
              <NavItemButton key={item.id} item={item} activeId={activeId} collapsed={collapsed} onSelect={setActiveId} />
            ))}
          </div>
        </div>

        <div className="nav-separator" />

        {utilityNavItems.map(item => (
          <NavItemButton key={item.id} item={item} activeId={activeId} collapsed={collapsed} onSelect={setActiveId} />
        ))}

        <div className="nav-separator" />

        {/* Billing collapsible group */}
        <div className={`nav-group${billingOpen ? ' nav-group--open' : ''}`}>
          <button className="nav-group__header" onClick={() => setBillingOpen(o => !o)} aria-expanded={billingOpen}>
            <Receipt className="nav-group__header-icon" />
            <span className="nav-group__label">{billingGroup.label}</span>
            <ChevronDown className="nav-group__chevron" />
          </button>
          <div className="nav-group__items" role="group">
            {billingGroup.items.map(item => (
              <NavItemButton key={item.id} item={item} activeId={activeId} collapsed={collapsed} onSelect={setActiveId} />
            ))}
          </div>
        </div>

        <div className="nav-separator" />

        <button
          className="nav-item nav-item--refer"
          onClick={() => setActiveId('refer')}
          title={collapsed ? 'Refer-a-Friend' : undefined}
        >
          <Heart className="nav-item__icon" />
          <span className="nav-item__label">Refer-a-Friend</span>
        </button>

      </nav>

      {/* Footer — theme toggle + service status, pinned to bottom */}
      <div className="sidebar__footer">
        <button
          className="sidebar__theme-toggle"
          onClick={toggleTheme}
          role="switch"
          aria-checked={theme === 'dark'}
          aria-label="Toggle theme"
        >
          <div className="sidebar__theme-toggle-left">
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            <span className="sidebar__theme-label">
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </span>
          </div>
          <div className={`theme-switch${theme === 'dark' ? ' theme-switch--active' : ''}`}>
            <div className="theme-switch__thumb" />
          </div>
        </button>
        <a className="sidebar__status" href="#" aria-label="Service Status: All systems operational">
          <span className="sidebar__status-dot" aria-hidden="true" />
          <span className="sidebar__status-label">Service Status</span>
        </a>
      </div>

      {/* Collapse/expand toggle — desktop only, hidden on mobile */}
      <button
        className="sidebar__collapse-btn"
        onClick={onToggleCollapse}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <ChevronLeft />
      </button>
    </aside>
  );
}
