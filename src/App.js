import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";
import "./App.css";
import RecipeComponent from "./components/RecipeComponent";
import Menu from "./components/Menu";

// const app_url = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";

// const app_key = "c2230a382f204d5baf6c80cdc0569aea"; // felix
const app_key = "4852133db1384781b04fd81badd09bfa" // alfredo
// const app_key = "164c4f1bc5fa47919f2d66ee409af504"; // dennis

const app_url =
  "https://api.spoonacular.com/recipes/random/?apiKey=" + app_key + "&number=3";

export default function App() {
  function MenuFunc() {
    let { vegetarian } = useParams();
    return (<div className="App">{vegetarian}</div>);
  }

  const [recipeResult, setRecipeResult] = useState([null]);

  useEffect(() => {
    fetchFunction();
  }, []);

  const fetchFunction = () => {
    fetch(app_url)
      .then(res => res.json())
      .then(res => setRecipeResult(res))
      .catch(() => console.log("Why do we still get this error?"));
    console.log(recipeResult);
  };

  const fetchedRecipes =
    recipeResult.recipes &&
    recipeResult.recipes.map((element, index) => {
      return (
        <Router>
          <Switch>
            <Route path="/">
              <RecipeComponent
                key={index}
                data={element}
                deleteItem={() => deleteItem(index)}
              />
            </Route>
            <Route path="/category/:vegetarian">
              <MenuFunc />
            </Route>
          </Switch>
        </Router>
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
      <header>
        <h1>Limited Recipes</h1>
        <h6>Better be fast</h6>
      </header>
      <Menu />
      <div className="toolbar">
        <button className="btn btn-info" onClick={fetchFunction}>
          Fetch recipes
        </button>
      </div>
      {recipeResult.recipes ? (
        fetchedRecipes
      ) : (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
}
