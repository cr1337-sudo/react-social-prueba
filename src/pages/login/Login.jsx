import { useContext, useState } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Redirect } from "react-router";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const { email, password } = data;
  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({ email, password }, dispatch);
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Cheap Facebook</h3>
          <span className="loginDesc">Login</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              name="email"
              required
              type="email"
              className="loginInput"
              onChange={handleChange}
            />
            <input
              placeholder="Password"
              name="password"
              required
              minLength="6"
              type="password"
              className="loginInput"
              onChange={handleChange}
            />
            <button className="loginButton">
              {isFetching ? (
                <CircularProgress color="white" size="15px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
