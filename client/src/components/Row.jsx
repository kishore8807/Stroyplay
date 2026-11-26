import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

export default function Row({ id, title, items, seeAllTo, emptyState, progressOf }) {
  const railRef = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdge({ start: el.scrollLeft <= 8, end: max <= 8 || el.scrollLeft >= max - 8 });
  }, []);

  const count = items?.length ?? 0;
  useEffect(() => {
    measure();
    const el = railRef.current;
    if (!el) return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure, count]);

  if (count === 0) {
    if (!emptyState) return null;
    return (
      <section className="row" aria-label={title} id={id}>
        <div className="row-head">
          <h2 className="row-title">{title}</h2>
        </div>
        <div className="row-empty">{emptyState}</div>
      </section>
    );
  }

  const scroll = (dir) => railRef.current?.scrollBy({ left: dir * Math.max(railRef.current.clientWidth * 0.82, 320), behavior: 'smooth' });

  return (
    <section className="row" aria-label={title} id={id}>
      <div className="row-head">
        <h2 className="row-title">{title}</h2>
        {seeAllTo && (
          <Link className="row-more" to={seeAllTo}>
            See all
            <ChevronRightIcon size={14} />
          </Link>
        )}
      </div>
      <div className="rail-wrap">
        <button className="rail-btn rail-prev" type="button" onClick={() => scroll(-1)} aria-label={`Scroll ${title} left`} disabled={edge.start}>
          <ChevronLeftIcon size={20} />
        </button>
        <div className="rail" ref={railRef} onScroll={measure}>
          {items.map((item) => (
            <MovieCard key={item.id} movie={item} progress={progressOf ? progressOf(item.id) : 0} />
          ))}
        </div>
        <button className="rail-btn rail-next" type="button" onClick={() => scroll(1)} aria-label={`Scroll ${title} right`} disabled={edge.end}>
          <ChevronRightIcon size={20} />
        </button>
      </div>
    </section>
  );
}
