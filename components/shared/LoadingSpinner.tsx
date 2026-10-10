export default function LoadingSpinner({ label = 'Loading' }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-4"
    >
      <div
        className="h-11 w-11 animate-spin rounded-full border-2 border-black/10 dark:border-white/10 border-t-[#b5873a] dark:border-t-[#c8a96e]"
        aria-hidden="true"
      />
      <span className="text-[0.7rem] uppercase tracking-widest text-[#5c5c72] dark:text-[#7a7d8c]">
        {label}
      </span>
    </div>
  );
}
