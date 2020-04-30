import React from "react";
import {Link} from "react-router-dom";
import "../styles/Menu.css";

export default function Menu() {
  const deactivateMenu = () => {
    document.removeEventListener("click", deactivateMenu, false);
    document.getElementById("menu-checkbox").checked = false;
  }
  return (
    <div id="menu-container">
      <input type="checkbox" id="menu-checkbox" />
      <label htmlFor="menu-checkbox" id="menu-label">
        &nbsp;
      </label>
      <div id="menu-bg" onClick={deactivateMenu}></div>
			<nav id="menu">
        <h3>Menu</h3>
			  <ul>
			    <li><Link to="/" onClick={deactivateMenu}><i className="fa-li fa fa-home"></i>home</Link></li>
  				<li><Link to="/category/meat" onClick={deactivateMenu}><i className="fa-li fa fa-drumstick-bite"></i>meat</Link></li>
  				<li><Link to="/category/vegetarian" onClick={deactivateMenu}><i className="fa-li fa fa-egg"></i>vegetarian</Link></li>
  				<li><Link to="/category/vegan" onClick={deactivateMenu}><i className="fa-li fa fa-pepper-hot"></i>vegan</Link></li>
  				<li><Link to="/category/sweet" onClick={deactivateMenu}><i className="fa-li fa fa-ice-cream"></i>sweet</Link></li>
			  </ul>
			</nav>
    </div>
  );
}
