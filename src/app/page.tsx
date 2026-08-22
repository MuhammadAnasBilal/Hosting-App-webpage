'use client';

import { DashboardShell } from '@/components/layout/DashboardShell';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { StatStrip } from '@/components/dashboard/StatStrip';
import { TodosCard } from '@/components/dashboard/TodosCard';
import { PromoBanner } from '@/components/dashboard/PromoBanner';
import { DomainSearchHero } from '@/components/dashboard/DomainSearchHero';
import { SupportTickets } from '@/components/dashboard/SupportTickets';
import { HelpCentre } from '@/components/dashboard/HelpCentre';
import { OrbiChat } from '@/components/chat/OrbiChat';

import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <DashboardShell>
      <WelcomeHeader />
      <StatStrip />
      <TodosCard />
      <PromoBanner />
      <DomainSearchHero />
      <div className="support-section">
        <SupportTickets />
        <HelpCentre />
      </div>
      <Footer />
      <OrbiChat />
    </DashboardShell>
  );
}
