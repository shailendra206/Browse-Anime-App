'use client';
import ErrorMessage from '@/components/shared/ErrorMessage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <ErrorMessage onRetry={reset} />
    </div>
  );
}
