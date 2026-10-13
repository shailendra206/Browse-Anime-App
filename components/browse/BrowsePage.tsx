'use client'
import { Search, ChevronDown, ChevronLeft, ChevronRight, FilterX, X } from 'lucide-react';
import AnimeCard from '../shared/AnimeCard';
import { getSearchPageData } from '@/lib/anilist';
import { useEffect, useState } from 'react';
import { SearchDataParams, SearchPageDataMedia } from '@/types/interface';
import LoadingSpinner from '../shared/LoadingSpinner'
import ErrorMessage from '../shared/ErrorMessage'

interface BrowsePageProps { initialSearch?: string | undefined }

export default function BrowsePage({ initialSearch }: BrowsePageProps) {
  const GENRES = ['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Horror', 'Mahou Shoujo', 'Mecha', 'Music', 'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller'];
  const [filter, setFilter] = useState<SearchDataParams>({ search: initialSearch, genre: undefined, status: undefined, season: undefined, seasonYear: undefined, sort: 'TRENDING_DESC', page: 1 })
  const [appliedFilter, setAppliedFilter] = useState(filter)
  const [data, setData] = useState<SearchPageDataMedia | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  function getYearArr() {
    let yearArr = [new Date().getFullYear()]
    for (let i = 2025; i >= 1990; i--) {
      yearArr = [...yearArr, i]
    }
    return yearArr;
  }

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      setError(false)

      const result = await getSearchPageData(appliedFilter)

      if (!result) setError(true)
      else setData(result)
      setIsLoading(false)
    }
    getData()
  }, [appliedFilter])

  return (
    <div className="min-h-[100svh] pt-30 max-[760px]:pt-24 pb-[100px] bg-[#f5f3ef] dark:bg-[#0e0f14] transition-colors duration-350">

      {/* FILTER SECTION */}
      <div className="px-13 max-[1279px]:px-10 max-[1024px]:px-7 max-[760px]:px-4.5 max-[460px]:px-3.5 pt-7 pb-6 flex flex-col gap-4">

        {/* header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3.5">
            <h1 className="font-serif text-[2rem] max-[760px]:text-[1.65rem] font-normal text-[#1c1c28] dark:text-[#eeeef0] tracking-tight pl-3.5 border-l-2 border-[#b5873a] dark:border-[#c8a96e] leading-none">
              Browse
            </h1>
            <span className="text-[0.78rem] font-light text-[#a0a0b8] dark:text-[#4a4d5e] tracking-wide">
              Anime
            </span>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 font-sans text-[0.78rem] font-normal text-[#5c5c72] dark:text-[#7a7d8c] bg-transparent border-none cursor-pointer tracking-wide py-1.5 shrink-0 hover:text-[#b5873a] dark:hover:text-[#c8a96e] transition-colors"
            onClick={() => {
              setFilter({ search: undefined, genre: undefined, status: undefined, season: undefined, seasonYear: undefined, sort: 'TRENDING_DESC', page: 1 })
              setAppliedFilter({ search: undefined, genre: undefined, status: undefined, season: undefined, seasonYear: undefined, sort: 'TRENDING_DESC', page: 1 })
            }}

          >
            <FilterX size={16} strokeWidth={1.75} aria-hidden="true" />
            Clear filters
          </button>
        </div>

        {/* filter bar */}
        <form className="flex items-center gap-2.5 flex-wrap"
          onSubmit={(e) => {
            e.preventDefault()
            setAppliedFilter({ ...filter, page: 1 })
          }}
        >
          <div className="flex-1 min-w-45 max-[1024px]:w-full max-[1024px]:basis-full flex items-center gap-2.25 bg-[#ede9e2] dark:bg-[#1e1f28] px-2 h-8.5 text-[#5c5c72] dark:text-[#7a7d8c] focus-within:text-[#b5873a] dark:focus-within:text-[#c8a96e] focus-within:outline focus-within:outline-1 focus-within:outline-[#b5873a]/25 dark:focus-within:outline-[#c8a96e]/25 transition-colors">
            <Search className="nav-icon" size={18} strokeWidth={1.75} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search title..."
              autoComplete="off"
              className="flex-1 min-w-0 bg-transparent border-none outline-none font-sans text-[0.84rem] font-light text-[#1c1c28] dark:text-[#eeeef0] tracking-wide placeholder:text-[#a0a0b8] dark:placeholder:text-[#4a4d5e]"
              value={filter.search ?? ''}
              onChange={(e) => { setFilter(prev => ({ ...prev, search: e.target.value || undefined, page: 1 })) }}
            />
          </div>

          {/* genre dropdown - pure HTML: Popover API + hardcoded checkboxes. Click toggles each genre; closes on outside click / Esc / opening another popover */}
          <div className="relative shrink-0 max-[1024px]:flex-1 max-[1024px]:min-w-25 max-[1024px]:max-w-40 max-[760px]:min-w-[calc(33.333%-7px)] max-[760px]:max-w-none group">
            <button
              type="button"
              popoverTarget="genre-filter-menu"
              className="[anchor-name:--genre-trigger] inline-flex items-center w-full h-8.5 pl-2 pr-7 min-w-25 text-left bg-[#ede9e2] dark:bg-[#1e1f28] border-none font-sans text-[0.82rem] leading-none font-light text-[#5c5c72] dark:text-[#7a7d8c] cursor-pointer tracking-wide outline-none hover:text-[#1c1c28] dark:hover:text-[#eeeef0] hover:bg-white dark:hover:bg-[#16171e] hover:outline hover:outline-1 hover:outline-[#b5873a]/25 dark:hover:outline-[#c8a96e]/25 transition-colors group-has-[:popover-open]:text-[#1c1c28] dark:group-has-[:popover-open]:text-[#eeeef0] group-has-[:popover-open]:bg-white dark:group-has-[:popover-open]:bg-[#16171e] group-has-[:popover-open]:outline group-has-[:popover-open]:outline-1 group-has-[:popover-open]:outline-[#b5873a]/25 dark:group-has-[:popover-open]:outline-[#c8a96e]/25"
            >
              Genre
            </button>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a0a0b8] dark:text-[#4a4d5e] pointer-events-none transition-transform group-has-[:popover-open]:rotate-180" size={18} strokeWidth={1.75} aria-hidden="true" />

            <div
              id="genre-filter-menu"
              popover="auto"
              className="[position-anchor:--genre-trigger] [top:anchor(bottom)] [left:anchor(left)] [min-width:anchor-size(width)] w-max max-h-96 overflow-y-auto right-auto bottom-auto m-0 p-0 open:flex flex-col opacity-0 open:opacity-100 starting:open:opacity-0 transition-[opacity,display,overlay] duration-100 ease-out transition-discrete bg-[#ede9e2] dark:bg-[#1e1f28] border border-black/30 dark:border-white/25 shadow-[0_2px_8px_rgba(0,0,0,0.35)] [&>label]:flex [&>label]:items-center [&>label]:justify-between [&>label]:gap-3 [&>label]:h-6 [&>label]:px-2 [&>label]:font-sans [&>label]:text-[0.82rem] [&>label]:font-normal [&>label]:text-black dark:[&>label]:text-white [&>label]:cursor-default [&>label]:select-none [&>label:hover]:bg-[#1a66cc] [&>label:hover]:text-white [&>label:active]:bg-[#1555aa] [&>label:has(:checked)]:bg-[#b5873a]/15 dark:[&>label:has(:checked)]:bg-[#c8a96e]/20 [&>label:has(:checked)]:text-[#b5873a] dark:[&>label:has(:checked)]:text-[#c8a96e] [&>label]:transition-colors [&>label]:duration-100 [&>label:has(:checked):hover]:bg-[#b5873a]/25 dark:[&>label:has(:checked):hover]:bg-[#c8a96e]/30 [&>label:has(:checked):active]:bg-[#b5873a]/35 dark:[&>label:has(:checked):active]:bg-[#c8a96e]/40 [&>label:has(:focus-visible)]:outline [&>label:has(:focus-visible)]:outline-1 [&>label:has(:focus-visible)]:-outline-offset-1 [&>label:has(:focus-visible)]:outline-[#1a66cc]"
            >
              {/* <input type="checkbox" name="genre" value={item}  className="sr-only" */}

              {GENRES.map((item) => (
                <label key={item}>
                  <input type="checkbox" name="genre" value={item} className="sr-only" checked={filter.genre?.includes(item) ?? false}
                    onChange={(e) => {
                      if (filter.genre?.includes(item)) {
                        setFilter(prev => ({ ...prev, genre: prev.genre?.filter(index => index !== item).length === 0 ? undefined : prev.genre?.filter(index => index !== item) }))
                      }
                      else {
                        setFilter(prev => ({ ...prev, genre: [...prev.genre ?? [], e.target.value], page: 1 }))
                      }
                    }}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="relative shrink-0 max-[1024px]:flex-1 max-[1024px]:min-w-25 max-[1024px]:max-w-40 max-[760px]:min-w-[calc(33.333%-7px)] max-[760px]:max-w-none">
            <select
              value={filter.status ?? ''}
              className="filter-select w-full appearance-none bg-[#ede9e2] dark:bg-[#1e1f28] border-none h-8.5 pl-2 pr-7 font-sans text-[0.82rem] leading-none font-light text-[#5c5c72] dark:text-[#7a7d8c] cursor-pointer tracking-wide outline-none min-w-25 hover:text-[#1c1c28] dark:hover:text-[#eeeef0] hover:bg-white dark:hover:bg-[#16171e] hover:outline hover:outline-1 hover:outline-[#b5873a]/25 dark:hover:outline-[#c8a96e]/25 transition-colors"
              onChange={(e) => { setFilter(prev => ({ ...prev, status: e.target.value === '' ? undefined : e.target.value, page: 1 })) }}
            >
              <option value=''>Status</option>
              <option value="RELEASING">Airing</option>
              <option value="FINISHED">Finished</option>
              <option value="NOT_YET_RELEASED">Upcoming</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a0a0b8] dark:text-[#4a4d5e] pointer-events-none" size={18} strokeWidth={1.75} aria-hidden="true" />
          </div>

          <div className="relative shrink-0 max-[1024px]:flex-1 max-[1024px]:min-w-25 max-[1024px]:max-w-40 max-[760px]:min-w-[calc(33.333%-7px)] max-[760px]:max-w-none">
            <select
              value={filter.season ?? ''}
              className="filter-select w-full appearance-none bg-[#ede9e2] dark:bg-[#1e1f28] border-none h-8.5 pl-2 pr-7 font-sans text-[0.82rem] leading-none font-light text-[#5c5c72] dark:text-[#7a7d8c] cursor-pointer tracking-wide outline-none min-w-25 hover:text-[#1c1c28] dark:hover:text-[#eeeef0] hover:bg-white dark:hover:bg-[#16171e] hover:outline hover:outline-1 hover:outline-[#b5873a]/25 dark:hover:outline-[#c8a96e]/25 transition-colors"
              onChange={(e) => { setFilter(prev => ({ ...prev, season: e.target.value === '' ? undefined : e.target.value, page: 1 })) }}
            >
              <option value="">Season</option>
              <option value="WINTER">Winter</option>
              <option value="SPRING">Spring</option>
              <option value="SUMMER">Summer</option>
              <option value="FALL">Fall</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a0a0b8] dark:text-[#4a4d5e] pointer-events-none" size={18} strokeWidth={1.75} aria-hidden="true" />
          </div>

          <div className="relative shrink-0 max-[1024px]:flex-1 max-[1024px]:min-w-25 max-[1024px]:max-w-40 max-[760px]:min-w-[calc(33.333%-7px)] max-[760px]:max-w-none">
            <select
              value={filter.seasonYear ?? ''}
              className="filter-select w-full appearance-none bg-[#ede9e2] dark:bg-[#1e1f28] border-none h-8.5 pl-2 pr-7 font-sans text-[0.82rem] leading-none font-light text-[#5c5c72] dark:text-[#7a7d8c] cursor-pointer tracking-wide outline-none min-w-25 hover:text-[#1c1c28] dark:hover:text-[#eeeef0] hover:bg-white dark:hover:bg-[#16171e] hover:outline hover:outline-1 hover:outline-[#b5873a]/25 dark:hover:outline-[#c8a96e]/25 transition-colors"
              onChange={(e) => setFilter(prev => ({ ...prev, seasonYear: e.target.value === '' ? undefined : Number(e.target.value), page: 1 }))}
            >
              <option value="">Year</option>
              {getYearArr().map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a0a0b8] dark:text-[#4a4d5e] pointer-events-none" size={18} strokeWidth={1.75} aria-hidden="true" />
          </div>

          <div className="relative shrink-0 max-[1024px]:flex-1 max-[1024px]:min-w-25 max-[1024px]:max-w-40 max-[760px]:min-w-[calc(33.333%-7px)] max-[760px]:max-w-none">
            <select
              value={filter.sort ?? 'TRENDING_DESC'}
              className="filter-select w-full appearance-none bg-[#ede9e2] dark:bg-[#1e1f28] border-none h-8.5 pl-2 pr-7 font-sans text-[0.82rem] leading-none font-light text-[#5c5c72] dark:text-[#7a7d8c] cursor-pointer tracking-wide outline-none min-w-25 hover:text-[#1c1c28] dark:hover:text-[#eeeef0] hover:bg-white dark:hover:bg-[#16171e] hover:outline hover:outline-1 hover:outline-[#b5873a]/25 dark:hover:outline-[#c8a96e]/25 transition-colors"
              onChange={(e) => setFilter(prev => ({ ...prev, sort: e.target.value === '' ? undefined : e.target.value, page: 1 }))}
            >
              <option value="TRENDING_DESC">Trending</option>
              <option value="POPULARITY_DESC">Popular</option>
              <option value="SCORE_DESC">Top Rated</option>
              <option value="TITLE_ROMAJI">A–Z</option>
              <option value="START_DATE_DESC">Newest</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a0a0b8] dark:text-[#4a4d5e] pointer-events-none" size={18} strokeWidth={1.75} aria-hidden="true" />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 h-8.5 px-4.5 bg-[#ede9e2] dark:bg-[#1e1f28] text-[#5c5c72] dark:text-[#7a7d8c] border-none font-sans text-[0.82rem] font-normal tracking-wide cursor-pointer shrink-0 max-[1024px]:flex-1 max-[1024px]:justify-center max-[1024px]:min-w-25 max-[760px]:min-w-[calc(33.333%-7px)] hover:text-[#1c1c28] dark:hover:text-[#eeeef0] hover:bg-white dark:hover:bg-[#16171e] hover:outline hover:outline-1 hover:outline-[#b5873a]/25 dark:hover:outline-[#c8a96e]/25 transition-colors"
          >
            <Search size={16} strokeWidth={1.75} aria-hidden="true" />
            Search
          </button>
        </form>

        {/* active filter chips */}
        <div className="flex flex-wrap gap-2">
          {filter?.genre?.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.25 font-sans text-[0.76rem] font-normal text-[#b5873a] dark:text-[#c8a96e] bg-[#b5873a]/10 dark:bg-[#c8a96e]/12 border border-[#b5873a]/22 dark:border-[#c8a96e]/25 rounded-full px-3 py-1 cursor-pointer tracking-wide hover:bg-[#b5873a] dark:hover:bg-[#c8a96e] hover:text-white dark:hover:text-[#0e0f14] hover:border-[#b5873a] dark:hover:border-[#c8a96e] transition-colors"
            >
              {item}
              <button onClick={() => setFilter(prev => ({ ...prev, genre: prev.genre?.filter(index => index !== item).length === 0 ? undefined : prev.genre?.filter(index => index !== item) }))}><X size={14} strokeWidth={2} aria-hidden="true" /></button>
            </span>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="px-13 max-[1279px]:px-10 max-[1024px]:px-7 max-[760px]:px-4.5 max-[460px]:px-3.5 grid grid-cols-7 max-[1279px]:grid-cols-6 max-[1024px]:grid-cols-4 max-[760px]:grid-cols-3 max-[460px]:grid-cols-2 gap-x-4 max-[760px]:gap-x-3 max-[460px]:gap-x-2.5 gap-y-5 max-[760px]:gap-y-4">

        {isLoading ? (
          <div className="col-span-full flex justify-center py-24">
            <LoadingSpinner label="Loading anime" />
          </div>
        ) : error ? (
          <div className="col-span-full flex justify-center py-24">
            <ErrorMessage onRetry={() => setAppliedFilter(prev => ({ ...prev }))} />
          </div>
        ) : data?.media?.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center gap-3 py-24 text-center">
            <Search className="text-[#a0a0b8] dark:text-[#4a4d5e]" size={40} strokeWidth={1.25} aria-hidden="true" />
            <h2 className="font-serif text-[1.4rem] font-normal text-[#1c1c28] dark:text-[#eeeef0]">
              No results found
            </h2>
            <p className="text-[0.85rem] font-light text-[#5c5c72] dark:text-[#7a7d8c] max-w-[320px]">
              Try adjusting your filters or search term.
            </p>
          </div>
        ) : (
          data?.media?.map((item) => (
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

        {/* Pagination */}
        <nav aria-label="Browse pages" className="col-span-full flex items-center justify-center gap-1 pt-10 pb-2">
          <button className="inline-grid place-items-center min-w-9 h-9 border border-black/8 dark:border-white/7 rounded-lg bg-transparent text-[#5c5c72] dark:text-[#7a7d8c] text-[0.82rem] disabled:opacity-30 hover:not-disabled:bg-[#ede9e2] dark:hover:not-disabled:bg-[#1e1f28] hover:not-disabled:text-[#1c1c28] dark:hover:not-disabled:text-[#eeeef0] hover:not-disabled:border-[#a0a0b8] dark:hover:not-disabled:border-[#4a4d5e] transition-colors"
            disabled={appliedFilter.page <= 1}
            onClick={() => {
              window.scrollTo({ top: 10 })
              setAppliedFilter(prev => ({ ...prev, page: prev.page - 1 }))
            }}
          >
            <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <div className="flex items-center gap-1">
            <button className="inline-grid place-items-center min-w-9 h-9 rounded-lg border border-[#b5873a]/22 dark:border-[#c8a96e]/25 bg-[#b5873a]/10 dark:bg-[#c8a96e]/12 text-[#b5873a] dark:text-[#c8a96e] text-[0.82rem]">
              {appliedFilter.page}
            </button>
          </div>
          <button className="inline-grid place-items-center min-w-9 h-9 border border-black/8 dark:border-white/7 rounded-lg bg-transparent text-[#5c5c72] dark:text-[#7a7d8c] text-[0.82rem] disabled:opacity-30 hover:not-disabled:bg-[#ede9e2] dark:hover:not-disabled:bg-[#1e1f28] hover:not-disabled:text-[#1c1c28] dark:hover:not-disabled:text-[#eeeef0] hover:not-disabled:border-[#a0a0b8] dark:hover:not-disabled:border-[#4a4d5e] transition-colors"
            disabled={!(data?.pageInfo?.hasNextPage)}
            onClick={() => {
              window.scrollTo({ top: 0 })
              setAppliedFilter(prev => ({ ...prev, page: prev.page + 1 }))
            }}
          >
            <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </nav>

      </div>

    </div>
  );
}
