import { useState, useRef, useEffect } from "react";
import { recordActivity } from "../api.jsx";

const TABS = [
  { key: "stories", label: "Sleep Stories" },
  { key: "noise", label: "White Noise" },
  { key: "music", label: "Music" },
];

// Each track now has an `audio` field
// Place matching files in: public/audio/...
const TRACKS = {
  stories: [
    {
      id: 1,
      title: "Midnight Forest Walk",
      info: "25 min · Sarah",
      audio: "/audio/midnight-forest-184304.mp3",
    },
    {
      id: 2,
      title: "Ocean Waves Journey",
      info: "30 min · James",
      audio: "/audio/ocean-wave-loops-377890.mp3",
    },
    {
      id: 3,
      title: "Mountain Meadow Dreams",
      info: "20 min · Emma",
      audio: "/audio/mountain-path-125573.mp3",
    },
    {
      id: 4,
      title: "Desert Night Stars",
      info: "35 min · Michael",
      audio: "/audio/desert-night-stars.mp3",
    },
  ],
  noise: [
    {
      id: 5,
      title: "Gentle Rain",
      info: "45 min · Nature",
      audio: "/audio/rainfall-remedy-healing-frequencies-tinnitus-healer-367360.mp3",
    },
    {
      id: 6,
      title: "Box Fan",
      info: "60 min · White Noise",
      audio: "/audio/box-fan.mp3",
    },
    {
      id: 7,
      title: "Crackling Fireplace",
      info: "40 min · Cozy",
      audio: "/audio/crackling-fireplace.mp3",
    },
  ],
  music: [
    {
      id: 8,
      title: "Soft Piano Drift",
      info: "30 min · Instrumental",
      audio: "/audio/soft-piano-drift.mp3",
    },
    {
      id: 9,
      title: "Lullaby Guitar",
      info: "25 min · Acoustic",
      audio: "/audio/lullaby-guitar.mp3",
    },
    {
      id: 10,
      title: "Ambient Starlight",
      info: "40 min · Ambient",
      audio: "/audio/ambient-starlight.mp3",
    },
  ],
};

export default function Sleep() {
  const [activeTab, setActiveTab] = useState("stories");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const currentTracks = TRACKS[activeTab];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  // Click on a track: play / pause / switch
  async function handleSelectTrack(track) {
    if (!audioRef.current) return;

    // If clicking the same track and it is playing -> pause
    if (currentTrack && currentTrack.id === track.id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    const isNewTrack = !currentTrack || currentTrack.id !== track.id;

    try {
      // If switching or resuming: set src and play
      if (isNewTrack) {
        audioRef.current.src = track.audio;
        audioRef.current.currentTime = 0;
      }

      await audioRef.current.play();
      setCurrentTrack(track);
      setIsPlaying(true);

      // ✅ 2) Only count when user starts a *new* sleep track
      if (isNewTrack) {
        try {
          await recordActivity("SLEEP"); // must match ActivityType.SLEEP
        } catch (e) {
          console.warn("Could not record sleep activity", e);
        }
      }
    } catch (err) {
      console.error("Could not play sleep track", err);
    }
  }

  function togglePlayPause() {
    if (!audioRef.current || !currentTrack) return;
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

  function handleTabChange(tabKey) {
    setActiveTab(tabKey);
    setCurrentTrack(null);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }


  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Hidden audio element */}
      <audio ref={audioRef} />

      {/* Purple/blue background inside the main area */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 opacity-95 blur-[1px]" />

      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-blue-900/90 text-white shadow-2xl ring-1 ring-white/10 p-6 md:p-8 space-y-6">
        {/* Title */}
        <div className="text-center space-y-1">
          <div className="text-sm uppercase tracking-[0.2em] text-violet-200">
            Sleep &amp; Relaxation
          </div>
        </div>

        {/* Top stats cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 flex flex-col gap-1">
            <div className="text-xs text-violet-200 flex items-center gap-2">
              <span>🕒</span>
              <span>Sleep Streak</span>
            </div>
            <div className="text-xl font-semibold">7 days</div>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4 flex flex-col gap-1">
            <div className="text-xs text-violet-200 flex items-center gap-2">
              <span>⏱️</span>
              <span>Last Night</span>
            </div>
            <div className="text-xl font-semibold">7.5 hours</div>
          </div>
        </div>

        {/* Main panel */}
        <div className="rounded-3xl bg-white/5 border border-white/10 px-4 py-5 md:px-6 md:py-6 space-y-5">
          {/* Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex bg-white/5 rounded-full p-1 gap-1">
              {TABS.map((t) => {
                const active = activeTab === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => handleTabChange(t.key)}
                    className={
                      "px-4 py-1.5 text-xs md:text-sm rounded-full font-medium transition " +
                      (active
                        ? "bg-fuchsia-500 text-white shadow-md"
                        : "text-violet-100 hover:bg-white/10")
                    }
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Track list */}
          <div className="space-y-3">
            {currentTracks.map((track) => {
              const isSelected = currentTrack?.id === track.id && isPlaying;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => handleSelectTrack(track)}
                  className={
                    "w-full flex items-center justify-between rounded-2xl px-4 py-3 md:px-5 md:py-4 bg-white/5 border transition " +
                    (isSelected
                      ? "border-fuchsia-400 bg-fuchsia-400/10"
                      : "border-white/10 hover:bg-white/10")
                  }
                >
                  <div className="text-left">
                    <div className="font-semibold text-sm md:text-base">
                      {track.title}
                    </div>
                    <div className="text-xs md:text-sm text-violet-200 mt-1">
                      {track.info}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-violet-100 text-sm">
                    <span>{isSelected ? "Pause" : "Play"}</span>
                    <span className="text-xl">
                      {isSelected ? "🌙" : "🌜"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom hint / now playing */}
          <div className="pt-6 text-center text-xs md:text-sm text-violet-200 space-y-3">
            <div className="text-3xl">☁️</div>
            <div>
              {currentTrack
                ? `Now relaxing with “${currentTrack.title}”`
                : "Select a track to begin your relaxation journey"}
            </div>

            {currentTrack && (
              <button
                type="button"
                onClick={togglePlayPause}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs md:text-sm font-medium text-violet-50 hover:bg-white/20"
              >
                {isPlaying ? "Pause" : "Resume"}{" "}
                <span className="text-lg">{isPlaying ? "⏸" : "▶️"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
