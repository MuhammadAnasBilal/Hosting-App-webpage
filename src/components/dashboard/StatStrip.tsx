import {
  AtSign, Server, Globe, Inbox, Cpu, MoreHorizontal
} from 'lucide-react';
import { statItems } from '@/data/mockData';
import '@/styles/stat-strip.css';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  AtSign, Server, Globe, Inbox, Cpu, MoreHorizontal,
};

export function StatStrip() {
  return (
    <div className="stat-strip-wrapper">
      <div className="stat-strip" role="list" aria-label="Product statistics">
        {statItems.map(item => {
        const Icon = iconMap[item.icon] || Globe;
        return (
          <div key={item.id} className="stat-strip__item" role="listitem">
            <Icon className="stat-strip__icon" />
            <div className="stat-strip__info">
              <span className="stat-strip__label">{item.label}</span>
              <span className="stat-strip__count">{item.count}</span>
            </div>
          </div>
        );
      })}
      </div>
      <div className="stat-strip__fade" aria-hidden="true" />
    </div>
  );
}
