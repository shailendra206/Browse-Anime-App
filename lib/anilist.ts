import { AllTimePopularData, HeroData, InfoPageData, SearchPageData, ThisSeasonData, TrendingData, WatchlistData, SearchDataParams, SearchSuggestionData } from "@/types/interface";

const ANILIST_URL = 'https://graphql.anilist.co';

const HeroSectionQuery = `
  query{
    HeroSectionData: Page(page: 1, perPage: 10){
      media(type: ANIME, sort: [TRENDING_DESC]){
        id
        bannerImage
        format
        averageScore
        genres
        title{romaji}
        description
        episodes
        status
        seasonYear
        studios(isMain: true){nodes{name}}
        trailer{id site}
      }
    }
  }
`

const trendingSectionQuery = `
  query{
    TrendingSectionData: Page(page: 1, perPage: 10){
      media(type: ANIME, sort: [TRENDING_DESC]){
        id
        coverImage{large}
        status
        title{romaji}
        format
        episodes
        averageScore
      }
    }
  }
`

const thisSeasonSectionQuery = `
  query($season: MediaSeason, $seasonYear: Int){
    ThisSeasonSectionData: Page(page: 1, perPage: 10){
      media(type: ANIME, sort: [TRENDING_DESC], seasonYear: $seasonYear, season: $season){
        id
        coverImage{large}
        status
        title{romaji}
        format
        episodes
        averageScore
      }
    }
  }
`

const allTimePopularSectionQuery = `
  query{
    AllTimePopularSectionData: Page(page: 1, perPage: 10){
      media(type: ANIME, sort: [POPULARITY_DESC]){
        id
        coverImage{large}
        status
        title{romaji}
        format
        episodes
        averageScore
      }
    }
  }
`

const infoPageQuery = `
  query($id: Int){
    AnimeInfoData: Media(id: $id, type: ANIME){
      id
      duration
      startDate{
        day
        month
        year
      }
      type
      favourites
      popularity
      studios(isMain: true){nodes{name}}
      bannerImage
      coverImage{large}
      genres
      title{romaji}
      averageScore
      format
      episodes
      status
      season
      seasonYear
      trailer{id site}
      description
      characters(perPage: 50){
        edges{
          role
          node{
            id
            name{full}
            image{large}
          }
          voiceActors(language: JAPANESE){
            id
            name{full}
            image{large}
          }
        }
      }
      relations{
        nodes{
          type
          id
          coverImage{large}
          status
          format
          averageScore
          title{romaji}
          episodes
        }
      }
      tags{
        name
        rank
      }
    }
  }
`

const watchlistPageQuery = `
  query($id: [Int], $page: Int){
    WatchlistData: Page(page: $page, perPage: 49){
      media(id_in: $id, type: ANIME){
        id
        coverImage{large}
        status
        title{romaji}
        format
        episodes
        averageScore
      }
    }
  } 
`

const searchPageQuery = `
  query($search: String, $genre: [String], $status: MediaStatus, $season: MediaSeason, $seasonYear: Int, $sort: [MediaSort], $page: Int){
  SearchPageData: Page(page: $page, perPage: 49) {
    pageInfo {
      hasNextPage
    }
    media(search: $search, genre_in: $genre, status: $status, season: $season, seasonYear: $seasonYear, sort: $sort, type: ANIME) {
        id
        coverImage{large}
        status
        title{romaji}
        format
        episodes
        averageScore
    }
  }
}
`

const searchSuggestionQuery = `
  query($search: String){
    SearchSuggestionData: Page(page: 1, perPage: 5){
      media(search: $search, type: ANIME){
        id
        coverImage{large}
        title{romaji}
        format
        episodes
        averageScore
      }
    }
  }
    
`

export async function fetchAniList<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T | null> {
  try {
    const response = await fetch(ANILIST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    if (!response.ok) throw new Error(`${response.status}`);
    const json = await response.json();
    return json.data as T;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getHeroSectionData() {
  const data = await fetchAniList<HeroData>(HeroSectionQuery)
  return data?.HeroSectionData.media ?? null
}

export async function getTrendingSectionData() {
  const data = await fetchAniList<TrendingData>(trendingSectionQuery)
  return data?.TrendingSectionData.media ?? null
}

export function getCurrentSeason() {
  const month = new Date().getMonth()
  if (month <= 2) return 'WINTER'   
  if (month <= 5) return 'SPRING'   
  if (month <= 8) return 'SUMMER'   
  return 'FALL'                     
}

export async function getThisSeasonSectionData() {
  const data = await fetchAniList<ThisSeasonData>(thisSeasonSectionQuery, { season: getCurrentSeason(), seasonYear: new Date().getFullYear() })
  return data?.ThisSeasonSectionData.media ?? null
}

export async function getAllTimePopularSectionData() {
  const data = await fetchAniList<AllTimePopularData>(allTimePopularSectionQuery)
  return data?.AllTimePopularSectionData.media ?? null
}

export async function getInfoPageData(id: number) {
  const data = await fetchAniList<InfoPageData>(infoPageQuery, { id: id })
  return data?.AnimeInfoData ?? null
}

export async function getWatchlistPageData(id: number[], page: number) {
  const data = await fetchAniList<WatchlistData>(watchlistPageQuery, { id, page})
  return data?.WatchlistData?.media ?? null
}

export async function getSearchPageData({search, genre, status, season, seasonYear, sort, page} : SearchDataParams){
  const data = await fetchAniList<SearchPageData>(searchPageQuery, {search, genre, status, season, seasonYear, sort, page})
  return data?.SearchPageData ?? null
}

export async function getSearchSuggestionData(search: string){
  const data = await fetchAniList<SearchSuggestionData>(searchSuggestionQuery, {search})
  return data?.SearchSuggestionData.media ?? null
}