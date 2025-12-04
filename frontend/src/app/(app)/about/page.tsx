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
          className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.45)]"
        >
          Replica について
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg text-slate-300 leading-relaxed"
        >
          Replica は、自分のデジタル世界を再定義するための
          <span className="text-cyan-300"> 新世代のi/o</span> です。
          AI、3D、そしてクラウド技術を融合させ、
          自分が自分自身の「デジタル人格」と「デジタル資産」を自由に扱える未来を目指しています。
        </motion.p>
      </section>

      {/* --- VISION --- */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <h2 className="text-3xl font-bold mb-6">大きなビジョン</h2>

        <div className="grid md:grid-cols-2 gap-10">
          <p className="text-slate-300 leading-relaxed">
            Replica は単なるアプリではなく、
            <span className="text-white font-semibold">個人のデジタルレイヤー</span>を構築するプロジェクトです。
            すべてのユーザーが自分だけの Persona を持ち、
            アプリ・サービス・AIアシスタント・デバイスに跨って連携できる世界をつくります。
          </p>

          <p className="text-slate-300 leading-relaxed">
            あなたのアイデンティティ、記録、制作物、アプリ。
            それらが１つの「Replica OS」に集約され、
            自分だけの世界観を拡張していけるプラットフォームへと進化します。
          </p>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <h2 className="text-3xl font-bold mb-10">理念</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "自己を中心に置く",
              text: "すべてのサービスの中心に “自分” が存在する。Persona を軸とした体験設計。",
            },
            {
              title: "自分の制作物を世界に広げる",
              text: "自分の制作物・アプリ・アイデアが世界に広がるように設計された Studio と OS。",
            },
            {
              title: "AI × UXを最適化",
              text: "I.R.I.S. をはじめとする AI との深い統合により、人間中心の体験へ最適化。",
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

      {/* --- ECOSYSTEM --- */}
      {/* <section className="max-w-5xl mx-auto px-6 py-28">
        <h2 className="text-3xl font-bold mb-10">Replicaサービス一覧</h2>

        <ul className="space-y-6 text-slate-300">
          <li>
            <span className="text-white font-semibold">Replica Persona — </span>
            デジタルID & 3Dアバターを管理し、アプリ全体に統合される Identity Layer。
          </li>
          <li>
            <span className="text-white font-semibold">Replica Studio — </span>
            アプリ・制作物・作品を公開し、世界に発信するクリエイター空間。
          </li>
          <li>
            <span className="text-white font-semibold">I.R.I.S. — </span>
            AI アシスタント × ダイアログOS。あなたの生活・制作・研究を支援。
          </li>
          <li>
            <span className="text-white font-semibold">Replica Store — </span>
            アプリ・サービス・AIモデルの公開プラットフォーム。
          </li>
        </ul>
      </section> */}

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
          — tkt0605（製作者 / クリエイター）
        </p>
      </section>

      {/* --- ROADMAP --- */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <h2 className="text-3xl font-bold mb-8">Roadmap</h2>

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
        <h2 className="text-3xl font-bold mb-6">Contact</h2>
        <p className="text-slate-300">
        ご質問やアイデアがあれば気軽にどうぞ。
        みなさんの声が Replica を育てます。
        </p>
        <a
          href="mailto:takato.komada2005@outlook.jp"
          className="inline-block mt-4 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition"
        >
          Contact Us
        </a>
      </section>

      <footer className="text-center py-10 text-slate-500 text-sm">
        © 2025 Replica. All rights reserved.
      </footer>
    </main>
  );
}
