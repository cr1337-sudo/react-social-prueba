import "./register.css";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const history = useHistory();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.passwordAgain !== data.password) {
      e.target.passwordAgain.setCustomValidity("Passwords don´t match!");
    } else {
      const user = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Cheap Facebook</h3>
          <span className="loginDesc">Register Page</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              name="username"
              placeholder="Username"
              className="loginInput"
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Email"
              className="loginInput"
              onChange={handleChange}
            />
            <input
              name="password"
              placeholder="Password"
              className="loginInput"
              onChange={handleChange}
              minLength="6"
            />
            <input
              name="passwordAgain"
              placeholder="Password Again"
              className="loginInput"
              onChange={handleChange}
            />
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
