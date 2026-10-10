export default function InfoLoading() {
  const block = 'rounded-[1px] bg-[#ede9e2] dark:bg-[#1e1f28]';
  return (
    <div className="animate-pulse bg-[#f5f3ef] dark:bg-[#0e0f14]" role="status" aria-label="Loading">
      {/* banner */}
      <div className="pt-16">
        <div className={`${block} w-full h-[460px] max-[1279px]:h-[400px] max-[1024px]:h-[320px] max-[760px]:h-[240px] max-[460px]:h-[180px]`} />
      </div>

      {/* cover + title area */}
      <div className="relative z-2 flex items-end gap-9 max-[760px]:flex-col max-[760px]:items-center px-13 max-[1279px]:px-10 max-[1024px]:px-7 max-[760px]:px-5 max-[460px]:px-3.5 -mt-45 max-[1024px]:-mt-30 max-[760px]:-mt-20 max-[460px]:-mt-15">
        <div className="flex-shrink-0 w-50 max-[1024px]:w-40 max-[760px]:w-32.5 max-[460px]:w-27.5 aspect-2/3 rounded-xl bg-[#e3ded5] dark:bg-[#262833]" />
        <div className="flex-1 min-w-0 w-full flex flex-col gap-4 pb-1 max-[760px]:items-center">
          <div className={`${block} h-4 w-48`} />
          <div className={`${block} h-10 w-3/4 max-[760px]:w-full`} />
          <div className={`${block} h-14 w-full max-w-md`} />
          <div className={`${block} h-10 w-44`} />
        </div>
      </div>

      {/* body */}
      <div className="grid grid-cols-[1fr_300px] max-[1279px]:grid-cols-[1fr_280px] max-[1024px]:grid-cols-1 gap-x-13 max-[1279px]:gap-x-10 px-13 max-[1279px]:px-10 max-[1024px]:px-7 max-[760px]:px-5 max-[460px]:px-3.5 pt-12 pb-25">
        <div className="flex flex-col gap-4">
          <div className={`${block} h-6 w-32`} />
          <div className={`${block} h-4 w-full`} />
          <div className={`${block} h-4 w-full`} />
          <div className={`${block} h-4 w-2/3`} />
        </div>
        <div className="flex flex-col gap-4 max-[1024px]:mt-8">
          <div className={`${block} h-6 w-32`} />
          <div className={`${block} h-48 w-full`} />
        </div>
      </div>
    </div>
  );
}
