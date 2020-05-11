import React, {useState} from "react";
import {Link} from "react-router-dom";
import Menu from "./Menu";
import Login from "./Login";

export default ({fetchFunction}) => (
  <header>
  <Menu />
  <div className="toolbar">
    <button className="btn btn-info btn-toolbar" onClick={fetchFunction}>
      Fetch recipes
    </button>
    <Link to="/addRecipe">
    <button className="btn btn-info btn-toolbar">
      Add recipe
    </button>
    </Link>
  </div>
  <h1><span>Alf</span><span>red</span><span>o's</span></h1>
  <img
    id="rotatingpizza"
    src="/images/backgrounds/pizza.png"
    height="120"
  />
  <h6>Easy Eat Yum</h6>
  <Login />
</header>
);
