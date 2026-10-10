'use client'
import { AnimeCardProps } from '@/types/interface';
import { Star, Bookmark, BookmarkCheck} from 'lucide-react';
import Link from 'next/link';
import { useBookmarkStore } from '@/stores/store';

export default function AnimeCard({ id, imageUrl, rating, status, title, format, episode }: AnimeCardProps) {
  function getStatusInfo(status: string | null){
    switch (status) {
      case 'RELEASING':
        return { label: 'Airing', dotClass: 'bg-[#4ade80]' }
      case 'FINISHED':
        return { label: 'Finished', dotClass: 'bg-[#facc15]' }
      case 'NOT_YET_RELEASED':
        return { label: 'Upcoming', dotClass: 'bg-[#a0a0b8]' }
      default:
        return null
    }
  }
  const arr = useBookmarkStore(state => state.arr)
  const setArr = useBookmarkStore(state => state.setArr)
  const isBookmarked = arr.includes(id) ? true : false
  const statusInfo = getStatusInfo(status)
  const BookmarkIcon = isBookmarked ? BookmarkCheck : Bookmark
  return (
    <div className="relative z-1 min-w-0 cursor-pointer group">
      {/* Image wrap */}
      <div className="relative w-full aspect-2/3 rounded-2.5 overflow-hidden bg-[#ede9e2] dark:bg-[#1e1f28] mb-2.5 max-[760px]:mb-2 shadow-[0_4px_20px_rgba(0,0,0,0.10)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-transform duration-400 group-hover:scale-106 max-[760px]:group-hover:scale-100">
        <Link href={`/info/${id}`} className="block w-full h-full">
          {imageUrl ? (
            <img
              loading="lazy"
              src={imageUrl}
              alt={title ?? ''}
              className="w-full h-full object-cover rounded-2.5"
            />
          ) : (
            <div className="w-full h-full bg-[#ede9e2] dark:bg-[#1e1f28]" />
          )}
        </Link>

        {/* Hover overlay — hover doesn't fire reliably on touch, so always-on below 760px */}
        <div className="absolute inset-0 rounded-2.5 overflow-hidden pointer-events-none opacity-100 min-[761px]:opacity-0 min-[761px]:group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-[#f5f3ef]/90 dark:from-[#0e0f14]/88 to-transparent to-55%">
          {rating && <span className="absolute bottom-2.5 max-[760px]:bottom-2 left-2.5 max-[760px]:left-2 text-[0.78rem] max-[760px]:text-[0.7rem] font-medium text-[#b5873a] dark:text-[#c8a96e] tracking-wide flex items-center gap-0.75 pointer-events-none">
            <Star className="rating-icon" size={13} strokeWidth={2} fill="currentColor" aria-hidden="true" />
            {(Number(rating) / 10).toFixed(1)}
          </span>}
          <button
            className={`absolute bottom-2.5 max-[760px]:bottom-2 right-2.5 max-[760px]:right-2 w-7 h-7 max-[760px]:w-6 max-[760px]:h-6 rounded-md border bg-black/55 flex items-center justify-center group/bm pointer-events-auto backdrop-blur-sm transition-[border-color,color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e]/70 ${isBookmarked ? 'border-[#c8a96e]/55 text-[#c8a96e] shadow-[0_0_0_1px_rgba(200,169,110,0.18),0_6px_18px_rgba(0,0,0,0.26)] hover:border-[#c8a96e]' : 'border-white/18 text-white/92 shadow-[0_4px_14px_rgba(0,0,0,0.22)] hover:border-white/35'}`}
            onClick={() => setArr(id)}
            aria-label={isBookmarked ? 'Remove from watchlist' : 'Add to watchlist'}
            aria-pressed={isBookmarked}
          >
            <BookmarkIcon className={`save-icon ${isBookmarked ? 'fill-current' : ''}`} size={15} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        {/* Airing badge */}
        {status && (<span className="absolute top-2 max-[760px]:top-1.5 left-2 max-[760px]:left-1.5 inline-flex items-center gap-1.25 max-[760px]:gap-1 text-[0.62rem] max-[760px]:text-[0.58rem] font-medium uppercase tracking-wider text-white bg-black/55 px-1.75 max-[760px]:px-1.5 py-0.5 rounded-[2px] backdrop-blur-sm">
          <span className={`w-1.5 h-1.5 max-[760px]:w-1.25 max-[760px]:h-1.25 rounded-full shrink-0 ${statusInfo?.dotClass}`}></span>
            {statusInfo?.label}
        </span>)}
      </div>

      {/* Title + sub */}
      {title && <Link
        href={`/info/${id}`}
        className="text-[0.8rem] max-[760px]:text-[0.74rem] text-[#1c1c28] dark:text-[#eeeef0] leading-snug mb-1 tracking-wide no-underline line-clamp-1"
      >
        {title}
      </Link>}
      {(format || episode) && <span className="text-[0.7rem] max-[760px]:text-[0.64rem] font-light text-[#a0a0b8] dark:text-[#4a4d5e] tracking-wide">
        {format ? format : ''} · {episode ? episode : '?'} ep
      </span>}
    </div>
  );
}
