export default `
type Query {
  movies: [Movie]
  tvshows: [TVShow]
  recentlyAddedMovies: [Movie]
  recentlyAddedTVShows: [TVShow]
  miniSearch: MiniSearch
}

scalar Date
`;