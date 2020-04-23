import React from "react";
import "../styles/RecipeComponent.css";

export default function RecipeComponent({ data, deleteItem }) {
  console.log("Data: " + data);

  const ingredients = data.ingredients;
  //console.log(ingredients);

/*  const ingrFunc = ingredients.map((el, index) => {
    //console.log(ingredients);
    return (
      <tr key={index}>
        <td>{el["amount"] + " " + el["unit"]}</td>
        <td>{el["name"]}</td>
      </tr>
    );
  });*/

  return (
    <div className="recipe_component">
      <div className="row">
        <div className="col">
          <div className="card">
            <img className="card-img-top" src={data.image} alt="theregoesanalttag" />
            
            <div className="card-body">
              <h2 className="card-title">{data.title}</h2>
              <div className="ingredients table-responsive col-sm-12 col-md-6">
                <table className="table table-hover">
                  <caption>Table of Ingredients</caption>
                  <thead className="thead-light">
                    <tr>
                      <th className="col-6">Amount</th>
                      <th className="col-6">Ingredient</th>
                    </tr>
                  </thead>
                  <tbody>{data.ingredients}</tbody>
                </table>
              </div>
              <div className="total-time">{data.readyInMinutes}</div> 
              <a href={data.sourceUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Go to recipe</a>
            </div>
          
            <div className="card-footer toolbar">
              <button type="button" className="btn btn-danger" onClick={deleteItem}>
                <i className="fas fa-trash-alt" /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
