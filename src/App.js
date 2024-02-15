import "./App.css";
import React, { useState } from "react";
import ResponsiveAppBar from "./components/responsiveAppBar";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import LoginForm from "./components/forms/loginForm";
import Typography from "@mui/material/Typography";
import VoteViewer from "./pages/voteViewer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CandidatesGrid from "./components/candidatesGrid";
import RegisterForm from "./components/forms/registerForm";
// import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    false || localStorage.getItem("loggedIn")
  );
  const [Tab, setTab] = useState("Results");
  return (
    <div className="">
      {/* <ButtonAppBar /> */}
      <ResponsiveAppBar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setTab={setTab}
      />
      {/* <CandidatesGrid /> */}

      {Tab == "Login" ? (
        <>
          <LoginForm setLoggedIn={setLoggedIn} setTab={setTab} />
        </>
      ) : (
        <></>
      )}

      {Tab == "Register" ? (
        <>
          <RegisterForm setLoggedIn={setLoggedIn} setTab={setTab} />
        </>
      ) : (
        <></>
      )}

      {Tab == "Results" ? (
        <>
          <VoteViewer />
        </>
      ) : (
        <></>
      )}

      {loggedIn ? (
        <div style={{ padding: 10 }}>
          {Tab == "Vote" ? (
            <>
              <p>Welcome, {localStorage.getItem("Name")}!</p>
              <CandidatesGrid />
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <>
          {/* <p>Please log in to access the content.</p>
          <LoginForm setLoggedIn={setLoggedIn} /> */}
        </>
      )}

      {/* <h1>hey there</h1> */}
    </div>
  );
}

export default App;
