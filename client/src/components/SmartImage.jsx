import { useState } from 'react';

/** Image that walks a src -> secondaryFallback -> fallback chain and exposes load state for CSS. */
export default function SmartImage({ src, secondaryFallback, fallback, alt, className = '', wrapperClassName = '', ...rest }) {
  const initial = src || secondaryFallback || fallback;
  const [state, setState] = useState({ key: initial, src: initial, status: 'loading' });

  if (state.key !== initial) setState({ key: initial, src: initial, status: 'loading' });

  const onError = () =>
    setState((cur) => {
      if (secondaryFallback && cur.src !== secondaryFallback && cur.src !== fallback) return { ...cur, src: secondaryFallback, status: 'loading' };
      if (fallback && cur.src !== fallback) return { ...cur, src: fallback, status: 'loading' };
      return { ...cur, status: 'error' };
    });

  return (
    <span className={`smart-img ${wrapperClassName}`} data-status={state.status}>
      <img
        src={state.src}
        alt={alt}
        className={`smart-img__el ${className}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setState((cur) => ({ ...cur, status: 'ready' }))}
        onError={onError}
        {...rest}
      />
    </span>
  );
}
