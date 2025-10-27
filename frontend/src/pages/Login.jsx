// import { useState } from 'react';
// import { login } from '../Api';

// export default function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError('');
//     setSubmitting(true);
//     try {
//       const { token, user } = await login(username.trim(), password);
//       localStorage.setItem('authToken', token);
//       localStorage.setItem('authUser', JSON.stringify(user));
//       window.location.href = '/'; // go home
//     } catch (e) {
//       setError('Wrong username or password.');
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-blue-50 px-4">
//       <div className="w-full max-w-md">
//         <div className="card shadow-card">
//           <div className="text-center mb-4">
//             <div className="text-4xl">🌱</div>
//             <h1 className="mt-2 text-2xl font-semibold">Welcome back</h1>
//             <p className="text-slate-500">Sign in to continue</p>
//           </div>

//           {error && (
//             <div className="mb-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-rose-700 text-sm">
//               {error}
//             </div>
//           )}

//           <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
//             {/* We do not display entered values anywhere on the page */}
//             <div>
//               <label className="block text-sm font-medium text-slate-700">Username (email)</label>
//               <input
//                 type="email"
//                 inputMode="email"
//                 className="mt-1 w-full rounded-lg border border-indigo-100 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
//                 placeholder="you@example.com"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700">Password</label>
//               <input
//                 type="password"
//                 className="mt-1 w-full rounded-lg border border-indigo-100 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="btn w-full"
//               disabled={submitting}
//             >
//               {submitting ? 'Signing in…' : 'Sign in'}
//             </button>
//           </form>
//         </div>

//         <p className="text-center text-sm text-slate-500 mt-4">
//           Don’t have an account?{" "}
//           <a className="text-brand font-semibold hover:underline" href="/register">Create one</a>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { login } from "../api";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { token, user } = await login(email.trim(), password);
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));
      window.location.href = "/";
    } catch (e) {
      setError("Wrong email or password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
     <div className="fixed inset-0 -z-10 bg-[linear-gradient(135deg,#fff7cc_0%,#fde047_35%,#f59e0b_70%,#f97316_100%)]" />

      {/* Card */}
      <div className="relative w-full max-w-md">
        <div className="mx-auto rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 p-8">
          <div className="text-center">
            <div className="font-semibold text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-600">
  WeGrow
</div>
            <p className="mt-1 text-slate-500">
              Your wellness journey starts here <span aria-hidden>🌱</span>
            </p>
          </div>

          {error && (
            <div className="mt-4 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 px-3 py-2 text-sm">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} autoComplete="off">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full rounded-xl bg-gradient-to-b from-orange-500 to-orange-600 text-white font-semibold py-2 shadow-lg shadow-orange-200 hover:brightness-105 disabled:opacity-70"
            >
              {submitting ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Don’t have an account?{" "}
            <Link to="/register" className="font-semibold text-orange-600 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

