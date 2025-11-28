import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Details() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      setMeal(res.data.meals[0]);
    };

    fetchMeal();
  }, [id]);

  const addToFav = () => {
    let fav = JSON.parse(localStorage.getItem("fav-meals")) || [];
    fav.push(meal);
    localStorage.setItem("fav-meals", JSON.stringify(fav));
    alert("Added to favourites!");
  };

  if (!meal) return <h2>Loading...</h2>;

  // Extract ingredients 
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ing && ing.trim() !== "") {
      ingredients.push({ ingredient: ing, measure: measure });
    }
  }

  return (
    <div className="details">
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt="" />

      <p><b>Category:</b> {meal.strCategory}</p>
      <p><b>Area:</b> {meal.strArea}</p>

     { /* INGREDIENT SECTION */}
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>
            {item.ingredient} - {item.measure}
          </li>
        ))}
      </ul>

      {/*  Instructions */}
      <h2>Instructions</h2>
      <p>{meal.strInstructions}</p>

      <button onClick={addToFav}>Add to Favorites</button>

      <h2>Youtube Tutorial</h2>
      <a href={meal.strYoutube} target="_blank">Watch Video</a>
    </div>
  );
}
