
export interface IApiCallResponse<T> {
    total_pages: number,
    total_results: number,
    results: IMovies[],
    page: number
    }
    
    export interface IMovie1 {
        adult: boolean,
        backdrop_path: string,
        belongs_to_collection: any,
        budget: number,
        genres: Array<{id: string, name: string}>,
        homepage: string,
        id: number,
        imdb_id: string,
        original_language : string,
        original_title : string,
        overview: string,
        popularity : number,
        poster_path : any,
        production_companies : Array<{
            id: number,
            logo_path: string,
            name: string,
            origin_country: string
        }>,
        production_countries: Array<{iso_3166_1: string, name: string }>,
        release_date: string,
        revenue: number,
        runtime: number,
        spoken_languages: Array<{iso_639_1: string, name: string}>,
        status: string,
        tagline: string,
        title: string,
        video: false,
        vote_average: number,
        vote_count: number
    }
    
    
export interface IMovies {
    page: number;
    results?: IMovie[];
    total_pages: number;
    total_results: number;
    }

    export interface IMovie {
        adult?: boolean | null;
        backdrop_path: string;
        genre_ids?: (number)[] | null;
        id: number;
        original_language: string;
        original_title?: string | null;
        overview: string;
        poster_path: string;
        release_date?: string | null;
        title?: string | null;
        video?: boolean | null;
        vote_average: number;
        vote_count: number;
        popularity: number;
        first_air_date?: string | null;
        name?: string | null;
        origin_country?: (string)[] | null;
        original_name?: string | null;
        tagline: string;
        genres?: { id: number, name: string;}[]
        spoken_languages?: { english_name: string, iso_639_1: string; name : string}[]
    }
      
    