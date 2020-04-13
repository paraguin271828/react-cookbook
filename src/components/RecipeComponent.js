import React from "react";

export default function RecipeComponent({ data, deleteItem }) {
  //console.log(data);

  const ingredients = data.extendedIngredients;
  //console.log(ingredients);

  const ingrFunc = ingredients.map((el, index) => {
    //console.log(ingredients);
    return (
      <tr key={index} className="d-flex">
        <td>{el["amount"] + " " + el["unit"]}</td>
        <td>{el["name"]}</td>
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
        <div className="table-responsive">
          <table className="table table-hover">
            <caption>Table of Ingredients</caption>
            <thead className="thead-light">
              <tr className="d-flex">
                <th>Amount</th>
                <th>Ingredient</th>
              </tr>
            </thead>
            <tbody>{ingrFunc}</tbody>
          </table>
        </div>
        <p />
      </div>
      <div className="toolbar">
        <button type="button" className="btn btn-danger" onClick={deleteItem}>
          <i className="fas fa-trash-alt" /> Delete
        </button>
      </div>
    </div>
  );
}
