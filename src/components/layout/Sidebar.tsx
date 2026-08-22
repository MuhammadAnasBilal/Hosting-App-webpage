'use client';

import { useState } from 'react';
import {
  Home, Mail, Layers, Package, Globe, AtSign, Server, Inbox,
  Cpu, MoreHorizontal, Network, Zap, Sparkles, Receipt,
  ShoppingCart, FileText, CreditCard, FileCheck, Wallet, Coins,
  Heart, ChevronDown, ChevronLeft, Plus, Activity
} from 'lucide-react';
import { primaryNavItems, productsGroup, utilityNavItems, billingGroup } from '@/data/mockData';
import '@/styles/sidebar.css';

/* Icon mapping — resolves string names to Lucide components */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, Mail, Layers, Package, Globe, AtSign, Server, Inbox,
  Cpu, MoreHorizontal, Network, Zap, Sparkles, Receipt,
  ShoppingCart, FileText, CreditCard, FileCheck, Wallet, Coins,
  Heart, ChevronDown, Plus, Activity, MapPin: AtSign, Phone: Wallet,
};

function getIcon(name: string) {
  return iconMap[name] || Package;
}

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const [productsOpen, setProductsOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  return (
    <aside
      className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="sidebar__logo">
        <svg className="sidebar__logo-icon" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" />
          <path d="M10 16c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2" fill="currentColor" />
        </svg>
        <span className="sidebar__logo-text">hosting.com</span>
      </div>

      {/* Place new order CTA */}
      <div className="sidebar__cta">
        <button className="sidebar__cta-btn" aria-label="Place new order">
          <Plus size={18} />
          <span className="sidebar__cta-btn-text">Place new order</span>
        </button>
      </div>

      {/* Scrollable nav */}
      <nav className="sidebar__nav">
        {/* Primary items */}
        {primaryNavItems.map(item => {
          const Icon = getIcon(item.icon);
          return (
            <button
              key={item.id}
              className={`nav-item ${activeId === item.id ? 'nav-item--active' : ''}`}
              onClick={() => setActiveId(item.id)}
              title={collapsed ? item.label : undefined}
              aria-current={activeId === item.id ? 'page' : undefined}
            >
              <Icon className="nav-item__icon" />
              <span className="nav-item__label">{item.label}</span>
            </button>
          );
        })}

        <div className="nav-separator" />

        {/* Products & Services group */}
        <div className={`nav-group ${productsOpen ? 'nav-group--open' : ''}`}>
          <button
            className="nav-group__header"
            onClick={() => setProductsOpen(p => !p)}
            aria-expanded={productsOpen}
          >
            <Layers className="nav-group__header-icon" />
            <span className="nav-group__label">{productsGroup.label}</span>
            <ChevronDown className="nav-group__chevron" />
          </button>
          <div className="nav-group__items" role="group">
            {productsGroup.items.map(item => {
              const Icon = getIcon(item.icon);
              return (
                <button
                  key={item.id}
                  className={`nav-item ${activeId === item.id ? 'nav-item--active' : ''}`}
                  onClick={() => setActiveId(item.id)}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="nav-item__icon" />
                  <span className="nav-item__label">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="nav-separator" />

        {/* Utility items */}
        {utilityNavItems.map(item => {
          const Icon = getIcon(item.icon);
          return (
            <button
              key={item.id}
              className={`nav-item ${activeId === item.id ? 'nav-item--active' : ''}`}
              onClick={() => setActiveId(item.id)}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="nav-item__icon" />
              <span className="nav-item__label">{item.label}</span>
            </button>
          );
        })}

        <div className="nav-separator" />

        {/* Billing group */}
        <div className={`nav-group ${billingOpen ? 'nav-group--open' : ''}`}>
          <button
            className="nav-group__header"
            onClick={() => setBillingOpen(b => !b)}
            aria-expanded={billingOpen}
          >
            <Receipt className="nav-group__header-icon" />
            <span className="nav-group__label">{billingGroup.label}</span>
            <ChevronDown className="nav-group__chevron" />
          </button>
          <div className="nav-group__items" role="group">
            {billingGroup.items.map(item => {
              const Icon = getIcon(item.icon);
              return (
                <button
                  key={item.id}
                  className={`nav-item ${activeId === item.id ? 'nav-item--active' : ''}`}
                  onClick={() => setActiveId(item.id)}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="nav-item__icon" />
                  <span className="nav-item__label">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="nav-separator" />

        {/* Refer a friend */}
        <button
          className="nav-item nav-item--refer"
          onClick={() => setActiveId('refer')}
          title={collapsed ? 'Refer-a-Friend' : undefined}
        >
          <Heart className="nav-item__icon" />
          <span className="nav-item__label">Refer-a-Friend</span>
        </button>
      </nav>

      {/* Footer — pinned */}
      <div className="sidebar__footer">
        <a className="sidebar__status" href="#" aria-label="Service Status: All systems operational">
          <span className="sidebar__status-dot" aria-hidden="true" />
          <span className="sidebar__status-label">Service Status</span>
        </a>
      </div>

      {/* Collapse toggle */}
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
