export interface HeroSectionMedia {
    id: number
    bannerImage: string | null
    format: string | null
    averageScore: number | null
    genres: string[] | null
    title: { romaji: string | null }
    description: string | null
    episodes: number | null
    status: string | null
    seasonYear: number | null
    studios: { nodes: { name: string | null }[] }
    trailer: {
        id: string | null
        site: string | null
    }
}

export interface AnimeCard {
    id: number
    coverImage: { large: string | null }
    status: string | null
    title: { romaji: string | null }
    format: string | null
    episodes: number | null
    averageScore: number | null
}

export interface AnimeInfoMedia {
    id: number
    duration: number | null;
    startDate: {
        day: number | null;
        month: number | null;
        year: number | null;
    };
    type: string | null;
    favourites: number | null;
    popularity: number | null;
    studios: { nodes: { name: string | null }[] };
    bannerImage: string | null;
    coverImage: { large: string | null };
    genres: string[] | null;
    title: { romaji: string | null };
    averageScore: number | null;
    format: string | null;
    episodes: number | null;
    status: string | null;
    season: string | null;
    seasonYear: number | null;
    trailer: { id: string | null; site: string | null } | null;
    description: string | null;
    characters: {
        edges: {
            role: string | null;
            node: {
                id: number;
                name: { full: string | null };
                image: { large: string | null };
            };
            voiceActors: {
                id: number;
                name: { full: string | null };
                image: { large: string | null };
            }[];
        }[];
    };
    relations: {
        nodes: {
            type: string | null
            id: number;
            coverImage: { large: string | null };
            status: string | null;
            format: string | null;
            averageScore: number | null;
            title: { romaji: string | null };
            episodes: number | null;
        }[];
    };
    tags: {
        name: string;
        rank: number | null;
    }[];
}

export interface SearchPageDataMedia {
    pageInfo: { hasNextPage: boolean | null }
    media: AnimeCard[] | null
}

export interface SearchPageData {
    SearchPageData: SearchPageDataMedia
}

export interface InfoPageData {
    AnimeInfoData: AnimeInfoMedia | null;
}

export interface HomepageProps {
    heroSectionData: HeroSectionMedia[]
    trendingSectionData: AnimeCard[]
    thisSeasonSectionData: AnimeCard[]
    allTimePopularSectionData: AnimeCard[]
}

export interface AnimeCardProps {
    id: number
    imageUrl: string | null
    rating: number | null
    status: string | null
    title: string | null
    format: string | null
    episode: number | null
}

export interface InfoPageProps {
    data: AnimeInfoMedia
}

export interface HeroData {
    HeroSectionData: { media: HeroSectionMedia[] }
}

export interface TrendingData {
    TrendingSectionData: { media: AnimeCard[] }
}

export interface ThisSeasonData {
    ThisSeasonSectionData: { media: AnimeCard[] }
}

export interface AllTimePopularData {
    AllTimePopularSectionData: { media: AnimeCard[] }
}

export interface WatchlistData {
    WatchlistData: {
        media: AnimeCard[]
    }
}

export interface SearchDataParams {
    search?: string
    genre?: string[]
    status?: string
    season?: string
    seasonYear?: number
    sort?: string
    page: number
}

export interface SearchSuggestionMedia {
    id: number
    coverImage: { large: string; };
    title: { romaji: string; };
    format: string | null;
    episodes: number | null;
    averageScore: number | null;
}

export interface SearchSuggestionData {
    SearchSuggestionData: {
        media: SearchSuggestionMedia[] | null
    }
}
