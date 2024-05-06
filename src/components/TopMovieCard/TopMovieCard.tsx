// TopMovieCard.tsx
import React from 'react';
import { MovieCard } from '../MovieCard'; // Asegúrate de importar correctamente tu componente MovieCard
import { IMovieCard } from '../MovieCard/types'; // Importa también la interfaz que usas en MovieCard si es necesario

interface ITopMovieCard extends IMovieCard {
  rank: number;
}

export const TopMovieCard: React.FC<ITopMovieCard> = ({ rank, ...movieProps }) => {
  return (
    <div className="flex items-center mr-8 relative">
      {/* Contenedor para el número de ranking */}
      <div className="text-6xl font-bold text-white z-20 pr-3" style={{ minWidth: '80px' }}>{rank}</div>
      {/* Contenedor para la tarjeta de película */}
      <MovieCard {...movieProps} />
    </div>
  );
}

export default TopMovieCard;
