import { AlertTriangle } from 'lucide-react';

type ErrorMessageProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export default function ErrorMessage({
  title = 'Something went wrong',
  message = "We couldn't load this right now. Please try again.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex max-w-sm flex-col items-center gap-4 px-6 text-center"
    >
      <AlertTriangle
        size={34}
        strokeWidth={1.5}
        className="text-[#b5873a] dark:text-[#c8a96e]"
        aria-hidden="true"
      />
      <h2 className="font-serif text-2xl font-light tracking-tight text-[#1c1c28] dark:text-[#eeeef0]">
        {title}
      </h2>
      <p className="text-sm font-light leading-relaxed text-[#5c5c72] dark:text-[#7a7d8c]">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-1 inline-flex items-center justify-center rounded-[1px] border border-black/8 dark:border-white/7 px-5.5 py-2.75 text-[0.85rem] font-normal tracking-wide text-[#1c1c28] dark:text-[#eeeef0] transition-[background-color,border-color,color] duration-200 hover:border-[#b5873a]/45 dark:hover:border-[#c8a96e]/45 hover:text-[#b5873a] dark:hover:text-[#c8a96e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e]/60"
        >
          Try again
        </button>
      )}
    </div>
  );
}
