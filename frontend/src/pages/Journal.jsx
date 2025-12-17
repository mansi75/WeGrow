// // src/pages/Journal.jsx
// import { useEffect, useState } from "react";
// import { createJournalEntry, getMyJournalEntries } from "../api.jsx";

// const MOOD_TAGS = [
//   { k: "calm", label: "🙂 Calm" },
//   { k: "happy", label: "😊 Happy" },
//   { k: "worried", label: "😟 Worried" },
//   { k: "sad", label: "😢 Sad" },
//   { k: "frustrated", label: "😤 Frustrated" },
//   { k: "tired", label: "😴 Tired" },
//   { k: "grateful", label: "🙌 Grateful" },
//   { k: "motivated", label: "💪 Motivated" },
// ];

// export default function Journal() {
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState([]);
//   const [file, setFile] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [entries, setEntries] = useState([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         setEntries(await getMyJournalEntries(20));
//       } catch {/* ignore for now */}
//     })();
//   }, []);

//   function toggleTag(k) {
//     setTags((t) => (t.includes(k) ? t.filter(x => x !== k) : [...t, k]));
//   }

//   async function handleSave() {
//     setError("");
//     if (!content.trim() && !file) {
//       setError("Write something or attach an image.");
//       return;
//     }
//     setSaving(true);
//     try {
//       const saved = await createJournalEntry({ content, tags, file });
//       setContent(""); setTags([]); setFile(null);
//       setEntries((prev) => [saved, ...prev]);
//     } catch {
//       setError("Could not save. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   }

//   return (
//     <div className="max-w-[900px] mx-auto">
//       <div className="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-black/5 shadow-xl p-6 md:p-8">
//         <div className="text-lg font-semibold mb-3">What's on your mind?</div>

//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Write freely about anything on your mind..."
//           className="w-full h-48 rounded-xl border border-slate-200 bg-slate-50/60 outline-none p-4 focus:ring-2 focus:ring-orange-400"
//         />

//         <hr className="my-6 border-slate-200" />

//         <div className="mb-3 text-slate-700">Add mood tag:</div>
//         <div className="flex flex-wrap gap-2 mb-6">
//           {MOOD_TAGS.map((t) => (
//             <button
//               key={t.k}
//               type="button"
//               onClick={() => toggleTag(t.k)}
//               className={
//                 "px-3 py-1.5 rounded-full border text-sm transition " +
//                 (tags.includes(t.k)
//                   ? "bg-orange-100 border-orange-300 text-orange-700"
//                   : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50")
//               }
//             >
//               {t.label}
//             </button>
//           ))}
//         </div>

//         <div className="mb-2 text-slate-700">Upload an image (optional):</div>
//         <label className="block">
//           <div className="rounded-xl border border-dashed border-slate-300 p-6 text-slate-500 text-sm flex items-center justify-center cursor-pointer hover:bg-slate-50">
//             <span className="mr-2">⬆️</span> Click to upload an image
//           </div>
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//           />
//         </label>
//         {file && (
//           <div className="mt-2 text-slate-600 text-sm truncate">
//             Selected: <span className="font-medium">{file.name}</span>
//           </div>
//         )}

//         {error && (
//           <div className="mt-4 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 px-3 py-2 text-sm">
//             {error}
//           </div>
//         )}

//         <div className="mt-6 flex gap-3">
//           <button
//             onClick={handleSave}
//             disabled={saving}
//             className="flex-1 rounded-xl bg-gradient-to-b from-orange-500 to-orange-600 text-white font-semibold py-2 shadow-lg shadow-orange-200 hover:brightness-105 disabled:opacity-70"
//           >
//             {saving ? "Saving…" : "Save Entry"}
//           </button>
//           <button
//             disabled
//             title="Coming soon"
//             className="flex-1 rounded-xl bg-violet-50 text-violet-600 font-semibold py-2 border border-violet-200"
//           >
//             Share with Therapist
//           </button>
//         </div>
//       </div>

//       {entries.length > 0 && (
//         <div className="mt-8 space-y-4">
//           {entries.map((e) => (
//             <article key={e.id} className="rounded-2xl bg-white/70 backdrop-blur ring-1 ring-black/5 p-5">
//               <div className="text-xs text-slate-500 mb-2">
//                 {new Date(e.createdAt).toLocaleString()}
//                 {e.tags?.length ? (
//                   <span className="ml-2 text-slate-400">• {e.tags.join(", ")}</span>
//                 ) : null}
//               </div>
//               <p className="whitespace-pre-wrap text-slate-800">{e.content}</p>
//               {e.imageUrl && (
//                 <img src={e.imageUrl} alt="Journal attachment" className="mt-3 max-h-72 rounded-lg object-cover" />
//               )}
//             </article>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// src/pages/Journal.jsx
import { useEffect, useState } from "react";
import { createJournalEntry, getMyJournalEntries, recordActivity } from "../api.jsx";


const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";
const FILE_BASE = API_BASE.replace(/\/api$/, ""); // strip trailing /api

const MOOD_TAGS = [
  { k: "calm", label: "🙂 Calm" },
  { k: "happy", label: "😊 Happy" },
  { k: "worried", label: "😟 Worried" },
  { k: "sad", label: "😢 Sad" },
  { k: "frustrated", label: "😤 Frustrated" },
  { k: "tired", label: "😴 Tired" },
  { k: "grateful", label: "🙌 Grateful" },
  { k: "motivated", label: "💪 Motivated" },
];

export default function Journal() {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setEntries(await getMyJournalEntries(20));
      } catch {
        // you can log if you like
      }
    })();
  }, []);

  function toggleTag(k) {
    setTags((t) => (t.includes(k) ? t.filter((x) => x !== k) : [...t, k]));
  }

  async function handleSave() {
    setError("");
    if (!content.trim() && !file) {
      setError("Write something or attach a document.");
      return;
    }
    setSaving(true);
    try {
      const saved = await createJournalEntry({ content, tags, file });
      await recordActivity("JOURNALING");
      setContent("");
      setTags([]);
      setFile(null);
      setEntries((prev) => [saved, ...prev]);
    } catch {
      setError("Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="rounded-3xl bg-white/70 backdrop-blur-xl ring-1 ring-black/5 shadow-xl p-6 md:p-8">
        <div className="text-lg font-semibold mb-3">What's on your mind?</div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write freely about anything on your mind..."
          className="w-full h-48 rounded-xl border border-slate-200 bg-slate-50/60 outline-none p-4 focus:ring-2 focus:ring-orange-400"
        />

        <hr className="my-6 border-slate-200" />

        <div className="mb-3 text-slate-700">Add mood tag:</div>
        <div className="flex flex-wrap gap-2 mb-6">
          {MOOD_TAGS.map((t) => (
            <button
              key={t.k}
              type="button"
              onClick={() => toggleTag(t.k)}
              className={
                "px-3 py-1.5 rounded-full border text-sm transition " +
                (tags.includes(t.k)
                  ? "bg-orange-100 border-orange-300 text-orange-700"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50")
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Document upload section */}
        <div className="mb-2 text-slate-700">Upload a document (optional):</div>
        <label className="block">
          <div className="rounded-xl border border-dashed border-slate-300 p-6 text-slate-500 text-sm flex items-center justify-center cursor-pointer hover:bg-slate-50">
            <span className="mr-2">⬆️</span> Click to upload a document
          </div>
          <input
            type="file"
            // Word docs; add PDF if you want: ,application/pdf
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
        {file && (
          <div className="mt-2 text-slate-600 text-sm truncate">
            Selected: <span className="font-medium">{file.name}</span>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 px-3 py-2 text-sm">
            {error}
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 rounded-xl bg-gradient-to-b from-orange-500 to-orange-600 text-white font-semibold py-2 shadow-lg shadow-orange-200 hover:brightness-105 disabled:opacity-70"
          >
            {saving ? "Saving…" : "Save Entry"}
          </button>
          <button
            disabled
            title="Coming soon"
            className="flex-1 rounded-xl bg-violet-50 text-violet-600 font-semibold py-2 border border-violet-200"
          >
            Share with Therapist
          </button>
        </div>
      </div>

      {entries.length > 0 && (
        <div className="mt-8 space-y-4">
          {entries.map((e) => {
            // Build proper absolute URL for the attachment
            const fileHref = e.fileUrl
              ? (e.fileUrl.startsWith("http")
                  ? e.fileUrl
                  : `${FILE_BASE}${e.fileUrl}`) // "/files/..." -> "http://localhost:8080/files/..."
              : null;

            return (
              <article
                key={e.id}
                className="rounded-2xl bg-white/70 backdrop-blur ring-1 ring-black/5 p-5"
              >
                <div className="text-xs text-slate-500 mb-2">
                  {new Date(e.createdAt).toLocaleString()}
                  {e.tags?.length ? (
                    <span className="ml-2 text-slate-400">
                      • {e.tags.join(", ")}
                    </span>
                  ) : null}
                </div>
                <p className="whitespace-pre-wrap text-slate-800">{e.content}</p>

                {fileHref && (
                  <a
                    href={fileHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm text-orange-600 underline"
                  >
                    Open attached document
                  </a>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
