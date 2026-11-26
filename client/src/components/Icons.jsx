const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
const base = (size, extra) => ({ width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': 'true', ...extra });

const line = (defaultSize, paths) =>
  function Icon({ size = defaultSize, ...props }) {
    return <svg {...base(size, { ...stroke, ...props })}>{paths}</svg>;
  };
const solid = (defaultSize, d) =>
  function Icon({ size = defaultSize, ...props }) {
    return (
      <svg {...base(size, props)}>
        <path d={d} fill="currentColor" />
      </svg>
    );
  };

export const PlayIcon = solid(20, 'M8 5.4v13.2L19 12 8 5.4Z');
export const PauseIcon = solid(20, 'M8 5h3v14H8zM13 5h3v14h-3z');
export const StarIcon = solid(20, 'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z');
export const SparkleIcon = solid(20, 'M12 2.5l1.7 4.6 4.6 1.7-4.6 1.7L12 15.1l-1.7-4.6L5.7 8.8l4.6-1.7L12 2.5ZM18.5 15l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9.9-2.4ZM5.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z');

export const InfoIcon = line(20, <><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><path d="M12 8h.01" /></>);
export const SearchIcon = line(20, <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></>);
export const PlusIcon = line(20, <path d="M12 5v14M5 12h14" />);
export const CheckIcon = line(20, <path d="m4.5 12.5 5 5 10-11" />);
export const MenuIcon = line(22, <path d="M4 7h16M4 12h16M4 17h16" />);
export const CloseIcon = line(20, <path d="M6 6l12 12M18 6 6 18" />);
export const ChevronLeftIcon = line(20, <path d="m15 5-7 7 7 7" />);
export const ChevronRightIcon = line(20, <path d="m9 5 7 7-7 7" />);
export const ChevronDownIcon = line(16, <path d="m5 9 7 7 7-7" />);
export const ArrowLeftIcon = line(20, <><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></>);
export const BookmarkIcon = line(20, <path d="M6 4h12v17l-6-4-6 4V4Z" />);
export const VolumeIcon = line(20, <><path d="M4 9v6h4l5 4V5L8 9H4Z" /><path d="M17 8.5a5 5 0 0 1 0 7" /><path d="M19.5 6a8.5 8.5 0 0 1 0 12" /></>);
export const VolumeOffIcon = line(20, <><path d="M4 9v6h4l5 4V5L8 9H4Z" /><path d="m17 9 5 6M22 9l-5 6" /></>);
export const FullscreenIcon = line(20, <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />);
export const ExitFullscreenIcon = line(20, <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />);
export const TrashIcon = line(20, <><path d="M4 7h16M10 4h4M6 7l1 13h10l1-13" /><path d="M10 11v5M14 11v5" /></>);
export const FilmIcon = line(20, <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v16M17 4v16M3 12h18M3 8h4M3 16h4M17 8h4M17 16h4" /></>);
export const TvIcon = line(20, <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="m8 3 4 4 4-4" /></>);
export const UserIcon = line(20, <><circle cx="12" cy="8" r="4" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0" /></>);
export const GlobeIcon = line(20, <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z" /></>);
export function SpinnerIcon({ size = 20, ...props }) {
  return (
    <svg {...base(size, { ...stroke, ...props })} className="spin">
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}
