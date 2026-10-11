'use client'
import { Search, SlidersHorizontal, Bookmark, Sun, Moon, X } from 'lucide-react';
import { getSearchSuggestionData } from '@/lib/anilist';
import { useState, useEffect, useRef } from 'react'
import { SearchSuggestionMedia } from '@/types/interface';
import Form from 'next/form';
import { useThemeStore } from '@/stores/store'

export default function Header() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState<SearchSuggestionMedia[] | null>(null)
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const theme = useThemeStore(state => state.theme)
  const toggleTheme = useThemeStore(state => state.toggleTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    if (mobileOpen) inputRef.current?.focus()
  }, [mobileOpen])

  useEffect(() => {
    async function getData() {
      const data = await getSearchSuggestionData(search)
      setData(data)
    }
    getData()
  }, [search])

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 h-16 flex items-center gap-8 max-[1279px]:gap-6 max-[1024px]:gap-3 px-13 max-[1279px]:px-10 max-[1024px]:px-7 max-[760px]:px-4.5 max-[460px]:px-3.5 border-b border-black/8 dark:border-white/7 bg-[#f5f3ef]/85 dark:bg-[#0e0f14]/85 backdrop-blur-xl">
      {/* Logo */}
      <a href="/" aria-label="Mitai home" className="flex items-center gap-2.5 shrink-0 no-underline max-[760px]:mr-auto text-[#b5873a] dark:text-[#c8a96e]">
        <svg viewBox="48 128 416 260" className="h-6 max-[460px]:h-5 w-auto" fill="currentColor" aria-hidden="true">
          <path d="M75 167 Q256 221 437 167 L453 135 Q256 189 59 135 Z" />
          <rect x="119" y="237" width="274" height="24" />
          <rect x="151" y="172" width="35" height="210" />
          <rect x="326" y="172" width="35" height="210" />
        </svg>
        <span className="font-serif text-2xl max-[460px]:text-xl font-semibold tracking-wide">Mitai</span>
      </a>

      {/* Search (static) */}
      <Form className={`relative flex-1 min-w-0 max-w-96 flex items-center gap-2.5 border-b border-black/8 dark:border-white/7 h-9.5 px-1 text-[#5c5c72] dark:text-[#7a7d8c] ${mobileOpen ? 'max-[760px]:absolute max-[760px]:inset-0 max-[760px]:z-10 max-[760px]:max-w-none max-[760px]:h-auto max-[760px]:px-4.5 max-[460px]:px-3.5 max-[760px]:border-b-0 max-[760px]:bg-[#f5f3ef] dark:max-[760px]:bg-[#0e0f14]' : 'max-[760px]:hidden'}`}
        action={`/search`}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setOpen(false)
          }
        }}
        onSubmit={() => { setOpen(false); setMobileOpen(false) }}
        onKeyDown={(e) => { if (e.key === 'Escape') { setOpen(false); setMobileOpen(false) } }}
      >
        <Search className="nav-icon" size={18} strokeWidth={1.75} aria-hidden="true" />
        <input
          type="text"
          placeholder="Search anime, genres, studios..."
          autoComplete='off'
          className="flex-1 min-w-0 bg-transparent outline-none text-sm font-light text-[#1c1c28] dark:text-[#eeeef0] placeholder:text-[#a0a0b8] dark:placeholder:text-[#4a4d5e]"
          name='q'
          ref={inputRef}
          required
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            if (search.trim() !== '' && data !== null)
              setOpen(true)
          }}
          onFocus={() => {
            if (search.trim() !== '' && data !== null)
              setOpen(true)
          }}
        />

        <button
          type="button"
          title="Close search"
          aria-label="Close search"
          onClick={() => { setOpen(false); setMobileOpen(false) }}
          className="min-[761px]:hidden shrink-0 inline-grid place-items-center w-9.5 h-9.5 rounded-lg text-[#5c5c72] dark:text-[#7a7d8c] hover:bg-[#b5873a]/10 dark:hover:bg-[#c8a96e]/12 hover:text-[#b5873a] dark:hover:text-[#c8a96e] transition-colors"
        >
          <X className="nav-icon" size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>

        {/* Suggestions dropdown (static visual) */}
        {open && <div className="absolute top-full left-0 right-0 mt-1 max-[760px]:mt-0 flex flex-col overflow-hidden rounded-md max-[760px]:rounded-none bg-[#ede9e2] dark:bg-[#1e1f28] shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
          {data?.map(item => (
            <a key={item.id} href={`/info/${item.id}`} className="flex items-center gap-3 px-3 py-2 hover:bg-[#b5873a]/10 dark:hover:bg-[#c8a96e]/12 transition-colors">
              <img loading="lazy" src={item.coverImage.large} alt={item.title.romaji} className="w-9 h-12 shrink-0 object-cover bg-[#a0a0b8]/30 dark:bg-[#4a4d5e]/50" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-normal text-[#1c1c28] dark:text-[#eeeef0]">{item.title.romaji}</p>
                <p className="text-xs font-light text-[#5c5c72] dark:text-[#7a7d8c]">{`${item.format ? item.format + ' | ' : ''} ${item?.episodes ? item.episodes + ' eps | ' : '? eps | '} RATE : ${item?.averageScore ? (item.averageScore / 10).toFixed(1) : ''} `} </p>
              </div>
            </a>
          ))}
        </div>}
      </Form>

      {/* Nav icons */}
      <div className="flex items-center gap-1 ml-auto">
        <button
          type="button"
          title="Search"
          aria-label="Open search"
          onClick={() => setMobileOpen(true)}
          className="min-[761px]:hidden inline-grid place-items-center w-9.5 h-9.5 rounded-lg text-[#5c5c72] dark:text-[#7a7d8c] hover:bg-[#b5873a]/10 dark:hover:bg-[#c8a96e]/12 hover:text-[#b5873a] dark:hover:text-[#c8a96e] transition-colors"
        >
          <Search className="nav-icon" size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <a
          href="/search"
          title="Browse"
          aria-label="Browse"
          className="inline-grid place-items-center w-9.5 h-9.5 rounded-lg text-[#5c5c72] dark:text-[#7a7d8c] hover:bg-[#b5873a]/10 dark:hover:bg-[#c8a96e]/12 hover:text-[#b5873a] dark:hover:text-[#c8a96e] transition-colors"
        >
          <SlidersHorizontal className="nav-icon" size={18} strokeWidth={1.75} aria-hidden="true" />
        </a>
        <a
          href="/watchlist"
          title="Watchlist"
          aria-label="Watchlist"
          className="inline-grid place-items-center w-9.5 h-9.5 rounded-lg text-[#5c5c72] dark:text-[#7a7d8c] hover:bg-[#b5873a]/10 dark:hover:bg-[#c8a96e]/12 hover:text-[#b5873a] dark:hover:text-[#c8a96e] transition-colors"
        >
          <Bookmark className="nav-icon" size={18} strokeWidth={1.75} aria-hidden="true" />
        </a>
        <button
          type="button"
          title="Toggle theme"
          aria-label="Toggle theme"
          className="relative inline-grid place-items-center w-9.5 h-9.5 rounded-lg text-[#5c5c72] dark:text-[#7a7d8c] hover:bg-[#b5873a]/10 dark:hover:bg-[#c8a96e]/12 hover:text-[#b5873a] dark:hover:text-[#c8a96e] transition-colors overflow-hidden"
          onClick={toggleTheme}
        >
          <Sun className="nav-icon absolute opacity-100 dark:opacity-0 transition-opacity" size={18} strokeWidth={1.75} aria-hidden="true" />
          <Moon className="nav-icon absolute opacity-0 dark:opacity-100 transition-opacity" size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}

