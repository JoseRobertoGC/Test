import React from 'react';
import { IPill } from './types';

export const Pill: React.FC<IPill> = ({
  title,
  color, // esto debería ser un valor de color válido como '#f00' o 'red'
}) => {
  // Usando estilos en línea para aplicar un color de fondo personalizado
  const style = {
    backgroundColor: color
  };

  return (
    <div style={style} className="text-white font-semibold py-1 px-3 rounded-md text-sm inline-block">
      {title}
    </div>
  );
}

export default Pill;
