'use client';

import { useState, useCallback } from 'react';
import {
  CreditCard, MapPin, Phone, Check, ExternalLink, CircleCheck, PartyPopper
} from 'lucide-react';
import { accountTodos } from '@/data/mockData';
import type { TodoTab } from '@/types';
import '@/styles/todos.css';

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  CreditCard, MapPin, Phone,
};

export function TodosCard() {
  const [activeTab, setActiveTab] = useState<TodoTab>('product');
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const toggleTodo = useCallback((id: string) => {
    setCompletedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const accountCompletedCount = accountTodos.filter(t => completedIds.has(t.id)).length;
  const productCompletedCount = 0; // No product todos yet

  return (
    <div className="todos-card">
      <div className="todos-card__header">
        <h2 className="todos-card__title">Todos</h2>
        <span className="todos-card__badge" aria-label={`${completedIds.size} completed`}>
          {activeTab === 'product' ? `${productCompletedCount} completed` : `${accountCompletedCount}/${accountTodos.length}`}
        </span>
      </div>

      {/* Tabs */}
      <div className="todos-card__tabs" role="tablist">
        <button
          className={`todos-card__tab ${activeTab === 'product' ? 'todos-card__tab--active' : ''}`}
          onClick={() => setActiveTab('product')}
          role="tab"
          aria-selected={activeTab === 'product'}
        >
          Product setup
          <span className="todos-card__tab-badge">0</span>
        </button>
        <button
          className={`todos-card__tab ${activeTab === 'account' ? 'todos-card__tab--active' : ''}`}
          onClick={() => setActiveTab('account')}
          role="tab"
          aria-selected={activeTab === 'account'}
        >
          Account setup
          <span className="todos-card__tab-badge">{accountTodos.length - accountCompletedCount}</span>
        </button>
      </div>

      {/* Todo items */}
      <div className="todos-card__list" role="tabpanel">
        {activeTab === 'product' ? (
          <div className="todos-card__empty">
            <PartyPopper className="todos-card__empty-icon" />
            <p>No product setup tasks yet. Place an order to get started!</p>
          </div>
        ) : (
          accountTodos.map(todo => {
            const Icon = iconMap[todo.icon] || CreditCard;
            const isCompleted = completedIds.has(todo.id);
            return (
              <div
                key={todo.id}
                className={`todo-item ${isCompleted ? 'todo-item--completed' : ''}`}
                onClick={() => toggleTodo(todo.id)}
                role="checkbox"
                aria-checked={isCompleted}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTodo(todo.id); } }}
              >
                <div className="todo-item__checkbox" aria-hidden="true">
                  <Check className="todo-item__check-icon" />
                </div>
                <Icon className="todo-item__icon" />
                <div className="todo-item__content">
                  <div className="todo-item__title">{todo.title}</div>
                  <div className="todo-item__description">{todo.description}</div>
                </div>
                <ExternalLink className="todo-item__arrow" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
