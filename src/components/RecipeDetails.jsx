import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context";

function RecipeDetails() {
  const { id } = useParams(); // Get recipe ID from URL
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, setFavorites } = useContext(GlobalContext);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  async function fetchRecipe() {
    try {
      setLoading(true);
      if (!id) {
        console.error("ID is missing");
        return;
      }
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();
      if (data.data.recipe) {
        setRecipe(data.data.recipe);
      } else {
        setError("Recipe not found.");
      }
    } catch (err) {
      setError("Failed to load recipe.");
    } finally {
      setLoading(false);
    }
  }

  const toggleFavorite = ({ id, image_url, title, publisher }) => {
    setFavorites((prevFavs) =>
      prevFavs.some((fav) => fav.id === id)
        ? prevFavs.filter((fav) => fav.id !== id)
        : [...prevFavs, { id, image_url, title, publisher }]
    );
  };


  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
      >
        ⬅ Go Back
      </button>
      <img
        src={recipe.image_url}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-800 mt-4">{recipe.title}</h1>
        <button className="mt-4 min-w-3xs h-10 px-4 cursor-pointer bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600"
          onClick={() => toggleFavorite({
            id: id,
            image_url: recipe.image_url,
            title: recipe.title,
            publisher: recipe.publisher
          })}
          style={{
            marginLeft: "10px",
            backgroundColor: favorites.some((fav) => fav.id === id) ? "red" : "gray",
            color: "white",
            padding: "5px 10px",
            border: "none",
            cursor: "pointer",
          }}
        >{favorites.some((fav) => fav.id === id) ? "Remove From Favorites" : "Add to Favorites"}</button>
      </div>
      <p className="text-gray-600 text-lg mt-2">By: {recipe.publisher}</p>
      <h3 className="text-xl font-semibold mt-4">Ingredients:</h3>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        {recipe.ingredients?.map((ing, index) => (
          <li key={index} className="text-gray-700">
            {ing.quantity || ""} {ing.unit} {ing.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeDetails;
