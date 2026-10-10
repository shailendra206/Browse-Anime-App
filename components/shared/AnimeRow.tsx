import { ArrowRight } from 'lucide-react';

export default function AnimeRow({children, title}: any) {
  return (
    <section className="relative z-1 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-[1.95rem] max-[760px]:text-[1.65rem] font-normal text-[#1c1c28] dark:text-[#eeeef0] tracking-tight flex items-center gap-3.5 pl-3.5 border-l-2 border-[#b5873a] dark:border-[#c8a96e]">
          {title}
        </h2>
        <a
          href="/search"
          className="text-[0.8rem] text-[#b5873a] dark:text-[#c8a96e] tracking-wide opacity-65 hover:opacity-100 transition-opacity no-underline"
        >
          View all <ArrowRight className="text-icon inline" size={14} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>

      <div className="overflow-x-auto overflow-y-visible py-6 -my-6 px-2.5 -mx-2.5">
        <div className="grid grid-flow-col auto-cols-[calc((100%-96px)/7)] max-[1279px]:auto-cols-[calc((100%-80px)/6)] max-[1024px]:auto-cols-[calc((100%-60px)/5)] max-[760px]:auto-cols-[calc((100%-28px)/3)] max-[760px]:gap-3.5 max-[460px]:auto-cols-[calc((100%-14px)/2)] gap-4">
          {/* AnimeCard */}
          {children}
        </div>
      </div>
    </section>
  );
}