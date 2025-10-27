export default function QuickStats({ streak = 0, weekSessions = 0 }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="card border border-emerald-200 bg-orange-50">
        <div className="text-slate-500 text-sm">Streak</div>
        <div className="text-2xl font-bold">
          {streak} Days <span className="ml-1">🔥</span>
        </div>
      </div>
      <div className="card border border-indigo-200 bg-orange-50">
        <div className="text-slate-500 text-sm">This Week</div>
        <div className="text-2xl font-bold">
          {weekSessions} Sessions <span className="ml-1">⭐</span>
        </div>
      </div>
    </div>
  );
}
