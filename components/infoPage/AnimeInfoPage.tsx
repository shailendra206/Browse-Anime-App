'use client'
import { Star, Play, Bookmark } from 'lucide-react';
import AnimeCard from '../shared/AnimeCard';
import { InfoPageProps } from '@/types/interface';
import { useBookmarkStore } from '@/stores/store';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function stripHtml(text: string) {
  return text.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').replace(/\n\s*\n+/g, '\n\n').trim();
}

function getMonth(month: number | null) {
  return month ? months[month - 1] : '';
}

export default function AnimeInfoPage({ data }: InfoPageProps) {
  const realtedTitles = data.relations?.nodes.filter(item => item.type === 'ANIME')
  const arr = useBookmarkStore(state => state.arr)
  const setArr = useBookmarkStore(state => state.setArr)
  return (
    <div className="bg-[#f5f3ef] dark:bg-[#0e0f14]">
      {/* HERO */}
      <div className="relative pt-16">
        <div className="relative w-full h-[460px] max-[1279px]:h-[400px] max-[1024px]:h-[320px] max-[760px]:h-[240px] max-[460px]:h-[180px] overflow-hidden bg-[#ede9e2] dark:bg-[#1e1f28]">
          <img
            src={data.bannerImage || "https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-vM9WSf9yyLB2.jpg"}
            alt={data.title.romaji || ''}
            className="w-full h-full object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f5f3ef] dark:from-[#0e0f14] from-0% to-transparent to-60% [background-image:linear-gradient(to_top,var(--tw-gradient-stops)),linear-gradient(to_right,var(--tw-gradient-stops))]" />
        </div>

        <div className="relative flex items-end gap-9 max-[1024px]:gap-6.5 max-[760px]:flex-col max-[760px]:items-center max-[760px]:text-center px-13 max-[1279px]:px-10 max-[1024px]:px-7 max-[760px]:px-5 max-[460px]:px-3.5 pb-13 max-[1024px]:pb-13 max-[760px]:pb-5 -mt-45 max-[1024px]:-mt-30 max-[760px]:-mt-20 max-[460px]:-mt-15 z-2">
          <img
            src={data.coverImage.large || "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-vN39rH1nlZmz.jpg"}
            alt={data.title.romaji || ''}
            className="flex-shrink-0 w-50 max-[1024px]:w-40 max-[760px]:w-32.5 max-[460px]:w-27.5 aspect-2/3 rounded-xl object-cover shadow-[0_24px_64px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_64px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.07)]"
          />

          <div className="flex-1 min-w-0 pb-1">
            {/* genres */}
            {data.genres && <div className="flex flex-wrap gap-1.5 mb-3.5 max-[760px]:justify-center">
              {data.genres.slice(0, 4).map((genre) => (
                <span
                  key={genre}
                  className="text-[0.68rem] font-normal tracking-wider uppercase px-2.5 py-0.75 rounded-[1px] bg-[#0e0f14]/45 border border-white/14 text-[#f0cf8a] shadow-[0_6px_20px_rgba(0,0,0,0.24)] backdrop-blur-md"
                >
                  {genre}
                </span>
              ))}
            </div>}

            {/* title */}
            {data.title.romaji && <h1 className="font-serif text-[clamp(1.9rem,3.6vw,3.4rem)] font-light leading-[1.08] tracking-tight text-[#1c1c28] dark:text-[#eeeef0] mb-4">
              {data.title.romaji}
            </h1>}

            {/* meta strip */}
            <div className="flex items-stretch flex-wrap gap-px mb-6 max-[760px]:justify-center bg-black/8 dark:bg-white/7 bg-clip-padding border border-black/8 dark:border-white/7 rounded-[1px] overflow-hidden w-fit max-w-full">
              {data.averageScore && <div className="flex flex-col gap-1 px-5 py-2.5 grow bg-white dark:bg-[#16171e] min-w-20 max-[760px]:items-center">
                <span className="text-[0.62rem] uppercase tracking-wider text-[#a0a0b8] dark:text-[#4a4d5e] whitespace-nowrap">Score</span>
                <span className="text-[0.88rem] text-[#b5873a] dark:text-[#c8a96e] flex items-center gap-1 whitespace-nowrap">
                  <Star className="rating-icon" size={13} strokeWidth={2} fill="currentColor" aria-hidden="true" /> {(data.averageScore / 10).toFixed(1)}
                </span>
              </div>}
              {data.format && <div className="flex flex-col gap-1 px-5 py-2.5 grow bg-white dark:bg-[#16171e] min-w-20 max-[760px]:items-center">
                <span className="text-[0.62rem] uppercase tracking-wider text-[#a0a0b8] dark:text-[#4a4d5e] whitespace-nowrap">Format</span>
                <span className="text-[0.88rem] text-[#5c5c72] dark:text-[#7a7d8c] whitespace-nowrap">{data.format}</span>
              </div>}
              {data.episodes && <div className="flex flex-col gap-1 px-5 py-2.5 grow bg-white dark:bg-[#16171e] min-w-20 max-[760px]:items-center">
                <span className="text-[0.62rem] uppercase tracking-wider text-[#a0a0b8] dark:text-[#4a4d5e] whitespace-nowrap">Episodes</span>
                <span className="text-[0.88rem] text-[#5c5c72] dark:text-[#7a7d8c] whitespace-nowrap">{data.episodes}</span>
              </div>}
              {data.status && <div className="flex flex-col gap-1 px-5 py-2.5 grow bg-white dark:bg-[#16171e] min-w-20 max-[760px]:items-center">
                <span className="text-[0.62rem] uppercase tracking-wider text-[#a0a0b8] dark:text-[#4a4d5e] whitespace-nowrap">Status</span>
                <span className="text-[0.88rem] text-[#5c5c72] dark:text-[#7a7d8c] whitespace-nowrap">{data.status}</span>
              </div>}
              {(data.season || data.seasonYear) && <div className="flex flex-col gap-1 px-5 py-2.5 grow bg-white dark:bg-[#16171e] min-w-20 max-[760px]:items-center">
                <span className="text-[0.62rem] uppercase tracking-wider text-[#a0a0b8] dark:text-[#4a4d5e] whitespace-nowrap">Season</span>
                <span className="text-[0.88rem] text-[#5c5c72] dark:text-[#7a7d8c] whitespace-nowrap">{data.season} &nbsp; {data.seasonYear}</span>
              </div>}
            </div>

            {/* actions */}
            <div className="flex items-center gap-2.5 flex-wrap max-[760px]:flex-col max-[760px]:items-stretch">
              {data?.trailer?.site && <a href="#trailer" className="inline-flex items-center justify-center gap-2 rounded-[1px] bg-[#b5873a] dark:bg-[#c8a96e] text-white dark:text-[#0e0f14] border border-transparent px-6.5 py-2.75 text-[0.85rem] font-medium tracking-wide shadow-[0_10px_24px_rgba(181,135,58,0.18)] transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out hover:bg-[#c79a4c] dark:hover:bg-[#d8ba7c] hover:shadow-[0_14px_34px_rgba(181,135,58,0.28)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_6px_16px_rgba(181,135,58,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e]/70">
                <Play className="button-icon" size={16} strokeWidth={2} fill="none" stroke="currentColor" aria-hidden="true" />
                Watch Trailer
              </a>}
              <button className="inline-flex items-center justify-center gap-2 rounded-[1px] bg-transparent text-[#1c1c28] dark:text-[#eeeef0] border border-black/8 dark:border-white/7 px-5.5 py-2.75 text-[0.85rem] font-normal tracking-wide transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out hover:bg-[#1c1c28]/5 dark:hover:bg-white/6 hover:border-[#b5873a]/45 dark:hover:border-[#c8a96e]/45 hover:text-[#b5873a] dark:hover:text-[#c8a96e] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] active:translate-y-0 active:bg-[#1c1c28]/8 dark:active:bg-white/9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e]/60"
                onClick={() => {setArr(data.id)}}
              >
                <Bookmark className="button-icon" size={16} strokeWidth={1.75} aria-hidden="true" />
                {arr.includes(data.id) ? `Remove from watchlist` : `Add to watchlist`}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="grid grid-cols-[1fr_300px] max-[1279px]:grid-cols-[1fr_280px] max-[1024px]:grid-cols-1 gap-x-13 max-[1279px]:gap-x-10 max-[1024px]:gap-x-0 px-13 max-[1279px]:px-10 max-[1024px]:px-7 max-[760px]:px-5 max-[460px]:px-3.5 pb-25 items-start">

        {/* MAIN */}
        <div className="flex flex-col gap-13 pt-12 max-[760px]:gap-10 max-[760px]:pt-8 max-[460px]:gap-8 max-[460px]:pt-6 min-w-0">

          {/* SYNOPSIS */}
          {data.description && <section className="group flex flex-col gap-4.5">
            <input id="synopsis-toggle" type="checkbox" className="sr-only" />
            <h2 className="font-serif text-[1.45rem] font-normal text-[#1c1c28] dark:text-[#eeeef0] tracking-tight pl-3 border-l-2 border-[#b5873a] dark:border-[#c8a96e] leading-none">
              Synopsis
            </h2>
            <p className="text-[0.92rem] font-light text-[#5c5c72] dark:text-[#7a7d8c] leading-[1.9] whitespace-pre-line line-clamp-3 group-has-[:checked]:line-clamp-none">
              {stripHtml(data.description)}
            </p>
            <label htmlFor="synopsis-toggle" className="text-[#b5873a] dark:text-[#c8a96e] font-sans text-[0.83rem] font-normal cursor-pointer select-none self-start underline underline-offset-3 decoration-[#b5873a]/25 dark:decoration-[#c8a96e]/25 hover:opacity-70 transition-opacity">
              <span className="group-has-[:checked]:hidden">Read More</span>
              <span className="hidden group-has-[:checked]:inline">Read Less</span>
            </label>
          </section>}

          {/* TRAILER */}
          {data?.trailer?.site && <section id="trailer" className="flex flex-col gap-4.5 scroll-mt-24">
            <h2 className="font-serif text-[1.45rem] font-normal text-[#1c1c28] dark:text-[#eeeef0] tracking-tight pl-3 border-l-2 border-[#b5873a] dark:border-[#c8a96e] leading-none">
              Trailer
            </h2>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#ede9e2] dark:bg-[#1e1f28] shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
              <iframe
                loading="lazy"
                className="absolute inset-0 w-full h-full border-none"
                src={data?.trailer?.site === 'dailymotion' ? `https://www.dailymotion.com/embed/video/${data.trailer.id}` : `https://www.youtube.com/embed/${data?.trailer?.id}`}
                title="Anime Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>}

          {/* CHARACTERS */}
          {data.characters.edges[0]?.node && <section className="flex flex-col gap-4.5">
            <h2 className="font-serif text-[1.45rem] font-normal text-[#1c1c28] dark:text-[#eeeef0] tracking-tight pl-3 border-l-2 border-[#b5873a] dark:border-[#c8a96e] leading-none">
              Characters & Their Voice Artists
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {data.characters.edges.map((item, index) => (
                <div key={index} className={`flex-shrink-0 w-24 flex flex-col items-center gap-2 ${item.voiceActors[0] ? 'group' : ''}`}>
                  {/* character circle + voice actor badge */}
                  <div className="relative w-21 h-19">
                    {item.voiceActors[0] && (
                      <label className="absolute inset-0 z-30 cursor-pointer">
                        <input type="checkbox" className="sr-only" aria-label="Swap character and voice actor photos" />
                      </label>
                    )}
                    <div className="absolute left-0 top-0 w-18 h-18 z-10 rounded-full overflow-hidden bg-[#ede9e2] dark:bg-[#1e1f28] ring-2 ring-[#f5f3ef] dark:ring-[#0e0f14] transition-all duration-250 ease-out group-has-[:checked]:left-14 group-has-[:checked]:top-12 group-has-[:checked]:w-7 group-has-[:checked]:h-7 group-has-[:checked]:z-20">
                      <img src={item?.node?.image?.large || "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-vN39rH1nlZmz.jpg"} alt={item.node.name.full || ''} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute left-14 top-12 w-7 h-7 z-20 rounded-full overflow-hidden bg-[#ede9e2] dark:bg-[#1e1f28] ring-2 ring-[#f5f3ef] dark:ring-[#0e0f14] transition-all duration-250 ease-out group-has-[:checked]:left-0 group-has-[:checked]:top-0 group-has-[:checked]:w-18 group-has-[:checked]:h-18 group-has-[:checked]:z-10">
                      {item.voiceActors[0]?.image?.large && (
                        <img src={item.voiceActors[0].image.large} alt={item.voiceActors[0].name.full || ''} loading="lazy" className="w-full h-full object-cover" />)}
                    </div>
                  </div>

                  {/* names */}
                  <div className="relative flex flex-col items-center gap-0.5 min-w-0 w-full h-8">
                    <div className="absolute inset-0 flex flex-col items-center gap-0.5 opacity-0 transition-opacity duration-250 group-has-[:checked]:opacity-100">
                      <p className="text-[0.72rem] font-normal text-[#1c1c28] dark:text-[#eeeef0] leading-tight text-center line-clamp-1 w-full">{item?.voiceActors[0]?.name?.full}</p>
                      <p className="text-[0.64rem] font-light text-[#a0a0b8] dark:text-[#4a4d5e] leading-tight text-center line-clamp-1 w-full">{item?.node?.name?.full}</p>
                    </div>
                    <p className="text-[0.72rem] font-normal text-[#1c1c28] dark:text-[#eeeef0] leading-tight text-center line-clamp-1 w-full transition-opacity duration-250 group-has-[:checked]:opacity-0">
                      {item?.node?.name?.full}
                    </p>
                    <p className="text-[0.64rem] font-light text-[#a0a0b8] dark:text-[#4a4d5e] leading-tight text-center line-clamp-1 w-full transition-opacity duration-250 group-has-[:checked]:opacity-0">
                      {item?.voiceActors[0]?.name?.full}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>}

          {/* RELATED TITLES — reusing AnimeCard, no new card type */}
          {realtedTitles.length > 0 && <section className="flex flex-col gap-4.5">
            {data.relations?.nodes[0].id}
            <h2 className="font-serif text-[1.45rem] font-normal text-[#1c1c28] dark:text-[#eeeef0] tracking-tight pl-3 border-l-2 border-[#b5873a] dark:border-[#c8a96e] leading-none">
              Related Titles
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {data.relations?.nodes.filter(item => item.type === 'ANIME').map((item) => (
                <div key={item.id} className="flex-shrink-0 w-36 max-[760px]:w-28">
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
                </div>
              ))}
            </div>
          </section>}

        </div>

        {/* SIDEBAR */}
        <aside className="flex flex-col gap-9 pt-12 max-[1024px]:pt-8 max-[760px]:pt-6 min-w-0 sticky top-22 max-[1024px]:static">

          <section className="flex flex-col gap-4.5">
            <h2 className="font-serif text-[1.45rem] font-normal text-[#1c1c28] dark:text-[#eeeef0] tracking-tight pl-3 border-l-2 border-[#b5873a] dark:border-[#c8a96e] leading-none">
              Information
            </h2>
            <dl className="grid grid-cols-[auto_1fr] bg-white dark:bg-[#16171e] border border-black/8 dark:border-white/7 rounded-[1px] overflow-hidden [&>div:last-child>*]:border-b-0">
              {data.format && <div className="contents">
                <dt className="py-2.5 pl-4.5 pr-3 text-[0.63rem] font-normal uppercase tracking-wider text-[#a0a0b8] dark:text-[#4a4d5e] whitespace-nowrap border-b border-black/8 dark:border-white/7 flex items-center">Format</dt>
                <dd className="py-2.5 pl-4 pr-4.5 text-[0.78rem] font-light text-[#5c5c72] dark:text-[#7a7d8c] border-b border-l border-black/8 dark:border-white/7 flex items-center">{data.format}</dd>
              </div>}
              {data.episodes && <div className="contents">
                <dt className="py-2.5 pl-4.5 pr-3 text-[0.63rem] font-normal uppercase tracking-wider text-[#a0a0b8] dark:text-[#4a4d5e] whitespace-nowrap border-b border-black/8 dark:border-white/7 flex items-center">Episodes</dt>
                <dd className="py-2.5 pl-4 pr-4.5 text-[0.78rem] font-light text-[#5c5c72] dark:text-[#7a7d8c] border-b border-l border-black/8 dark:border-white/7 flex items-center">{data.episodes}</dd>
              </div>}
              {data.duration && <div className="contents">
                <dt className="py-2.5 pl-4.5 pr-3 text-[0.63rem] font-normal uppercase tracking-wider text-[#a0a0b8] dark:text-[#4a4d5e] whitespace-nowrap border-b border-black/8 dark:border-white/7 flex items-center">Duration</dt>
                <dd className="py-2.5 pl-4 pr-4.5 text-[0.78rem] font-light text-[#5c5c72] dark:text-[#7a7d8c] border-b border-l border-black/8 dark:border-white/7 flex items-center">{data.duration}</dd>
              </div>}
              {data.status && <div className="contents">
                <dt className="py-2.5 pl-4.5 pr-3 text-[0.63rem] font-normal uppercase tracking-wider text-[#a0a0b8] dark:text-[#4a4d5e] whitespace-nowrap border-b border-black/8 dark:border-white/7 flex items-center">Status</dt>
                <dd className="py-2.5 pl-4 pr-4.5 text-[0.78rem] font-light text-[#5c5c72] dark:text-[#7a7d8c] border-b border-l border-black/8 dark:border-white/7 flex items-center">{data.status}</dd>
              </div>}
              {data.startDate && <div className="contents">
                <dt className="py-2.5 pl-4.5 pr-3 text-[0.63rem] font-normal uppercase tracking-wider text-[#a0a0b8] dark:text-[#4a4d5e] whitespace-nowrap border-b border-black/8 dark:border-white/7 flex items-center">Start date</dt>
                <dd className="py-2.5 pl-4 pr-4.5 text-[0.78rem] font-light text-[#5c5c72] dark:text-[#7a7d8c] border-b border-l border-black/8 dark:border-white/7 flex items-center">{data.startDate.day} {getMonth(data.startDate.month)} {data.startDate.year}</dd>
              </div>}
              {data?.studios?.nodes[0]?.name && <div className="contents">
                <dt className="py-2.5 pl-4.5 pr-3 text-[0.63rem] font-normal uppercase tracking-wider text-[#a0a0b8] dark:text-[#4a4d5e] whitespace-nowrap border-b border-black/8 dark:border-white/7 flex items-center">Studio</dt>
                <dd className="py-2.5 pl-4 pr-4.5 text-[0.78rem] font-light text-[#5c5c72] dark:text-[#7a7d8c] border-b border-l border-black/8 dark:border-white/7 flex items-center">{data.studios.nodes[0].name}</dd>
              </div>}
              {data.type && <div className="contents">
                <dt className="py-2.5 pl-4.5 pr-3 text-[0.63rem] font-normal uppercase tracking-wider text-[#a0a0b8] dark:text-[#4a4d5e] whitespace-nowrap border-b border-black/8 dark:border-white/7 flex items-center">Source</dt>
                <dd className="py-2.5 pl-4 pr-4.5 text-[0.78rem] font-light text-[#5c5c72] dark:text-[#7a7d8c] border-b border-l border-black/8 dark:border-white/7 flex items-center">{data.type}</dd>
              </div>}
              {data.popularity && <div className="contents">
                <dt className="py-2.5 pl-4.5 pr-3 text-[0.63rem] font-normal uppercase tracking-wider text-[#a0a0b8] dark:text-[#4a4d5e] whitespace-nowrap border-b border-black/8 dark:border-white/7 flex items-center">Popularity</dt>
                <dd className="py-2.5 pl-4 pr-4.5 text-[0.78rem] font-light text-[#5c5c72] dark:text-[#7a7d8c] border-b border-l border-black/8 dark:border-white/7 flex items-center">{data.popularity}</dd>
              </div>}
              {data.favourites && <div className="contents">
                <dt className="py-2.5 pl-4.5 pr-3 text-[0.63rem] font-normal uppercase tracking-wider text-[#a0a0b8] dark:text-[#4a4d5e] whitespace-nowrap border-b border-black/8 dark:border-white/7 flex items-center">Favourites</dt>
                <dd className="py-2.5 pl-4 pr-4.5 text-[0.78rem] font-light text-[#5c5c72] dark:text-[#7a7d8c] border-b border-l border-black/8 dark:border-white/7 flex items-center">{data.favourites}</dd>
              </div>}
            </dl>
          </section>

          {data.tags && <section className="flex flex-col gap-4.5">
            <h2 className="font-serif text-[1.45rem] font-normal text-[#1c1c28] dark:text-[#eeeef0] tracking-tight pl-3 border-l-2 border-[#b5873a] dark:border-[#c8a96e] leading-none">
              Tags
            </h2>
            <div className="flex flex-col gap-2.5">
              {data.tags.slice(0,10).map((tag) => (
                <div key={tag.name} className="flex items-center gap-3">
                  <span className="text-[0.78rem] font-light text-[#5c5c72] dark:text-[#7a7d8c] min-w-30 max-w-35 overflow-hidden text-ellipsis whitespace-nowrap flex-shrink-0">
                    {tag.name}
                  </span>
                  <div className="flex-1 h-1 bg-[#ede9e2] dark:bg-[#1e1f28] rounded-[1px] overflow-hidden">
                    <div
                      className="h-full bg-[#b5873a] dark:bg-[#c8a96e] rounded-[1px] opacity-65"
                      style={{ width: `${tag.rank}%` }}
                    />
                  </div>
                  <span className="text-[0.68rem] font-light text-[#a0a0b8] dark:text-[#4a4d5e] flex-shrink-0 w-8 text-right">
                    {tag.rank}%
                  </span>
                </div>
              ))}
            </div>
          </section>}

        </aside>

      </div>
    </div>
  );
}

