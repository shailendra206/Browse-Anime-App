'use client';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import AnimeRow from '../shared/AnimeRow';
import AnimeCard from '../shared/AnimeCard';
import { Star, Play, Bookmark, ArrowRight } from 'lucide-react';
import './Homepage.css'
import { HomepageProps } from '@/types/interface';
import { useBookmarkStore } from '@/stores/store';

export default function Homepage({ heroSectionData, trendingSectionData, thisSeasonSectionData, allTimePopularSectionData }: HomepageProps) {
  const arr = useBookmarkStore(state => state.arr)
  const setArr = useBookmarkStore(state => state.setArr)
  return (
    <>
      <section className="relative h-[clamp(580px,94svh,840px)] max-[760px]:h-[clamp(700px,94svh,1500px)] overflow-hidden select-none">
        {/* slider fills the hero; pagination lives OUTSIDE it so it never inherits slide transforms */}
        <div className="absolute inset-0">
          <Swiper
            modules={[Autoplay, Pagination]}
            loop
            speed={500}
            autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: false }}
            pagination={{ el: '.hero-pagination', clickable: true }}
            className="h-full"
          >
            {heroSectionData.filter(item => item.bannerImage).slice(0, 5).map((item, index) => (
              <SwiperSlide key={item.id}>
                <div className="relative h-full flex flex-col justify-end pt-30 max-[760px]:pt-[clamp(300px,50svh,420px)] pb-21 max-[760px]:pb-10 overflow-hidden">
                  {/* bg image */}
                  <div className="absolute inset-0">
                    {item.bannerImage ? (
                      <img
                        src={item.bannerImage}
                        alt={item.title.romaji ?? ''}
                        className="w-full h-full object-cover object-center max-[760px]:object-top"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : 'low'}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#ede9e2] dark:bg-[#1e1f28]" />
                    )}
                    {/* horizontal fade (left text-readable side -> transparent); flips to vertical-led on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-r max-[760px]:bg-gradient-to-t from-[#f5f3ef] dark:from-[#0e0f14] from-0% via-[#f5f3ef]/70 dark:via-[#0e0f14]/68 via-52% max-[760px]:via-56% to-[#f5f3ef]/5 dark:to-[#0e0f14]/5" />
                    {/* vertical fade to FULL page bg at the very bottom, so hero blends seamlessly into main content below */}
                    <div className="absolute inset-0 bg-gradient-to-t max-[760px]:bg-gradient-to-r from-[#f5f3ef] dark:from-[#0e0f14] from-0% to-transparent to-48% max-[760px]:to-100%" />
                  </div>

                  {/* content */}
                  <div className="relative z-2 flex items-end justify-between gap-12 max-[1024px]:gap-8 max-[760px]:flex-col max-[760px]:gap-0 px-13 max-[1279px]:px-14 max-[1024px]:px-10 max-[760px]:px-5 max-[460px]:px-4">
                    <div className="flex-none w-[min(580px,56%)] max-[760px]:w-full min-w-0">
                      {/* tags */}
                      <div className="flex flex-wrap gap-2 max-[760px]:gap-1.5 mb-5 max-[760px]:mb-3.5 items-center max-[760px]:max-h-14 max-[760px]:overflow-hidden">
                        {item.format && (
                          <span className="text-[0.71rem] max-[760px]:text-[0.66rem] font-normal uppercase tracking-wider px-2.75 max-[760px]:px-2.25 py-1 max-[760px]:py-0.75 rounded-[1px] bg-[#ede9e2] dark:bg-[#1e1f28] border border-black/8 dark:border-white/7 text-[#5c5c72] dark:text-[#7a7d8c]">
                            {item.format}
                          </span>
                        )}
                        {item.averageScore && (
                          <span className="text-[0.71rem] max-[760px]:text-[0.66rem] font-normal uppercase tracking-wider px-2.75 max-[760px]:px-2.25 py-1 max-[760px]:py-0.75 rounded-[1px] bg-[#b5873a]/10 dark:bg-[#c8a96e]/12 border border-[#b5873a]/22 dark:border-[#c8a96e]/25 text-[#b5873a] dark:text-[#c8a96e] flex items-center gap-1">
                            <Star className="rating-icon" size={13} strokeWidth={2} fill="currentColor" aria-hidden="true" />
                            {(item.averageScore / 10).toFixed(1)}
                          </span>
                        )}
                        {item.genres?.slice(0, 2).map((genre) => (
                          <span key={genre} className="text-[0.71rem] max-[760px]:text-[0.66rem] font-normal uppercase tracking-wider text-[#5c5c72] dark:text-[#7a7d8c]">
                            {genre}
                          </span>
                        ))}
                      </div>

                      {/* title */}
                      {item.title.romaji && (
                        <h1 title={item.title.romaji} className="line-clamp-2 break-words font-serif text-[clamp(2.2rem,4.2vw,3.6rem)] max-[760px]:text-[clamp(1.9rem,9vw,2.7rem)] max-[460px]:text-[clamp(1.7rem,8.5vw,2.2rem)] font-light leading-tight tracking-tight text-[#1c1c28] dark:text-[#eeeef0] mb-4.5 max-[760px]:mb-3.5">
                          {item.title.romaji}
                        </h1>
                      )}

                      {/* synopsis */}
                      {item.description && (<p className="text-sm max-[760px]:text-[0.84rem] font-light text-[#5c5c72] dark:text-[#7a7d8c] leading-relaxed max-w-120 max-[760px]:max-w-none mb-7 max-[760px]:mb-5 line-clamp-3 max-[760px]:line-clamp-4"
                        dangerouslySetInnerHTML={{ __html: item.description }} />
                      )}

                      {/* stats */}
                      <div className="flex items-center flex-wrap gap-5 mb-8 max-[760px]:mb-5.5 max-[760px]:grid max-[760px]:grid-cols-2 max-[760px]:gap-y-3 max-[760px]:gap-x-4">
                        {item.episodes && (
                          <>
                            <div className="flex flex-col gap-0.75">
                              <span className="text-[0.66rem] uppercase tracking-widest text-[#a0a0b8] dark:text-[#4a4d5e]">Episodes</span>
                              <span className="text-sm text-[#1c1c28] dark:text-[#eeeef0]">{item.episodes}</span>
                            </div>
                            <div className="w-px h-7 bg-black/8 dark:bg-white/7 max-[760px]:hidden"/>
                          </>
                        )}
                        {item.status && (
                          <>
                            <div className="flex flex-col gap-0.75">
                              <span className="text-[0.66rem] uppercase tracking-widest text-[#a0a0b8] dark:text-[#4a4d5e]">Status</span>
                              <span className="text-sm text-[#1c1c28] dark:text-[#eeeef0]">{item.status}</span>
                            </div>
                            <div className="w-px h-7 bg-black/8 dark:bg-white/7 max-[760px]:hidden" />
                          </>
                        )}
                        {item.seasonYear && (
                          <>
                            <div className="flex flex-col gap-0.75">
                              <span className="text-[0.66rem] uppercase tracking-widest text-[#a0a0b8] dark:text-[#4a4d5e]">Year</span>
                              <span className="text-sm text-[#1c1c28] dark:text-[#eeeef0]">{item.seasonYear}</span>
                            </div>
                            <div className="w-px h-7 bg-black/8 dark:bg-white/7 max-[760px]:hidden" />
                          </>
                        )}
                        {item.studios?.nodes[0]?.name && <div className="flex flex-col gap-0.75">
                          <span className="text-[0.66rem] uppercase tracking-widest text-[#a0a0b8] dark:text-[#4a4d5e]">Studio</span>
                          <span className="text-sm text-[#1c1c28] dark:text-[#eeeef0]">{item.studios.nodes[0].name}</span>
                        </div>}
                      </div>

                      {/* actions */}
                      <div className="flex items-center gap-3 flex-wrap max-[760px]:items-stretch">
                        {item?.trailer?.id && <Link href={`/info/${item.id}#trailer`} className="inline-flex items-center justify-center gap-2 rounded-[1px] bg-[#b5873a] dark:bg-[#c8a96e] text-white dark:text-[#0e0f14] border border-transparent px-6.5 py-2.75 text-[0.85rem] font-medium tracking-wide max-[760px]:flex-1 max-[760px]:basis-full shadow-[0_10px_24px_rgba(181,135,58,0.18)] transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out hover:bg-[#c79a4c] dark:hover:bg-[#d8ba7c] hover:shadow-[0_14px_34px_rgba(181,135,58,0.28)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_6px_16px_rgba(181,135,58,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e]/70">
                          <Play className="button-icon" size={16} strokeWidth={2} fill="none" aria-hidden="true" />
                          Watch Trailer
                        </Link>}
                        <button className="inline-flex items-center justify-center gap-2 rounded-[1px] bg-transparent text-[#1c1c28] dark:text-[#eeeef0] border border-black/8 dark:border-white/7 px-5.5 py-2.75 text-[0.85rem] font-normal tracking-wide max-[760px]:flex-1 max-[760px]:basis-[calc(50%-6px)] max-[500px]:basis-full transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out hover:bg-[#1c1c28]/5 dark:hover:bg-white/6 hover:border-[#b5873a]/45 dark:hover:border-[#c8a96e]/45 hover:text-[#b5873a] dark:hover:text-[#c8a96e] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] active:translate-y-0 active:bg-[#1c1c28]/8 dark:active:bg-white/9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e]/60"
                          onClick={() => {setArr(item.id)}}
                        >
                          <Bookmark className="button-icon" size={16} strokeWidth={1.75} aria-hidden="true" />
                          {arr.includes(item.id) ? `Remove from watchlist` : `Add to watchlist`}
                        </button>
                        <Link
                          href={`/info/${item.id}`}
                          className="inline-flex items-center justify-center gap-2 rounded-[1px] bg-transparent text-[#1c1c28] dark:text-[#eeeef0] border border-black/8 dark:border-white/7 px-5.5 py-2.75 text-[0.85rem] font-normal tracking-wide max-[760px]:flex-1 max-[760px]:basis-[calc(50%-6px)] max-[500px]:basis-full transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out hover:bg-[#1c1c28]/5 dark:hover:bg-white/6 hover:border-[#b5873a]/45 dark:hover:border-[#c8a96e]/45 hover:text-[#b5873a] dark:hover:text-[#c8a96e] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] active:translate-y-0 active:bg-[#1c1c28]/8 dark:active:bg-white/9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e]/60"
                        >
                          Anime info <ArrowRight className="text-icon inline" size={14} strokeWidth={1.75} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* indicators (Swiper fills this element; styled in Homepage.css) */}
        <div className="hero-pagination swiper-pagination" />
      </section>

      {/* MAIN ROWS — same bg as hero's gradient end so the seam disappears */}
      <main className="relative bg-[#f5f3ef] dark:bg-[#0e0f14] px-13 max-[1279px]:px-10 max-[1024px]:px-7 max-[760px]:px-4.5 max-[460px]:px-4 pt-8 max-[1024px]:pt-6 max-[760px]:pt-5 pb-20 max-[1024px]:pb-14 max-[760px]:pb-11 flex flex-col gap-18 max-[1279px]:gap-16 max-[1024px]:gap-15 max-[760px]:gap-12">
        <AnimeRow title='Trending Now'>
          {trendingSectionData.map(item => (
            <AnimeCard
              key={item.id}
              id={item.id}
              imageUrl={item.coverImage.large}
              rating={item.averageScore}
              title={item.title.romaji}
              format={item.format}
              episode={item.episodes}
              status={item.status}
            />
          ))}
        </AnimeRow>

        <AnimeRow title='This Season'>
          {thisSeasonSectionData.map(item => (
            <AnimeCard
              id={item.id}
              key={item.id}
              imageUrl={item.coverImage.large}
              rating={item.averageScore}
              title={item.title.romaji}
              format={item.format}
              episode={item.episodes}
              status={item.status}
            />
          ))}
        </AnimeRow>


        <AnimeRow title='All Time Popular'>
          {allTimePopularSectionData.map(item => (
            <AnimeCard
              id={item.id}
              key={item.id}
              imageUrl={item.coverImage.large}
              rating={item.averageScore}
              title={item.title.romaji}
              format={item.format}
              episode={item.episodes}
              status={item.status}
            />
          ))}
        </AnimeRow>
      </main>
    </>
  );
}
