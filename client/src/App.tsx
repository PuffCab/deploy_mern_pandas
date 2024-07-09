import { useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";

import Register from "./pages/Register";
import { isToken, removeToken } from "./utils/tokenServices";
import UserProfile from "./pages/UserProfile";

function App() {
  //!the code below (useEffect and logout) are functionalities which quite likely belong to an authContext
  useEffect(() => {
    const isUserLogged = isToken();
    if (isUserLogged) {
      console.log("%c user is LOGGED IN", "color:green");
    } else {
      console.log("%c user is LOGGED OUT", "color:red");
    }
  }, []);

  const logout = () => {
    removeToken();
  };

  return (
    <>
      <h1>APP</h1>
      <button onClick={logout}>Logout</button>
      <hr />
      <Register />
      <hr />
      <Login />
      <hr />
      <UserProfile />
    </>
  );
}

export default App;
