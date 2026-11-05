export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[1.35rem] border border-[#e6e8dd] bg-[#fffdf7] shadow-[0_8px_24px_rgba(7,91,59,0.05)]">
      <div className="relative aspect-square bg-[#f0f4e9]">
        <div className="absolute left-3 top-3 h-7 w-16 animate-pulse rounded-full bg-[#e8f3e4]" />
        <div className="absolute right-3 top-3 h-8 w-8 animate-pulse rounded-full bg-white/60" />
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#f0f4e9] to-[#e8f3e4]" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-1.5">
          <div className="h-3.5 w-3.5 animate-pulse rounded-full bg-[#e8f3e4]" />
          <div className="h-3.5 w-3.5 animate-pulse rounded-full bg-[#e8f3e4]" />
          <div className="h-3.5 w-3.5 animate-pulse rounded-full bg-[#e8f3e4]" />
          <div className="ml-1 h-3 w-12 animate-pulse rounded bg-[#e8f3e4]" />
        </div>
        <div className="mb-1.5 h-4 w-full animate-pulse rounded bg-[#e8f3e4]" />
        <div className="mb-3 h-3 w-2/3 animate-pulse rounded bg-[#e8f3e4]" />
        <div className="mt-auto">
          <div className="mb-1 h-3 w-16 animate-pulse rounded bg-[#e8f3e4]" />
          <div className="mb-1 h-7 w-24 animate-pulse rounded bg-[#e8f3e4]" />
          <div className="mb-3 h-3 w-20 animate-pulse rounded bg-[#e8f3e4]" />
          <div className="h-10 w-full animate-pulse rounded-xl bg-[#e8f3e4]" />
        </div>
      </div>
    </div>
  );
}
