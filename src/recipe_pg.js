import './App.css';
import { useState, useEffect } from "react"; // useEffect for data fetching
import { useLocation } from 'react-router-dom'; // Import useLocation

export function Page() {
  const location = useLocation(); // Get the location object
  const recipeId = location.state?.id; // Access the passed recipe ID
  const [recipe, setRecipe] = useState(null); // State to hold the recipe details

  useEffect(() => {
    // Fetch the specific recipe details based on recipeId
    if (recipeId) {
      fetch(`https://dummyjson.com/recipes/${recipeId}`) // Fetch the specific recipe
        .then((res) => res.json())
        .then((data) => {
          setRecipe(data); // Set the fetched recipe in state
        });
    }
  }, [recipeId]);

  return (
    <div className='page'>
       {recipe ? (
        <>
          <img src={recipe.image} alt="pic" />
          <div className='separator'></div>
          <div className='details'>
            <h1>{recipe.name}</h1> 
            <p>Ingredients - <span>{recipe.ingredients.join(', ')}</span></p> 
            <p>Instructions - <span>{recipe.instructions}</span></p>
            <p>Preparation time - <span>{recipe.prepTimeMinutes} mins</span></p>
            <p>Cook Time - <span>{recipe.cookTimeMinutes}</span></p>
            <p>Servings - <span>{recipe.servings}</span></p>
            <p>{recipe.cuisine}</p>
          </div>
        </>
      ) : (
        <h1>Loading recipe...</h1> // Display loading state
      )}
    </div>
  );
}
