import { useEffect } from 'react';

/** Escape-to-close, body scroll lock and initial focus for dialogs. */
export default function useModal(onClose, focusRef) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    focusRef?.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose, focusRef]);
}
