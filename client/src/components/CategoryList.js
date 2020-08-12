import React, {useState, useEffect} from "react";

export default ({category, catLabels, setCatLabels}) => {
  const addCategory = (target, catValue, categoryId) => {
    const catId = catValue + '-' + categoryId;
    const list = document.getElementById("recipe-category-list");
    let newList = Object.assign({}, catLabels);
    newList[categoryId] = catValue;

    // remove item from list if unchecked again
    if (!target.checked) {
      //document.getElementById(catId).remove();
      delete newList[categoryId];
      console.log(`Removed item ${catValue} from list.`);
    }

    else {
      console.log(catId);
      //list.innerHTML += `<input type="text" id="${catId}" disabled="disabled" />`
      //document.getElementById(catId).value = newList[categoryId];
      console.log(`Category ${catValue} added to list.`)
    }

    setCatLabels(newList);
  }

return (
  <li key={category.categoryid}>
    <input
      id={"category"+category.categoryid}
      type="checkbox"
      name="recipeCategory"
      value={category.categoryname}
      onClick={(e) => addCategory(e.target, e.target.value, category.categoryid)} />
    <label htmlFor={"category"+category.categoryid}>{category.categoryname}</label>
  </li>
)}
