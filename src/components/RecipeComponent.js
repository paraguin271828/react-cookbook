import React from "react";

export default function RecipeComponent({ data, deleteItem }) {
  //console.log(data);

  const ingredients = data.extendedIngredients;
  //console.log(ingredients);

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
        <div className="col image_container">
          <img src={data.image} alt="theregoesanalttag" />
        </div>
        <h2>{data.title}</h2>
        <table className="table table-hover col col-sm-12">
          <caption>Table of Ingredients</caption>
          <thead className="thead-light">
            <tr>
              <th>Ingredient</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>{ingrFunc}</tbody>
        </table>
        <p />
        <div class="toolbar">
          <button type="button" className="btn btn-danger" onClick={deleteItem}>
            <i className="fas fa-trash-alt" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
