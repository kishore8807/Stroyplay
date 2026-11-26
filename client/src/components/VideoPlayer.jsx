import { useCallback, useEffect, useRef, useState } from 'react';
import { ExitFullscreenIcon, FullscreenIcon, PauseIcon, PlayIcon, SpinnerIcon, VolumeIcon, VolumeOffIcon } from './Icons';
import { formatDuration } from '../lib/format';

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const PROGRESS_EVERY_S = 5;
const HIDE_CONTROLS_MS = 2600;
const clamp = (n, lo, hi) => Math.min(Math.max(n, lo), hi);

export default function VideoPlayer({ src, poster, title = 'StoryPlay preview', startAt = 0, onProgress, onEnded }) {
  const videoRef = useRef(null);
  const shellRef = useRef(null);
  const lastReport = useRef(0);
  const hideTimer = useRef(0);
  const onProgressRef = useRef(onProgress);
  const onEndedRef = useRef(onEnded);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fullscreen, setFullscreen] = useState(false);
  const [speedOpen, setSpeedOpen] = useState(false);
  const [awake, setAwake] = useState(true);

  useEffect(() => {
    onProgressRef.current = onProgress;
    onEndedRef.current = onEnded;
  }, [onProgress, onEnded]);

  const seek = useCallback((seconds) => {
    const v = videoRef.current;
    if (!v) return;
    const next = clamp(seconds, 0, v.duration || 0);
    v.currentTime = next;
    setTime(next);
  }, []);

  const togglePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.paused) await v.play();
      else v.pause();
    } catch {
      setError('Playback was blocked by the browser. Press play again.');
    }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = !v.muted;
      setMuted(v.muted);
    }
  }, []);

  const changeVolume = useCallback((value) => {
    const v = videoRef.current;
    if (!v) return;
    const next = clamp(value, 0, 1);
    v.volume = next;
    v.muted = next === 0;
    setVolume(next);
    setMuted(next === 0);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const shell = shellRef.current;
    if (!shell) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (shell.requestFullscreen) await shell.requestFullscreen();
    } catch {
      /* fullscreen not permitted */
    }
  }, []);

  const chooseSpeed = (rate) => {
    const v = videoRef.current;
    if (v) v.playbackRate = rate;
    setSpeed(rate);
    setSpeedOpen(false);
  };

  // Media element events.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    const report = (current) => onProgressRef.current && v.duration && onProgressRef.current(current, v.duration);
    const handlers = {
      loadedmetadata: () => {
        setDuration(v.duration || 0);
        setLoading(false);
        if (startAt > 0 && startAt < v.duration) {
          v.currentTime = startAt;
          setTime(startAt);
        }
      },
      timeupdate: () => {
        setTime(v.currentTime);
        if (v.duration && v.currentTime - lastReport.current >= PROGRESS_EVERY_S) {
          lastReport.current = v.currentTime;
          report(v.currentTime);
        }
      },
      play: () => {
        setPlaying(true);
        setLoading(false);
      },
      pause: () => {
        setPlaying(false);
        report(v.currentTime);
      },
      waiting: () => setLoading(true),
      playing: () => setLoading(false),
      error: () => setError('This preview could not be loaded. Check your connection and try again.'),
      ended: () => {
        setPlaying(false);
        report(v.duration);
        onEndedRef.current?.();
      },
      volumechange: () => {
        setVolume(v.volume);
        setMuted(v.muted || v.volume === 0);
      },
    };
    for (const [event, fn] of Object.entries(handlers)) v.addEventListener(event, fn);
    const onFullscreen = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullscreen);
    return () => {
      for (const [event, fn] of Object.entries(handlers)) v.removeEventListener(event, fn);
      document.removeEventListener('fullscreenchange', onFullscreen);
    };
  }, [startAt]);

  // Save position when the player is closed mid-playback.
  useEffect(
    () => () => {
      const v = videoRef.current;
      if (v && onProgressRef.current && v.duration) onProgressRef.current(v.currentTime, v.duration);
      window.clearTimeout(hideTimer.current);
    },
    [],
  );

  const wake = () => {
    setAwake(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (!videoRef.current?.paused) setAwake(false);
    }, HIDE_CONTROLS_MS);
  };

  const handleKey = (e) => {
    const key = e.key.toLowerCase();
    if ([' ', 'k', 'arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'm', 'f'].includes(key)) e.preventDefault();
    if (key === ' ' || key === 'k') togglePlay();
    else if (key === 'arrowright') seek(time + 10);
    else if (key === 'arrowleft') seek(time - 10);
    else if (key === 'arrowup') changeVolume(volume + 0.1);
    else if (key === 'arrowdown') changeVolume(volume - 0.1);
    else if (key === 'm') toggleMute();
    else if (key === 'f') toggleFullscreen();
    else if (/^[0-9]$/.test(key) && duration) seek((Number(key) / 10) * duration);
    wake();
  };

  // A document-level listener keeps shortcuts working without focusing the player first.
  const keyRef = useRef(handleKey);
  useEffect(() => {
    keyRef.current = handleKey;
  });
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target?.isContentEditable) return;
      keyRef.current(e);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const percent = duration ? (time / duration) * 100 : 0;
  const retry = () => {
    setError('');
    setLoading(true);
    videoRef.current?.load();
  };

  return (
    <div
      className={`player ${awake ? 'is-awake' : ''} ${fullscreen ? 'is-fullscreen' : ''}`}
      ref={shellRef}
      onPointerMove={wake}
      onPointerLeave={() => playing && setAwake(false)}
      tabIndex={0}
      role="group"
      aria-label={`Video player: ${title}`}
    >
      <video ref={videoRef} className="player__video" src={src} poster={poster} preload="metadata" playsInline onClick={togglePlay} onDoubleClick={toggleFullscreen} />
      {!playing && !error && (
        <button className="player__bigplay" type="button" onClick={togglePlay} aria-label={`Play ${title}`}>
          <PlayIcon size={30} />
        </button>
      )}
      {loading && !error && (
        <div className="player__spinner" role="status" aria-live="polite">
          <SpinnerIcon size={30} />
          <span>Loading preview…</span>
        </div>
      )}
      {error && (
        <div className="player__error" role="alert">
          <p>{error}</p>
          <button className="btn btn-ghost" type="button" onClick={retry}>
            Try again
          </button>
        </div>
      )}
      <div className="player__controls" aria-hidden={!awake}>
        <input className="player__seek" type="range" min="0" max={duration || 0} step="0.1" value={time} onChange={(e) => seek(Number(e.target.value))} aria-label="Seek" style={{ '--progress': `${percent}%` }} />
        <div className="player__bar">
          <button className="player__btn" type="button" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
          </button>
          <div className="player__volume">
            <button className="player__btn" type="button" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
              {muted || volume === 0 ? <VolumeOffIcon size={20} /> : <VolumeIcon size={20} />}
            </button>
            <input className="player__volume-range" type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume} onChange={(e) => changeVolume(Number(e.target.value))} aria-label="Volume" />
          </div>
          <span className="player__time">
            {formatDuration(time)} <span aria-hidden="true">/</span> {formatDuration(duration)}
          </span>
          <div className="player__spacer" />
          <div className="player__speed">
            <button className="player__btn player__btn--text" type="button" onClick={() => setSpeedOpen((o) => !o)} aria-expanded={speedOpen} aria-label="Playback speed">
              {speed}×
            </button>
            {speedOpen && (
              <div className="player__speed-menu" role="menu">
                {SPEEDS.map((rate) => (
                  <button key={rate} type="button" role="menuitemradio" aria-checked={speed === rate} className={speed === rate ? 'is-active' : ''} onClick={() => chooseSpeed(rate)}>
                    {rate}×
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="player__btn" type="button" onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
            {fullscreen ? <ExitFullscreenIcon size={20} /> : <FullscreenIcon size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
