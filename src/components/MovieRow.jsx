import { useRef } from 'react'
import MovieCard from './MovieCard'
import { ChevronLeft, ChevronRight } from './Icons'

export default function MovieRow({ title, items, savedIds, onToggleSave, onOpen, onSeeAll }) {
  const railRef = useRef(null)

  if (!items || items.length === 0) return null

  const scrollByPage = (direction) => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({
      left: direction * Math.max(rail.clientWidth * 0.82, 320),
      behavior: 'smooth',
    })
  }

  return (
    <section className="row" aria-label={title}>
      <div className="row-head">
        <h2 className="row-title">{title}</h2>
        <button className="row-more" type="button" onClick={onSeeAll}>
          See all
        </button>
      </div>

      <div className="rail-wrap">
        <button
          className="rail-btn rail-prev"
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label={`Scroll ${title} left`}
        >
          <ChevronLeft />
        </button>

        <div className="rail" ref={railRef}>
          {items.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              saved={savedIds.includes(movie.id)}
              onToggleSave={onToggleSave}
              onOpen={onOpen}
            />
          ))}
        </div>

        <button
          className="rail-btn rail-next"
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label={`Scroll ${title} right`}
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  )
}
