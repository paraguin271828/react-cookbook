import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Switch, Route, useParams} from "react-router-dom";
import * as contentful from "contentful";
import "./App.css";
import Backgrounds from "./backgrounds.json";
import RecipeComponent from "./components/RecipeComponent";
import Menu from "./components/Menu";

// const api_key = "c2230a382f204d5baf6c80cdc0569aea"; // felix
// const api_key = "4852133db1384781b04fd81badd09bfa" // alfredo
// const api_key = "164c4f1bc5fa47919f2d66ee409af504"; // dennis

/*const api_url = {
    random: "https://api.spoonacular.com/recipes/random/?apiKey=" + api_key + "&number=3",
    vegetarian: "https://api.spoonacular.com/recipes/random/?apiKey=" + api_key + "&number=3&tags=vegetarian",
    vegan: "https://api.spoonacular.com/recipes/random/?apiKey=" + api_key + "&number=3&tags=vegan"
}*/

const client = contentful.createClient({
	space: "fq3y9i3n1f0a",
	accessToken: "Sdqy2_2zkT4xfgCySaZ9loL93bDbnFdUfibDdCRhZ5Y"
});

const api_url = {
	random: "https://cdn.contentful.com/spaces/fq3y9i3n1f0a/entries?access_token=Sdqy2_2zkT4xfgCySaZ9loL93bDbnFdUfibDdCRhZ5Y"
}

const RandomBackground = ({backgrounds}) => {
	const bgImage = "./" + backgrounds.path + backgrounds.images[Math.floor(Math.random()*backgrounds.images.length)].filename;

	console.log(backgrounds.images[0]);
	console.log(backgrounds.images.length);
	console.log(bgImage);

	return <figure className="background-image"><img src={bgImage} alt="background image"/></figure>
}

export default function App() {
  const [recipeResult, setRecipeResult] = useState([null]);
  const [category, setCategory] = useState("random");

	const [backgrounds, setBackgrounds] = useState(Backgrounds);

	console.log(recipeResult);
	console.log(backgrounds);

  useEffect(() => {
    fetchFunction();
  }, [category]);

/*** keeping this for later when switching from contentful to local API
    const fetchFunction = () => {
      fetch(api_url[category])
        .then(res => res.json())
        .then(res => setRecipeResult(res))
        .catch(err => console.log("Why do we still get this error?\n"));
    };
***/

// TODO: after migration to local API, don't forget to remove contentful in dependencies

  const fetchFunction = () => {
	  client.getEntries()
		  .then(entries => setRecipeResult(entries))
      .catch(err => console.log("An error occured: " + err));
  };

  const fetchedRecipes =
    recipeResult.items &&
    recipeResult.items.map((element, index) => {
	     console.log("element: " + JSON.stringify(element.fields));
      return (
        <RecipeComponent
          key={index}
          data={element.fields}
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
    const tempArr = Array.from(recipeResult.items);
    const items = tempArr.filter((_, i) => i !== id);
    console.log(tempArr);
    setRecipeResult({ items });
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
            {recipeResult.items ? (
                fetchedRecipes
              ) : (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
          </Route>
        </Switch>
      </Router>
			<RandomBackground backgrounds={backgrounds}/>
    </div>
  );
}
