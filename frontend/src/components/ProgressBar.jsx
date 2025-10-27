export default function ProgressBar({ value = 0, ariaLabel }) {
  return (
    <div
      
      className="w-full h-2 bg-orange-100 rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
      title={`${value}%`}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 transition-[width] duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
