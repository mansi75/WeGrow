import { useEffect, useState } from "react";
import { recordActivity } from "../api.jsx";

const MODES = {
  calm: {
    name: "Calm Breathing",
    description: "Simple and effective for everyday stress.",
    pattern: [
      { phase: "Breathe In", seconds: 4, cue: "Inhale gently through your nose" },
      { phase: "Breathe Out", seconds: 4, cue: "Exhale slowly through your mouth" },
    ],
  },
  box: {
    name: "Box Breathing",
    description: "Used by Navy SEALs to stay calm and focused.",
    pattern: [
      { phase: "Breathe In", seconds: 4, cue: "Inhale deeply" },
      { phase: "Hold", seconds: 4, cue: "Hold your breath" },
      { phase: "Breathe Out", seconds: 4, cue: "Exhale slowly" },
      { phase: "Hold", seconds: 4, cue: "Pause before the next inhale" },
    ],
  },
  fourSevenEight: {
    name: "4–7–8 Breathing",
    description: "Calms the nervous system and promotes relaxation.",
    pattern: [
      { phase: "Breathe In", seconds: 4, cue: "Inhale quietly through your nose" },
      { phase: "Hold", seconds: 7, cue: "Hold your breath" },
      { phase: "Breathe Out", seconds: 8, cue: "Exhale completely through your mouth" },
    ],
  },
};

export default function Breathing() {
  const [mode, setMode] = useState("calm");
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MODES.calm.pattern[0].seconds);
  const [cycleCount, setCycleCount] = useState(0);

  const currentMode = MODES[mode];
  const phases = currentMode.pattern;
  const currentPhase = phases[phaseIndex];

  useEffect(() => {
    setTimeLeft(currentPhase.seconds);
  }, [mode, phaseIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;
        setPhaseIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % phases.length;
          if (nextIndex === 0) {
            setCycleCount((c) => c + 1);
          }
          return nextIndex;
        });

        return prev;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, phases.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // ✅ 2) make this async and record BREATHING activity
  async function handleStart() {
    setCycleCount(0);
    setPhaseIndex(0);
    setTimeLeft(phases[0].seconds);
    setIsRunning(true);
    try {
      // must match ActivityType.BREATHING in the backend
      await recordActivity("BREATHING");
    } catch (e) {
      console.warn("Could not record breathing activity", e);
    }
  }

  function handleReset() {
    setIsRunning(false);
    setCycleCount(0);
    setPhaseIndex(0);
    setTimeLeft(phases[0].seconds);
  }

  function selectMode(next) {
    setMode(next);
    setIsRunning(false);
    setCycleCount(0);
    setPhaseIndex(0);
    setTimeLeft(MODES[next].pattern[0].seconds);
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top breathing card */}
      <section className="rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl ring-1 ring-black/5 overflow-hidden">
        {/* Header bar with gradient */}
        <div className="px-6 py-4 bg-gradient-to-r from-orange-400/90 via-orange-300/80 to-yellow-300/80 text-slate-900 flex items-center gap-3">
          <span className="text-2xl">🌬️</span>
          <div>
            <div className="font-semibold">Breathing Exercises</div>
            <div className="text-xs md:text-sm italic text-slate-800">
              "Breathe in peace, breathe out stress."
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6 items-center">
          {/* Left: title + description */}
          <div className="md:col-span-1 space-y-2 text-center md:text-left">
            <div className="text-2xl flex items-center justify-center md:justify-start gap-2">
              <span>☁️</span>
              <span className="font-semibold">{currentMode.name}</span>
            </div>
            <p className="text-slate-500 text-sm">
              {currentMode.description}
            </p>
          </div>

          {/* Middle: timer circle */}
          <div className="md:col-span-1 flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-orange-400 via-pink-400 to-red-400 shadow-2xl flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-xs uppercase tracking-wide opacity-90">
                  {currentPhase.phase}
                </div>
                <div className="text-5xl md:text-6xl font-semibold mt-1">
                  {timeLeft}
                </div>
              </div>
            </div>
          </div>

          {/* Right: instructions + controls */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start gap-3">
            <p className="text-slate-700 text-sm md:text-base text-center md:text-left">
              {currentPhase.cue}
            </p>
            <div className="text-xs text-slate-500">
              Cycle: <span className="font-semibold">{cycleCount}</span>
            </div>

            <div className="flex gap-3 mt-2">
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-orange-500 to-orange-600 text-white px-5 py-2 text-sm font-semibold shadow-lg shadow-orange-200 hover:brightness-105"
              >
                ▶️ Start
              </button>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-full border border-orange-300 bg-white px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50"
              >
                ↻ Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mode cards + Panic help */}
      <section className="space-y-6">
        {/* Mode choice cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <ModeCard
            icon="🌙"
            title="4–7–8 Breathing"
            text="Calms the nervous system and promotes relaxation."
            active={mode === "fourSevenEight"}
            onClick={() => selectMode("fourSevenEight")}
          />
          <ModeCard
            icon="📦"
            title="Box Breathing"
            text="Used by Navy SEALs to stay calm and focused."
            active={mode === "box"}
            onClick={() => selectMode("box")}
          />
          <ModeCard
            icon="☁️"
            title="Calm Breathing"
            text="Simple and effective for everyday stress."
            active={mode === "calm"}
            onClick={() => selectMode("calm")}
          />
        </div>

        {/* Panic attack help section */}
        <div className="rounded-3xl bg-orange-50/70 ring-1 ring-orange-100 p-6 md:p-8 space-y-5">
          <div className="flex items-center gap-2 text-lg font-semibold text-rose-600">
            <span>❤️</span>
            <span>Panic Attack Help</span>
          </div>
          <p className="text-slate-700 text-sm md:text-base">
            Feeling overwhelmed? Try these quick techniques to calm your nervous system.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <HelpCard
              icon="✨"
              title="5–4–3–2–1 Grounding"
              items={[
                "Name 5 things you can see",
                "Name 4 things you can touch",
                "Name 3 things you can hear",
                "Name 2 things you can smell",
                "Name 1 thing you can taste",
              ]}
            />
            <HelpCard
              icon="💧"
              title="Cold Water Splash"
              items={[
                "Splash cold water on your face",
                "Hold a cold compress to your neck",
                "Run cold water over your wrists",
              ]}
            />
            <HelpCard
              icon="👣"
              title="Barefoot Grounding"
              items={[
                "Stand barefoot on the floor or ground",
                "Notice the contact under your feet",
                "Slowly shift your weight left and right",
              ]}
            />
            <HelpCard
              icon="🤍"
              title="Self-Compassion Reminder"
              items={[
                "Place your hand on your heart",
                "Say: “This is hard, but I am safe right now.”",
                "Take 3 slow, deep breaths",
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ModeCard({ icon, title, text, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "text-left rounded-3xl px-5 py-4 shadow-md transition border " +
        (active
          ? "bg-gradient-to-b from-yellow-200 to-orange-100 border-orange-300"
          : "bg-white/80 border-transparent hover:border-orange-200")
      }
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-semibold text-slate-800">{title}</div>
      <div className="text-sm text-slate-600 mt-1">{text}</div>
    </button>
  );
}

function HelpCard({ icon, title, items }) {
  return (
    <div className="rounded-2xl bg-white/80 p-4 shadow-sm border border-orange-100">
      <div className="flex items-center gap-2 mb-2">
        <span>{icon}</span>
        <span className="font-semibold text-slate-800">{title}</span>
      </div>
      <ul className="text-sm text-slate-700 list-disc ml-5 space-y-1">
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
