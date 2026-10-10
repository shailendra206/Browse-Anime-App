import Homepage from '@/components/homepage/Homepage';
import { getAllTimePopularSectionData, getHeroSectionData, getThisSeasonSectionData, getTrendingSectionData } from '@/lib/anilist';

export default async function Home() {
  const [heroSectionData, trendingSectionData, thisSeasonSectionData, allTimePopularSectionData] =
    await Promise.all([
      getHeroSectionData(),
      getTrendingSectionData(),
      getThisSeasonSectionData(),
      getAllTimePopularSectionData(),
    ])

  if (!(heroSectionData && trendingSectionData && thisSeasonSectionData && allTimePopularSectionData)) throw new Error('Failed to load homepage data');
  return (
    <Homepage
      heroSectionData={heroSectionData}
      trendingSectionData={trendingSectionData}
      thisSeasonSectionData={thisSeasonSectionData}
      allTimePopularSectionData={allTimePopularSectionData}
    />
  );
}
