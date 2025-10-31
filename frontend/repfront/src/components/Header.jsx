import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Library", path: "/library" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)] hover:scale-105 transition-transform duration-200"
        >
          Replica
        </Link>

        {/* Navigation */}
        <nav className="flex space-x-8 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative group ${
                location.pathname === item.path
                  ? "text-cyan-400"
                  : "text-gray-300"
              } hover:text-cyan-400 transition`}
            >
              {item.name}
              {/* ホバー下線アニメーション */}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-cyan-400 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
