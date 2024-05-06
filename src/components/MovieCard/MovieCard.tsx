import { IMAGE_SOURCE } from '../../constants/moviesMock'
import { IMovieCard } from './types'
import React from 'react'
import genres from '../../constants/genres.json'
import { Pill } from '../Pill'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/constants'
import whiteStar from '../.././assets/images/white-star.png'

export const MovieCard: React.FC<IMovieCard> = ({
    title,
    genreId,
    movieId,
    voteAverage,
    posterPath,
}) => {

    // Hooks
    const navigate = useNavigate();

    // Constantes
    const poster = IMAGE_SOURCE + posterPath;

    // Functions
    const getGenre = (genreId: number) => {
        const key = Object.values(genres.genres).find(genre => genre.id === genreId);
        if (key) {
            return key.name;
        }

        return "Not classified";
    };

    const navigateMovies = (id: number, movieData: IMovieCard) => {
        navigate(`${ROUTES.SHOW}${id}`, {state: { movie: movieData }});
    };

    return (
        <div className="w-64 h-96 rounded-xl overflow-hidden shadow-lg relative text-white transition-all duration-500 hover:scale-105 hover:shadow-gray-700 cursor-pointer"
            onClick={() => navigateMovies(movieId, { title, genreId, movieId, voteAverage, posterPath})}
        >
            <img className="w-full h-full absolute top-0 left-0 object-cover" src={poster} alt={title} />
            <div className="absolute bottom-0 w-full p-4" style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.0) 100%)'
            }}>
                <Pill title={getGenre(genreId)} color="red" />
                <div className="font-bold text-xl mb-2">{title}</div>
                <div className="flex items-center">
                    <span className="inline-block w-5 h-5 bg-cover bg-center mr-1" style={{ backgroundImage: `url(${whiteStar})` }}></span>
                    <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-sm font-bold">{voteAverage.toFixed(1)}</span>
                    <span>/ 10</span>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;



