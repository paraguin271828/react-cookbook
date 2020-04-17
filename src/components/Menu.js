import React from "react";
import {BrowserRouter as Router, Link} from "react-router-dom";
import "../styles/Menu.css";

export default function Menu() {
  return (
    <div>
      <div id="menu_button">
        <label htmlFor="menu_checkbox">
          <i className="fas fa-bars" />
        </label>
        <input type="checkbox" id="menu_checkbox" />

			<nav id="menu">
			  <ul>
			    <li><Link to="/">home</Link></li>
				<li>meat</li>
				<li><Link  to="/category/vegetarian">vegetarian</Link></li>
				<li><Link  to="/category/vegan">vegan</Link></li>
				<li>glutenFree</li>
				<li>dairyFree</li>
				<li>veryHealthy</li>
				<li>cheap</li>
				<li>veryPopular</li>
				<li>sustainable</li>
			  </ul>
			</nav>
      </div>
    </div>
  );
}
