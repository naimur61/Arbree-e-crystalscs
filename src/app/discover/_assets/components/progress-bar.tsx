// progress-bar.tsx
export function ProgressBar({ percentage }: { percentage: number }) {
  const clamped = Math.min(100, Math.max(0, percentage));
  return (
    <div className="w-36 h-2.5 rounded-full bg-emerald-100 overflow-hidden">
      <div
        className="h-full bg-emerald-500 rounded-full transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
