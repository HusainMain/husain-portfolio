export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="w-32 h-32 rounded-full bg-purple-500/20 border border-purple-500/30 mx-auto mb-6" />
        <p className="text-slate-400">Loading…</p>
      </div>
    </div>
  );
}
