export default function Header({ name = 'Mansi' }) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  const nightEmoji = hour >= 18 ? '🌙' : hour < 12 ? '🌤️' : '☀️';

  return (
    <header className="mb-3">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
        {greeting}, {name} <span className="align-middle">{nightEmoji}</span>
      </h1>
      <p className="text-slate-500 mt-1">“Every day is a new chance to grow.”</p>
    </header>
  );
}
