/* --- Shared TypeScript Interfaces --- */

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  badge?: number;
}

export interface NavGroup {
  id: string;
  label: string;
  icon?: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

export interface StatItem {
  id: string;
  label: string;
  count: number;
  icon: string;
}

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  href?: string;
}

export interface TLDCard {
  tld: string;
  originalPrice: string;
  salePrice: string;
  popular?: boolean;
}

export interface HelpArticle {
  id: string;
  title: string;
  description: string;
  icon: string;
  hasAI?: boolean;
  href?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface DropdownItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
}

export type Theme    = 'dark' | 'light';
export type TodoTab  = 'product' | 'account';
