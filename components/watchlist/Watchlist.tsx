'use client'
import { Search, ChevronDown, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import AnimeCard from '../shared/AnimeCard';
import { getWatchlistPageData } from "@/lib/anilist";
import { useBookmarkStore } from "@/stores/store";
import { useEffect, useState } from 'react';
import { AnimeCard as AnimeCardType } from '@/types/interface';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorMessage from '../shared/ErrorMessage';

export default function Watchlist() {
  const arr = useBookmarkStore(state => state.arr)
  const totalPage = Math.ceil(arr.length / 49)
  const [inputStr, setInputStr] = useState<string>('')
  const [wholeData, setWholeData] = useState<AnimeCardType[]>([])
  const [sortBy, setSortBy] = useState('')
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    if (!mounted) return

    if (arr.length === 0) {
      setWholeData([])
      setIsLoading(false)
      setError(false)
      return
    }

    async function getData() {
      setError(false)
      if (wholeData.length === 0) setIsLoading(true)

      const pages = Array.from({ length: totalPage }, (_, i) => i + 1)
      const results = await Promise.all(
        pages.map(p => getWatchlistPageData(arr, p))
      )

      if (results.some(r => r === null)) {
        setError(true)
        setIsLoading(false)
        return
      }

      setWholeData(results.flat() as AnimeCardType[])
      setIsLoading(false)
    }

    getData()
  }, [arr, retryCount, mounted])

  let mediaArr: AnimeCardType[] | undefined = wholeData?.filter(item => ((item?.title?.romaji)?.toLowerCase().includes(inputStr.toLowerCase())))

  mediaArr = [...mediaArr]?.sort((a, b) => {
    if (sortBy === 'title') return (a.title.romaji ?? '').localeCompare(b.title.romaji ?? '')
    if (sortBy === 'score') return (b.averageScore ?? 0) - (a.averageScore ?? 0)
    return 0
  })

  return (
    <div className="min-h-[100svh] pt-30 max-[760px]:pt-24 pb-[100px] bg-[#f5f3ef] dark:bg-[#0e0f14] transition-colors duration-350">

      {/* TOOLBAR */}
      <div className="px-13 max-[1279px]:px-10 max-[1024px]:px-7 max-[760px]:px-5 max-[460px]:px-3.5 pt-7">
        <div className="flex items-center justify-between gap-5 flex-wrap pb-5 max-[1024px]:flex-col max-[1024px]:items-start max-[760px]:items-stretch">

          <div className="flex items-baseline gap-3.5">
            <h1 className="font-serif text-[2rem] max-[760px]:text-[1.65rem] font-normal text-[#1c1c28] dark:text-[#eeeef0] tracking-tight pl-3.5 border-l-2 border-[#b5873a] dark:border-[#c8a96e] leading-none">
              Watchlist
            </h1>
            <span className="text-[0.78rem] font-light text-[#a0a0b8] dark:text-[#4a4d5e] tracking-wide">
              titles
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-nowrap min-w-0 max-w-full max-[1024px]:w-full max-[460px]:gap-2">
            <div className="flex items-center gap-2.25 bg-[#ede9e2] dark:bg-[#1e1f28] px-2 h-8.5 flex-1 min-w-0 text-[#5c5c72] dark:text-[#7a7d8c] focus-within:text-[#b5873a] dark:focus-within:text-[#c8a96e] focus-within:outline focus-within:outline-1 focus-within:outline-[#b5873a]/25 dark:focus-within:outline-[#c8a96e]/25 transition-colors">
              <Search className="nav-icon" size={18} strokeWidth={1.75} aria-hidden="true" />
              <input
                type="text"
                placeholder="Search your list..."
                autoComplete="off"
                className="flex-1 min-w-0 bg-transparent border-none outline-none font-sans text-[0.84rem] font-light text-[#1c1c28] dark:text-[#eeeef0] tracking-wide placeholder:text-[#a0a0b8] dark:placeholder:text-[#4a4d5e] overflow-hidden text-ellipsis whitespace-nowrap"
                value={inputStr}
                onChange={(e) => { setInputStr(e.target.value) }}
              />
            </div>

            <div className="relative shrink-0">
              <select
                defaultValue="date"
                className="appearance-none bg-[#ede9e2] dark:bg-[#1e1f28] border-none h-8.5 pl-2 pr-7 font-sans text-[0.82rem] font-light text-[#5c5c72] dark:text-[#7a7d8c] cursor-pointer tracking-wide outline-none min-w-[100px] max-[760px]:min-w-[120px] max-[460px]:min-w-[110px] hover:text-[#1c1c28] dark:hover:text-[#eeeef0] hover:bg-white dark:hover:bg-[#16171e] hover:outline hover:outline-1 hover:outline-[#b5873a]/25 dark:hover:outline-[#c8a96e]/25 transition-colors"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Date added</option>
                <option value="title">Title A–Z</option>
                <option value="score">Score</option>
              </select>
              <ChevronDown
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a0a0b8] dark:text-[#4a4d5e] pointer-events-none"
                size={18}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </div>
          </div>

        </div>
      </div>

      {/* GRID */}
      <div className="px-13 max-[1279px]:px-10 max-[1024px]:px-7 max-[760px]:px-5 max-[460px]:px-3.5 pt-6 grid grid-cols-7 max-[1279px]:grid-cols-6 max-[1024px]:grid-cols-4 max-[760px]:grid-cols-3 max-[460px]:grid-cols-2 gap-x-4 gap-y-5">

        {isLoading ? (
          <div className="col-span-full flex justify-center py-24">
            <LoadingSpinner label="Loading watchlist" />
          </div>
        ) : error ? (
          <div className="col-span-full flex justify-center py-24">
            <ErrorMessage onRetry={() => setRetryCount(c => c + 1)} />
          </div>
        ) : arr.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center gap-3 py-24 text-center">
            <Bookmark className="text-[#a0a0b8] dark:text-[#4a4d5e]" size={40} strokeWidth={1.25} aria-hidden="true" />
            <h2 className="font-serif text-[1.4rem] font-normal text-[#1c1c28] dark:text-[#eeeef0]">
              Your watchlist is empty
            </h2>
            <p className="text-[0.85rem] font-light text-[#5c5c72] dark:text-[#7a7d8c] max-w-[320px]">
              Anime you save will show up here. Start adding titles from the browse page.
            </p>
          </div>
        ) : (
          mediaArr?.map((item) => (
            <AnimeCard
              id={item.id}
              key={item.id}
              imageUrl={item.coverImage.large}
              rating={item.averageScore}
              status={item.status}
              title={item.title.romaji}
              format={item.format}
              episode={item.episodes}
            />
          ))
        )}
      </div>

    </div>
  );
}

