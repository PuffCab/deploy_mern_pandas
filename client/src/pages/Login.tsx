import React, { useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import { LoginOkResponse, NotOkType } from "../@types";

function Login() {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    console.log("import.meta.env.MODE :>> ", import.meta.env.MODE);
    // more custom validation would go here....
    if (!inputValues.email.trim() || !inputValues.password.trim()) {
      setError("Credentials missing");
      return;
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const body = new URLSearchParams();
    body.append("email", inputValues.email);
    body.append("password", inputValues.password);

    const requestOptions = {
      method: "POST",
      headers,
      body,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/users/login`,
        requestOptions
      );
      if (response.ok) {
        const result = (await response.json()) as LoginOkResponse;

        //if response is ok(we consider user as logged in)

        //1. check if token is in the response
        if (result.token) {
          //2. store token in localstorage
          localStorage.setItem("token", result.token);
        }

        console.log("user is logged in", result);
        alert("it worked!");
        setInputValues({ email: "", password: "" });
      }
      if (!response.ok) {
        const result = (await response.json()) as NotOkType;
        console.log("login not ok", result);
        setError(result.error);
      }
    } catch (error) {
      console.log(error);
      const { message } = error as Error;
      setError(message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={inputValues.email}
          type="email"
          name="email"
          placeholder="Enter your email..."
        />
        <input
          onChange={handleChange}
          value={inputValues.password}
          type="password"
          name="password"
          placeholder="Enter a password"
        />

        <button style={{ display: "block" }} type="submit">
          Login
        </button>
        <p style={{ color: "red" }}>{error}</p>
      </form>
    </>
  );
}

export default Login;
