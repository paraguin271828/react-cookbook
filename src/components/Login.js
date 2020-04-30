import React from "react";
import {Link} from "react-router-dom";
import "../styles/Login.css";

export default function Menu() {
  const hideLogin = () => {
    document.getElementById("login-checkbox").checked = false;
  }
  return (
    <div id="login-container">
      <input type="checkbox" id="login-checkbox" />
      <label htmlFor="login-checkbox" id="login-label" className="btn btn-info btn-toolbar"></label>
      <div id="login-bg" onClick={hideLogin}></div>
			<form id="login">
        <input type="text" id="username" name="username" placeholder="Username" />
        <label for="username" id="username-label">
          Username
        </label>
        <input type="text" id="password" name="password" placeholder="Password" />
        <label for="password" id="password-label">
          Password
        </label>
			</form>
    </div>
  );
}
