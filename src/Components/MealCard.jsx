import { Link } from "react-router-dom";


export default function MealCard({ meal }) {
  return (
    <div className="meal-card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>{meal.strMeal}</h3>
      <Link to={`/meal/${meal.idMeal}`} className="btn">
        View Details
      </Link>
    </div>
  );
}
