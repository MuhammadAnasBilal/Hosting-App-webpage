import { Ticket, ShoppingBag } from 'lucide-react';
import '@/styles/welcome-header.css';

export function WelcomeHeader() {
  return (
    <div className="welcome-header">
      <div className="welcome-header__left">
        <h1 className="welcome-header__title">
          Welcome <span className="welcome-header__name">Anas</span>
        </h1>
      </div>
      <div className="welcome-header__actions">
        <button className="welcome-header__btn welcome-header__btn--ghost">
          <Ticket size={20} />
          <span className="welcome-header__btn-text">Manage tickets</span>
        </button>
        <button className="welcome-header__btn welcome-header__btn--primary">
          <ShoppingBag size={20} />
          <span className="welcome-header__btn-text">Place new order</span>
        </button>
      </div>
    </div>
  );
}
