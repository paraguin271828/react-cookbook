import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../styles/Login.css";

export default function Menu() {
  const [userInput, setUserInput] = useState({
    user: "",
    password: ""
  });

  const hideLogin = () => {
    document.getElementById("login-checkbox").checked = false;
  }

  const userLogin = (event) => {
    event.preventDefault();
    const data = userInput;
    console.log(data);

    fetch("/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.state >= 400) throw new Error("Bad response from server.");
      return response.json();
    })
    .then(resData => {
      console.log(resData);
      if (resData === "success") console.log("successfully logged in.");
      else {console.log("An error occured while logging in.")}
    })
    .catch(err => {
      console.error(err)
    });
  }

  const handleInput = (event) => {
    // store value (object) of userInput in a temporary variable
    let userData = Object.assign(userInput, {});
    userData[event.target.name] = event.target.value;
    setUserInput(userData);
    console.log(userData);

  }

  return (
    <div id="login-container">
      <input type="checkbox" id="login-checkbox" />
      <label htmlFor="login-checkbox" id="login-label" className="btn btn-info btn-toolbar"></label>
      <div id="login-bg" onClick={hideLogin}></div>
      <form id="login" method="post" onSubmit={userLogin}>
        <input type="text" id="username" name="user" placeholder="Username" required="required" onChange={handleInput} />
        <label for="username" id="username-label">
          Username
        </label>
        <input type="password" id="password" name="password" placeholder="Password" required="required" onChange={handleInput} />
        <label for="password" id="password-label">
          Password
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
