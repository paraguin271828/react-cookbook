import React from "react";

export default function RecipeComponent({ data }) {
  //console.log(data);

  const ingredients = data.extendedIngredients;
  console.log(ingredients);

  const ingrFunc = ingredients.map((el, index) => {
    //console.log(ingredients);
    return (
      <tr key={index}>
        <td>{el["originalString"]}</td>
        <td>{el["amount"] + el["unit"]}</td>
      </tr>
    );
  });

  return (
    <div className="row">
      <div className="card">
        <h2>{data.strMeal}</h2>
        <div className="col-sm-6">
          <img src={data.image} alt="theregoesanalttag" />
        </div>
        <table className="table col-sm-6">
          <tbody>
            <tr>
              <td>Table of Ingredients</td>
            </tr>
            {ingrFunc}
          </tbody>
        </table>
        <p />
        <div>
          <button type="button" className="btn btn-danger">
            <i className="fas fa-trash-alt" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
