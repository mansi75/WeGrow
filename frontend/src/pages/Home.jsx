// // src/pages/Home.jsx
// import { useEffect, useState } from 'react';
// import Header from '../components/Header.jsx';
// import MoodTracker from '../components/MoodTracker.jsx';
// import ReminderList from '../components/ReminderList.jsx';
// import ProgressGrid from '../components/ProgressGrid.jsx';
// import QuickStats from '../components/QuickStats.jsx';
// import { getDashboard } from '../api';

// const ZERO_PROGRESS = [
//   { type: 'JOURNALING', percent: 0 },
//   { type: 'MEDITATION', percent: 0 },
//   { type: 'SLEEP',      percent: 0 },
//   { type: 'BREATHING',  percent: 0 }
// ];

// export default function Home() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     (async () => {
//       try {
//         const d = await getDashboard();
//         setData({
//           user: d.user ?? { name: 'User' },
//           currentMood: d.currentMood ?? 3,
//           weeklyMood: d.weeklyMoodTrend ?? [],
//           reminders: Array.isArray(d.reminders) ? d.reminders : [],
//           quickStats: {
//             streak: d?.quickStats?.streak ?? 0,
//             sessionsThisWeek: d?.quickStats?.sessionsThisWeek ?? 0
//           },
//           progress: (Array.isArray(d.progress) && d.progress.length > 0)
//             ? d.progress
//             : ZERO_PROGRESS
//         });
//       } catch (e) {
//         setError('Could not load your dashboard.');
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   return (
//     <div className="max-w-[1200px] mx-auto">
//       <Header name={data?.user?.name || '—'} />

//       {loading && <div className="text-slate-500 mt-3">Loading…</div>}
//       {!loading && error && (
//         <div className="mt-3 card border border-rose-200 bg-rose-50 text-rose-700">
//           {error}
//         </div>
//       )}

//       {!loading && !error && data && (
//         <div className="grid gap-5 lg:[grid-template-columns:1fr_340px]">
//           <div className="flex flex-col gap-5">
//             <MoodTracker
//               currentMood={data.currentMood}
//               weekly={data.weeklyMood}
//               onMoodSaved={(val) => setData((d) => ({ ...d, currentMood: val }))}
//             />
//             <div className="font-semibold">Your Progress</div>
//             <ProgressGrid items={data.progress} />
//           </div>

//           <div className="flex flex-col gap-5">
//             <ReminderList reminders={data.reminders} />
//             <span className="sr-only">Quick Stats</span>
//             <QuickStats
//               streak={data.quickStats.streak}
//               weekSessions={data.quickStats.sessionsThisWeek}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import MoodTracker from '../components/MoodTracker.jsx';
import ReminderList from '../components/ReminderList.jsx';
import ProgressGrid from '../components/ProgressGrid.jsx';
import QuickStats from '../components/QuickStats.jsx';
import { getDashboard } from '../api';

const ZERO_PROGRESS = [
  { type: 'JOURNALING', percent: 0 },
  { type: 'MEDITATION', percent: 0 },
  { type: 'SLEEP',      percent: 0 },
  { type: 'BREATHING',  percent: 0 }
];

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    try {
      const d = await getDashboard();
      setData({
        user: d.user ?? { name: 'User' },
        currentMood: d.currentMood ?? 3,
        weeklyMood: d.weeklyMoodTrend ?? [],
        reminders: Array.isArray(d.reminders) ? d.reminders : [],
        quickStats: {
          streak: d?.quickStats?.streak ?? 0,
          sessionsThisWeek: d?.quickStats?.sessionsThisWeek ?? 0
        },
        progress: (Array.isArray(d.progress) && d.progress.length > 0)
          ? d.progress
          : ZERO_PROGRESS
      });
    } catch (e) {
      setError('Could not load your dashboard.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

 
  const handleMoodSaved = async (val) => {
    setData((prev) => prev ? { ...prev, currentMood: val } : prev);
    try {
      const d = await getDashboard(); 
      setData({
      user: d.user ?? { name: 'User' },
      currentMood: d.currentMood ?? 3,
      weeklyMood: d.weeklyMoodTrend ?? [],
      reminders: Array.isArray(d.reminders) ? d.reminders : [],
      quickStats: {
        streak: d?.quickStats?.streak ?? 0,
        sessionsThisWeek: d?.quickStats?.sessionsThisWeek ?? 0,
        achievements: d?.quickStats?.achievements ?? 0,   // NEW
      },
      progress: (Array.isArray(d.progress) && d.progress.length > 0)
        ? d.progress
        : ZERO_PROGRESS
    });
    } catch {
      // silent fail: UI already shows updated mood; weekly trend will update on next load
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <Header name={data?.user?.name || '—'} />

      {loading && <div className="text-slate-500 mt-3">Loading…</div>}
      {!loading && error && (
        <div className="mt-3 card border border-rose-200 bg-rose-50 text-rose-700">
          {error}
        </div>
      )}

      {!loading && !error && data && (
        <div className="grid gap-5 lg:[grid-template-columns:1fr_340px]">
          <div className="flex flex-col gap-5">
            {/* Log Mood + Weekly Mood Trend block — light orange card */}
            
              <MoodTracker
                currentMood={data.currentMood}
                weekly={data.weeklyMood}
                onMoodSaved={handleMoodSaved}
                buttonClassName="btn-orange"   // makes the Log Mood button orange
              />
           

            <div className="font-semibold">Your Progress</div>
            <ProgressGrid items={data.progress} />
          </div>

          <div className="flex flex-col gap-5">
            <ReminderList reminders={data.reminders} />
            <span className="sr-only">Quick Stats</span>
            <QuickStats
              streak={data.quickStats.streak}
              weekSessions={data.quickStats.sessionsThisWeek}
            />
          </div>
        </div>
      )}
    </div>
  );
}
