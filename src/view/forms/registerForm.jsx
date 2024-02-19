import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
  runTransaction,
} from "firebase/firestore";

import DB from "../../data/dataApi";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputGroup } from "react-bootstrap";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyAQApGBO474rvXb0NLeTJjTye5DBUgmHJ0",
  authDomain: "inf4027workshop.firebaseapp.com",
  projectId: "inf4027workshop",
  storageBucket: "inf4027workshop.appspot.com",
  messagingSenderId: "847946574269",
  appId: "1:847946574269:web:d618594c3773bed7814ad4",
  measurementId: "G-BQ911VSE7E",
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);

function RegisterForm({ setLoggedIn, setTab }) {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [inProgress, setInProgress] = useState(false);
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [emailExists, setEmailExists] = useState(null);

  const [open, setOpen] = React.useState(false);

  const [province, setProvince] = React.useState("Gauteng");

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const [gender, setGender] = React.useState("Male");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSurnameChange = (e) => setSurname(e.target.value);

  const handleAgeChange = (e) => {
    setAge(e.target.value);
    console.log(typeof e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      surname,
      age,
      gender,
      province,
      email,
      password,
      confirmPassword,
    });

    const doesEmailExist = async () => {
      try {
        const emailStatus = await DB.emailExists(email);
        console.log(`emailStatus : ${emailStatus}`);

        if (emailStatus) {
          setError(
            "Email already exist, please use a different email address."
          );
          console.log(
            "Email already exist, please use a different email address."
          );
          return true;
          setEmailExists(true);
        } else {
          console.log("Email not in DB");
          setEmailExists(false);
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    };

    doesEmailExist();
    const isAboveAge = () => {
      console.log(Number(age));
      if (Number(age) >= 18) {
        console.log("Above age");
        return true;
      }
      setError("Only people above 18 years old are allowed to register.");
      console.log("Not above age");
      return false;
    };

    const registerUser = async () => {
      try {
        const status = await DB.registerUser(
          name,
          surname,
          age,
          province,
          gender,
          email,
          password,
          setTab,
          setError,
          setLoggedIn,
          handleClick
        );
      } catch (error) {
        console.error("Error during registration:", error.message);
        setError("An error occurred during registration");
      } finally {
        setInProgress(false);
      }
    };

    const checkPassword = () => {
      if (password === confirmPassword) {
        console.log("pwd match");
        return true;
      }
      setError("Passwords do not match.");
      console.log("pwd do not match");
      return false;
    };

    const isDisposableEmail = async () => {
      try {
        const response = await fetch("https://api.mailcheck.ai/email/" + email);

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          if (data.disposable) {
            setError("Please use a non disposable email address");
            console.log("disposable MAil");
            return true;
          } else {
            console.log("Not disposable Mail");
            return false;
          }
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    // Call the function

    const checkDisposable = async () => {
      try {
        const isDisposable = await isDisposableEmail();

        if (isDisposable) {
          //console.log("Email is disposable");
          return true;
        } else {
          return false;
          //console.log("Not disposable");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    console.log("checking disposable now...");
    if (!checkDisposable()) {
      return;
    }
    console.log("checking email exist now...");
    console.log(`Email Exists : ${emailExists}`);

    if (emailExists !== null) {
      if (emailExists) {
        console.log("emailll does existt, not moving forwarad");
        return;
      }
    }

    console.log("checking age now...");
    if (!isAboveAge()) {
      console.log("you are not above age");
      return;
    } else {
      console.log("above age");
    }
    console.log("checking password now...");
    if (!checkPassword()) {
      return;
    }

    while (emailExists == null) {
      if (emailExists === false) {
        registerUser();
      } else {
        break;
      }
    }

    if (emailExists === null) {
      return;
    }

    if (emailExists === false) {
      registerUser();
    }

    setInProgress(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <form style={{ padding: 50 }} onSubmit={handleSubmit}>
        <p>WElcome to the online voting form, please login to cast your vote</p>

        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={handleNameChange}
          required
        />
        <TextField
          label="Surname"
          variant="outlined"
          fullWidth
          margin="normal"
          value={surname}
          onChange={handleSurnameChange}
          required
        />
        <TextField
          label="Age"
          variant="outlined"
          fullWidth
          margin="normal"
          value={age}
          onChange={handleAgeChange}
          required
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl style={{ width: 200, padding: 10 }}>
          <InputLabel id="demo-simple-select-label">Province</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={province}
            label="Province"
            onChange={handleProvinceChange}
          >
            <MenuItem value={"Gauteng"}>Gauteng</MenuItem>
            <MenuItem value={"KwaZulu-Natal"}>KwaZulu-Natal</MenuItem>
            <MenuItem value={"Limpopo"}>Limpopo</MenuItem>
            <MenuItem value={"Mpumalanga"}>Mpumalanga</MenuItem>
            <MenuItem value={"North West"}></MenuItem>
            <MenuItem value={"Northern Cape"}>Northern Cape</MenuItem>
            <MenuItem value={"Eastern Cape"}>Eastern Cape</MenuItem>
            <MenuItem value={"Western Cape"}>Western Cape</MenuItem>
            <MenuItem value={"Free State"}>Free State</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ width: 200, padding: 10 }}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            label="Province"
            onChange={handleGenderChange}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        {error && (
          <Typography
            variant="body2"
            color="error"
            style={{ marginBottom: 10 }}
          >
            {error}
          </Typography>
        )}
        {inProgress ? (
          <>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </>
        ) : (
          <></>
        )}

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Note archived"
          action={action}
        />

        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
