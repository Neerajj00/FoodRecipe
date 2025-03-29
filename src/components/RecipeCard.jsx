import React from "react";
import { NavLink } from 'react-router-dom';

function RecipeCard({ id , title, image_url, publisher }) {
  return (
    <div className="max-w-sm bg-white flex rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 flex-col">
      <img className="w-full h-52 object-cover" src={image_url} alt={title} />
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 flex-1 text-sm mt-2">By: {publisher}</p>
        <NavLink to={`/Recipe/${id}`} className="mt-4 px-4 cursor-pointer w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600"> 
          View Recipe    
        </NavLink>
      </div>
    </div>
  );

}

export default RecipeCard;
