// app/page.tsx
import { Header } from "@/components/replica/Header";
import { Sidebar } from "@/components/replica/Sidebar";
import { MainShell } from "@/components/replica/MainShell";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050510] text-slate-100">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <MainShell>
          {/* 上部：Hero / 概要 */}
          <section className="mt-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-2">
                  Home / Dashboard
                </div>
                <h1
                  className="text-3xl md:text-4xl font-extrabold
                    bg-clip-text text-transparent
                    bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500
                    drop-shadow-[0_0_24px_rgba(56,189,248,0.7)]"
                >
                  Welcome back, Takato.
                </h1>
                <p className="mt-2 text-sm text-slate-400 max-w-xl">
                  This is your Replica home. Manage your AI identity, personas,
                  and connected devices from a single, unified dashboard.
                </p>
              </div>

              <div
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3
                  text-xs text-slate-300 max-w-xs"
              >
                <div className="flex items-center justify-between">
                  <span>Replica Keypair</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                    VERIFIED
                  </span>
                </div>
                <div className="mt-1 font-mono text-[11px] text-slate-400 truncate">
                  ed25519: pk_b64_ZXhhbXBsZV9rZXk...
                </div>
              </div>
            </div>
          </section>

          {/* 中央：グリッドカード */}
          <section className="grid gap-4 md:grid-cols-3 mb-6">
            {/* AI Chat / Voice / Image - 1枚にまとめたカード */}
            <div
              className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5
                p-4 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(236,72,153,0.3),_transparent_55%)]" />
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-slate-50">
                    AI Interfaces
                  </h2>
                  <button className="text-[11px] px-2 py-0.5 rounded-full border border-white/10 hover:bg-white/10 transition">
                    Open Console
                  </button>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  Switch between chat, voice, and image generation modes for
                  your Replica.
                </p>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl bg-black/30 border border-white/5 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💬</span>
                      <div className="font-medium text-slate-100">AI Chat</div>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Text-based dialogue aligned with your persona traits.
                    </p>
                  </div>
                  <div className="rounded-xl bg-black/30 border border-white/5 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🎙️</span>
                      <div className="font-medium text-slate-100">
                        Voice Chat
                      </div>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Low-latency STT / TTS with your Replica&apos;s voice.
                    </p>
                  </div>
                  <div className="rounded-xl bg-black/30 border border-white/5 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">✨</span>
                      <div className="font-medium text-slate-100">
                        Image Generate
                      </div>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400">
                      Generate avatars & scenes consistent with your identity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 右上：Identity Score */}
            <div
              className="rounded-2xl border border-white/10 bg-white/5 p-4
                flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-sm font-semibold text-slate-50">
                    Identity Score
                  </h2>
                  <span className="text-xs text-slate-400">v0.3.1</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  How complete and consistent your Replica profile is.
                </p>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-cyan-400">
                    87
                  </span>
                  <span className="text-xs text-slate-500">/ 100</span>
                </div>
                <div className="h-2 mt-2 rounded-full bg-black/40 overflow-hidden">
                  <div className="h-full w-[87%] bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500" />
                </div>
                <div className="mt-2 text-[11px] text-slate-400">
                  + Setup device trust
                  <br />
                  + Link 1 more social proof
                </div>
              </div>
            </div>
          </section>

          {/* 下段：Persona / Activity */}
          <section className="grid gap-4 md:grid-cols-2">
            {/* Persona プレビュー */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-slate-50">
                  Active Persona
                </h2>
                <button className="text-[11px] px-2 py-0.5 rounded-full border border-white/10 hover:bg-white/10 transition">
                  Manage
                </button>
              </div>
              <div className="flex items-start gap-3 mt-2">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-500 shadow-lg flex items-center justify-center text-sm font-bold">
                  R
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">Replica // IRIS</div>
                  <div className="text-xs text-slate-400">
                    Calm, analytical, slightly playful. Tuned for engineering
                    &amp; creative work.
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-[11px] text-cyan-300">
                      Openness 0.82
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-[11px] text-purple-300">
                      Conscientious 0.74
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-[11px] text-emerald-300">
                      Agreeable 0.63
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity / Logs */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-slate-50">
                  Recent Activity
                </h2>
                <button className="text-[11px] text-slate-400 hover:text-slate-200">
                  View all
                </button>
              </div>
              <ul className="mt-2 space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400" />
                  <div>
                    <div className="text-slate-200">
                      New device trusted: <span className="font-mono">MBP-AI</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      2 minutes ago · Tokyo
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-cyan-400" />
                  <div>
                    <div className="text-slate-200">
                      Persona IRIS synced with Studio
                    </div>
                    <div className="text-[11px] text-slate-500">
                      25 minutes ago · Web
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-purple-400" />
                  <div>
                    <div className="text-slate-200">
                      Library &ldquo;Cyber Defense&rdquo; updated
                    </div>
                    <div className="text-[11px] text-slate-500">
                      1 hour ago · Studio
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </MainShell>
      </div>
    </div>
  );
}
