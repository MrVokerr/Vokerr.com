export type Category = 'game' | 'tool' | 'mtg';

export interface Project {
  id: string;
  title: string;
  badge: string;
  categories: Category[];
  tags: string[];
  desc: string;
  longDesc: string;
  tech: string[];
  github: string | null;
  demo: string | null;
  accent: string;
  /** Base path of the preview, served as `${preview}-800.webp` and `${preview}-lg.webp`. */
  preview: string;
  /** Intrinsic size of the `-lg` file, used for srcset and to reserve space. */
  previewSize: [number, number];
  previewVideo?: string;
  previewPoster?: string;
  previewObjectPosition?: string;
}

export const PROJECTS: Project[] = [
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
    accent: '#7dd3fc',
    preview: '/previews/github',
    previewSize: [1285, 626],
    previewObjectPosition: 'left top',
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
    accent: '#e3b341',
    preview: '/previews/mtg-keywords',
    previewSize: [1461, 1195],
    previewVideo: '/previews/mtg-keywords.mp4',
    previewPoster: '/previews/mtg-keywords-poster.webp',
    previewObjectPosition: '8% top',
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
    accent: '#60a5fa',
    preview: '/previews/commander-quest',
    previewSize: [1600, 804],
    previewObjectPosition: '50% 30%',
  },
  {
    id: 'ms-v83-sim',
    title: 'MapleStory Sim',
    badge: 'MS',
    categories: ['tool', 'game'],
    tags: ['MapleStory', 'v83', 'Simulator', 'Scrolling'],
    desc: 'A pre-Big Bang MapleStory v83 scrolling simulator with paperdoll, live DPS, and a boss matrix.',
    longDesc: 'A scrolling sandbox meets combat calculator. Enchant gear at 1:1 pre-Big Bang rates, dress the paperdoll, then check live DPS against the boss matrix. Built for v83 players who want to know if a scroll path actually clears before they spend the mesos.',
    tech: ['Vanilla JS', 'HTML/CSS', 'Cloudflare Workers'],
    github: null,
    demo: 'https://ms-v83-sim.vkrlabs.workers.dev/',
    accent: '#fb923c',
    preview: '/previews/ms-v83-sim',
    previewSize: [1600, 804],
    previewObjectPosition: '18% top',
  },
  {
    id: 'infinity-v',
    title: 'InfinityV',
    badge: 'GAME',
    categories: ['game'],
    tags: ['Incremental', 'RPG', 'Roguelite', 'Browser Game'],
    desc: 'A browser-based incremental RPG where you fight through scaling dungeons, die, and grow stronger each run.',
    longDesc: 'InfinityV is an incremental roguelite RPG built for the browser. Descend into procedurally scaling dungeons, battle increasingly dangerous enemies, and die, but every death makes you permanently stronger. Unlock new abilities, gear, and passive upgrades across runs until nothing can stop you.',
    tech: ['React 19', 'TypeScript', 'Vite', 'Vercel'],
    github: null,
    demo: 'https://infinity-v.vercel.app',
    accent: '#c084fc',
    preview: '/previews/infinity-v',
    previewSize: [1600, 804],
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
    accent: '#2dd4bf',
    preview: '/previews/archeage-fishing',
    previewSize: [1600, 804],
    previewObjectPosition: '50% 50%',
  },
  {
    id: 'mineral-z',
    title: 'Mineral-Z',
    badge: 'GAME',
    categories: ['game'],
    tags: ['Tower Defense', 'Strategy', 'Browser Game'],
    desc: 'A fast-paced tower defense strategy game. Place defenses, survive waves, and mine minerals.',
    longDesc: 'Build and upgrade towers to hold off increasingly relentless waves of enemies while mining the mineral deposits at the heart of your base. Tight resource management and build-order decisions make every run feel fresh.',
    tech: ['JavaScript', 'Canvas API', 'Vercel'],
    github: null,
    demo: 'https://vokerr-mineral-z.vercel.app/',
    accent: '#f87171',
    preview: '/previews/mineral-z',
    previewSize: [1600, 804],
    previewObjectPosition: '50% 50%',
  },
];

export const FILTERS: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'game', label: 'Games' },
  { id: 'tool', label: 'Tools' },
  { id: 'mtg', label: 'MTG' },
];

export function projectUrl(p: Project): string | null {
  return p.demo ?? p.github;
}
