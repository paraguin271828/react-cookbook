import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import * as contentful from "contentful";
import "./App.css";
import "./styles/fonts.css";
import Backgrounds from "./backgrounds.json";
import RecipeComponent from "./components/RecipeComponent";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Header from "./components/Header";
import AddRecipe from "./components/AddRecipe";

// Setup Contentful client
// Content model is hosted on Alfredo's account
const client = contentful.createClient({
  space: "fq3y9i3n1f0a",
  accessToken: "Sdqy2_2zkT4xfgCySaZ9loL93bDbnFdUfibDdCRhZ5Y",
});

// API URLs for different categories
/*const api_url = {
	random: "https://cdn.contentful.com/spaces/fq3y9i3n1f0a/entries?access_token=Sdqy2_2zkT4xfgCySaZ9loL93bDbnFdUfibDdCRhZ5Y",
	vegetarian: "https://cdn.contentful.com/spaces/fq3y9i3n1f0a/entries?access_token=Sdqy2_2zkT4xfgCySaZ9loL93bDbnFdUfibDdCRhZ5Y&fields.vegetarian=true"
}*/

// const api_key = "c2230a382f204d5baf6c80cdc0569aea"; // felix
// const api_key = "4852133db1384781b04fd81badd09bfa" // alfredo
const api_key = "164c4f1bc5fa47919f2d66ee409af504"; // dennis

const api_url = {
    random: "https://api.spoonacular.com/recipes/random/?apiKey=" + api_key + "&number=3",
    vegetarian: "https://api.spoonacular.com/recipes/random/?apiKey=" + api_key + "&number=3&tags=vegetarian",
    vegan: "https://api.spoonacular.com/recipes/random/?apiKey=" + api_key + "&number=3&tags=vegan"
}

export default function App() {
  const [recipeResult, setRecipeResult] = useState([null]);

  // category needs to be the name of a boolean field in the CMS
  const [category, setCategory] = useState("home");

  const backgrounds = Backgrounds;

  console.log(recipeResult);
  console.log(backgrounds);

  useEffect(() => {
    fetchFunction();
  }, [category]);

  /*** Choose random background
   *    Image path, name and details are provided by a JSON file
   *    The content of it is stored in the backgrounds state variable
   *    backgrounds.path - the path to the image folder inside `public`
   *    backgrounds.images - array with objects for each filename
   *    backgrounds.images[{filename, filetype, author, url}]
   ***/
  const RandomBackground = ({ backgrounds }) => {
    let curCategory = "";
    // if the category is set to anything else than home,
    // we need to go up to the content root first
    // because of the Route (e.g. /category/vegetarian)
    curCategory = category !== "home" ? "../../" : "";
    const bgImage =
      curCategory +
      backgrounds.path +
      backgrounds.images[Math.floor(Math.random() * backgrounds.images.length)]
        .filename;

    console.log(backgrounds.images[0]);
    console.log(backgrounds.images.length);
    console.log(bgImage);

    return (
      <figure className="background-image">
        <img src={bgImage} alt="background" />
      </figure>
    );
  };

  /*** keeping this for later when switching from contentful to local API */
    const fetchFunction = () => {
      fetch(api_url[category])
        .then(res => res.json())
        .then(res => setRecipeResult(res))
        .catch(err => console.error("Why do we still get this error?\n",err));
    };


  // TODO: after migration to local API, don't forget to remove contentful in dependencies

  console.log(`fields.${category}`);

  /*** Fetch items from the content model on Contentful
   *    https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/
   *    Retrieved items are stored in recipeResult as an array
   ***/
  /*const fetchFunction = () => {
    client
      .getEntries({
        content_type: "recipe",
        ["fields." + category]: true, // thanks to ES6, this is possible
        order: "-sys.createdAt", // sort by newest items first (reverse order with the prefixed -)
        // TODO: create state variable for sorting options and pass it here
      })
      .then((entries) => setRecipeResult(entries))
      .catch((err) => console.log("An error occured: " + err));
  };*/

/*
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
    });*/

    const fetchedRecipes =
      recipeResult.recipes &&
      recipeResult.recipes.map((element, index) => {
        console.log("element: " + JSON.stringify(element.fields));
        return (
          <RecipeComponent
            key={index}
            data={element}
            deleteItem={() => deleteItem(index)}
          />
        );
      });

  const FilteredRecipes = () => {
    let { categoryName } = useParams();
    if (!categoryName) categoryName = "home";
    setCategory(categoryName); // set category to render new items
    return <div>{category}</div>;
  };

  function deleteItem(id) {
    console.log(recipeResult);
    const tempArr = Array.from(recipeResult.items);
    const items = tempArr.filter((_, i) => i !== id);
    console.log(tempArr);
    setRecipeResult({ items });
  }

  return (
    <Router>
      <div className="App container">
        <Header fetchFunction={() =>fetchFunction()} />

        <section id="recipes">
          <Switch>
            <Route path="/category/:categoryName">
              <FilteredRecipes />

              {recipeResult.items ? (
                fetchedRecipes
              ) : (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </Route>
            <Route path="/addRecipe">
              <AddRecipe />
            </Route>
            <Route path="/">
              <FilteredRecipes />

              {recipeResult.items ? (
                fetchedRecipes
              ) : (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </Route>
          </Switch>
        </section>
        <RandomBackground backgrounds={backgrounds} />
      </div>
    </Router>
  );
}
