export interface MiniSearch {
  fromPlex: MediaContent[],
  fromTVDB: MediaContent[],
}

export interface MediaContent {
    _type: string,
    title: string,
    year: string,
    tvdbID: number,
    added: Date,
    fromPlex?: boolean,
}

export interface Movie extends MediaContent { }

export interface TVShow extends MediaContent { }