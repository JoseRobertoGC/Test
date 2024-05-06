import React, { useEffect, useState, useCallback } from "react";
import { IMovieDetail } from "../Show/types";
import { MovieCard } from "../../components/MovieCard";
import { AxiosResponse } from 'axios';
import { getMovieInfo } from "../../services";

const Favorite = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState<IMovieDetail[]>([]);
    const favorites: string = localStorage.getItem('favorites') || '';

    const runGetFavorite = useCallback(async () => {
        if(favorites.length > 0){
            const favoritesArray = JSON.parse(favorites);
            const newShows = await Promise.all(
                favoritesArray.map(async (favorites:string) => {
                    return getMovieInfo(String(favorites))
                    .then((res: AxiosResponse) => {
                        if (res && res.data){
                            return res.data;
                        }
                    })
                    .catch((err: Error) => {
                        console.log(err, "err");
                    });
                })
            );
            setShow(newShows);
            setLoading(false);
            
        }

    }, [favorites]);

    useEffect(() => {
        setLoading(false);
        runGetFavorite();
    }, [runGetFavorite])
    
    return (
        <div style={{ overflow: "hidden", background: "linear-gradient(to bottom, #172554, #030712)", minHeight: "100vh"}}>
            <div style={{ marginLeft: "20px", overflow: "hidden", minHeight: "100vh"}}>
                {!loading ? (
                    <div>
                        <h1 className="text-4xl font-bold mb-4 pt-5 m-5 px-10 text-white">Favorites</h1>
                        {favorites && favorites.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                                {show && show.map((show: IMovieDetail) => (
                                    <MovieCard key={show.id}
                                        movieId={show.id}
                                        title={show.title}
                                        genreId={show.genres[0].id}
                                        voteAverage={show.vote_average}
                                        posterPath={show.poster_path} />
                                ))}
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold mb-4 px-10 m-5 py-5 text-white">Oops... it seems this is empty. Explore more movies and add them to your favorites!</h2>
                            </div>
                        )}
                    </div>

                ) : (
                    <div>
                        Loading...
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default Favorite;