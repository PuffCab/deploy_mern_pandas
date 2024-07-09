import React, { useEffect, useRef, useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import { NotOkType, User } from "../@types";

function Register() {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");
  const selectedFile = useRef<File | null>(null);
  const [previewImg, setPreviewImg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // more custom validation would go here....
    if (!inputValues.email.trim() || !inputValues.password.trim()) {
      setError("Credentials missing");
      return;
    }

    const headers = new Headers();
    // headers.append("Content-Type", "application/x-www-form-urlencoded");

    const body = new FormData();
    body.append("email", inputValues.email);
    body.append("password", inputValues.password);

    if (inputValues.username) {
      body.append("username", inputValues.username);
    }

    if (selectedFile.current) {
      body.append("avatar", selectedFile.current);
    }

    const requestOptions = {
      method: "POST",
      headers,
      body,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/users/signup`,
        requestOptions
      );
      if (response.ok) {
        const result = (await response.json()) as User;
        console.log("this is the new user!", result);
        alert("it worked!");
        setInputValues({ email: "", password: "", username: "" });
        selectedFile.current = null;
        setPreviewImg("");
      }
      if (!response.ok) {
        const result = (await response.json()) as NotOkType;
        console.log("result not ok", result);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (previewImg) {
      URL.revokeObjectURL(previewImg);
    }
    if (e.target.files && e.target.files.length > 0) {
      selectedFile.current = e.target.files[0];
      const tempURL = URL.createObjectURL(e.target.files[0]);
      setPreviewImg(tempURL);
    } else {
      if (previewImg) {
        URL.revokeObjectURL(previewImg);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (previewImg) {
        URL.revokeObjectURL(previewImg);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>Register</h2>
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
        <input
          onChange={handleChange}
          value={inputValues.username}
          name="username"
          placeholder="Choose a username"
        />
        <input onChange={handleFileChange} type="file" />
        <button style={{ display: "block" }} type="submit">
          Sign up!
        </button>
        <p style={{ color: "red" }}>{error}</p>
      </form>
      {previewImg && (
        <img
          style={{ width: "100px" }}
          src={previewImg}
          alt="preview of selected file"
        />
      )}
    </>
  );
}

export default Register;
