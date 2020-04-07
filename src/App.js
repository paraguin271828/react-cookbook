import React, { useState, useEffect } from "react";
import "./styles.css";
import RecipeComponent from "./components/RecipeComponent";

//const app_url = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";
const app_key = "c2230a382f204d5baf6c80cdc0569aea";
const app_url =
  "https://api.spoonacular.com/recipes/random/?apiKey=" + app_key + "&number=3";

export default function App() {
  const [recipeResult, setRecipeResult] = useState([null]);

  useEffect(() => {
    fetch(app_url)
      .then(res => res.json())
      .then(res => setRecipeResult(res))
      .catch(() => console.log("Why do we still get this error?"));
  }, []);

  const fetchedRecipes =
    recipeResult.recipes &&
    recipeResult.recipes.map((element, index) => {
      //console.log(element);
      return <RecipeComponent key={index} data={element} />;
    });
  //console.log(fetchedRecipes);

  /*const recipeList = [];

  function pushRecipes() {
    if (recipeResult.meals) {
      console.log("yes");
      recipeResult.meals.map((element, index) => {
        return recipeList.push(element);
      });
    }
  }
  pushRecipes();
  console.log(recipeList)
*/
  return (
    <div className="App">
      {/*recipeResult.meals ? recipeResult.meals[0].strMeal : "fetching data"*/}
      {recipeResult.recipes ? fetchedRecipes : "fetching data"}

      {/*<i className="fas fa-star" />*/}
    </div>
  );
}

/*
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);*/
