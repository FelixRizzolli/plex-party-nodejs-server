export default `
union MediaContent = Movie | TVShow

type MiniSearch {
  fromPlex: [MediaContent]
  fromTVDB: [MediaContent]
}

type Movie{
  _type: String
  title: String
  year: String
  tvdbID: Int
  added: Date
}

type TVShow{
  _type: String
  title: String
  year: String
  tvdbID: Int
  added: Date
}
`;