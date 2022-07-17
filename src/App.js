import { useState } from "react";
import Home from "./Screens/Home";
import Login from "./Screens/Login";

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("user"));

  const changeAuth = (tag) => {
    setAuth(tag ? localStorage.getItem("user") : null);
  };

  return (
    <div>
      {!auth ? (
        <Login changeAuth={changeAuth} />
      ) : (
        <Home changeAuth={changeAuth} />
      )}
    </div>
  );
}

export default App;
