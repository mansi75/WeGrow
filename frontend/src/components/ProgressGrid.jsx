import ProgressBar from './ProgressBar.jsx';

export default function ProgressGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((p) => (
        <div className="card flex flex-col gap-2" key={p.type}>
          <div className="text-3xl">
            {p.type === 'JOURNALING' ? '📖' :
             p.type === 'MEDITATION' ? '🧘‍♀️' :
             p.type === 'SLEEP' ? '💤' :
             p.type === 'BREATHING' ? '💨' : '✨'}
          </div>
          <div className="font-semibold">{toTitle(p.type)}</div>
          <ProgressBar value={p.percent} ariaLabel={`${toTitle(p.type)} progress`} />
          <div className="text-xs text-slate-500">{p.percent}%</div>
        </div>
      ))}
    </div>
  );
}

function toTitle(s) {
  return s ? s.charAt(0) + s.slice(1).toLowerCase() : '';
}
