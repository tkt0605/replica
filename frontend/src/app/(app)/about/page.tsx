"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050510] text-white">
      {/* --- HERO --- */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent 
               bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 
               drop-shadow-[0_0_20px_rgba(56,189,248,0.45)]"
        >
          Replica について
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg text-slate-300 leading-relaxed"
        >
          Replica は、あなたのデジタル生活をもっと自由にするための
          <span className="text-cyan-300"> 新しい入り口</span> です。
          AI やクラウド技術を組み合わせて、
          自分の情報や作品を “自分らしく” 扱える未来をつくっています。
        </motion.p>
      </section>


      {/* --- VISION --- */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <h2 className="text-3xl font-bold mb-6">大きなビジョン</h2>

        <div className="grid md:grid-cols-2 gap-10">
          <p className="text-slate-300 leading-relaxed">
            Replica は、ただのサイトじゃありません。
            自分のデジタルな人生をまとめて扱える
            <span className="text-white font-semibold">“自分専用のレイヤー”</span>
            をつくるプロジェクトです。
            それぞれが自分の Persona を持ち、
            アプリ・サービス・AI・デバイスまで自然につながる世界を目指しています。
          </p>

          <p className="text-slate-300 leading-relaxed">
            自分自身の情報、思い出、作品、アプリ。
            そういったすべてが「Replica」にひとつにまとまり、
            自分の世界観をそのまま広げていける場所へ進化していきます。
          </p>
        </div>
      </section>


      {/* --- CORE VALUES --- */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <h2 className="text-3xl font-bold mb-10">理念</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "自分を軸に生きる",
              text: "周りに合わせるんじゃなくて、自分らしさをそのまま使える場所にする。",
            },
            {
              title: "作ったものをちゃんと届ける",
              text: "アイデアも作品も、埋もれさせない。作ったら、ちゃんと届くように。",
            },
            {
              title: "AIと一緒にアップデートする",
              text: "AIをツールじゃなく“相棒”に。自然と毎日が少しラクになる体験をつくる。",
            },


          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* --- FOUNDER NOTE --- */}
      <section className="max-w-4xl mx-auto px-6 py-28">
        <h2 className="text-3xl font-bold mb-6">最後に</h2>
        <p className="text-slate-300 leading-relaxed text-lg">
          Replica は、{" "}
          <span className="text-white font-semibold">
            「もっと自由に、自分の世界を作りたい」
          </span>{" "}
          という気持ちから始まりました。
          技術も、デザインも、AI もすべて、
          自分自身の人生を広げるための “道具” として使いたい。
          そんな思いで、このプロジェクトをつくっています。
        </p>

        <p className="mt-4 text-slate-400 italic">
          — tkt0605（製作者）
        </p>
      </section>

      {/* --- ROADMAP --- */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <h2 className="text-3xl font-bold mb-8">ここからのロードマップ</h2>

        <ol className="space-y-6 text-slate-300 border-l border-white/10 pl-6">
          <li>
            <span className="text-cyan-300 font-semibold">Phase 1：</span>{" "}
            Replica Studio・作品投稿・アプリ公開の機能
          </li>
          <li>
            <span className="text-cyan-300 font-semibold">Phase 2：</span>{" "}
            Persona(アカウント/人格)の完成
          </li>
          <li>
            <span className="text-cyan-300 font-semibold">Phase 3：</span>{" "}
            I.R.I.S.（音声AI / 会話AI / LLM）統合
          </li>
          <li>
            <span className="text-cyan-300 font-semibold">Phase 4：</span>{" "}
            次のOS（アプリ、AI、データの統合レイヤー）
          </li>
        </ol>
      </section>

      {/* --- CONTACT --- */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-6">フィードバック</h2>
        <p className="text-slate-300">
          ご質問やアイデアがあれば気軽にどうぞ。
          みなさんの声が Replica を育てます。
        </p>
        <a
          href="mailto:takato.komada2005@outlook.jp"
          className="inline-block mt-4 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition"
        >
          メールを送る。
        </a>
      </section>

      <footer className="text-center py-10 text-slate-500 text-sm">
        © 2025 Replica. All rights reserved.
      </footer>
    </main>
  );
}
