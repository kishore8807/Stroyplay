import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Skeleton from './components/Skeleton';
import { ProgressProvider } from './context/ProgressContext';
import { UiProvider } from './context/UiContext';
import { WatchlistProvider } from './context/WatchlistContext';
import Home from './pages/Home';

const Catalog = lazy(() => import('./pages/Catalog'));
const Series = lazy(() => import('./pages/Series'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));
const Watchlist = lazy(() => import('./pages/Watchlist'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const LanguagePage = lazy(() => import('./pages/LanguagePage'));
const InfoPage = lazy(() => import('./pages/InfoPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter>
      <WatchlistProvider>
        <ProgressProvider>
          <UiProvider>
            <a className="skip-link" href="#main">
              Skip to content
            </a>
            <ScrollToTop />
            <Navbar />
            <main id="main" className="main">
              <Suspense
                fallback={
                  <div className="page-body page-body--loading">
                    <Skeleton cards={6} rows={2} />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/movies" element={<Catalog />} />
                  <Route path="/series" element={<Series />} />
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/movie/:id" element={<MovieDetails />} />
                  <Route path="/language/:language" element={<LanguagePage />} />
                  {['/about', '/contact', '/privacy', '/terms'].map((path) => (
                    <Route key={path} path={path} element={<InfoPage />} />
                  ))}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </UiProvider>
        </ProgressProvider>
      </WatchlistProvider>
    </BrowserRouter>
  );
}
