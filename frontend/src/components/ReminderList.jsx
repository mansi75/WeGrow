export default function ReminderList({ reminders = [] }) {
  return (
    <div className="card border border-amber-200 bg-orange-50">
      <h3 className="font-semibold">Today's Reminders</h3>
      <ul className="mt-3 space-y-3">
        {reminders.length === 0 && (
          <li className="text-slate-500">All clear. Enjoy your day!</li>
        )}
        {reminders.map((r) => (
          <li key={r.id} className="flex gap-3">
            <span
              aria-hidden
              className={`mt-2 h-2.5 w-2.5 rounded-full ${r.completed ? 'bg-emerald-500' : 'bg-amber-500'}`}
            />
            <div>
              <div>{r.text}</div>
              {r.dueAt && (
                <div className="text-xs text-slate-500">
                  Due {new Date(r.dueAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
