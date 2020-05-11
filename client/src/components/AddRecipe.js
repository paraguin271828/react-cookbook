import React, {useState, useEffect} from "react";
import CategoryList from "./CategoryList";
import "../styles/AddRecipe.css";

export default () => {
  const [presetCategories, setPresetCategories] = useState(null);
  const [catLabels, setCatlabels] = useState(null);

  const getCategories = () => {
    // fetch already existing categories from db to populate category listing
    fetch("/rCategories", { method: "GET" })
    .then(result => {
      if (!result.ok) console.error("Could not fetch categoies");
      return result.json();
    })
    .then(categories => {
      setPresetCategories(categories.rows);
    })
    .catch(err => console.error(err));
  };

  useEffect(() => {
    getCategories();
  },[]);

  const handleCategories = (label) => {setCatlabels(label)};

  const categoryAdded = catLabels && Object.keys(catLabels).map(key => (
    <label key={key} className="category-tags">
      <span className="btn-label">{catLabels[key]}</span>
      <i className="fa fa-times"
        aria-hidden="true"
        onClick={
          (e) => {
            const newList = Object.assign({}, catLabels);
            document.getElementById('category' + key).checked = false;
            delete(newList[key]);
            handleCategories(newList);
          }
        }></i>
      </label>
    ));

    const fetchedCategories = presetCategories && presetCategories.map((category, index) => (
      <CategoryList category={category} catLabels={catLabels} setCatLabels={label => handleCategories(label)} />
    ));

    console.log(presetCategories);

    return (
      <form action="add-new-recipe" method="post">
        <div className="row">
          <div className="col">
            <label htmlFor="recipe-title">Recipe title</label>
            <input type="text" id="recipe-title" name="recipeName" placeholder="Recipte title" />
          </div>

          <div className="col">
            <label htmlFor="recipe-description">Description</label>
            <input type="text" id="recipe-description" name="recipeDestricption" placeholder="Description" />
          </div>
        </div>

        <div className="row">
          <div id="recipe-ingredients" className="col">
            <input type="checkbox" name="recipeIngredient" /> Ingredient 1
              <input type="checkbox" name="recipeIngredient" /> Ingredient 2
                <input type="checkbox" name="recipeIngredient" /> Ingredient 3
                </div>
              </div>

              <div className="row">
                <div id="recipe-category" className="col-6">
                  {presetCategories ? (
                    <ul id="category-list">
                      {fetchedCategories}
                    </ul>
                  ) : (
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </div>
                <div id="recipe-category-list" className="col-6">
                  {catLabels ? (
                    <div id="category-tags">
                      {categoryAdded}
                    </div>
                  ) : (<div></div>)}
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label htmlFor="recipe-url">Source link</label>
                  <input type="text" id="recipe-url" name="recipeLink" placeholder="Source link" />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <button type="submit" className="btn btn-info btn-toolbar">Add Recipe</button>
                </div>
              </div>
            </form>
          )
        }
