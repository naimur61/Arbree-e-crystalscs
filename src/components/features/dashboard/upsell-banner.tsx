export function UpsellBanner() {
  return (
    <div className="flex justify-between items-center p-4 text-white bg-emerald-700 rounded-lg shadow-sm">
      <div>
        <div className="text-sm font-semibold">
          ✨ Unlock deeper insight and action with Activate and Evolve.
          AI-enabled oversight. Human-led decisions.
        </div>
        <div className="text-emerald-100 text-[11px]">
          A premium experience for teams ready to turn intelligence into impact.
        </div>
      </div>
      <button className="py-1.5 px-4 text-xs font-medium text-emerald-700 bg-white rounded-md hover:bg-emerald-50">
        Learn more →
      </button>
    </div>
  );
}
