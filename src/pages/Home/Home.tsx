import React, { useEffect, useState } from "react";
import { getPopular, getTopRated, getNowPlaying} from "../../services"; // Asegúrate de tener estas funciones implementadas
import { IMovieResponse } from "../../components/MovieCard/types";
import { MovieCard } from "../../components/MovieCard";
import { TopMovieCard } from "../../components/TopMovieCard";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState<IMovieResponse[]>([]);
    const [ratedMovies, setRatedMovies] = useState<IMovieResponse[]>([]);
    const [playingMovies, setPlayingMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getMovies = async () => {
        try {
            const popularResponse = await getPopular();
            if (popularResponse && popularResponse.data) {
                const filteredPopularMovies = popularResponse.data.results.filter((movie: IMovieResponse) => movie.vote_average >= 1);
                setPopularMovies(filteredPopularMovies);
            }
    
            const topRatedResponse = await getTopRated();
            if (topRatedResponse && topRatedResponse.data) {
                const filteredTopRatedMovies = topRatedResponse.data.results.filter((movie: IMovieResponse) => movie.vote_average >= 8);
                setRatedMovies(filteredTopRatedMovies);
            }
    
            const nowPlayingResponse = await getNowPlaying();
            if (nowPlayingResponse && nowPlayingResponse.data) {
                const filteredNowPlayingMovies = nowPlayingResponse.data.results.filter((movie: IMovieResponse) => movie.vote_average >= 1);
                setPlayingMovies(filteredNowPlayingMovies);
            }
    
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        setIsLoading(true);
        getMovies();
    }, []);
    

    return (
        <div style={{ overflow: "hidden", background: "linear-gradient(to bottom, #172554, #030712)", minHeight: "100vh"}}>
            <div style={{ marginLeft: "20px", overflow: "hidden", minHeight: "100vh"}}>
                {isLoading && <div>Loading...</div>}

                <h1 className="text-3xl font-bold mb-4 pt-5 text-white">Now Playing Movies</h1>
                <div className="p-4">
                    <div className="flex overflow-x-scroll no-scrollbar w-full" style={{ scrollbarWidth: "none" }}>
                        {playingMovies.map((movie) => (
                            <div key={movie.id} className="min-w-[200px] shrink-0 mr-4"> 
                                <MovieCard
                                    title={movie.title}
                                    genreId={movie.genre_ids[0]}
                                    movieId={movie.id}
                                    voteAverage={movie.vote_average}
                                    posterPath={movie.poster_path}
                                />
                            </div>
                        ))}
                    </div>
                </div>


                <h1 className="text-6xl font-bold mb-4 pt-5 text-white">Top 10 Popular Movies</h1>
                <div className="p-4">
                    <div className="flex overflow-x-scroll no-scrollbar w-full" style={{ scrollbarWidth: "none" }}>
                        {popularMovies.slice(0, 10).map((movie, index) => (
                            <TopMovieCard
                                key={movie.id}
                                rank={index + 1}
                                title={movie.title}
                                genreId={movie.genre_ids[0]}
                                movieId={movie.id}
                                voteAverage={movie.vote_average}
                                posterPath={movie.poster_path}
                            />
                        ))}
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-4 pt-5 text-white">Popular Movies</h1>
                <div className="p-4">
                    <div className="flex overflow-x-scroll no-scrollbar w-full" style={{ scrollbarWidth: "none" }}>
                        {popularMovies.map((movie) => (
                            <div key={movie.id} className="min-w-[200px] shrink-0 mr-4">
                                <MovieCard
                                    title={movie.title}
                                    genreId={movie.genre_ids[0]}
                                    movieId={movie.id}
                                    voteAverage={movie.vote_average}
                                    posterPath={movie.poster_path}
                                />
                            </div>
                        ))}
                    </div>
                </div>
          
                


                <h1 className="text-3xl font-bold mb-4 pt-5 text-white">Top Rated Movies</h1>
                <div className="p-4">
                    <div className="flex overflow-x-scroll no-scrollbar w-full" style={{ scrollbarWidth: "none" }}>
                        {ratedMovies.map((movie) => (
                            <div key={movie.id} className="min-w-[200px] shrink-0 mr-4">
                                <MovieCard
                                    title={movie.title}
                                    genreId={movie.genre_ids[0]}
                                    movieId={movie.id}
                                    voteAverage={movie.vote_average}
                                    posterPath={movie.poster_path}
                                />
                            </div>
                        ))}
                    </div>
                </div>



                
            </div>
        </div>
    );
}

export default Home;