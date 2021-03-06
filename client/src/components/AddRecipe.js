import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CategoryList from './CategoryList';
import OptionListComponent from './OptionListComponent';
import SearchResult from './SearchResult';
import '../styles/AddRecipe.css';

export default () => {
  const [presetIngredients, setPresetIngredients] = useState(null);
  const [presetCategories, setPresetCategories] = useState(null);
  const [ingrLabels, setIngrlabels] = useState(null);
  const [catLabels, setCatlabels] = useState(null);
  const [ingSearch, setIngSearch] = useState(null);
  const [catSearch, setCatSearch] = useState(null);
  const [searchResult, setSearchResult] = useState([null]);

  const getIngredients = async () => {
    // fetch already existing ingredients from db to populate category listing
    try {
      const res = await axios.get('/ingredients')
      if (!res.data.rows) console.error('Could not fetch ingredients');
      setPresetIngredients(res.data.rows);
    }
    catch (err) {
      console.error(err);
    }
  };

  const getCategories = async () => {
    // fetch already existing categories from db to populate category listing
    try {
      const res = await axios.get('/categories')
      if (!res.data.rows) console.error('Could not fetch categories');
      setPresetCategories(res.data.rows);
    }
    catch (err) {
      console.error(err);
    }
  };

  const searchFunc = (q, searchType) => {
    console.log('search function called');

    if (q.length > 1) {
      axios.get('/search/'+searchType+'?q='+q)
        .then(result => setSearchResult(result.data))
        .catch ((err) => console.error(err));
    }
  }
console.log(searchResult);
  const searchResultComponent = searchResult.map((el, index) => <SearchResult key={index} prop={el} />);

  const handleInput = (e, searchType) => {
    if (searchType === 'ingredients') setIngSearch(e.target.value);
    else if (searchType === 'categories') setCatSearch(e.target.value);
      searchFunc(e.target.value, searchType);
  }

  useEffect(() => {
    getIngredients();
    getCategories();
  },[]);

  const handleIngredients = (label) => {setIngrlabels(label)};
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

    const fetchedItems = (items, type) => { return (
      items && items.map((val, index) => (
        <OptionListComponent key={index} props={val} type={type} propsLabels={ingrLabels} setLabels={label => handleIngredients(label)} />
      )))
    };

    const fetchedCategories = presetCategories && presetCategories.map((category, index) => (
      <CategoryList key={category.categoryid} category={category} catLabels={catLabels} setCatLabels={label => handleCategories(label)} />
    ));

    return (
      <form action="newrecipe" method="post">
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
            {presetIngredients ? (
              <ul id="category-list" className="col-md-6 col-sm12">
                {fetchedItems(presetIngredients, 'ingredients')}
              </ul>
            ) : (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            <input type="text"
                  name="ingredientsearch"
                  id="ingredients-search"
                  placeholder = "Ingredient"
                  value={ingSearch}
                  onChange={e => handleInput(e, 'ingredients')}
             />
           <div className="suggestions">
             {searchResult ? searchResultComponent : <span></span> }
            </div>
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
            <input type="text"
                  name="categorysearch"
                  id="category-search"
                  placeholder =""
                  value={catSearch}
                  onChange={e => handleInput(e, 'categories')}
             />
           <div className="suggestions">
             {searchResult ? searchResultComponent : <span></span> }
            </div>
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
