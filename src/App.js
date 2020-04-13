import React, { useState, useEffect } from "react";
import "./styles.css";
import RecipeComponent from "./components/RecipeComponent";

// const app_url = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";

// const app_key = "c2230a382f204d5baf6c80cdc0569aea"; // felix
// const app_key = "4852133db1384781b04fd81badd09bfa" // alfredo
const app_key = "164c4f1bc5fa47919f2d66ee409af504"; // dennis

const app_url =
  "https://api.spoonacular.com/recipes/random/?apiKey=" + app_key + "&number=3";

export default function App() {
  const [recipeResult, setRecipeResult] = useState([null]);

  useEffect(() => {
    fetchFunction();
  }, []);

  const fetchFunction = () => {
    fetch(app_url)
      .then(res => res.json())
      .then(res => setRecipeResult(res))
      .catch(() => console.log("Why do we still get this error?"));
  };

  const fetchedRecipes =
    recipeResult.recipes &&
    recipeResult.recipes.map((element, index) => {
      return (
        <RecipeComponent
          key={index}
          data={element}
          deleteItem={() => deleteItem(index)}
        />
      );
    });

  function deleteItem(id) {
    console.log(recipeResult);
    const tempArr = Array.from(recipeResult.recipes);
    const recipes = tempArr.filter((_, i) => i !== id);
    console.log(tempArr);
    setRecipeResult({ recipes });
  }

  return (
    <div className="App container">
      <div className="toolbar">
        <button className="btn btn-info" onClick={fetchFunction}>
          Fetch recipes
        </button>
      </div>
      {recipeResult.recipes ? fetchedRecipes : "fetching data"}
    </div>
  );
}
