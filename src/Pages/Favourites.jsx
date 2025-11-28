
import React, { useEffect, useState } from "react";
import MealCard from "../Components/MealCard";

export default function Favourites() {
  const [favMeals, setFavMeals] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("fav-meals")) || [];
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavMeals(stored);
  }, []);

  const removeMeal = (id) => {
    const updated = favMeals.filter((m) => m.idMeal !== id);
    localStorage.setItem("fav-meals", JSON.stringify(updated));
    setFavMeals(updated);
  };

  return (
    <div className="container">
      <h2>Your favourites Meals</h2>

      {favMeals.length === 0 && <p>No favorites yet.</p>}

      <div className="meal-grid">
        {favMeals.map((meal) => (
          <div key={meal.idMeal}>
            <MealCard meal={meal} />
            <button onClick={() => removeMeal(meal.idMeal)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
