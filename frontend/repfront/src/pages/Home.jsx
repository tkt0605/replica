import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import AppCard from "../components/AppCard";

const apps = [
  { title: "DreamLens", category: "AI Camera", image: "/assets/app1.png" },
  { title: "CodeFlow", category: "Dev Tools", image: "/assets/app2.png" },
  { title: "MindWave", category: "Wellness", image: "/assets/app3.png" },
  { title: "PixelNest", category: "Art & Design", image: "/assets/app4.png" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <Header />
      <main className="pt-24">
        <SearchBar />
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8 pb-16">
          {apps.map((app, index) => (
            <AppCard key={index} {...app} />
          ))}
        </section>
      </main>
    </div>
  );
}
