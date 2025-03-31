import React, { useContext , useEffect} from 'react'
import { GlobalContext } from '../context'
import RecipeCard from './RecipeCard';

function Favorites() {
  const {loading , error ,setLoading , setRecipe , setError , favorites , setFavorites} = useContext(GlobalContext);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);
  

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="w-full min-h-screen bg-gray-200 p-6">
      {favorites && favorites.length > 0 ? (
        <div className="grid grid-cols-4 gap-7">
        {favorites.map((item) => (
          <RecipeCard
            id={item.id}
            key={item.id}
            title={item.title}
            image_url={item.image_url}
            publisher={item.publisher}
          />
        ))}
      </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-xl text-center text-gray-600">
            No favorites Found !
          </p>
        </div>
      )}
    </div>
  )
}

export default Favorites