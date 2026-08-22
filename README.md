# 🌐 Hosting.com — Dashboard Redesign

A **production-ready** web hosting dashboard redesigned from the ground up with a premium **Orange–Black** theme. Built for a client to showcase modern web development skills — responsive, accessible, and optimized for speed.

![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![CSS](https://img.shields.io/badge/Styling-Vanilla_CSS-264de4?logo=css3)

---

## ✨ Live Features

| Feature | Status |
|---|---|
| 🌓 Dark / Light theme toggle (persists in localStorage) | ✅ |
| 📱 Fully responsive (mobile / tablet / desktop) | ✅ |
| 🗂️ Collapsible sidebar with grouped navigation | ✅ |
| ✅ Interactive todo checklist with live badge count | ✅ |
| 🔍 Domain search with mock results + idea mode | ✅ |
| 🎠 Dual-direction TLD marquee (pauses on hover) | ✅ |
| 💬 Orbi live chat widget with auto-reply | ✅ |
| 🔔 Notification panel with read/unread states | ✅ |
| ❓ Help popover (Live chat, Knowledge base, Tickets) | ✅ |
| 🎁 Get Rewarded referral dropdown | ✅ |
| 👤 Profile dropdown (Profile, Settings, Log out) | ✅ |
| ⌨️ Full keyboard navigation with visible focus rings | ✅ |
| ♿ Accessible (semantic HTML, ARIA, skip-to-content) | ✅ |
| 🚀 Static prerendering for instant page loads | ✅ |

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router + Turbopack) | Server-side rendering, static generation, file-based routing |
| **UI Library** | [React 19](https://react.dev) | Component architecture, hooks, concurrent features |
| **Language** | [TypeScript 5](https://typescriptlang.org) | Type safety across 30+ files |
| **Styling** | Vanilla CSS + CSS Custom Properties | Full control over theming, no runtime CSS-in-JS overhead |
| **Icons** | [Lucide React](https://lucide.dev) | Tree-shakable (~4KB per icon), matches hosting.com's icon set |
| **Font** | [Inter](https://rsms.me/inter/) via `next/font` | Self-hosted, zero layout shift, no render-blocking requests |

### What's NOT included (by design)
- ❌ No Tailwind CSS — vanilla CSS with custom properties gives full control over the token system
- ❌ No component libraries (shadcn, Radix) — bespoke design system built from scratch
- ❌ No CSS-in-JS runtime — zero runtime overhead for styling

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # CSS reset, base styles, grain texture
│   ├── layout.tsx           # Root layout with font + ThemeProvider
│   └── page.tsx             # Dashboard homepage
│
├── components/
│   ├── layout/
│   │   ├── DashboardShell.tsx   # Root grid (sidebar + topbar + main)
│   │   ├── Sidebar.tsx          # Full nav with collapse + groups
│   │   ├── TopBar.tsx           # Header with 5 interactive dropdowns
│   │   └── MobileDrawer.tsx     # Slide-in overlay for mobile
│   │
│   ├── dashboard/
│   │   ├── WelcomeHeader.tsx    # Greeting + action buttons
│   │   ├── StatStrip.tsx        # 6-column metrics bar
│   │   ├── TodosCard.tsx        # Tabbed checklist with live count
│   │   ├── PromoBanner.tsx      # Gradient banner with grain
│   │   ├── DomainSearchHero.tsx # Glass search + TLD marquee
│   │   ├── SupportTickets.tsx   # Empty state
│   │   └── HelpCentre.tsx       # Articles with Ask AI chips
│   │
│   └── chat/
│       └── OrbiChat.tsx         # Floating chat widget
│
├── styles/                  # 8 modular CSS files
│   ├── tokens.css           # 50+ design tokens (dark + light)
│   ├── animations.css       # 10 keyframe animations
│   ├── layout.css           # Dashboard grid
│   ├── sidebar.css          # Sidebar states (250+ lines)
│   ├── topbar.css           # Dropdowns, notifications
│   ├── stat-strip.css       # Metrics bar
│   ├── todos.css            # Checklist
│   ├── promo.css            # Gradient banners
│   ├── domain-search.css    # Search hero + marquee
│   ├── support.css          # Support + help centre
│   └── chat.css             # Chat widget
│
├── context/
│   └── ThemeContext.tsx      # Dark/light with localStorage
│
├── hooks/
│   ├── useMediaQuery.ts     # Responsive breakpoints
│   └── useClickOutside.ts   # Dropdown dismiss
│
├── data/
│   └── mockData.ts          # Navigation, stats, TLDs, articles
│
└── types/
    └── index.ts             # Shared TypeScript interfaces
```

---

## 🎨 Design System

### Color Tokens (50+ variables)

The entire UI is themed via CSS custom properties. Swapping `data-theme="dark"` to `data-theme="light"` on `<html>` repaints every surface, text, and border instantly — no JavaScript re-renders needed.

| Token | Dark | Light | Usage |
|---|---|---|---|
| `--base-background` | `#0E0B09` | `#FAFAF8` | Page background |
| `--base-card` | `#17130F` | `#FFFFFF` | Card surfaces |
| `--base-foreground` | `#F5F1EC` | `#1A1710` | Primary text |
| `--primary` | `#FF5A1F` | `#E04D15` | Orange accent (CTAs only) |
| `--success` | `#3DDC84` | `#2BB85E` | Status indicators |

### Typography
- **Font:** Inter (self-hosted via `next/font`)
- **Scale:** 12px → 28px across 8 steps
- **Hierarchy:** Weight + size + color (never a second typeface)

### Responsive Breakpoints

| Breakpoint | Width | Sidebar | Layout |
|---|---|---|---|
| Mobile | < 640px | Slide-in drawer | Single column |
| Tablet | 640–1024px | Collapsed (64px) | Adaptive grid |
| Desktop | > 1024px | Expanded (240px) | Full dashboard |

---

## ⚡ Performance

| Optimization | Implementation |
|---|---|
| **Static prerendering** | Page is pre-built HTML — instant first paint |
| **Self-hosted font** | `next/font` — zero external requests, no layout shift |
| **Tree-shakable icons** | Only imported icons ship (~4KB each) |
| **CSS-only animations** | Marquee, pulse, fade — no JS animation libraries |
| **Reduced motion** | `prefers-reduced-motion` disables all animations |
| **No CSS-in-JS runtime** | Vanilla CSS — zero JavaScript for styling |
| **Turbopack** | Sub-second dev rebuilds |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20.9+
- npm

### Installation

```bash
git clone https://github.com/MuhammadAnasBilal/Hosting-App-webpage.git
cd Hosting-App-webpage/hosting-app
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 🌍 Deployment

This project is optimized for **Vercel** deployment:

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Set the **Root Directory** to `hosting-app`
4. Deploy — Vercel auto-detects Next.js

---

## 📋 Browser Support

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

---

## 📄 License

This project is private and built for a client demonstration.

---

<p align="center">
  Built with ☕ and attention to detail
</p>
