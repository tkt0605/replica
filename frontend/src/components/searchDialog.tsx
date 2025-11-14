// src/components/SearchDialog.tsx
import React from "react";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#0a0a0f] p-6 rounded-2xl shadow-xl w-80 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-3">検索</h2>

        <input
          type="text"
          placeholder="キーワードを入力"
          className="w-full px-3 py-2 rounded bg-white/10 text-white outline-none"
        />

        <button
          className="mt-4 w-full py-2 bg-cyan-500 rounded-lg hover:bg-cyan-600 transition"
          onClick={onClose}
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default SearchDialog;
