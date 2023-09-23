import { Collection, Db, Document, Filter, FindCursor, FindOptions, Sort, WithId } from "mongodb";
import { getDatabase } from "../datasources/mongodb.js";

export class Movie{
    constructor(
        public _id: string,
        public _type: string,
        public year: string,
        public tvdbID: number,
        public added: Date,
        public onPlex: boolean,
    ) {};

    public static getMovies = async (): Promise<Movie[]> => {
        const db: Db = getDatabase();
        const movies: Collection = db.collection('movies');
        const result: Movie[] = [];

        console.debug("[" + (new Date(Date.now())).toISOString() + "]: getMovies()");

        const query: Filter<Document> = {};
        const options: FindOptions<Document> = {
            projection: {
                _type: 1,
                year: 1,
                tvdbID: 1,
                added: 1,
                onPlex: 1,
            }
        };
        const sort: Sort = {
            'added': 1,
        };

        const cursor: FindCursor<WithId<Document>> = await movies.find(query, options).sort(sort);

        for await (const resultDoc of cursor) {
            result.push(new Movie(
                resultDoc['_id'].toString(),
                resultDoc['_type'],
                resultDoc['year'],
                resultDoc['tvdbID'],
                resultDoc['added'],
                resultDoc['onPlex'],
            ));
            console.log(resultDoc);
        }
        
        return result;
    }
}