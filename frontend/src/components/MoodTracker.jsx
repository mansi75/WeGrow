
import { useState } from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { postMood } from '../api';

const MOODS = [
  { label: 'Terrible', val: 1, emoji: '😞' },
  { label: 'Bad',      val: 2, emoji: '😕' },
  { label: 'Okay',     val: 3, emoji: '😐' },
  { label: 'Good',     val: 4, emoji: '😊' },
  { label: 'Great',    val: 5, emoji: '😄' }
];

export default function MoodTracker({
  currentMood = 4,
  weekly = [],
  onMoodSaved,
  buttonClassName = "btn-orange",   
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const mood = MOODS.find(m => m.val === currentMood) || MOODS[3];

  async function handleSave(val) {
    setSaving(true);
    try {
      await postMood(val);
      setOpen(false);
      onMoodSaved?.(val);
    } catch {
      alert('Could not save mood (is the backend running?).');
    } finally {
      setSaving(false);
    }
  }

  return (
    
    <div className="dash-card-orange p-6 grid gap-5 md:grid-cols-2">
      {/* Left: current mood + CTA */}
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="text-slate-700 font-semibold text-lg">Current Mood</div>

        <div
          className="text-7xl leading-none"
          aria-label={mood.label}
          title={mood.label}
        >
          {mood.emoji}
        </div>

        <button
          className={buttonClassName}
          onClick={() => setOpen(o => !o)}
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Log Mood'}
        </button>

        {open && (
          <div
            className="mt-3 w-full rounded-xl border border-amber-200 bg-white/95 p-2 shadow-md grid grid-cols-5 gap-2"
            role="dialog"
            aria-label="Select mood"
          >
            {MOODS.map((m) => (
              <button
                key={m.val}
                onClick={() => handleSave(m.val)}
                title={m.label}
                className="flex flex-col items-center justify-center gap-1 rounded-lg border border-amber-200/70 bg-orange-50/70 px-2 py-2 hover:bg-orange-100/70"
              >
                <span className="text-xl">{m.emoji}</span>
                <span className="text-[11px] text-slate-600">{m.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      
      <div className="flex flex-col justify-center">
        <div className="font-semibold mb-2">Weekly Mood Trend</div>
        <div className="inner-surface w-full h-44 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weekly}>
              <XAxis dataKey="day" tickMargin={8} />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
              <Tooltip formatter={(v) => MOODS.find(m => m.val === v)?.label || v} />
              
              <Line
                type="monotone"
                dataKey="value"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
