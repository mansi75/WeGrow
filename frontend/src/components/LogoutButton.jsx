import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    navigate("/login", { replace: true });
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-3 w-full rounded-xl bg-gradient-to-b from-orange-500 to-orange-600 text-white px-4 py-2 font-semibold hover:brightness-105"
      aria-label="Log out"
    >
      Log out
    </button>
  );
}
