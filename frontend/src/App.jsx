// // import { Routes, Route, NavLink, useLocation } from "react-router-dom";
// // import PrivateRoute from "./components/PrivateRoute";
// // import LogoutButton from "./components/LogoutButton"; 

// // // pages you already have
// // import Home from "./pages/Home";
// // import Login from "./pages/Login";
// // import Register from "./pages/Register.jsx";

// // function Placeholder({ title }) {
// //   return (
// //     <div className="p-8">
// //       <h1 className="text-2xl font-semibold">{title}</h1>
// //       <p className="text-slate-500 mt-2">This page is protected.</p>
// //     </div>
// //   );
// // }

// // const nav = [
// //   { to: "/", label: "Home" },
// //   { to: "/journal", label: "Journal" },
// //   { to: "/meditate", label: "Meditate" },
// //   { to: "/breathing", label: "Breathing" },
// //   { to: "/community", label: "Community" },
// //   { to: "/profile", label: "Profile" }
// // ];

// // export default function App() {
// //   const { pathname } = useLocation();
// //   const hideSidebar = pathname === "/login" || pathname === "/register"; // <— only hide here
// //   const isHome = pathname === "/";

// //   return (
// //     <div className={`grid h-screen ${hideSidebar ? "" : "[grid-template-columns:260px_1fr]"}`}>
// //       {!hideSidebar && (
// //         <aside className="bg-white border-r border-indigo-50 p-4 flex flex-col">
// //           <div className="flex items-center font-bold text-xl gap-2 px-2 mb-6">
// //             <span>🌱</span><span>WeGrow</span>
// //           </div>

// //           <nav className="flex flex-col gap-2">
// //             {nav.map(n => (
// //               <NavLink
// //                 key={n.to}
// //                 to={n.to}
// //                 end
// //                 className={({ isActive }) =>
// //                   `rounded-xl px-3 py-3 font-medium ${
// //                     isActive ? "bg-gray-900 text-white" : "text-gray-900 hover:bg-indigo-50"
// //                   }`
// //                 }
// //               >
// //                 {n.label}
// //               </NavLink>
// //             ))}
// //           </nav>

// //           <div className="mt-auto rounded-2xl bg-indigo-50/40 border border-indigo-100 p-3">
// //             <div className="text-sm text-slate-600">Logged in</div>
// //             {isHome && <LogoutButton />}
// //           </div>
// //         </aside>
// //       )}

// //       <main className={`${hideSidebar ? "" : "p-7"} overflow-auto`}>
// //         <Routes>
// //           {/* Public */}
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register />} />

// //           {/* Protected */}
// //           <Route
// //             path="/"
// //             element={
// //               <PrivateRoute>
// //                 <Home />
// //               </PrivateRoute>
// //             }
// //           />
// //           {/* ...other protected routes... */}
// //         </Routes>
// //       </main>
// //     </div>
// //   );
// // }

// import { Routes, Route, NavLink, useLocation } from "react-router-dom";
// import PrivateRoute from "./components/PrivateRoute";
// import LogoutButton from "./components/LogoutButton";

// // pages you already have
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register.jsx";

// function Placeholder({ title }) {
//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold">{title}</h1>
//       <p className="text-slate-500 mt-2">This page is protected.</p>
//     </div>
//   );
// }

// const nav = [
//   { to: "/", label: "Home" },
//   { to: "/journal", label: "Journal" },
//   { to: "/meditate", label: "Meditate" },
//   { to: "/breathing", label: "Breathing" },
//   { to: "/community", label: "Community" },
//   { to: "/profile", label: "Profile" }
// ];

// export default function App() {
//   const { pathname } = useLocation();
//   const hideSidebar = pathname === "/login" || pathname === "/register"; // <— only hide here
//   const isHome = pathname === "/";

//   return (
//     <div className={`relative grid h-screen ${hideSidebar ? "" : "[grid-template-columns:260px_1fr]"}`}>
//       {/* Bright background only for authenticated area */}
//       {!hideSidebar && (
//         <div className="fixed inset-0 -z-10 bg-[linear-gradient(135deg,#fff7cc_0%,#fde047_35%,#f59e0b_70%,#f97316_100%)]" />
//       )}

//       {!hideSidebar && (
//         <aside className="bg-white border-r border-indigo-50 p-4 flex flex-col">
//           <div className="flex items-center font-bold text-xl gap-2 px-2 mb-6">
//             <span>🌱</span><span>WeGrow</span>
//           </div>

//           <nav className="flex flex-col gap-2">
//             {nav.map(n => (
//               <NavLink
//                 key={n.to}
//                 to={n.to}
//                 end
//                 className={({ isActive }) =>
//                   `rounded-xl px-3 py-3 font-medium ${
//                     isActive ? "bg-gray-900 text-white" : "text-gray-900 hover:bg-indigo-50"
//                   }`
//                 }
//               >
//                 {n.label}
//               </NavLink>
//             ))}
//           </nav>

//           <div className="mt-auto rounded-2xl bg-indigo-50/40 border border-indigo-100 p-3">
//             <div className="text-sm text-slate-600">Logged in</div>
//             {isHome && <LogoutButton />}
//           </div>
//         </aside>
//       )}

//       <main className={`${hideSidebar ? "" : "p-7"} overflow-auto`}>
//         <Routes>
//           {/* Public */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* Protected */}
//           <Route
//             path="/"
//             element={
//               <PrivateRoute>
//                 <Home />
//               </PrivateRoute>
//             }
//           />
//           {/* ...other protected routes... */}
//         </Routes>
//       </main>
//     </div>
//   );
// }
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LogoutButton from "./components/LogoutButton";
import Journal from "./pages/Journal.jsx";
import Breathing from "./pages/Breathing.jsx";
import Meditate from "./pages/Meditate.jsx";
import Sleep from "./pages/Sleep.jsx";
import Profile from "./pages/Profile.jsx";
import Community from "./pages/Community.jsx";

// pages you already have
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register.jsx";

function Placeholder({ title }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-slate-500 mt-2">This page is protected.</p>
    </div>
  );
}

const nav = [
  { to: "/", label: "Home" },
  { to: "/journal", label: "Journal" },
  { to: "/meditate", label: "Meditate" },
  { to: "/breathing", label: "Breathing" },
  { to: "/sleep", label: "Sleep" },
  { to: "/community", label: "Community" },
  { to: "/profile", label: "Profile" }
];

export default function App() {
  const { pathname } = useLocation();
  const hideSidebar = pathname === "/login" || pathname === "/register";
  const isHome = pathname === "/";

  return (
    <div className={`relative grid h-screen ${hideSidebar ? "" : "[grid-template-columns:260px_1fr]"}`}>
      
      {!hideSidebar && (
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(135deg,#fff7cc_0%,#fde047_35%,#f59e0b_70%,#f97316_100%)]" />
      )}

      {!hideSidebar && (
        <aside className="bg-gradient-to-b from-orange-500 to-amber-500 text-white border-r border-amber-300/40 p-4 flex flex-col">
          <div className="flex items-center font-bold text-xl gap-2 px-2 mb-6">
            <span>🌱</span>
            <span className="tracking-tight">WeGrow</span>
          </div>

          <nav className="flex flex-col gap-2">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end
                className={({ isActive }) =>
                  `rounded-xl px-3 py-3 font-medium transition ${
                    isActive
                      ? "bg-white/20 text-white shadow-sm"
                      : "text-white/90 hover:bg-white/10"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl bg-white/10 border border-white/20 p-3">
            <div className="text-sm text-white/90">Logged in</div>
            {isHome && <LogoutButton />}
          </div>
        </aside>
      )}

      <main className={`${hideSidebar ? "" : "p-7"} overflow-auto`}>
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <PrivateRoute>
                <Journal />
              </PrivateRoute>
          }
        />
          <Route
            path="/breathing"
            element={
              <PrivateRoute>
                <Breathing />
              </PrivateRoute>
      }
        />
          <Route
            path="/meditate"
            element={
              <PrivateRoute>
                  <Meditate />
              </PrivateRoute>
         }
        />
          <Route
            path="/sleep"
            element={
              <PrivateRoute>
                <Sleep />
              </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
       }
      />

      <Route
        path="/community"
          element={
            <PrivateRoute>
              <Community />
            </PrivateRoute>
      }
      />

          
        </Routes>
      </main>
    </div>
  );
}
