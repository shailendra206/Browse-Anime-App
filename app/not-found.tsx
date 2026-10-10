import Link from 'next/link';
import ErrorMessage from '@/components/shared/ErrorMessage';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-20">
      <ErrorMessage
        title="Page not found"
        message="We couldn't find what you were looking for. It may have been moved, or the link is incorrect."
      />
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-[1px] bg-[#b5873a] dark:bg-[#c8a96e] text-white dark:text-[#0e0f14] px-6.5 py-2.75 text-[0.85rem] font-medium tracking-wide transition-[background-color,transform] duration-200 ease-out hover:bg-[#c79a4c] dark:hover:bg-[#d8ba7c] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e]/70"
      >
        Back to home
      </Link>
    </div>
  );
}
