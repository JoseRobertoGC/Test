import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import tickets from '../../assets/images/tickets.png'

const Header = () => {
  return (
    <nav className="bg-blue-950 text-white p-4 shadow-xl">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2"> {/* Ajustar aquí */}
          <span className="inline-block bg-cover bg-center" style={{ backgroundImage: `url(${tickets})`, width: '80px', height: '70px' }}></span>
          <Link to={ROUTES.HOME} className="text-5xl font-bold">CINESTREAM</Link>
        </div>
        <ul className="flex space-x-4">
          <li><NavLink to={ROUTES.HOME} className={({ isActive }) => `hover:text-[#ff4444] ${isActive ? 'text-[#ff4444]' : 'text-gray-500'} block font-semibold text-[13px]`}>HOME</NavLink></li>
          <li><NavLink to={ROUTES.POPULAR} className={({ isActive }) => `hover:text-[#ff4444] ${isActive ? 'text-[#ff4444]' : 'text-gray-500'} block font-semibold text-[13px]`}>POPULAR</NavLink></li>
          <li><NavLink to={ROUTES.RATED} className={({ isActive }) => `hover:text-[#ff4444] ${isActive ? 'text-[#ff4444]' : 'text-gray-500'} block font-semibold text-[13px]`}>TOP RATED</NavLink></li>
          <li><NavLink to={ROUTES.PLAYING} className={({ isActive }) => `hover:text-[#ff4444] ${isActive ? 'text-[#ff4444]' : 'text-gray-500'} block font-semibold text-[13px]`}>NOW PLAYING</NavLink></li>
          <li><NavLink to={ROUTES.FAVORITE} className={({ isActive }) => `hover:text-[#ff4444] ${isActive ? 'text-[#ff4444]' : 'text-gray-500'} block font-semibold text-[13px]`}>MY FAVORITES</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Header