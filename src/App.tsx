import { Github, Gamepad2, ScrollText, ExternalLink } from 'lucide-react';

function App() {
  const links = [
    {
      title: "GitHub",
      description: "My open source contributions and projects",
      icon: <Github className="w-6 h-6" />,
      url: "https://github.com/MrVokerr",
      color: "hover:border-purple-500 hover:text-purple-400"
    },
    {
      title: "MTG Commander Quiz",
      description: "Test your Magic: The Gathering Commander knowledge",
      icon: <ScrollText className="w-6 h-6" />,
      url: "https://creative-cuchufli-04d46d.netlify.app/",
      color: "hover:border-blue-500 hover:text-blue-400"
    },
    {
      title: "ArcheAge Fishing",
      description: "A fishing game inspired by the mechanics of ArcheAge",
      icon: <Gamepad2 className="w-6 h-6" />,
      url: "https://vfishinggame.vercel.app/",
      color: "hover:border-green-500 hover:text-green-400"
    },
    {
      title: "Mineral-Z",
      description: "A fast-paced tower defense strategy game",
      icon: <Gamepad2 className="w-6 h-6" />,
      url: "https://vokerr-mineral-z.vercel.app/",
      color: "hover:border-red-500 hover:text-red-400"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-200 selection:bg-neutral-800">
      <div className="max-w-3xl mx-auto px-6 py-20 flex flex-col gap-12">
        
        {/* Header */}
        <header className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent">
              Vokerr
            </h1>
            <a 
              href="https://github.com/MrVokerr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 hover:border-neutral-700 transition-all text-neutral-400 hover:text-white"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
          <p className="text-xl text-neutral-400 max-w-lg">
            Developer, gamer, and creator. Welcome to my digital hub.
          </p>
        </header>

        {/* Links Grid */}
        <div className="grid gap-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group flex items-center gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 
                transition-all duration-300 hover:bg-neutral-900 ${link.color} hover:translate-x-1
              `}
            >
              <div className="p-3 rounded-lg bg-neutral-800 text-neutral-300 group-hover:bg-neutral-800/80 transition-colors">
                {link.icon}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{link.title}</h2>
                <p className="text-sm text-neutral-400">{link.description}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-neutral-600 group-hover:text-neutral-400 transition-colors opacity-0 group-hover:opacity-100" />
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-neutral-900 text-center text-sm text-neutral-600">
          <p>© {new Date().getFullYear()} Vokerr. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
