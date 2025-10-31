import { motion } from "framer-motion";

export default function AppCard({ title, category, image }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg flex flex-col items-center hover:bg-white/10 transition"
    >
      <img src={image} alt={title} className="w-20 h-20 rounded-2xl mb-3" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{category}</p>
    </motion.div>
  );
}
