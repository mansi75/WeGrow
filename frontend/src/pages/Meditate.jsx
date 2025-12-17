import { useState, useRef, useEffect } from "react";
import { recordActivity } from "../api.jsx";

const FILTERS = [
  { key: "all", label: "All", icon: "✨" },
  { key: "stress", label: "Stress Relief", icon: "🧘‍♀️" },
  { key: "sleep", label: "Sleep", icon: "🌙" },
  { key: "anxiety", label: "Anxiety", icon: "🌀" },
  { key: "energy", label: "Energy", icon: "⚡️" },
];

const SESSIONS = [
  {
    id: 1,
    title: "Morning Calm",
    description:
      "Start your day with peace and positivity. A gentle meditation to center yourself.",
    duration: "5 min",
    category: "stress",
    badge: "Stress Relief",
    topGradient: "from-orange-400 to-yellow-300",
    icon: "🌅",
    audio: "/audio/meditation-relaxing-music-background-320405 copy.mp3",
  },
  {
    id: 2,
    title: "Stress Release",
    description: "Let go of tension. Melt away the pressures of your day.",
    duration: "8 min",
    category: "stress",
    badge: "Stress Relief",
    topGradient: "from-cyan-400 to-sky-500",
    icon: "🌊",
    audio: "/audio/please-calm-my-mind-125566.mp3",
  },
  {
    id: 3,
    title: "Body Scan Relaxation",
    description:
      "Release physical tension from head to toe with progressive relaxation.",
    duration: "12 min",
    category: "stress",
    badge: "Stress Relief",
    topGradient: "from-purple-400 to-pink-400",
    icon: "✨",
    audio: "/audio/meditation-relax-sleep-music-346733.mp3",
  },
  {
    id: 4,
    title: "Deep Sleep Journey",
    description:
      "Drift into peaceful slumber with calming visualizations and body relaxation.",
    duration: "15 min",
    category: "sleep",
    badge: "Sleep",
    topGradient: "from-indigo-400 to-purple-400",
    icon: "🌜",
    audio: "/audio/sleep-meditation-background-music-437696.mp3",
  },
  {
    id: 5,
    title: "Anxiety Relief",
    description:
      "Find your calm center. Release worry and embrace tranquility.",
    duration: "10 min",
    category: "anxiety",
    badge: "Anxiety",
    topGradient: "from-sky-400 to-cyan-400",
    icon: "🦋",
    audio: "/audio/meditation-background-434654.mp3",
  },
  {
    id: 6,
    title: "Quick Energy Boost",
    description:
      "Recharge your mind and body with a short, uplifting practice.",
    duration: "3 min",
    category: "energy",
    badge: "Energy",
    topGradient: "from-orange-500 to-amber-400",
    icon: "⚡️",
    audio: "/audio/meditation-music-322801.mp3",
  },
];

export default function Meditate() {
  const [activeFilter, setActiveFilter] = useState("stress");
  const [currentId, setCurrentId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const filteredSessions =
    activeFilter === "all"
      ? SESSIONS
      : SESSIONS.filter((s) => s.category === activeFilter);

  const currentSession = SESSIONS.find((s) => s.id === currentId) || null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  // ✅ 2) call recordActivity inside playSession
  async function playSession(session) {
    if (!audioRef.current) return;

    // clicking the same card toggles pause/play
    if (currentId === session.id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      audioRef.current.src = session.audio;
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
      setCurrentId(session.id);
      setIsPlaying(true);

      // 👉 tell backend the user did a meditation session
      try {
        await recordActivity("MEDITATION"); // must match ActivityType.MEDITATION
      } catch (e) {
        console.warn("Could not record meditation activity", e);
      }
    } catch (err) {
      console.error("Could not play audio", err);
    }
  }

  function togglePlayPause() {
    if (!audioRef.current || !currentSession) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.error("Play failed", e));
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* hidden audio element */}
      <audio ref={audioRef} />

      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-semibold flex items-center gap-2">
          <span>🧘‍♀️</span>
          <span>Guided Meditation</span>
        </h1>
        <p className="text-slate-600 italic text-sm md:text-base">
          “Peace comes from within. Do not seek it without.”
        </p>
      </header>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-3">
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={
                "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition " +
                (isActive
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-200"
                  : "bg-white/80 text-slate-800 border border-slate-200 hover:bg-slate-50")
              }
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>

      {/* Meditation cards */}
      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredSessions.map((s) => (
          <MeditationCard
            key={s.id}
            session={s}
            isActive={currentId === s.id && isPlaying}
            onSelect={() => playSession(s)}
          />
        ))}
      </section>

      {/* Now playing bar */}
      {currentSession && (
        <div className="rounded-2xl bg-white/80 shadow-lg ring-1 ring-black/5 p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-lg">
              🎧
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                {currentSession.title}
              </div>
              <div className="text-xs text-slate-500">
                {currentSession.duration} • {currentSession.badge}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={togglePlayPause}
            className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1.5 text-sm font-semibold shadow-md shadow-orange-200 hover:brightness-105"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}

      {/* Tips card */}
      <section className="rounded-3xl bg-gradient-to-r from-purple-400/80 via-pink-400/80 to-orange-300/80 text-white shadow-xl ring-1 ring-black/5 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
            💡
          </div>
          <div className="text-lg font-semibold">Meditation Tips</div>
        </div>
        <div className="grid md:grid-cols-2 gap-3 text-sm md:text-base">
          <TipItem text="Find a quiet, comfortable space." />
          <TipItem text="Use headphones for better immersion." />
          <TipItem text="Practice at the same time daily." />
          <TipItem text="Start with shorter sessions." />
        </div>
      </section>
    </div>
  );
}

function MeditationCard({ session, isActive, onSelect }) {
  const { title, description, duration, badge, topGradient, icon } = session;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={
        "text-left rounded-3xl bg-white/80 shadow-lg ring-1 ring-black/5 overflow-hidden flex flex-col transition transform " +
        (isActive ? "ring-orange-400 scale-[1.02]" : "hover:translate-y-0.5")
      }
    >
      {/* Top gradient strip */}
      <div
        className={`relative h-24 bg-gradient-to-r ${topGradient} flex items-center justify-between px-4`}
      >
        <div className="w-12 h-12 rounded-2xl bg-white/30 flex items-center justify-center text-2xl">
          {icon}
        </div>
        <div className="absolute top-3 right-3 text-[11px] px-2 py-1 rounded-full bg-white/80 text-slate-800 font-semibold">
          {duration}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-5 py-4 space-y-3">
        <div>
          <h2 className="font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>

        <div className="mt-auto flex justify-between items-center">
          <span className="inline-flex items-center rounded-full border border-orange-300 text-[11px] font-semibold px-2 py-1 text-orange-600 bg-orange-50">
            {badge}
          </span>
          <span className="text-xs text-slate-500">
            {isActive ? "Now playing…" : "Tap to listen"}
          </span>
        </div>
      </div>
    </button>
  );
}

function TipItem({ text }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-[2px] text-lg">✔️</span>
      <span>{text}</span>
    </div>
  );
}
