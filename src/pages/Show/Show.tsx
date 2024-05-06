import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieInfo, getSimilar } from "../../services";
import { IMovieResponse } from "../../components/MovieCard/types";
import { MovieInformation } from "../../components/MovieInformation";
import { MovieCard } from "../../components/MovieCard";
import { IMovieDetail } from "./types";

const Show: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<IMovieDetail | null>(null); 
    const [similarMovies, setSimilarMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFavorite, setIsFavorite]=useState<boolean>(false);
    const [favorites, setFavorites] = useState<string>('');

    const goBack = () => {
        navigate(-1);
    }

    const addFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        const newFavorites = [...favs, id];
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(true);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    };

    const removeFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        let newFavorites = [...favs];
        newFavorites = newFavorites.filter((e) => e !== id);
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(false);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    };
     
    const getMovieInfoMovies = async (MoviId:string) => {
        await getMovieInfo(MoviId).then((data) => {
            if (data && data.data){
                setMovie(data.data);
                setIsLoading(false);
            }
        })

        await getSimilar(MoviId).then((data) => {
            if (data && data.data){
                setSimilarMovies(data.data.results);
                setIsLoading(false);
            }
        })

        .catch((err) => {
            console.log(err);
        })
    };


    useEffect(()=> {
        setIsLoading(true);
        if (id) {
            const favs = localStorage.getItem('favorites') || '';
            setFavorites(favs);
            if (favs.includes(String(id))){
                setIsFavorite(true);
            }
            getMovieInfoMovies(id);
            getSimilar(id);
        }
    }, [id]);

    return (
        <div style={{minHeight: "100vh", background: "linear-gradient(to bottom, #172554, #030712)" }}>
            {isLoading && <div>Loading...</div>}
            {movie && (
                <>
                    <div className="pt-5 pb-5">
                        <MovieInformation
                            {...movie}
                            isFavorite={isFavorite}
                            addFavorite={addFavorite}
                            removeFavorite={removeFavorite}
                        />
                    </div>
                    <div style={{ marginLeft: "20px", overflow: "hidden" }} className="pt-5">
                        <h1 className="text-3xl font-bold mb-4 pt-5 text-white">Similar Movies</h1>
                        <div className="p-4">
                            <div className="flex overflow-x-scroll no-scrollbar w-full" style={{ scrollbarWidth: "none" }}>
                                {similarMovies.map((movie) => (
                                    <div key={movie.id} className="min-w-[200px] shrink-0 mr-4"> {/* Ajusta el ancho mínimo y margen según necesites */}
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
                </>
            )}
            <button onClick={goBack}>Ir atrás</button>
        </div>
    );
};

export default Show;
