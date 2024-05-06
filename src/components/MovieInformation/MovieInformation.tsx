import React from 'react';
import { IMAGE_SOURCE } from '../../constants/moviesMock';
import { Pill } from '../Pill';
import { IMovieDetail } from '../../pages/Show/types';
import adults from '../.././assets/images/white-people.png'
import time from '../.././assets/images/white-clock.png'
import date from '../.././assets/images/white-calendar.png'
import star from '../.././assets/images/white-star.png'
import chart from '../.././assets/images/white-bar-chart.png'

interface MovieInformationProps extends IMovieDetail {
    isFavorite: boolean;
    addFavorite: () => void;
    removeFavorite: () => void;
  }

  const MovieInformation: React.FC<MovieInformationProps> = ({
    poster_path,
    original_title,
    overview,
    runtime,
    release_date,
    vote_average,
    vote_count,
    genres: genres_ids,
    isFavorite,
    addFavorite,
    removeFavorite,
  }) => {
  
    
      return (
          <div className="flex items-center max-sm:flex-col gap-10  mt-4 py-12 px-10 w-full max-w-7xl">
              <img src={IMAGE_SOURCE + poster_path} alt="Descripción de la imagen" className="w-80 shrink-0 rounded" />
              <div>
                  <h3 className="text-xl font-semibold text-white">{original_title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{overview}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 text-lg justify-items-start">
                      <span className="flex items-center justify-start">
                          <span className="inline-block w-5 h-5 bg-cover bg-center mr-1" style={{ backgroundImage: `url(${adults})` }}></span><p className="pl-1 text-sm text-white">18+</p>
                      </span>
                      <span className="flex items-center justify-start">
                          <span className="inline-block w-5 h-5 bg-cover bg-center mr-1" style={{ backgroundImage: `url(${time})` }}></span><p className="pl-1 text-sm text-white">{runtime} min.</p>
                      </span>
                      <span className="flex items-center justify-start">
                          <span className="inline-block w-5 h-5 bg-cover bg-center mr-1" style={{ backgroundImage: `url(${date})` }}></span><p className="pl-1 text-sm text-white">{release_date}</p>
                      </span>
                      <span className="flex items-center justify-start">
                          <span className="inline-block w-5 h-5 bg-cover bg-center mr-1" style={{ backgroundImage: `url(${star})` }}></span><p className="pl-1 text-sm text-white">{vote_average}</p>
                      </span>
                      <span className="flex items-center justify-start">
                          <span className="inline-block w-5 h-5 bg-cover bg-center mr-1" style={{ backgroundImage: `url(${chart})` }}></span><p className="pl-1 text-sm text-white">{vote_count}</p>
                      </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center px-5 pb-10">
                      <div className="flex flex-wrap gap-2">
                          {genres_ids?.map((genre, index) => (
                              <Pill key={index} title={genre.name} color={'red'} />
                          ))}
                      </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                          {
                              isFavorite ? (
                                  <button onClick={removeFavorite} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-wx-xs">
                                      Remove from Favorites
                                  </button>
                              ) : (
                                  <button onClick={addFavorite} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-xs" >
                                      Add to Favorites
                                  </button>
                              )
                          }
                      </div>


              </div>
          </div>
      );
};

export default MovieInformation;
