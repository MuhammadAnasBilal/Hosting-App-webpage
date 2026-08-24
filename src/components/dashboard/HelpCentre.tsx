import { BookOpen, Terminal, Puzzle, ChevronRight, Sparkles } from 'lucide-react';
import { helpArticles } from '@/data/mockData';
import '@/styles/support.css';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, Terminal, PuzzlePiece: Puzzle,
};

export function HelpCentre() {
  return (
    <div className="help-centre">
      <div className="help-centre__header">
        <h3 className="help-centre__title">Help centre</h3>
        <a href="#" className="help-centre__see-all">See all</a>
      </div>
      {helpArticles.map(article => {
        const Icon = iconMap[article.icon] || BookOpen;
        return (
          <div key={article.id} className="help-article" tabIndex={0} role="link">
            <Icon className="help-article__icon" />
            <div className="help-article__content">
              <div className="help-article__title-row">
                <span className="help-article__title">{article.title}</span>
                {article.hasAI && (
                  <button className="help-article__ai-chip" aria-label="Ask AI about this topic">
                    <Sparkles size={10} />
                    Ask AI
                  </button>
                )}
              </div>
              <p className="help-article__description">{article.description}</p>
            </div>
            <ChevronRight className="help-article__arrow" />
          </div>
        );
      })}
    </div>
  );
}
