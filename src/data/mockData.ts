import type { NavItem, NavGroup, StatItem, TodoItem, TLDCard, HelpArticle } from '@/types';

/* ============================================================
   NAVIGATION
   ============================================================ */
export const primaryNavItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'Home', href: '/' },
  { id: 'my-emails', label: 'My Emails', icon: 'Mail', href: '/emails' },
];

export const productsGroup: NavGroup = {
  id: 'products',
  label: 'Products & Services',
  icon: 'Layers',
  defaultOpen: true,
  items: [
    { id: 'all-products', label: 'All Products', icon: 'Package', href: '/products' },
    { id: 'websites', label: 'Websites', icon: 'Globe', href: '/websites' },
    { id: 'domains', label: 'Domains', icon: 'AtSign', href: '/domains' },
    { id: 'hosting-servers', label: 'Hosting & Servers', icon: 'Server', href: '/hosting' },
    { id: 'email-office', label: 'Email & Office Tools', icon: 'Inbox', href: '/email-tools' },
    { id: 'app-hosting', label: 'Application Hosting', icon: 'Cpu', href: '/app-hosting' },
    { id: 'other', label: 'Other', icon: 'MoreHorizontal', href: '/other' },
    { id: 'dns', label: 'DNS', icon: 'Network', href: '/dns' },
  ],
};

export const utilityNavItems: NavItem[] = [
  { id: 'turbohub', label: 'Turbohub', icon: 'Zap', href: '/turbohub' },
  { id: 'ai-apps', label: 'AI Applications', icon: 'Sparkles', href: '/ai-apps' },
];

export const billingGroup: NavGroup = {
  id: 'billing',
  label: 'Billing',
  icon: 'Receipt',
  defaultOpen: false,
  items: [
    { id: 'my-orders', label: 'My Orders', icon: 'ShoppingCart', href: '/orders' },
    { id: 'invoices', label: 'Invoices', icon: 'FileText', href: '/invoices' },
    { id: 'billing-info', label: 'Billing Information', icon: 'CreditCard', href: '/billing-info' },
    { id: 'credit-notes', label: 'Credit Notes', icon: 'FileCheck', href: '/credit-notes' },
    { id: 'payment-methods', label: 'Payment Methods', icon: 'Wallet', href: '/payment-methods' },
    { id: 'account-credit', label: 'Account Credit', icon: 'Coins', href: '/account-credit' },
  ],
};

/* ============================================================
   STATS
   ============================================================ */
export const statItems: StatItem[] = [
  { id: 'domains', label: 'Domains', count: 0, icon: 'AtSign' },
  { id: 'hosting', label: 'Hosting & Servers', count: 0, icon: 'Server' },
  { id: 'websites', label: 'Websites', count: 0, icon: 'Globe' },
  { id: 'email', label: 'Email & Office Tools', count: 0, icon: 'Inbox' },
  { id: 'app-hosting', label: 'Application Hosting', count: 0, icon: 'Cpu' },
  { id: 'other', label: 'Other', count: 0, icon: 'MoreHorizontal' },
];

/* ============================================================
   TODOS
   ============================================================ */
export const productTodos: TodoItem[] = [];

export const accountTodos: TodoItem[] = [
  {
    id: 'add-payment',
    title: 'Add a payment method',
    description: 'Securely store a card to make future purchases faster.',
    icon: 'CreditCard',
    completed: false,
    href: '/billing/payment-methods',
  },
  {
    id: 'add-address',
    title: 'Add an address',
    description: 'Add an address to your account.',
    icon: 'MapPin',
    completed: false,
    href: '/billing/billing-info',
  },
  {
    id: 'add-phone',
    title: 'Add a phone number',
    description: 'Add a phone number for security and verification.',
    icon: 'Phone',
    completed: false,
    href: '/settings/security',
  },
];

/* ============================================================
   TLD CARDS (for domain search marquee)
   ============================================================ */
export const tldCards: TLDCard[] = [
  { tld: '.com', originalPrice: '$15.99', salePrice: '$4.99/yr', popular: true },
  { tld: '.io', originalPrice: '$39.99', salePrice: '$24.99/yr' },
  { tld: '.shop', originalPrice: '$29.99', salePrice: '$1.99/yr', popular: true },
  { tld: '.org', originalPrice: '$14.99', salePrice: '$9.99/yr' },
  { tld: '.net', originalPrice: '$16.99', salePrice: '$11.99/yr' },
  { tld: '.online', originalPrice: '$34.99', salePrice: '$2.99/yr', popular: true },
  { tld: '.co', originalPrice: '$29.99', salePrice: '$9.99/yr' },
  { tld: '.dev', originalPrice: '$19.99', salePrice: '$12.99/yr' },
  { tld: '.store', originalPrice: '$49.99', salePrice: '$3.99/yr' },
  { tld: '.tech', originalPrice: '$44.99', salePrice: '$5.99/yr' },
  { tld: '.ai', originalPrice: '$79.99', salePrice: '$49.99/yr' },
  { tld: '.app', originalPrice: '$19.99', salePrice: '$14.99/yr' },
];

export const domainCategories = [
  'Restaurant',
  'Portfolio',
  'Online Store',
  'Agency',
  'Blog',
  'Other',
] as const;

/* ============================================================
   HELP ARTICLES
   ============================================================ */
export const helpArticles: HelpArticle[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    description: 'Learn how to create a domain, access hosting, connect your domains, and more.',
    icon: 'BookOpen',
    hasAI: true,
    href: '/help/getting-started',
  },
  {
    id: 'cpanel',
    title: 'cPanel',
    description: 'Learn how to manage websites, and email accounts with cPanel.',
    icon: 'Terminal',
    hasAI: false,
    href: '/help/cpanel',
  },
  {
    id: 'add-on-services',
    title: 'Add-on services',
    description: 'Learn how to set up SSL certificates, backups, and more.',
    icon: 'PuzzlePiece',
    hasAI: true,
    href: '/help/add-on-services',
  },
];

/* ============================================================
   MOCK DOMAIN SEARCH RESULTS
   ============================================================ */
export const mockDomainResults = [
  { domain: 'yourbusiness.com', available: true, price: '$4.99/yr' },
  { domain: 'yourbusiness.io', available: true, price: '$24.99/yr' },
  { domain: 'yourbusiness.net', available: false, price: '$11.99/yr' },
  { domain: 'yourbusiness.shop', available: true, price: '$1.99/yr' },
  { domain: 'yourbusiness.co', available: true, price: '$9.99/yr' },
  { domain: 'yourbusiness.online', available: true, price: '$2.99/yr' },
];

/* ============================================================
   NOTIFICATION MOCK
   ============================================================ */
export const mockNotifications = [
  {
    id: '1',
    title: 'Welcome to Hosting.com!',
    message: 'Complete your account setup to get started.',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: '2',
    title: 'Domain Sale: .shop domains from $1.99',
    message: 'Limited time offer on premium extensions.',
    time: '1 hour ago',
    read: true,
  },
];
