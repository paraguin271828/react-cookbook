import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Switch, Route, useParams} from "react-router-dom";
import "./App.css";
import RecipeComponent from "./components/RecipeComponent";
import Menu from "./components/Menu";

// const app_url = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";

// const api_key = "c2230a382f204d5baf6c80cdc0569aea"; // felix
const api_key = "4852133db1384781b04fd81badd09bfa" // alfredo
// const api_key = "164c4f1bc5fa47919f2d66ee409af504"; // dennis

const api_url = {
    random: "https://api.spoonacular.com/recipes/random/?apiKey=" + api_key + "&number=3",
    vegetarian: "https://api.spoonacular.com/recipes/random/?apiKey=" + api_key + "&number=3&tags=vegetarian",
    vegan: "https://api.spoonacular.com/recipes/random/?apiKey=" + api_key + "&number=3&tags=vegan"
}

export default function App() {
  const [recipeResult, setRecipeResult] = useState([null]);
  const [category, setCategory] = useState('random');

  useEffect(() => {
    fetchFunction();
  }, [category]);

  const fetchFunction = () => {
      fetch(api_url[category])
        .then(res => res.json())
        .then(res => setRecipeResult(res))
        .catch(err => console.log("Why do we still get this error?\n"));
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

  const FilteredRecipes = () => {
      let {categoryName} = useParams();
      setCategory(categoryName);
      return <div>{category}</div>;
  }

  function deleteItem(id) {
    console.log(recipeResult);
    const tempArr = Array.from(recipeResult.recipes);
    const recipes = tempArr.filter((_, i) => i !== id);
    console.log(tempArr);
    setRecipeResult({ recipes });
  }

  return (
    <div className="App container">
      <header>
        <h1>Limited Recipes</h1>
        <h6>Better be fast</h6>
      </header>
      <div className="toolbar">
        <button className="btn btn-info" onClick={fetchFunction}>
          Fetch recipes
        </button>
      </div>

      <Router>
        <Menu />
        <Switch>
          <Route path="/category/:categoryName">
            <FilteredRecipes />

            {recipeResult.recipes ? (
                fetchedRecipes
              ) : (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
          </Route>
          <Route path="/">
            {recipeResult.recipes ? (
                fetchedRecipes
              ) : (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
          </Route>
        </Switch>
      </Router>


    </div>
  );
}
