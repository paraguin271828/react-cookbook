import React from 'react';

export default ({props, setLabels}) => {
  console.log(props);
  // save object values in an array to call them by index, because the keys
  // differ on database results
  const propValues = Object.values(props);

  return (
    <li>
      <input
        id={"category"+props.id}
        type="checkbox"
        name="recipeCategory"
        value={props.ingredientsname} />
      <label htmlFor={"category"+propValues[0]}>{propValues[1]}</label>
    </li>
  )
}
