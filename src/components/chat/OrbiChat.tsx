'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, ArrowUp, ArrowUpRight, Bot } from 'lucide-react';
import type { ChatMessage } from '@/types';
import '@/styles/chat.css';

export function OrbiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Welcome back, let us know if you have any questions.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-orbi', handleOpen);
    return () => window.removeEventListener('open-orbi', handleOpen);
  }, []);

  const sendMessage = useCallback(() => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Mock bot reply after 1.5s
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: 'Thanks for reaching out! A team member will be with you shortly. In the meantime, check our Knowledge Base for quick answers.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1500);
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        className="chat-bubble"
        onClick={() => setIsOpen(true)}
        aria-label="Open chat with Orbi"
      >
        <MessageCircle />
        <span className="chat-bubble__expand" aria-hidden="true">
          <ArrowUpRight size={12} />
        </span>
      </button>
    );
  }

  return (
    <div className="chat-panel" role="dialog" aria-label="Chat with Orbi">
      {/* Header */}
      <div className="chat-panel__header">
        <div className="chat-panel__avatar">
          <Bot size={18} />
        </div>
        <span className="chat-panel__name">Orbi</span>
        <button
          className="chat-panel__close"
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
        >
          <X />
        </button>
      </div>

      {/* Messages */}
      <div className="chat-panel__messages">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`chat-message chat-message--${msg.sender}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-panel__input">
        <input
          className="chat-panel__input-field"
          type="text"
          placeholder="Write a message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Type a message"
        />
        <button
          className={`chat-panel__send ${input.trim() ? 'chat-panel__send--active' : ''}`}
          onClick={sendMessage}
          disabled={!input.trim()}
          aria-label="Send message"
        >
          <ArrowUp />
        </button>
      </div>
    </div>
  );
}
