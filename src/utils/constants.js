import { MOVIE_JSON_DATA } from './movies';
export const constants = {
    gameTitle: "Cinemordle",
    availableAttempts: 8,
    categories: [
        {
            category: "Title",
            _type: String
        },
        {
            category: "Genre",
            _type: Array
        },
        {
            category: "Actors",
            _type: Array
        },
        {
            category: "Director",
            _type: String
        },
        {
            category: "Year",
            _type: String
        }
    ],
    movieData: MOVIE_JSON_DATA
}