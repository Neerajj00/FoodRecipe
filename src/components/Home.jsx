import React, { useContext } from 'react'
import { GlobalContext } from '../context'
import RecipeCard from './RecipeCard';

function Home() {
  const { search, error, loading, data } = useContext(GlobalContext);

  // it will render when in loading state
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-200 flex flex-wrap gap-6 justify-center p-6">
        <p className='text-xl text-gray-600'>
          Wait! loading......
        </p>
      </div>
    )
  }
  // it will render when there will be an error
  if (error) {
    return (
      <div className="text-xl text-gray-600" >
        {error}
      </div>
    )
  }

  console.log(data);
  return (
    <div className="w-full min-h-screen bg-gray-200 p-6">
      {data && data.length > 0 ? (
        <div className="grid grid-cols-4 gap-7">
          {data.map((item) => (
            <RecipeCard
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
            No Recipes Found! Search a Recipe First
          </p>
        </div>
      )}
    </div>
  );

}

export default Home