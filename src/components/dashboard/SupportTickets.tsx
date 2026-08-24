import { SmilePlus, ExternalLink } from 'lucide-react';
import '@/styles/support.css';

export function SupportTickets() {
  return (
    <div className="support-tickets">
      <SmilePlus className="support-tickets__icon" />
      <h3 className="support-tickets__title">No open support tickets</h3>
      <p className="support-tickets__text">
        That&apos;s a good thing! Need help? We&apos;re here.
      </p>
      <a href="#" className="support-tickets__link">
        <span>Contact support</span>
        <ExternalLink size={14} />
      </a>
    </div>
  );
}
