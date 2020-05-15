import React from 'react';

export default (prop) => {
  let componentValue
  if (prop.prop) componentValue = prop.prop.ingredientname;

  return (
<div className="suggestion">{componentValue}</div>)};
