/* eslint-disable react-hooks/immutability */


import React, { useState, useEffect } from "react";
import axios from "axios";
import MealCard from "../Components/MealCard";


export default function Home() {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("All");
  

  // Load Categories on first render
  useEffect(() => {
    fetchCategories();
    fetchDefaultMeals();
  }, []);

  // Fetch all categories for dropdown
  const fetchCategories = async () => {
    const res = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
    );
    setCategories(res.data.meals);
  };
  // Default meals (Homepage)
  const fetchDefaultMeals = async () => {
    const res = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
    );
    setMeals(res.data.meals || []);
  };

  // SEARCH meals
  const handleSearch = async () => {
    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
    setMeals(res.data.meals || []);
    setSelectedCat("All"); // reset category
  };

  // CATEGORY FILTER
  const handleCategory = async (category) => {
    setSelectedCat(category);

    if (category === "All") {
      fetchDefaultMeals();
      return;
    }

    const res = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    setMeals(res.data.meals || []);
  };

  return (
    <div className="container">
      <h2>Explore Recipes</h2>

      {/* SEARCH INPUT */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search meal..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* CATEGORY DROPDOWN */}
      <div style={{ marginBottom: "20px" }}>
        <select
          value={selectedCat}
          onChange={(e) => handleCategory(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((c) => (
            <option key={c.strCategory} value={c.strCategory}>
              {c.strCategory}
            </option>
          ))}
        </select>
      </div>

      {/* MEAL LIST */}
      <div className="meal-grid">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
    
  );
}
