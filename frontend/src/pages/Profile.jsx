// import { useEffect, useState } from "react";
// import { getProfile, updateProfile } from "../api.jsx";

// function OrangeBar({ value }) {
//   return (
//     <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
//       <div
//         className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600"
//         style={{ width: `${value}%` }}
//       />
//     </div>
//   );
// }

// export default function Profile() {
//   const [data, setData] = useState(null);
//   const [originalEmail, setOriginalEmail] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [savedMsg, setSavedMsg] = useState("");

//   useEffect(() => {
//     (async () => {
//       try {
//         const p = await getProfile();
//         setData(p);
//         setOriginalEmail(p.email || "");
//       } catch (e) {
//         setError("Could not load profile");
//       }
//     })();
//   }, []);

//   if (!data && !error) {
//     return <div className="text-slate-600 mt-4">Loading profile…</div>;
//   }

//   const handleChange = (field, value) => {
//     setData((prev) => ({ ...prev, [field]: value }));
//   };

//   async function handleSave() {
//     if (!data) return;
//     setSaving(true);
//     setError("");
//     setSavedMsg("");

//     try {
//       const updated = await updateProfile(data);
//       setData(updated);
//       setEditMode(false);
//       setSavedMsg("Changes saved.");

//       // if email changed, log user out so they log in again with new email
//       if ((updated.email || "") !== originalEmail) {
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("authUser");
//         setTimeout(() => {
//           window.location.href = "/login";
//         }, 800);
//       } else {
//         setOriginalEmail(updated.email || "");
//       }
//     } catch (e) {
//       const msg =
//         e?.response?.data?.message ||
//         e?.response?.data?.error ||
//         "Could not save changes.";
//       setError(msg);
//     } finally {
//       setSaving(false);
//       setTimeout(() => setSavedMsg(""), 2500);
//     }
//   }

//   return (
//     <div className="relative max-w-5xl mx-auto">
//       {/* shared background gradient */}
//       <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#fff7cc_0%,#fde047_35%,#f59e0b_70%,#f97316_100%)] rounded-3xl" />

//       <div className="space-y-6 pb-10">
//         {/* Header */}
//         <div className="pt-4">
//           <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
//             My Profile
//           </h1>
//           <p className="text-slate-700 mt-1">
//             Manage your account information and preferences
//           </p>
//         </div>

//         {/* Top card */}
//         <section className="rounded-3xl bg-[#fff7eb] shadow-xl ring-1 ring-black/5 p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//           {/* avatar + name */}
//           <div className="flex items-center gap-5">
//             <div className="relative">
//               <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-4xl text-white">
//                 {data.name ? data.name.charAt(0).toUpperCase() : "U"}
//               </div>
//               <div className="absolute bottom-1 right-0 w-8 h-8 rounded-full bg-white flex items-center justify-center text-orange-500 text-lg shadow-md">
//                 ✏️
//               </div>
//             </div>
//             <div>
//               {editMode ? (
//                 <input
//                   type="text"
//                   className="bg-white/70 rounded-lg px-2 py-1 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-orange-400"
//                   value={data.name || ""}
//                   onChange={(e) => handleChange("name", e.target.value)}
//                 />
//               ) : (
//                 <div className="text-xl font-semibold text-slate-900">
//                   {data.name}
//                 </div>
//               )}
//               <div className="text-sm text-slate-500">
//                 {data.tagline || "Wellness Enthusiast"}
//               </div>
//             </div>
//           </div>

//           {/* stats tiles */}
//           <div className="flex-1 grid sm:grid-cols-3 gap-3 md:gap-4">
//             <StatTile
//               icon="🔥"
//               label="Current Streak"
//               value={`${data.streakDays || 0} Days`}
//             />
//             <StatTile
//               icon="⭐"
//               label="Total Sessions"
//               value={data.totalSessions || 0}
//             />
//             <StatTile
//               icon="🏅"
//               label="Achievements"
//               value={data.achievements || 0}
//             />
//           </div>

//           <button
//             type="button"
//             onClick={() => setEditMode((v) => !v)}
//             className="self-start md:self-auto rounded-full bg-orange-500 text-white text-sm font-semibold px-4 py-2 shadow-md shadow-orange-200 hover:brightness-105"
//           >
//             {editMode ? "Cancel" : "Edit Profile"}
//           </button>
//         </section>

//         {/* Main two-column cards */}
//         <div className="grid lg:grid-cols-[1.4fr,1fr] gap-6">
//           {/* Personal info */}
//           <section className="rounded-3xl bg-[#fff7eb] shadow-xl ring-1 ring-black/5 p-6 space-y-5">
//             <div className="flex items-center justify-between">
//               <h2 className="font-semibold text-slate-900">
//                 Personal Information
//               </h2>
//               <span className="text-xs text-orange-500">
//                 {editMode ? "Editing" : "View only"}
//               </span>
//             </div>

//             {/* Full Name */}
//             <InfoRow
//               label="Full Name"
//               icon="👤"
//               editable={editMode}
//               value={data.name}
//               onChange={(v) => handleChange("name", v)}
//             />

//             {/* Email */}
//             <InfoRow
//               label="Email"
//               icon="✉️"
//               editable={editMode}
//               value={data.email}
//               onChange={(v) => handleChange("email", v)}
//             />

//             {/* Phone */}
//             <InfoRow
//               label="Phone"
//               icon="📞"
//               editable={editMode}
//               value={data.phone}
//               onChange={(v) => handleChange("phone", v)}
//             />

//             {/* Location */}
//             <InfoRow
//               label="Location"
//               icon="📍"
//               editable={editMode}
//               value={data.location}
//               onChange={(v) => handleChange("location", v)}
//             />

//             {/* Member since (read-only) */}
//             <InfoRow
//               label="Member Since"
//               icon="📅"
//               editable={false}
//               value={
//                 data.memberSince
//                   ? new Date(data.memberSince).toLocaleDateString(undefined, {
//                       month: "long",
//                       year: "numeric",
//                     })
//                   : "—"
//               }
//             />
//           </section>

//           {/* Wellness goals (same as before) */}
//           <section className="rounded-3xl bg-[#fff7eb] shadow-xl ring-1 ring-black/5 p-6 space-y-5">
//             <div className="flex items-center justify-between">
//               <h2 className="font-semibold text-slate-900">Wellness Goals</h2>
//               <span className="text-xs text-orange-500">Edit</span>
//             </div>

//             <GoalRow
//               label="Daily Meditation"
//               right={`${data.dailyMeditationMinutes || 15} min`}
//             >
//               <OrangeBar value={70} />
//             </GoalRow>

//             <GoalRow
//               label="Journaling"
//               right={data.journalingFrequency || "Daily"}
//             >
//               <OrangeBar value={50} />
//             </GoalRow>

//             <GoalRow
//               label="Sleep Quality"
//               right={`${data.sleepHoursGoal || 8} hours`}
//             >
//               <OrangeBar value={80} />
//             </GoalRow>

//             <GoalRow
//               label="Breathing Exercises"
//               right={data.breathingPerWeek || "3x/week"}
//             >
//               <OrangeBar value={60} />
//             </GoalRow>
//           </section>
//         </div>

//         {/* Account settings + Save button */}
//         <section className="rounded-3xl bg-[#fff7eb] shadow-xl ring-1 ring-black/5 p-6 space-y-5">
//           <h2 className="font-semibold text-slate-900">Account Settings</h2>

//           <ToggleRow
//             label="Notifications"
//             description="Receive daily reminders and updates"
//             checked={data.notificationsEnabled}
//             onChange={(v) => handleChange("notificationsEnabled", v)}
//           />

//           <ToggleRow
//             label="Email Updates"
//             description="Get weekly progress reports"
//             checked={data.emailUpdatesEnabled}
//             onChange={(v) => handleChange("emailUpdatesEnabled", v)}
//           />

//           <ToggleRow
//             label="Privacy Mode"
//             description="Hide your activity from others"
//             checked={data.privacyMode}
//             onChange={(v) => handleChange("privacyMode", v)}
//           />

//           <div className="pt-4 flex flex-wrap gap-3">
//             <button
//               type="button"
//               onClick={handleSave}
//               disabled={saving}
//               className="rounded-full bg-orange-500 text-white px-5 py-2 text-sm font-semibold shadow-md shadow-orange-200 hover:brightness-105 disabled:opacity-70"
//             >
//               {saving ? "Saving…" : "Save Changes"}
//             </button>
//             <button
//               type="button"
//               className="rounded-full border border-slate-300 bg-white text-sm font-semibold px-4 py-2 text-slate-700 hover:bg-slate-50"
//             >
//               Reset Password
//             </button>

//             {error && (
//               <span className="text-sm text-rose-600 ml-auto">{error}</span>
//             )}
//             {savedMsg && !error && (
//               <span className="text-sm text-emerald-600 ml-auto">
//                 {savedMsg}
//               </span>
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// /* helper components */

// function StatTile({ icon, label, value }) {
//   return (
//     <div className="rounded-2xl bg-white shadow-sm px-4 py-3 flex items-center gap-3">
//       <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center text-lg">
//         {icon}
//       </div>
//       <div>
//         <div className="text-xs text-slate-500">{label}</div>
//         <div className="text-sm font-semibold text-slate-900">{value}</div>
//       </div>
//     </div>
//   );
// }

// function InfoRow({ label, icon, editable, value, onChange }) {
//   return (
//     <div className="flex items-start gap-3 text-sm">
//       <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center text-lg">
//         {icon}
//       </div>
//       <div className="flex-1">
//         <div className="text-xs font-semibold text-slate-500">{label}</div>
//         {editable ? (
//           <input
//             type="text"
//             className="mt-0.5 bg-white/70 rounded-lg px-2 py-1 text-sm text-slate-800 outline-none w-full focus:ring-2 focus:ring-orange-400"
//             value={value || ""}
//             onChange={(e) => onChange && onChange(e.target.value)}
//           />
//         ) : (
//           <div className="mt-0.5 text-slate-800 font-medium">
//             {value || "—"}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function GoalRow({ label, right, children }) {
//   return (
//     <div className="space-y-1.5">
//       <div className="flex items-center justify-between text-sm">
//         <span className="text-slate-800">{label}</span>
//         <span className="text-xs text-orange-500">{right}</span>
//       </div>
//       {children}
//     </div>
//   );
// }

// function ToggleRow({ label, description, checked, onChange }) {
//   return (
//     <div className="rounded-2xl bg-white/80 px-4 py-3 flex items-center justify-between gap-4">
//       <div>
//         <div className="text-sm font-medium text-slate-900">{label}</div>
//         <div className="text-xs text-slate-500 mt-0.5">{description}</div>
//       </div>
//       <button
//         type="button"
//         onClick={() => onChange(!checked)}
//         className={
//           "relative w-11 h-6 rounded-full transition flex items-center " +
//           (checked ? "bg-orange-500" : "bg-slate-300")
//         }
//       >
//         <span
//           className={
//             "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transform transition " +
//             (checked ? "translate-x-5" : "translate-x-1")
//           }
//         />
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getProfile, updateProfile, getDashboard } from "../api.jsx";

function OrangeBar({ value }) {
  return (
    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function Profile() {
  const [data, setData] = useState(null);
  const [originalEmail, setOriginalEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedMsg, setSavedMsg] = useState("");

  // NEW: stats from dashboard (streak, sessions, achievements)
  const [stats, setStats] = useState({
    streak: 0,
    sessionsThisWeek: 0,
    achievements: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        // Load profile info and dashboard stats in parallel
        const [p, d] = await Promise.all([getProfile(), getDashboard()]);

        setData(p);
        setOriginalEmail(p.email || "");

        const qs = d?.quickStats || {};
        setStats({
          streak: qs.streak ?? 0,
          sessionsThisWeek: qs.sessionsThisWeek ?? 0,
          achievements: qs.achievements ?? 0,
        });
      } catch (e) {
        console.error(e);
        setError("Could not load profile");
      }
    })();
  }, []);

  if (!data && !error) {
    return <div className="text-slate-600 mt-4">Loading profile…</div>;
  }

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setError("");
    setSavedMsg("");

    try {
      const updated = await updateProfile(data);
      setData(updated);
      setEditMode(false);
      setSavedMsg("Changes saved.");

      // if email changed, log user out so they log in again with new email
      if ((updated.email || "") !== originalEmail) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
        setTimeout(() => {
          window.location.href = "/login";
        }, 800);
      } else {
        setOriginalEmail(updated.email || "");
      }
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        "Could not save changes.";
      setError(msg);
    } finally {
      setSaving(false);
      setTimeout(() => setSavedMsg(""), 2500);
    }
  }

  // Derived values from stats state (always safe, with fallbacks)
  const streakDays = stats.streak ?? 0;
  const totalSessions = stats.sessionsThisWeek ?? 0; // or rename when you add totalSessions
  const achievements = stats.achievements ?? 0;

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* shared background gradient */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#fff7cc_0%,#fde047_35%,#f59e0b_70%,#f97316_100%)] rounded-3xl" />

      <div className="space-y-6 pb-10">
        {/* Header */}
        <div className="pt-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            My Profile
          </h1>
          <p className="text-slate-700 mt-1">
            Manage your account information and preferences
          </p>
        </div>

        {/* Top card */}
        <section className="rounded-3xl bg-[#fff7eb] shadow-xl ring-1 ring-black/5 p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* avatar + name */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-4xl text-white">
                {data.name ? data.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="absolute bottom-1 right-0 w-8 h-8 rounded-full bg-white flex items-center justify-center text-orange-500 text-lg shadow-md">
                ✏️
              </div>
            </div>
            <div>
              {editMode ? (
                <input
                  type="text"
                  className="bg-white/70 rounded-lg px-2 py-1 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-orange-400"
                  value={data.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              ) : (
                <div className="text-xl font-semibold text-slate-900">
                  {data.name}
                </div>
              )}
              <div className="text-sm text-slate-500">
                {data.tagline || "Wellness Enthusiast"}
              </div>
            </div>
          </div>

          {/* stats tiles – now driven by dashboard stats */}
          <div className="flex-1 grid sm:grid-cols-3 gap-3 md:gap-4">
            <StatTile
              icon="🔥"
              label="Current Streak"
              value={`${streakDays} ${streakDays === 1 ? "Day" : "Days"}`}
            />
            <StatTile
              icon="⭐"
              label="Total Sessions"
              value={totalSessions}
            />
            <StatTile
              icon="🏅"
              label="Achievements"
              value={achievements}
            />
          </div>

          <button
            type="button"
            onClick={() => setEditMode((v) => !v)}
            className="self-start md:self-auto rounded-full bg-orange-500 text-white text-sm font-semibold px-4 py-2 shadow-md shadow-orange-200 hover:brightness-105"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </section>

        {/* Main two-column cards */}
        <div className="grid lg:grid-cols-[1.4fr,1fr] gap-6">
          {/* Personal info */}
          <section className="rounded-3xl bg-[#fff7eb] shadow-xl ring-1 ring-black/5 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">
                Personal Information
              </h2>
            <span className="text-xs text-orange-500">
                {editMode ? "Editing" : "View only"}
              </span>
            </div>

            {/* Full Name */}
            <InfoRow
              label="Full Name"
              icon="👤"
              editable={editMode}
              value={data.name}
              onChange={(v) => handleChange("name", v)}
            />

            {/* Email */}
            <InfoRow
              label="Email"
              icon="✉️"
              editable={editMode}
              value={data.email}
              onChange={(v) => handleChange("email", v)}
            />

            {/* Phone */}
            <InfoRow
              label="Phone"
              icon="📞"
              editable={editMode}
              value={data.phone}
              onChange={(v) => handleChange("phone", v)}
            />

            {/* Location */}
            <InfoRow
              label="Location"
              icon="📍"
              editable={editMode}
              value={data.location}
              onChange={(v) => handleChange("location", v)}
            />

            {/* Member since (read-only) */}
            <InfoRow
              label="Member Since"
              icon="📅"
              editable={false}
              value={
                data.memberSince
                  ? new Date(data.memberSince).toLocaleDateString(undefined, {
                      month: "long",
                      year: "numeric",
                    })
                  : "—"
              }
            />
          </section>

          {/* Wellness goals (same as before) */}
          <section className="rounded-3xl bg-[#fff7eb] shadow-xl ring-1 ring-black/5 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Wellness Goals</h2>
              <span className="text-xs text-orange-500">Edit</span>
            </div>

            <GoalRow
              label="Daily Meditation"
              right={`${data.dailyMeditationMinutes || 15} min`}
            >
              <OrangeBar value={70} />
            </GoalRow>

            <GoalRow
              label="Journaling"
              right={data.journalingFrequency || "Daily"}
            >
              <OrangeBar value={50} />
            </GoalRow>

            <GoalRow
              label="Sleep Quality"
              right={`${data.sleepHoursGoal || 8} hours`}
            >
              <OrangeBar value={80} />
            </GoalRow>

            <GoalRow
              label="Breathing Exercises"
              right={data.breathingPerWeek || "3x/week"}
            >
              <OrangeBar value={60} />
            </GoalRow>
          </section>
        </div>

        {/* Account settings + Save button */}
        <section className="rounded-3xl bg-[#fff7eb] shadow-xl ring-1 ring-black/5 p-6 space-y-5">
          <h2 className="font-semibold text-slate-900">Account Settings</h2>

          <ToggleRow
            label="Notifications"
            description="Receive daily reminders and updates"
            checked={data.notificationsEnabled}
            onChange={(v) => handleChange("notificationsEnabled", v)}
          />

          <ToggleRow
            label="Email Updates"
            description="Get weekly progress reports"
            checked={data.emailUpdatesEnabled}
            onChange={(v) => handleChange("emailUpdatesEnabled", v)}
          />

          <ToggleRow
            label="Privacy Mode"
            description="Hide your activity from others"
            checked={data.privacyMode}
            onChange={(v) => handleChange("privacyMode", v)}
          />

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-full bg-orange-500 text-white px-5 py-2 text-sm font-semibold shadow-md shadow-orange-200 hover:brightness-105 disabled:opacity-70"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-300 bg-white text-sm font-semibold px-4 py-2 text-slate-700 hover:bg-slate-50"
            >
              Reset Password
            </button>

            {error && (
              <span className="text-sm text-rose-600 ml-auto">{error}</span>
            )}
            {savedMsg && !error && (
              <span className="text-sm text-emerald-600 ml-auto">
                {savedMsg}
              </span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

/* helper components */

function StatTile({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white shadow-sm px-4 py-3 flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center text-lg">
        {icon}
      </div>
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-sm font-semibold text-slate-900">{value}</div>
      </div>
    </div>
  );
}

function InfoRow({ label, icon, editable, value, onChange }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center text-lg">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-xs font-semibold text-slate-500">{label}</div>
        {editable ? (
          <input
            type="text"
            className="mt-0.5 bg-white/70 rounded-lg px-2 py-1 text-sm text-slate-800 outline-none w-full focus:ring-2 focus:ring-orange-400"
            value={value || ""}
            onChange={(e) => onChange && onChange(e.target.value)}
          />
        ) : (
          <div className="mt-0.5 text-slate-800 font-medium">
            {value || "—"}
          </div>
        )}
      </div>
    </div>
  );
}

function GoalRow({ label, right, children }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-800">{label}</span>
        <span className="text-xs text-orange-500">{right}</span>
      </div>
      {children}
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div className="rounded-2xl bg-white/80 px-4 py-3 flex items-center justify-between gap-4">
      <div>
        <div className="text-sm font-medium text-slate-900">{label}</div>
        <div className="text-xs text-slate-500 mt-0.5">{description}</div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={
          "relative w-11 h-6 rounded-full transition flex items-center " +
          (checked ? "bg-orange-500" : "bg-slate-300")
        }
      >
        <span
          className={
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transform transition " +
            (checked ? "translate-x-5" : "translate-x-1")
          }
        />
      </button>
    </div>
  );
}
