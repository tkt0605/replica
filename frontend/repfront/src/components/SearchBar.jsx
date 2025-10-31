export default function SearchBar() {
  return (
    <div className="flex justify-center mt-28 mb-12">
      <input
        type="text"
        placeholder="Search apps, creators, collections..."
        className="w-2/3 max-w-xl px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
      />
    </div>
  );
}
