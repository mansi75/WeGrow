// src/pages/Community.jsx
import { useEffect, useState } from "react";
import { getCommunityPosts, createCommunityPost } from "../api";

const FILTERS = [
  { key: "ALL", label: "All Posts", icon: "🌐" },
  { key: "MEDITATION", label: "Meditation", icon: "🧘" },
  { key: "JOURNALING", label: "Journaling", icon: "✍️" },
  { key: "BREATHING", label: "Breathing", icon: "😮‍💨" },
  { key: "SLEEP", label: "Sleep", icon: "😴" },
  { key: "GENERAL", label: "General", icon: "💬" },
];

const TRENDING = [
  "#30DayChallenge",
  "#MentalHealthMatters",
  "#MindfulMonday",
  "#ProgressNotPerfection",
];

const STATS = [
  { label: "Active Members", value: "1,234" },
  { label: "Posts Today", value: "5,678" },
  { label: "Total Support", value: "12,345" },
];

function timeAgo(isoString) {
  if (!isoString) return "";
  const then = new Date(isoString);
  const now = new Date();
  const diff = (now.getTime() - then.getTime()) / 1000; // seconds

  if (diff < 60) return "Just now";
  const mins = Math.floor(diff / 60);
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export default function Community() {
  const [filter, setFilter] = useState("ALL");
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load(currentFilter = filter) {
    setLoading(true);
    try {
      const data = await getCommunityPosts(currentFilter);
      setPosts(data);
    } catch (e) {
      console.error("Failed to load community posts", e);
      // optional: setError("Could not load posts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load("ALL");
  }, []);

  useEffect(() => {
    load(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  async function handlePost() {
    if (!content.trim()) return;
    setPosting(true);
    setError("");
    try {
      const saved = await createCommunityPost({
        content: content.trim(),
        category: filter === "ALL" ? "GENERAL" : filter,
      });
      setContent("");
      setPosts((prev) => [saved, ...prev]);
    } catch (e) {
      console.error("Post failed", e);
      setError("Could not post. Please try again.");
    } finally {
      setPosting(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-10">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Community</h1>
        <p className="text-slate-700 mt-1">
          Share your journey and support others anonymously
        </p>
      </header>

      {/* Composer card */}
      <section className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] ring-1 ring-black/5 p-5 md:p-7 mb-6">
        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white text-xl">
            <span aria-hidden>👤</span>
          </div>
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts anonymously..."
              className="w-full min-h-[120px] rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-orange-400"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Your post will be anonymous
              </span>
              <button
                type="button"
                disabled={posting || !content.trim()}
                onClick={handlePost}
                className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-b from-orange-500 to-orange-600 text-white px-4 py-2 text-sm font-semibold shadow-lg shadow-orange-200 hover:brightness-105 disabled:opacity-60"
              >
                <span aria-hidden>✈️</span>
                <span>{posting ? "Posting…" : "Post"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition " +
                (active
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                  : "bg-white/80 text-slate-800 border border-slate-200 hover:bg-white")
              }
            >
              <span aria-hidden>{f.icon}</span>
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>

      {/* Trending + stats */}
      <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] mb-6">
        <div className="rounded-3xl bg-white/80 backdrop-blur ring-1 ring-black/5 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-3">
            <span aria-hidden>📈</span>
            <span>Trending Topics</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {TRENDING.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white/80 backdrop-blur ring-1 ring-black/5 px-4 py-3 text-center"
            >
              <div className="text-xl font-semibold text-slate-900">
                {s.value}
              </div>
              <div className="text-xs text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-4 rounded-full bg-rose-50 text-rose-700 border border-rose-200 px-4 py-2 text-sm text-center">
          {error}
        </div>
      )}

      {/* Posts list */}
      <section className="space-y-4">
        {loading && (
          <div className="text-slate-600 text-sm">Loading posts…</div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-slate-600 text-sm">
            No posts yet. Be the first to share something.
          </div>
        )}

        {posts.map((p) => (
          <article
            key={p.id}
            className="rounded-3xl bg-white/85 backdrop-blur ring-1 ring-black/5 shadow-[0_18px_40px_rgba(0,0,0,0.05)] p-5 md:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white text-xl">
                  <span aria-hidden>👤</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    {p.alias || "Anonymous"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {timeAgo(p.createdAt)}
                  </div>
                </div>
              </div>
              <span className="inline-flex items-center rounded-full bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1 text-xs font-medium capitalize">
                {p.category?.toLowerCase() || "general"}
              </span>
            </div>

            <p className="mt-4 text-slate-800 leading-relaxed whitespace-pre-wrap">
              {p.content}
            </p>

            <div className="mt-4 flex items-center gap-5 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <span aria-hidden>🤍</span>
                <span>{p.likes ?? 0}</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span aria-hidden>💬</span>
                <span>{p.comments ?? 0}</span>
              </span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
