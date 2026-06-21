import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── hooks ─────────────────────────────────────────── */
function useWindowWidth() {
  const [w, setW] = useState(() => window.innerWidth);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

/* ─── types ──────────────────────────────────────────── */
interface Project {
  id: string;
  title: string;
  badge: string;
  categories: string[];
  tags: string[];
  desc: string;
  longDesc: string;
  tech: string[];
  github: string | null;
  demo: string | null;
  gradient: string;
  accentColor: string;
  preview?: string;
  previewVideo?: string;
  previewObjectPosition?: string;
}

/* ─── constants ──────────────────────────────────────── */
const SKEW = 28;
const COLLAPSED_W = 108;
const ANIM_MS = 200;

const CLIP = `polygon(${SKEW}px 0, 100% 0, calc(100% - ${SKEW}px) 100%, 0 100%)`;

/* ─── project data ───────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: 'github',
    title: 'GitHub',
    badge: 'GIT',
    categories: ['tool'],
    tags: ['Open Source', 'Contributions'],
    desc: 'All of my public repositories, experiments, and open source contributions in one place.',
    longDesc: 'Browse the source code behind my projects, see what I am actively building, and explore older experiments. Every project I release publicly lives here. Pull requests always welcome.',
    tech: ['Git', 'GitHub Actions', 'Open Source'],
    github: 'https://github.com/MrVokerr',
    demo: null,
    gradient: 'linear-gradient(145deg, #1a0a22 0%, #6b21a8 55%, #3b0764 100%)',
    accentColor: '#a855f7',
    preview: '/previews/github.png',
  },
  {
    id: 'mtg-keywords',
    title: 'MTG Keywords',
    badge: 'MTG',
    categories: ['tool', 'mtg'],
    tags: ['MTG', 'Reference', 'Searchable'],
    desc: 'A comprehensive, searchable index of every Magic: The Gathering keyword and mechanic.',
    longDesc: 'Built for players who need quick rulings lookups at the table. Every keyword from Alpha to the latest set, with oracle text and rulings notes. Hosted on Cloudflare Pages for near-instant global load times.',
    tech: ['React', 'Vite', 'Cloudflare Pages'],
    github: null,
    demo: 'https://keyword-webpage.pages.dev/',
    gradient: 'linear-gradient(145deg, #0f1e10 0%, #166534 55%, #052e16 100%)',
    accentColor: '#22c55e',
    preview: '/previews/mtg-keywords.png',
    previewObjectPosition: '8% top',
  },
  {
    id: 'mtg-board-state',
    title: 'MTG Board State',
    badge: 'MTG',
    categories: ['tool', 'mtg'],
    tags: ['MTG', 'Board Tracker', 'Browser Tool'],
    desc: 'A browser-based tool that digitizes and tracks your Magic: The Gathering board state.',
    longDesc: 'Lay out your battlefield digitally to help opponents understand complex board states, resolve cascading triggers, and track counters without pen and paper. Runs entirely in the browser — no account or install needed.',
    tech: ['React', 'Vite', 'Cloudflare Pages'],
    github: null,
    demo: 'https://mtg-board-state.pages.dev/',
    gradient: 'linear-gradient(145deg, #0a1a08 0%, #3d6b21 55%, #1a2e0a 100%)',
    accentColor: '#84cc16',
    preview: '/previews/mtg-board-state.png',
    previewObjectPosition: '39% top',
  },
  {
    id: 'commander-quest',
    title: 'Commander Quest',
    badge: 'MTG',
    categories: ['game', 'mtg'],
    tags: ['MTG', 'Commander', 'EDH', 'Quiz'],
    desc: 'Answer a series of questions to discover the EDH commanders that match your playstyle.',
    longDesc: 'A personality quiz meets deckbuilding advisor. Answer questions about your preferred game plan, win conditions, and table politics. Commander Quest narrows down thousands of legendary creatures to the handful that truly fit how you play.',
    tech: ['React', 'TypeScript', 'Vite', 'Cloudflare Pages'],
    github: null,
    demo: 'https://mtg-c-quest.pages.dev/',
    gradient: 'linear-gradient(145deg, #0a1628 0%, #1e40af 55%, #0d1f4a 100%)',
    accentColor: '#60a5fa',
    preview: '/previews/commander-quest.png',
    previewObjectPosition: '54% top',
  },
  {
    id: 'infinity-v',
    title: 'InfinityV',
    badge: 'GAME',
    categories: ['game'],
    tags: ['Incremental', 'RPG', 'Roguelite', 'Browser Game'],
    desc: 'A browser-based incremental RPG where you fight through scaling dungeons, die, and grow stronger each run.',
    longDesc: 'InfinityV is an incremental roguelite RPG built for the browser. Descend into procedurally scaling dungeons, battle increasingly dangerous enemies, and die — but every death makes you permanently stronger. Unlock new abilities, gear, and passive upgrades across runs until nothing can stop you.',
    tech: ['React 19', 'TypeScript', 'Vite', 'Vercel'],
    github: null,
    demo: 'https://infinity-v.vercel.app',
    gradient: 'linear-gradient(145deg, #0d0a1e 0%, #312e81 55%, #1e1b4b 100%)',
    accentColor: '#818cf8',
    preview: '/previews/infinity-v.png',
    previewObjectPosition: '39% top',
  },
  {
    id: 'archeage-fishing',
    title: 'Fishing Game',
    badge: 'GAME',
    categories: ['game'],
    tags: ['Browser Game', 'ArcheAge', 'Minigame'],
    desc: 'A fishing minigame inspired by the reel mechanics of ArcheAge, playable in the browser.',
    longDesc: 'Recreates the addictive tension-and-release fishing system from ArcheAge as a standalone web game. Watch the tension meter, time your reels, and land bigger catches as your skill improves. Built for fans of the original mechanic.',
    tech: ['JavaScript', 'Canvas API', 'Vercel'],
    github: null,
    demo: 'https://vfishinggame.vercel.app/',
    gradient: 'linear-gradient(145deg, #0f1a1a 0%, #0f766e 55%, #042f2a 100%)',
    accentColor: '#2dd4bf',
    preview: '/previews/archeage-fishing.png',
    previewObjectPosition: '54% top',
  },
  {
    id: 'mineral-z',
    title: 'Mineral-Z',
    badge: 'GAME',
    categories: ['game'],
    tags: ['Tower Defense', 'Strategy', 'Browser Game'],
    desc: 'A fast-paced tower defense strategy game — place defenses, survive waves, and mine minerals.',
    longDesc: 'Build and upgrade towers to hold off increasingly relentless waves of enemies while mining the mineral deposits at the heart of your base. Tight resource management and build-order decisions make every run feel fresh.',
    tech: ['JavaScript', 'Canvas API', 'Vercel'],
    github: null,
    demo: 'https://vokerr-mineral-z.vercel.app/',
    gradient: 'linear-gradient(145deg, #1f0a0a 0%, #991b1b 55%, #450a0a 100%)',
    accentColor: '#f87171',
    preview: '/previews/mineral-z.png',
    previewObjectPosition: '54% top',
  },
];

const FILTERS = [
  { id: 'all',  label: 'ALL'  },
  { id: 'game', label: 'GAME' },
  { id: 'tool', label: 'TOOL' },
  { id: 'mtg',  label: 'MTG'  },
];

function getProjectUrl(p: Project): string | null {
  return p.demo ?? p.github;
}

function openProjectUrl(p: Project) {
  const url = getProjectUrl(p);
  if (url) window.open(url, '_blank', 'noopener,noreferrer');
}

/* ─── GlowBorder ─────────────────────────────────────── */
function GlowBorder({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const stroke = isActive ? '#7dd3fc' : isHovered ? 'rgba(125,211,252,0.4)' : 'rgba(0,0,0,0.55)';
  const sw = isActive ? 2.5 : 1;
  return (
    <svg
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible', zIndex: 20, width: '100%', height: '100%' }}
      viewBox="0 0 1 1" preserveAspectRatio="none"
    >
      <polygon
        points="0,0 1,0 1,1 0,1"
        fill="none"
        stroke={stroke}
        strokeWidth={sw}
        vectorEffect="non-scaling-stroke"
        style={{ transition: `stroke ${ANIM_MS}ms, stroke-width ${ANIM_MS}ms` }}
      />
    </svg>
  );
}

/* ─── FilterBtn ──────────────────────────────────────── */
function FilterBtn({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        height: 24, padding: '0 16px 0 calc(16px + 10px)', marginRight: -10,
        fontFamily: 'Roboto Condensed, sans-serif', fontSize: 10, fontWeight: 700,
        letterSpacing: '0.5px', textTransform: 'uppercase',
        color: isActive ? '#0c4a6e' : '#8bceff',
        border: 'none', background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap',
        zIndex: isActive ? 10 : hov ? 5 : 1,
        clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
        transition: `color ${ANIM_MS}ms`,
      }}
    >
      <span style={{
        position: 'absolute', inset: 0, clipPath: 'inherit',
        background: isActive ? '#7dd3fc' : hov ? 'rgba(30,41,59,0.9)' : 'rgba(15,23,35,0.85)',
        border: '1px solid', borderColor: isActive ? 'rgba(125,211,252,0.55)' : hov ? 'rgba(125,211,252,0.25)' : 'rgba(125,211,252,0.1)',
        transition: `background ${ANIM_MS}ms, border-color ${ANIM_MS}ms`,
      }} />
      <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
    </button>
  );
}

/* ─── ActionBtn ──────────────────────────────────────── */
function ActionBtn({ label, href, onClick }: { label: string; href?: string; onClick?: (e: React.MouseEvent) => void }) {
  const [hov, setHov] = useState(false);
  const base: React.CSSProperties = {
    position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 5,
    height: 30, padding: '0 14px 0 calc(14px + 5px)', marginRight: -5,
    fontFamily: 'Roboto Condensed, sans-serif', fontSize: 11, fontWeight: 700,
    letterSpacing: '0.5px', color: '#8bceff', border: 'none', background: 'transparent',
    cursor: 'pointer', clipPath: 'polygon(5px 0, 100% 0, calc(100% - 5px) 100%, 0 100%)',
    textDecoration: 'none', transition: `color ${ANIM_MS}ms`,
  };
  const bg = (
    <span style={{
      position: 'absolute', inset: 0, clipPath: 'inherit',
      background: hov ? 'rgba(30,41,59,0.85)' : 'rgba(15,23,35,0.78)',
      border: '1px solid', borderColor: hov ? 'rgba(125,211,252,0.4)' : 'rgba(100,116,139,0.18)',
      transition: `background ${ANIM_MS}ms, border-color ${ANIM_MS}ms`,
    }} />
  );
  if (href) return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={base}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={e => e.stopPropagation()}
    >{bg}<span style={{ position: 'relative', zIndex: 1 }}>{label}</span></a>
  );
  return (
    <button style={base} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={e => { e.stopPropagation(); onClick?.(e); }}
    >{bg}<span style={{ position: 'relative', zIndex: 1 }}>{label}</span></button>
  );
}

/* ─── HeaderLink ─────────────────────────────────────── */
function HeaderLink({ href, label }: { href: string; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        height: 24, padding: '0 18px',
        fontFamily: 'Roboto Condensed, sans-serif', fontSize: 10, fontWeight: 700,
        letterSpacing: '0.5px', textTransform: 'uppercase', color: '#8bceff',
        textDecoration: 'none', zIndex: hov ? 5 : 1,
        clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
        transition: `color ${ANIM_MS}ms`,
      }}
    >
      <span style={{
        position: 'absolute', inset: 0, clipPath: 'inherit',
        background: hov ? 'rgba(30,41,59,0.85)' : 'rgba(15,23,35,0.8)',
        border: '1px solid', borderColor: hov ? 'rgba(125,211,252,0.3)' : 'rgba(125,211,252,0.1)',
        transition: `background ${ANIM_MS}ms, border-color ${ANIM_MS}ms`,
      }} />
      <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
    </a>
  );
}

/* ─── PreviewMedia ──────────────────────────────────── */
function PreviewMedia({ src, isVideo, alt, style, objectPosition }: {
  src: string; isVideo: boolean; alt: string; style: React.CSSProperties; objectPosition?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const mergedStyle = objectPosition ? { ...style, objectPosition } : style;
  if (!isVideo) return <img src={src} alt={alt} style={mergedStyle} />;
  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      playsInline
      onLoadedMetadata={() => { if (ref.current) ref.current.playbackRate = 0.6; }}
      onTimeUpdate={() => {
        const v = ref.current;
        if (!v || !v.duration) return;
        if (v.currentTime >= v.duration - 3) v.currentTime = 0;
      }}
      style={mergedStyle}
    />
  );
}

/* ─── Slice ──────────────────────────────────────────── */
function Slice({ project: p, isActive, expandedW, onSelect }: {
  project: Project; isActive: boolean; expandedW: number; onSelect: () => void;
}) {
  const [hov, setHov] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const winW = useWindowWidth();
  const collW = winW < 640 ? 56 : COLLAPSED_W;
  const isMob = winW < 640;

  const handleSliceClick = () => {
    if (isActive && !flipped) {
      openProjectUrl(p);
      return;
    }
    onSelect();
  };

  return (
    <motion.div
      data-id={p.id}
      animate={{ width: isActive ? expandedW : collW }}
      transition={{ duration: isMob ? 0.15 : ANIM_MS / 1000, ease: [0, 0, 0.58, 1] }}
      onClick={handleSliceClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', height: '100%', flexShrink: 0,
        marginRight: -(SKEW - 2), cursor: 'pointer',
        zIndex: isActive ? 100 : hov ? 90 : 1,
        filter: isMob
          ? (isActive ? `drop-shadow(0 0 6px ${p.accentColor}88)` : 'none')
          : isActive
          ? `drop-shadow(0 0 14px ${p.accentColor}99) drop-shadow(3px 8px 14px rgba(0,0,0,0.75))`
          : hov
          ? `drop-shadow(0 0 8px ${p.accentColor}55) drop-shadow(2px 6px 10px rgba(0,0,0,0.6))`
          : 'drop-shadow(2px 5px 8px rgba(0,0,0,0.5))',
        transition: isMob ? 'none' : `filter ${ANIM_MS}ms`,
      }}
    >
      {/* Drop shadow shape */}
      <div style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', clipPath: CLIP,
        transform: isActive ? 'translate(5px,11px)' : 'translate(3px,6px)',
        opacity: isActive ? 0.5 : 0.3, zIndex: 0, pointerEvents: 'none',
        transition: `transform ${ANIM_MS}ms, opacity ${ANIM_MS}ms`,
      }} />

      {/* Clipped container */}
      <div style={{ position: 'absolute', inset: 0, clipPath: CLIP, overflow: 'hidden' }}>
        {/* Accent border lines — top and bottom edges */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: p.accentColor,
          opacity: isActive ? 0.85 : hov ? 0.4 : 0.15,
          transition: `opacity ${ANIM_MS}ms`, zIndex: 50, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
          background: p.accentColor,
          opacity: isActive ? 0.85 : hov ? 0.4 : 0.15,
          transition: `opacity ${ANIM_MS}ms`, zIndex: 50, pointerEvents: 'none',
        }} />

        {/* ── FRONT FACE ── */}
        <div style={{
          position: 'absolute', inset: 0,
          opacity: flipped ? 0 : 1, pointerEvents: flipped ? 'none' : 'auto',
          transition: `opacity 400ms cubic-bezier(0.455,0.03,0.515,0.955)`,
        }}>
          {/* Background */}
          <div style={{
            position: 'absolute', inset: 0, background: p.gradient,
            transform: isActive ? 'scale(1.02)' : 'scale(1)',
            transition: `transform 600ms cubic-bezier(0,0,0.58,1)`,
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.015) 39px,rgba(255,255,255,0.015) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.015) 39px,rgba(255,255,255,0.015) 40px)',
            }} />
          </div>
          {/* Preview media — fills full slice when expanded */}
          {(p.preview || p.previewVideo) && (
            <div style={{
              position: 'absolute', inset: 0,
              opacity: isActive ? 1 : 0,
              transition: `opacity 400ms ${isActive ? ANIM_MS + 50 : 0}ms`,
              pointerEvents: 'none', zIndex: 2,
            }}>
              <PreviewMedia
                src={(p.previewVideo ?? p.preview)!}
                isVideo={!!p.previewVideo}
                alt={`${p.title} preview`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block' }}
                objectPosition={p.previewObjectPosition}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 45%)' }} />
            </div>
          )}
          {/* Overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: isActive ? 'rgba(0,0,0,0)' : hov ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.45)',
            transition: `background ${ANIM_MS}ms`,
          }} />
          {/* Collapsed label — anchored above the badge */}
          <div style={{
            position: 'absolute', bottom: 36, right: SKEW + 8,
            writingMode: 'vertical-rl' as const, transform: 'rotate(180deg)',
            whiteSpace: 'nowrap', fontFamily: 'Roboto Condensed, sans-serif',
            fontSize: 14, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
            color: 'rgba(247,221,217,0.82)', zIndex: 15, pointerEvents: 'none',
            opacity: isActive ? 0 : 1, transition: `opacity ${ANIM_MS}ms`,
          }}>{p.title}</div>
          {/* Badge */}
          <div style={{
            position: 'absolute', bottom: 10, right: SKEW + 8, zIndex: 15,
            fontFamily: 'Roboto Condensed, sans-serif', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.5px', color: '#8bceff', background: 'rgba(0,0,0,0.72)',
            border: `1px solid ${p.accentColor}88`, padding: '2px 7px',
            clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
            opacity: isActive ? 0 : 1, transition: `opacity ${ANIM_MS}ms`,
          }}>{p.badge}</div>
          {/* Expanded content */}
          <div style={{
            position: 'absolute', bottom: 0,
            left: SKEW, right: SKEW + 2, padding: '0 22px 26px', zIndex: 10,
            background: 'linear-gradient(to top, rgba(13,17,23,0.99) 0%, rgba(13,17,23,0.95) 20%, rgba(13,17,23,0.75) 80%, rgba(13,17,23,0.1) 90%, transparent 100%)',
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity ${ANIM_MS}ms ${isActive ? ANIM_MS / 2 : 0}ms, transform ${ANIM_MS}ms ${isActive ? ANIM_MS / 2 : 0}ms`,
            pointerEvents: isActive ? 'auto' : 'none',
          }}>
            <h2 style={{ fontFamily: 'Roboto, sans-serif', fontSize: 23, fontWeight: 700, color: '#ffffff', marginBottom: 6, lineHeight: 1.2 }}>{p.title}</h2>
            <p style={{ fontSize: 16, color: '#ffffff', lineHeight: 1.65, marginBottom: 12 }}>{p.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
              {p.tags.map(t => (
                <span key={t} style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
                  color: '#8bceff', background: 'rgba(139,206,255,0.08)',
                  border: '1px solid rgba(139,206,255,0.22)', padding: '2px 7px', borderRadius: 2,
                }}>{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex' }}>
              {p.github && <ActionBtn label="↗ GitHub" href={p.github} />}
              {p.demo   && <ActionBtn label="⬡ Visit Site" href={p.demo} />}
              <ActionBtn label="⊞ Details" onClick={() => setFlipped(true)} />
            </div>
          </div>
          <GlowBorder isActive={isActive} isHovered={hov} />
        </div>

        {/* ── BACK FACE ── */}
        <div style={{
          position: 'absolute', inset: 0,
          opacity: flipped ? 1 : 0, pointerEvents: flipped ? 'auto' : 'none',
          transition: `opacity 400ms cubic-bezier(0.455,0.03,0.515,0.955)`,
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(140deg, rgba(18,22,30,0.98) 0%, rgba(13,17,23,1) 100%)' }} />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            justifyContent: 'center', padding: `28px ${SKEW + 20}px`, overflowY: 'auto',
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#7dd3fc', marginBottom: 12, fontFamily: 'Roboto Condensed, sans-serif' }}>Tech Stack</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
              {p.tech.map(t => (
                <span key={t} style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 10, color: '#8bceff', background: 'rgba(139,206,255,0.07)', border: '1px solid rgba(139,206,255,0.22)', padding: '4px 10px', borderRadius: 1 }}>{t}</span>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.65, marginBottom: 22 }}>{p.longDesc}</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 11, fontWeight: 700, color: '#7dd3fc', textDecoration: 'none', borderBottom: '1px solid rgba(125,211,252,0.28)', paddingBottom: 2 }}>⌥ View Source</a>}
              {p.demo   && <a href={p.demo}   target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 11, fontWeight: 700, color: '#7dd3fc', textDecoration: 'none', borderBottom: '1px solid rgba(125,211,252,0.28)', paddingBottom: 2 }}>↗ Open Demo</a>}
            </div>
            <ActionBtn label="← Back" onClick={() => setFlipped(false)} />
          </div>
          <GlowBorder isActive={isActive} isHovered={hov} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Layout types ───────────────────────────────────── */
type Layout = 'slices' | 'spotlight' | 'hex';

const LAYOUTS: { id: Layout; label: string; icon: string; desc: string }[] = [
  { id: 'slices',    label: 'Slices',    icon: '▥', desc: 'Expanding parallelogram panels' },
  { id: 'spotlight', label: 'Spotlight', icon: '◈', desc: 'Vertical list with animated focus' },
  { id: 'hex',       label: 'Hex Grid',  icon: '⬡', desc: 'Infinite looping hexagon carousel' },
];

/* ─── CogMenu ─────────────────────────────────────────── */
function CogMenu({ layout, setLayout }: { layout: Layout; setLayout: (l: Layout) => void }) {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleCog = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 500);
    setOpen(o => !o);
  };

  return (
    <div ref={ref} style={{ position: 'relative', marginLeft: 8 }}>
      <button
        onClick={handleCog}
        title="Change layout"
        style={{
          width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: open ? 'rgba(255,180,171,0.12)' : 'rgba(15,23,35,0.8)',
          border: '1px solid', borderColor: open ? 'rgba(125,211,252,0.45)' : 'rgba(100,116,139,0.2)',
          borderRadius: 4, cursor: 'pointer', color: open ? '#7dd3fc' : '#8bceff',
          fontSize: 16, transition: 'background 200ms, border-color 200ms, color 200ms',
          transform: spinning ? 'rotate(90deg)' : 'rotate(0deg)',
          transitionProperty: 'background, border-color, color, transform',
        }}
      >⚙</button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              position: 'absolute', top: 36, right: 0, zIndex: 200, minWidth: 220,
              background: 'rgba(13,17,23,0.97)', border: '1px solid rgba(100,116,139,0.2)',
              borderRadius: 6, overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            }}
          >
            <div style={{ padding: '8px 12px 6px', fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#7dd3fc', borderBottom: '1px solid rgba(100,116,139,0.12)' }}>
              Layout
            </div>
            {LAYOUTS.map(l => (
              <button
                key={l.id}
                onClick={() => { setLayout(l.id); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  padding: '10px 14px', background: layout === l.id ? 'rgba(125,211,252,0.1)' : 'transparent',
                  border: 'none', borderLeft: layout === l.id ? '2px solid #7dd3fc' : '2px solid transparent',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'background 150ms',
                }}
                onMouseEnter={e => { if (layout !== l.id) (e.currentTarget as HTMLElement).style.background = 'rgba(90,65,62,0.4)'; }}
                onMouseLeave={e => { if (layout !== l.id) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <span style={{ fontSize: 18, lineHeight: 1, color: layout === l.id ? '#7dd3fc' : '#8bceff', width: 22, textAlign: 'center' }}>{l.icon}</span>
                <span>
                  <span style={{ display: 'block', fontSize: 12, fontWeight: 700, color: layout === l.id ? '#7dd3fc' : '#e2e8f0', fontFamily: 'Roboto Condensed, sans-serif' }}>{l.label}</span>
                  <span style={{ display: 'block', fontSize: 10, color: '#64748b', fontFamily: 'Roboto Condensed, sans-serif' }}>{l.desc}</span>
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── SPOTLIGHT LAYOUT ────────────────────────────────── */
function SpotlightLayout({ visible, activeId, setActiveId }: { visible: Project[]; activeId: string; setActiveId: (id: string) => void }) {
  const active = visible.find(p => p.id === activeId) ?? visible[0];
  const [flipped, setFlipped] = useState(false);
  const winW = useWindowWidth();
  const isMob = winW < 640;
  useEffect(() => setFlipped(false), [activeId]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      e.preventDefault();
      const idx = visible.findIndex(p => p.id === activeId);
      if (e.key === 'ArrowUp')   setActiveId(visible[(idx - 1 + visible.length) % visible.length].id);
      if (e.key === 'ArrowDown') setActiveId(visible[(idx + 1) % visible.length].id);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [visible, activeId, setActiveId]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: isMob ? 'column' : 'row', overflow: 'hidden', padding: isMob ? '0 12px 12px' : '0 36px 16px', gap: isMob ? 8 : 16 }}>
      {/* List */}
      <div style={{
        width: isMob ? '100%' : 200, flexShrink: 0,
        display: 'flex', flexDirection: isMob ? 'row' : 'column',
        gap: isMob ? 6 : 2,
        overflowX: isMob ? 'auto' : 'hidden', overflowY: isMob ? 'hidden' : 'auto',
        height: isMob ? 72 : undefined,
        paddingRight: isMob ? 0 : 8,
        scrollbarWidth: 'thin' as const, scrollbarColor: '#7dd3fc #2c1f1d',
      }}>
        <AnimatePresence>
          {visible.map((p, i) => {
            const isA = p.id === activeId;
            return (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, x: isMob ? 0 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isMob ? 0 : -10 }}
                transition={{ duration: 0.18, delay: i * 0.04 }}
                onClick={() => setActiveId(p.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: isMob ? 6 : 10,
                  padding: isMob ? '6px 8px' : '10px 12px', borderRadius: 4, cursor: 'pointer',
                  background: isA ? 'rgba(125,211,252,0.1)' : 'transparent',
                  border: 'none',
                  borderLeft: isMob ? 'none' : `2px solid ${isA ? '#7dd3fc' : 'transparent'}`,
                  borderBottom: isMob ? `2px solid ${isA ? '#7dd3fc' : 'transparent'}` : 'none',
                  textAlign: 'left', flexShrink: 0,
                  transition: 'background 150ms, border-color 150ms',
                }}
              >
                <div style={{ width: isMob ? 24 : 32, height: isMob ? 24 : 32, borderRadius: 4, background: p.gradient, flexShrink: 0, border: `1px solid ${isA ? '#7dd3fc' : 'rgba(100,116,139,0.2)'}` }} />
                <span>
                  <span style={{ display: 'block', fontSize: isMob ? 10 : 12, fontWeight: 700, color: isA ? '#7dd3fc' : '#e2e8f0', whiteSpace: 'nowrap' }}>{p.title}</span>
                  {!isMob && <span style={{ display: 'block', fontSize: 9, color: '#64748b', letterSpacing: 1 }}>{p.badge}</span>}
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Detail pane */}
      <div style={{ flex: 1, overflow: 'hidden', borderRadius: 8, border: '1px solid rgba(100,116,139,0.2)', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId + (flipped ? '-back' : '-front')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            onClick={() => { if (!flipped && active) openProjectUrl(active); }}
            style={{
              position: 'absolute', inset: 0,
              cursor: !flipped && active && getProjectUrl(active) ? 'pointer' : undefined,
            }}
          >
            {!flipped ? (
              <>
                <div style={{ position: 'absolute', inset: 0, background: active?.gradient }} />
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.012) 39px,rgba(255,255,255,0.012) 40px)' }} />
                {(active?.preview || active?.previewVideo) && (
                  <PreviewMedia
                    src={(active.previewVideo ?? active.preview)!}
                    isVideo={!!active.previewVideo}
                    alt={`${active.title} preview`}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 32px 32px',
                  background: 'linear-gradient(to top, rgba(13,17,23,0.98) 0%, rgba(13,17,23,0.7) 55%, transparent 100%)',
                }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#8bceff', marginBottom: 8 }}>{active?.badge}</div>
                  <h2 style={{ fontFamily: 'Roboto, sans-serif', fontSize: 32, fontWeight: 700, color: '#e2e8f0', marginBottom: 10 }}>{active?.title}</h2>
                  <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.65, marginBottom: 16, maxWidth: 560 }}>{active?.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
                    {active?.tags.map(t => <span key={t} style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#8bceff', background: 'rgba(139,206,255,0.08)', border: '1px solid rgba(139,206,255,0.22)', padding: '2px 7px', borderRadius: 2 }}>{t}</span>)}
                  </div>
                  <div style={{ display: 'flex' }}>
                    {active?.github && <ActionBtn label="↗ GitHub" href={active.github} />}
                    {active?.demo   && <ActionBtn label="⬡ Visit Site" href={active.demo} />}
                    <ActionBtn label="⊞ Tech Stack" onClick={() => setFlipped(true)} />
                  </div>
                </div>
              </>
            ) : (
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(140deg,rgba(18,22,30,0.99) 0%,rgba(13,17,23,1) 100%)', padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#7dd3fc', marginBottom: 14 }}>Tech Stack — {active?.title}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                  {active?.tech.map(t => <span key={t} style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 11, color: '#8bceff', background: 'rgba(139,206,255,0.07)', border: '1px solid rgba(139,206,255,0.22)', padding: '5px 12px', borderRadius: 1 }}>{t}</span>)}
                </div>
                <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7, marginBottom: 28, maxWidth: 560 }}>{active?.longDesc}</p>
                <ActionBtn label="← Back" onClick={() => setFlipped(false)} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── HEX GRID LAYOUT ────────────────────────────────────
   Flat-top hexagons in a staggered grid.
   The active hex is centered and enlarged; neighbours orbit it.
   Navigation wraps infinitely — going right from the last item
   loops back to the first, and vice-versa.
──────────────────────────────────────────────────────── */
const HEX_W  = 200;  // flat-top hex, point-to-point width
const HEX_CLIP = [
  '25% 0%', '75% 0%', '100% 50%', '75% 100%', '25% 100%', '0% 50%'
].join(',');

function HexCell({
  p, role, onClick: onSelect, hexW, hexH,
}: {
  p: Project;
  role: 'active' | 'prev' | 'next' | 'prev2' | 'next2' | 'hidden';
  onClick: () => void;
  hexW: number;
  hexH: number;
}) {
  const [hov, setHov] = useState(false);
  const [flipped, setFlipped] = useState(false);
  useEffect(() => { if (role !== 'active') setFlipped(false); }, [role]);

  // Position each cell relative to center using hex grid offsets
  const pos: Record<string, { x: number; y: number; scale: number; opacity: number; z: number }> = {
    active: { x: 0,                y: 0, scale: 2.36, opacity: 1,    z: 10 },
    prev:   { x: -(hexW * 1.8),   y: 0, scale: 0.9,  opacity: 0.85, z: 5  },
    next:   { x:  (hexW * 1.8),   y: 0, scale: 0.9,  opacity: 0.85, z: 5  },
    prev2:  { x: -(hexW * 3.4),   y: 0, scale: 0.72, opacity: 0.5,  z: 2  },
    next2:  { x:  (hexW * 3.4),   y: 0, scale: 0.72, opacity: 0.5,  z: 2  },
    hidden: { x: 0,                y: 0, scale: 0.4,  opacity: 0,    z: 0  },
  };

  const { x, y, scale, opacity, z } = pos[role];
  const isActive = role === 'active';

  return (
    <motion.div
      animate={{ x, y, scale, opacity, zIndex: z }}
      transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={role !== 'hidden' ? () => {
        if (isActive && !flipped) {
          openProjectUrl(p);
          return;
        }
        onSelect();
      } : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'absolute',
        left: '50%', top: '50%',
        width: hexW, height: hexH,
        cursor: role !== 'hidden' ? 'pointer' : 'default',
        // Center the hex around its own middle
        marginLeft: -hexW / 2,
        marginTop: -hexH / 2,
        filter: isActive
          ? 'drop-shadow(0 0 18px rgba(125,211,252,0.6)) drop-shadow(0 6px 18px rgba(0,0,0,0.8))'
          : hov
          ? 'drop-shadow(0 0 8px rgba(125,211,252,0.3)) drop-shadow(0 4px 10px rgba(0,0,0,0.6))'
          : 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
        transition: 'filter 200ms',
      }}
    >
      {/* Clip into hexagon */}
      <div style={{
        position: 'absolute', inset: 0,
        clipPath: `polygon(${HEX_CLIP})`,
        overflow: 'hidden',
      }}>
        {/* Front face */}
        <div style={{ position: 'absolute', inset: 0, opacity: flipped ? 0 : 1, transition: 'opacity 350ms', pointerEvents: flipped ? 'none' : 'auto' }}>
          {(p.preview || p.previewVideo) && isActive ? (
            <>
              <PreviewMedia
                src={(p.previewVideo ?? p.preview)!}
                isVideo={!!p.previewVideo}
                alt={`${p.title} preview`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
            </>
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: p.gradient }} />
          )}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.015) 39px,rgba(255,255,255,0.015) 40px)' }} />
          {/* Hex border glow */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none', zIndex: 5 }} viewBox="0 0 200 173" preserveAspectRatio="none">
            <polygon
              points="50,0 150,0 200,86.5 150,173 50,173 0,86.5"
              fill="none"
              stroke={isActive ? '#7dd3fc' : hov ? 'rgba(125,211,252,0.4)' : 'rgba(0,0,0,0.4)'}
              strokeWidth={isActive ? 3 : 1.5}
              vectorEffect="non-scaling-stroke"
              style={{ transition: 'stroke 200ms, stroke-width 200ms' }}
            />
          </svg>
          <div style={{
            position: 'absolute', inset: 0,
            background: isActive ? 'rgba(0,0,0,0)' : hov ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.42)',
            transition: 'background 200ms',
          }} />
          {/* Content */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '20px 24px',
            background: isActive
              ? 'linear-gradient(to top, rgba(13,17,23,0.92) 0%, transparent 60%)'
              : 'none',
          }}>
            {!isActive ? (
              <span style={{ fontFamily: 'Roboto Condensed, sans-serif', fontSize: 13, fontWeight: 700, color: 'rgba(247,221,217,0.9)', textAlign: 'center', letterSpacing: 0.5 }}>{p.title}</span>
            ) : (
              <div style={{ textAlign: 'center', width: '100%' }}>
                <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#8bceff', marginBottom: 5 }}>{p.badge}</div>
                <h3 style={{ fontFamily: 'Roboto, sans-serif', fontSize: 16, fontWeight: 700, color: '#e2e8f0', marginBottom: 6, lineHeight: 1.2 }}>{p.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 0, flexWrap: 'wrap' }}>
                  {p.github && <ActionBtn label="GitHub"     href={p.github} />}
                  {p.demo   && <ActionBtn label="Visit Site" href={p.demo}   />}
                  <ActionBtn label="⊞" onClick={(e) => { e.stopPropagation(); setFlipped(true); }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back face */}
        <div style={{ position: 'absolute', inset: 0, opacity: flipped ? 1 : 0, transition: 'opacity 350ms', pointerEvents: flipped ? 'auto' : 'none', background: 'linear-gradient(140deg,rgba(18,22,30,0.99) 0%,rgba(13,17,23,1) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 14px 14px', gap: 6 }}>
          {/* Close button — always visible at top */}
          <button onClick={(e) => { e.stopPropagation(); setFlipped(false); }} style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: '#7dd3fc', fontSize: 14, cursor: 'pointer', padding: '0 2px', lineHeight: 1, flexShrink: 0 }}>✕</button>
          <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#7dd3fc', textAlign: 'center', flexShrink: 0 }}>Stack</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, flexShrink: 0 }}>
            {p.tech.map(t => <span key={t} style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 8, color: '#8bceff', background: 'rgba(139,206,255,0.07)', border: '1px solid rgba(139,206,255,0.2)', padding: '2px 5px', borderRadius: 1 }}>{t}</span>)}
          </div>
          <p style={{ fontSize: 9, color: '#94a3b8', lineHeight: 1.55, textAlign: 'center', margin: 0, flex: 1, overflow: 'hidden' }}>{p.longDesc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function HexLayout({
  visible, activeId, setActiveId,
}: {
  visible: Project[];
  activeId: string;
  setActiveId: (id: string) => void;
}) {
  const n = visible.length;
  const activeIdx = visible.findIndex(p => p.id === activeId);
  const [dir, setDir] = useState<'left' | 'right'>('right');

  const winW = useWindowWidth();
  const isMob = winW < 640;
  const hexW  = isMob ? Math.min(150, Math.floor(winW * 0.36)) : HEX_W;
  const hexH  = Math.round(hexW * 0.866);

  const goTo = (nextIdx: number, d: 'left' | 'right') => {
    setDir(d);
    setActiveId(visible[(nextIdx + n) % n].id);
  };

  // Drag / swipe support
  const dragStartX = useRef<number | null>(null);

  // Compute role for each visible project
  const getRoleOf = (idx: number): 'active' | 'prev' | 'next' | 'prev2' | 'next2' | 'hidden' => {
    const diff = ((idx - activeIdx) % n + n) % n;
    const diffBack = ((activeIdx - idx) % n + n) % n;
    if (diff === 0)      return 'active';
    if (diff === 1)      return 'next';
    if (diffBack === 1)  return 'prev';
    if (isMob)           return 'hidden';
    if (diff === 2)      return 'next2';
    if (diffBack === 2)  return 'prev2';
    return 'hidden';
  };

  // Keyboard: arrow nav — infinite looping
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(activeIdx + 1, 'right'); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(activeIdx - 1, 'left');  }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const active = visible[activeIdx];

  return (
    <div
      style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}
      onPointerDown={e => { if (e.pointerType !== 'touch') dragStartX.current = e.clientX; }}
      onPointerUp={e => {
        if (e.pointerType === 'touch' || dragStartX.current === null) return;
        const dx = e.clientX - dragStartX.current;
        dragStartX.current = null;
        if (Math.abs(dx) > 50) dx < 0 ? goTo(activeIdx + 1, 'right') : goTo(activeIdx - 1, 'left');
      }}
      onPointerCancel={() => { dragStartX.current = null; }}
      onTouchStart={e => { dragStartX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (dragStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - dragStartX.current;
        dragStartX.current = null;
        if (Math.abs(dx) > 40) dx < 0 ? goTo(activeIdx + 1, 'right') : goTo(activeIdx - 1, 'left');
      }}
    >
      {/* Hex stage */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {visible.map((p, i) => (
          <HexCell
            key={p.id}
            p={p}
            role={getRoleOf(i)}
            hexW={hexW}
            hexH={hexH}
            onClick={() => {
              const r = getRoleOf(i);
              if (r === 'next' || r === 'next2') goTo(i, 'right');
              else if (r === 'prev' || r === 'prev2') goTo(i, 'left');
            }}
          />
        ))}
      </div>

      {/* Nav arrows */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', pointerEvents: 'none' }}>
        {(['left', 'right'] as const).map(d => (
          <motion.button
            key={d}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => d === 'left' ? goTo(activeIdx - 1, 'left') : goTo(activeIdx + 1, 'right')}
            style={{
              pointerEvents: 'auto', width: isMob ? 32 : 40, height: isMob ? 32 : 40, borderRadius: 4, border: '1px solid rgba(100,116,139,0.25)',
              background: 'rgba(13,17,23,0.8)', color: '#8bceff', fontSize: isMob ? 14 : 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}
          >
            {d === 'left' ? '←' : '→'}
          </motion.button>
        ))}
      </div>

      {/* Dot indicators */}
      <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
        {visible.map((p, i) => (
          <button
            key={p.id}
            onClick={() => goTo(i, i > activeIdx ? 'right' : 'left')}
            style={{
              width: i === activeIdx ? 22 : 6, height: 6, borderRadius: 3, border: 'none', cursor: 'pointer',
              background: i === activeIdx ? '#7dd3fc' : 'rgba(169,137,134,0.35)',
              transition: 'width 250ms, background 200ms',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Description strip below hex */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active?.id + dir}
          initial={{ opacity: 0, y: dir === 'right' ? 12 : -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{
            position: 'absolute', bottom: 42, left: 0, right: 0,
            textAlign: 'center', pointerEvents: 'none',
          }}
        >
          <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6, marginBottom: 0 }}>{active?.desc}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── App ────────────────────────────────────────────── */
function App() {
  const windowWidth = useWindowWidth();
  const isMobile    = windowWidth < 640;
  const expandedW   = isMobile
    ? Math.max(windowWidth - 40, 260)
    : Math.min(Math.max(500, windowWidth * 0.6), 820);

  const [activeId, setActiveId]         = useState(PROJECTS[0].id);
  const [activeFilter, setActiveFilter] = useState('all');
  const [layout, setLayout]             = useState<Layout>('slices');
  const swipeStartX = useRef<number | null>(null);

  const visible = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.categories.includes(activeFilter));

  const activeIndex = visible.findIndex(p => p.id === activeId);
  const collapsedW = isMobile ? 56 : COLLAPSED_W;
  const trackOffset = windowWidth / 2 - (activeIndex * (collapsedW - (SKEW - 2)) + expandedW / 2);

  // Fix active when filter hides it
  useEffect(() => {
    const vis = activeFilter === 'all' ? PROJECTS : PROJECTS.filter(p => p.categories.includes(activeFilter));
    if (!vis.find(p => p.id === activeId) && vis.length > 0) setActiveId(vis[0].id);
  }, [activeFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard navigation — infinite looping for all non-hex layouts
  // (hex manages its own keyboard handler internally)
  useEffect(() => {
    if (layout === 'hex') return; // hex handles its own keys
    const handler = (e: KeyboardEvent) => {
      const vis = activeFilter === 'all' ? PROJECTS : PROJECTS.filter(p => p.categories.includes(activeFilter));
      const n   = vis.length;
      const idx = vis.findIndex(p => p.id === activeId);
      if (e.key === 'ArrowRight') { e.preventDefault(); setActiveId(vis[(idx + 1) % n].id); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); setActiveId(vis[(idx - 1 + n) % n].id); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeId, activeFilter, layout]);

  const shell: React.CSSProperties = {
    display: 'flex', flexDirection: 'column', height: '100vh',
    background: '#0d1117', color: '#e2e8f0',
    fontFamily: 'Roboto Condensed, sans-serif', userSelect: 'none', overflow: 'hidden',
  };

  /* ─── render ─── */

  return (
    <div style={shell}>

      {/* ── HEADER ── */}
      <header style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        padding: isMobile ? '10px 16px 8px' : '18px 36px 12px', borderBottom: '1px solid rgba(100,116,139,0.12)', flexShrink: 0,
      }}>
        <div>
          <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: 26, fontWeight: 300, letterSpacing: 0.4, lineHeight: 1, color: '#e2e8f0' }}>
            <span style={{ color: '#7dd3fc', fontWeight: 700 }}>Vokerr</span>
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#8bceff', marginTop: 5 }}>
            Developer &amp; Creator
          </div>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <HeaderLink href="https://github.com/MrVokerr" label="GitHub" />
          <CogMenu layout={layout} setLayout={setLayout} />
        </nav>
      </header>

      {/* ── FILTER BAR ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '8px 12px' : '10px 36px', flexShrink: 0,
        overflowX: 'auto', scrollbarWidth: 'none' as const,
      }}>
        {FILTERS.map(f => (
          <FilterBtn key={f.id} label={f.label} isActive={activeFilter === f.id} onClick={() => setActiveFilter(f.id)} />
        ))}
        <div style={{ flexShrink: 0, width: 1, height: 16, background: 'rgba(100,116,139,0.2)', margin: '0 10px 0 15px' }} />
        <span style={{ fontSize: 9, letterSpacing: '1px', color: 'rgba(100,116,139,0.45)', fontWeight: 700, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          ← → to navigate
        </span>
      </nav>

      {/* ── MAIN CONTENT — switches by layout ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={layout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        >
          {layout === 'slices' && (
            <main style={{ flex: 1, overflow: 'hidden', padding: '14px 0 18px', display: 'flex', flexDirection: 'column' }}>
              <div style={{
                flex: 1, overflow: 'hidden', position: 'relative',
                WebkitMaskImage: `linear-gradient(to right, transparent 0px, black ${isMobile ? 16 : 90}px, black calc(100% - ${isMobile ? 16 : 90}px), transparent 100%)`,
                maskImage: `linear-gradient(to right, transparent 0px, black ${isMobile ? 16 : 90}px, black calc(100% - ${isMobile ? 16 : 90}px), transparent 100%)`,
              }}>
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
                  onTouchStart={(e) => { swipeStartX.current = e.touches[0].clientX; }}
                  onTouchEnd={(e) => {
                    if (swipeStartX.current === null) return;
                    const dx = e.changedTouches[0].clientX - swipeStartX.current;
                    swipeStartX.current = null;
                    if (Math.abs(dx) < 40) return;
                    const vis = activeFilter === 'all' ? PROJECTS : PROJECTS.filter(p => p.categories.includes(activeFilter));
                    const n = vis.length;
                    const idx = vis.findIndex(p => p.id === activeId);
                    if (dx < 0) setActiveId(vis[(idx + 1) % n].id);
                    else setActiveId(vis[(idx - 1 + n) % n].id);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'stretch', height: '100%', width: 'max-content', transform: `translateX(${trackOffset}px)`, transition: `transform ${isMobile ? 150 : ANIM_MS}ms ease`, willChange: 'transform' }}>
                    {visible.map(p => (
                      <Slice key={p.id} project={p} isActive={p.id === activeId} expandedW={expandedW} onSelect={() => setActiveId(p.id)} />
                    ))}
                  </div>
                </div>
              </div>
            </main>
          )}
          {layout === 'spotlight' && <SpotlightLayout visible={visible} activeId={activeId} setActiveId={setActiveId} />
          }
          {layout === 'hex'       && <HexLayout       visible={visible} activeId={activeId} setActiveId={setActiveId} />}
        </motion.div>
      </AnimatePresence>

      {/* ── FOOTER ── */}
      <footer style={{
        flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: 10, padding: '8px 0 12px', borderTop: '1px solid rgba(100,116,139,0.08)',
      }}>
        <span style={{ fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(100,116,139,0.4)', fontWeight: 700 }}>Discord</span>
        <code style={{ fontSize: 12, color: '#7dd3fc', background: 'rgba(15,23,35,0.6)', border: '1px solid rgba(100,116,139,0.15)', padding: '2px 10px', borderRadius: 3, fontFamily: 'Roboto Mono, monospace' }}>vokerr</code>
      </footer>

    </div>
  );
}

export default App;
