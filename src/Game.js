import './App.css';
import { useState, useEffect } from 'react';
import AutosuggestComponent from './components/AutosuggestComponent';
import { PosterComponent } from './components/PosterComponent';
import { DescriptionComponent } from './components/DescriptionComponent';
import { SubmissionTable } from './components/SubmissionTable';
import { randomGeneratorForArray, generateDefaultCategoriesObject } from './utils/Util';
import {constants} from './utils/constants';

function Game() {
    const { movieData, availableAttempts } = constants;

    const [answer, setAnswer] = useState({})
    const [movies, setMovies] = useState([]);
    const [matchMap, setMatchMap] = useState(generateDefaultCategoriesObject());
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const addMatch = (matches, category) => {
        let map = matchMap;
        if (map[category]) {
            let arr = Array.from(new Set(map[category].concat(matches)));
            map[category] = arr;
        } else {
            map[category] = matches;
        }
        setMatchMap({ ...map });
        window.localStorage.setItem('matchMap', { ...map });
    }

    useEffect(() => {
        setAnswer(movieData[randomGeneratorForArray(movieData)]);
        //let m = window.localStorage.getItem('matchMap');
        let localStorageMovies = JSON.parse(window.localStorage.getItem('movies'));
        if(localStorageMovies != null && (localStorageMovies.answer == answer)) {
            setMovies(localStorageMovies.movies);
            for(let movie of movies) {
                checkMovie(movie);
            }
            //setMatchMap({...m});
        } else {
            window.localStorage.clear();
            setMovies([]);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem('matchMap', JSON.stringify(matchMap));
    }, [matchMap]);

    useEffect(() => {
        if(movies.length > 7) {
            setIsGameOver(true);
        }
    }, [movies]);

    const checkMovie = (movie) => {
        if (movie == answer["Title"]) {
            setIsCorrectAnswer(true);
            setIsGameOver(true);
        }
    }

    const onInputEnter = (movie) => {
        checkMovie(movie);
        const temp = movies;
        let data = movieData.find(item => item['Title'] == movie);
        temp.push(data);
        setMovies([...temp]);
        let movieLocalStorage = {
            movies: [...temp],
            answer: answer
        }
        window.localStorage.setItem('movies', JSON.stringify(movieLocalStorage));
        if (movies.length > availableAttempts - 1) {
            setIsGameOver(true);
        }
    }

    return (
        <div className="Game">
            <div className="Attempts">
                Attempts: {movies.length} / {availableAttempts}
            </div>
            <PosterComponent
                src={answer['Poster']}
                isGameOver={isGameOver}
            />
            <DescriptionComponent
                value={answer['Plot']}
            />
            <SubmissionTable
                answer={answer}
                addMatch={addMatch}
                matchMap={matchMap}
                movies={movies}
                isGameOver={isGameOver} />
            <AutosuggestComponent
                movieList={movieData.map(a => a['Title'])}
                onInputEnter={onInputEnter}
                disabled={isGameOver}
            />
        </div>
    );
}

export default Game;