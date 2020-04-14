import React from "react";
import "../styles/Menu.css";

export default function Menu() {
  return (
    <div>
      <div id="menu_button">
        <label for="menu_checkbox">
          <i className="fas fa-bars" />
        </label>
        <input type="checkbox" id="menu_checkbox" />

        <div id="menu">
          <ul>
            <li>meat</li>
            <li>vegetarian</li>
            <li>vegan</li>
            <li>glutenFree</li>
            <li>dairyFree</li>
            <li>veryHealthy</li>
            <li>cheap</li>
            <li>veryPopular</li>
            <li>sustainable</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
