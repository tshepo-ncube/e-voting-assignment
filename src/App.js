import "./App.css";
import React, { useState } from "react";
import ResponsiveAppBar from "./components/responsiveAppBar";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CandidatesGrid from "./components/candidatesGrid";
// import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="">
      {/* <ButtonAppBar /> */}
      <ResponsiveAppBar />
      <CandidatesGrid />
    </div>
  );
}

export default App;
