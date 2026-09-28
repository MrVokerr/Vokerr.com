import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { FILTERS, PROJECTS, projectUrl, type Category, type Project } from './projects';

/* ─── hooks ─────────────────────────────────────────── */
function useMedia(query: string) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const h = () => setMatch(mq.matches);
    h();
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, [query]);
  return match;
}

/** Adds `is-in` to an element the first time it scrolls into view. One shared observer. */
let revealObserver: IntersectionObserver | null = null;
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('is-in'); return; }
    revealObserver ??= new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        revealObserver?.unobserve(e.target);
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    revealObserver.observe(el);
    return () => revealObserver?.unobserve(el);
  }, []);
  return ref;
}

const accentStyle = (p: Project) => ({ '--accent': p.accent }) as CSSProperties;

/* ─── Preview media ─────────────────────────────────── */
function Preview({ p, eager, sizes }: { p: Project; eager?: boolean; sizes: string }) {
  const reduceMotion = useMedia('(prefers-reduced-motion: reduce)');
  const videoRef = useRef<HTMLVideoElement>(null);
  const style = { objectPosition: p.previewObjectPosition } as CSSProperties;

  if (!p.preview || !p.previewSize) {
    return (
      <div className="media placeholder" role="img" aria-label={p.title}>
        <span>{p.title}</span>
      </div>
    );
  }
  const [w, h] = p.previewSize;

  if (p.previewVideo && !reduceMotion) {
    return (
      <video
        ref={videoRef}
        className="media"
        src={p.previewVideo}
        poster={p.previewPoster}
        width={1280}
        height={720}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${p.title} in action`}
        style={style}
        onLoadedMetadata={() => { if (videoRef.current) videoRef.current.playbackRate = 0.6; }}
        onTimeUpdate={() => {
          const v = videoRef.current;
          if (v?.duration && v.currentTime >= v.duration - 3) v.currentTime = 0;
        }}
      />
    );
  }
  return (
    <img
      className="media"
      src={`${p.preview}-800.webp`}
      srcSet={`${p.preview}-800.webp 800w, ${p.preview}-lg.webp ${w}w`}
      sizes={sizes}
      width={w}
      height={h}
      alt={`Screenshot of ${p.title}`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={style}
    />
  );
}

/* ─── Small pieces ──────────────────────────────────── */
function Tags({ p }: { p: Project }) {
  return (
    <ul className="tags" aria-label="Tags">
      {p.tags.map(t => <li key={t}>{t}</li>)}
    </ul>
  );
}

function Tech({ p }: { p: Project }) {
  return (
    <ul className="tech" aria-label="Tech stack">
      {p.tech.map(t => <li key={t}>{t}</li>)}
    </ul>
  );
}

function Actions({ p }: { p: Project }) {
  return (
    <div className="actions">
      {p.demo && <a className="btn btn-primary" href={p.demo} target="_blank" rel="noopener noreferrer">Visit site <span aria-hidden>↗</span></a>}
      {p.github && <a className={p.demo ? 'btn' : 'btn btn-primary'} href={p.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden>↗</span></a>}
    </div>
  );
}

function DiscordCopy() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText('vokerr');
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard blocked; the handle is still visible */ }
  };
  return (
    <button type="button" className="discord" onClick={copy} aria-label="Copy Discord username vokerr">
      <span className="discord-label">Discord</span>
      <code>vokerr</code>
      <span className="discord-hint" aria-live="polite">{copied ? 'copied' : 'copy'}</span>
    </button>
  );
}

/* ─── Hero ──────────────────────────────────────────── */
function Hero() {
  return (
    <header className="hero">
      <div className="topbar">
        <span className="role">Developer &amp; Creator</span>
        <nav className="topnav" aria-label="Elsewhere">
          <a className="navlink" href="https://github.com/MrVokerr" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden>↗</span></a>
          <DiscordCopy />
        </nav>
      </div>
      <h1 className="wordmark">
        <span className="wm wm-top">Vokerr</span>
        <span className="wm wm-bottom" aria-hidden>Vokerr</span>
        <svg className="wm-cut" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <line x1="-2" y1="63" x2="102" y2="41" vectorEffect="non-scaling-stroke" />
        </svg>
      </h1>
      <p className="lede">
        <strong>Hyperfixation at its finest.</strong>{' '}
        Games and tools, each one built because I could not stop thinking about it.
      </p>
    </header>
  );
}

/* ─── Filters ───────────────────────────────────────── */
function Filters({ value, onChange }: { value: 'all' | Category; onChange: (v: 'all' | Category) => void }) {
  return (
    <div className="filters" role="group" aria-label="Filter projects">
      {FILTERS.map(f => {
        const count = f.id === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.categories.includes(f.id as Category)).length;
        return (
          <button key={f.id} type="button" className="chip" aria-pressed={value === f.id} onClick={() => onChange(f.id)}>
            <span>{f.label}</span><sup>{count}</sup>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Desktop: index + stage ────────────────────────── */
function IndexList({ visible, active, setActive }: {
  visible: Project[]; active: Project; setActive: (id: string) => void;
}) {
  const listRef = useRef<HTMLOListElement>(null);

  // ↑/↓ (and ←/→) walk the list. Focus follows when it is already inside the list.
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const fwd = e.key === 'ArrowDown' || e.key === 'ArrowRight';
      const back = e.key === 'ArrowUp' || e.key === 'ArrowLeft';
      if (!fwd && !back) return;
      if (e.target instanceof HTMLElement && e.target.closest('input, textarea, select')) return;
      e.preventDefault();
      const n = visible.length;
      const idx = visible.findIndex(p => p.id === active.id);
      const next = visible[(idx + (fwd ? 1 : -1) + n) % n];
      setActive(next.id);
      if (listRef.current?.contains(document.activeElement)) {
        listRef.current.querySelector<HTMLElement>(`[data-id="${next.id}"]`)?.focus();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [visible, active, setActive]);

  return (
    <ol className="index" ref={listRef} key={visible.map(p => p.id).join()}>
      {visible.map((p, i) => {
        const url = projectUrl(p);
        const isActive = p.id === active.id;
        return (
          <li key={p.id} style={{ ...accentStyle(p), '--i': i } as CSSProperties}>
            <a
              className="row"
              data-id={p.id}
              data-active={isActive || undefined}
              href={url ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActive(p.id)}
              onFocus={() => setActive(p.id)}
            >
              <span className="row-badge">{p.badge}</span>
              <span className="row-title">{p.title}</span>
              <span className="row-arrow" aria-hidden>↗</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

function Stage({ p }: { p: Project }) {
  const url = projectUrl(p);
  return (
    <aside className="stage" style={accentStyle(p)} aria-live="polite" aria-label={`${p.title} details`}>
      <a className="frame" href={url ?? undefined} target="_blank" rel="noopener noreferrer" tabIndex={-1} key={p.id}>
        <Preview p={p} eager sizes="(min-width: 1400px) 800px, 58vw" />
        <span className="wipe" aria-hidden />
      </a>
      <div className="stage-body" key={`${p.id}-body`}>
        <div className="stage-meta rise" style={{ '--d': 0 } as CSSProperties}>
          <span className="badge">{p.badge}</span>
          <Tags p={p} />
        </div>
        <p className="stage-desc rise" style={{ '--d': 1 } as CSSProperties}>{p.desc}</p>
        <p className="stage-long rise" style={{ '--d': 2 } as CSSProperties}>{p.longDesc}</p>
        <div className="stage-foot rise" style={{ '--d': 3 } as CSSProperties}>
          <Tech p={p} />
          <Actions p={p} />
        </div>
      </div>
    </aside>
  );
}

/* ─── Mobile / narrow: stacked cards ────────────────── */
function Card({ p, i }: { p: Project; i: number }) {
  const ref = useReveal<HTMLLIElement>();
  const url = projectUrl(p);
  return (
    <li className="card" ref={ref} style={{ ...accentStyle(p), '--i': i } as CSSProperties}>
      <a className="frame" href={url ?? undefined} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden>
        <Preview p={p} eager={i === 0} sizes="(min-width: 640px) 600px, 100vw" />
        <span className="wipe" />
        <span className="badge card-badge">{p.badge}</span>
      </a>
      <div className="card-body">
        <h3 className="card-title">
          <a href={url ?? undefined} target="_blank" rel="noopener noreferrer">{p.title}</a>
        </h3>
        <p className="card-desc">{p.desc}</p>
        <Tags p={p} />
        <details className="more">
          <summary>More about it</summary>
          <p>{p.longDesc}</p>
          <Tech p={p} />
        </details>
        <Actions p={p} />
      </div>
    </li>
  );
}

/* ─── App ───────────────────────────────────────────── */
export default function App() {
  const wide = useMedia('(min-width: 960px)');
  const [filter, setFilter] = useState<'all' | Category>('all');
  const [activeId, setActiveId] = useState(PROJECTS[0].id);

  const visible = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.categories.includes(filter));
  const active = visible.find(p => p.id === activeId) ?? visible[0];

  const changeFilter = useCallback((f: 'all' | Category) => {
    setFilter(f);
    const vis = f === 'all' ? PROJECTS : PROJECTS.filter(p => p.categories.includes(f));
    setActiveId(id => (vis.some(p => p.id === id) ? id : vis[0].id));
  }, []);

  return (
    <div className="page" style={wide ? accentStyle(active) : undefined}>
      <a className="skip" href="#work">Skip to projects</a>
      <Hero />

      <main id="work" className="work">
        <div className="work-head">
          <h2 className="work-title">Projects</h2>
          <Filters value={filter} onChange={changeFilter} />
          {wide && <span className="hint" aria-hidden>↑ ↓ to browse</span>}
        </div>

        {wide ? (
          <div className="split">
            <IndexList visible={visible} active={active} setActive={setActiveId} />
            <Stage p={active} />
          </div>
        ) : (
          <ul className="cards" key={filter}>
            {visible.map((p, i) => <Card key={p.id} p={p} i={i} />)}
          </ul>
        )}
      </main>

      <footer className="foot">
        <span className="foot-mark">Vokerr</span>
        <DiscordCopy />
        <a className="navlink" href="https://github.com/MrVokerr" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden>↗</span></a>
      </footer>
    </div>
  );
}
