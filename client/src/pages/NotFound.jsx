import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page page--catalog">
      <div className="empty-state empty-state--wide">
        <p className="eyebrow">Error 404</p>
        <h1>This scene is missing</h1>
        <p>The page you were looking for is not part of the StoryPlay library.</p>
        <div className="empty-state__actions">
          <Link className="btn btn-primary" to="/">
            Back to home
          </Link>
          <Link className="btn btn-ghost" to="/movies">
            Browse movies
          </Link>
        </div>
      </div>
    </div>
  );
}
