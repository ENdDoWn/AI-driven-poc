export function RouteLoading({ area }: { area: string }) {
  return (
    <div className="min-h-screen animate-fade-in-late bg-slate-100 text-slate-900" aria-label={`Loading ${area}`}>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b-2 border-slate-300 bg-white p-6 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r-2">
          <div className="h-6 w-32 bg-slate-200" />
          <div className="mt-3 h-3 w-24 bg-slate-100" />
          <div className="mt-8 grid gap-3">
            {["w-full", "w-11/12", "w-10/12", "w-9/12", "w-8/12", "w-10/12", "w-7/12"].map((width, index) => (
              <div key={index} className={`h-9 border border-slate-200 bg-slate-50 ${width}`} />
            ))}
          </div>
        </aside>
        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          <RouteLoadingContent />
        </main>
      </div>
    </div>
  );
}

/** Content-only skeleton, no fake sidebar — for sections with a persistent real sidebar (e.g. admin/layout.tsx). */
export function RouteLoadingContent({ area }: { area?: string } = {}) {
  return (
    <div className="min-w-0 flex-1 animate-fade-in-late px-6 py-8 lg:px-10" aria-label={area ? `Loading ${area}` : "Loading"}>
      <div className="border-b-2 border-slate-300 pb-6">
        <div className="h-3 w-32 bg-slate-200" />
        <div className="mt-3 h-8 w-64 bg-slate-200" />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-28 border-2 border-slate-300 bg-white" />
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="h-64 border-2 border-slate-300 bg-white" />
        <div className="h-64 border-2 border-slate-300 bg-white" />
      </div>
    </div>
  );
}
