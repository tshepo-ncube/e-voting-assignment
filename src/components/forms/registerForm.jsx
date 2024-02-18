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

  const [open, setOpen] = React.useState(false);

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
    // setInProgress(true);
    // // Add your login logic here
    // setEmail("");
    // console.log("Email:", email);
    // console.log("Password:", password);

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
    const checkIfEmailTrue = () => {
      return true;
    };

    const checkEmailExist = () => {
      return true;
    };
    const checkAge = () => {
      if (age >= 18) {
        return true;
      }
      setError("Only people above 18 years old are allowed to register.");
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

        // console.log(status);

        // if (status.registeredUser) {
        //   handleClick();
        //   setTab("Vote");
        //   setLoggedIn(true);
        //   setError(null);
        // } else {
        //   setError(status.Error);
        // }
      } catch (error) {
        console.error("Error during registration:", error.message);
        setError("An error occurred during registration");
      } finally {
        setInProgress(false);
      }
    };

    const checkPassword = () => {
      if (password === confirmPassword) {
        return true;
      }
      setError("Passwords do not match.");
      return false;
    };

    if (!checkEmailExist()) {
    }

    if (checkIfEmailTrue()) {
    }

    if (!checkAge()) {
    }

    if (!checkPassword()) {
      return;
    }

    registerUser();

    //check the email, if its real....
    //check the age, if its >=18...
    //check if password==confirmPassword

    // const fetchData = async () => {
    //   try {
    //     const candidateDocRef = doc(db, "users", "m@gmail.com");
    //     const candidateDocSnapshot = await getDoc(candidateDocRef);

    //     if (candidateDocSnapshot.exists()) {
    //       const candidateData = candidateDocSnapshot.data();
    //       const candidateId = candidateDocSnapshot.id;

    //       setUser({ id: candidateId, ...candidateData });

    //       console.log("Candidate data:", candidateData);
    //       console.log("Candidate ID:", candidateId);
    //       console.log(`from db ${candidateData.Email}`);
    //       console.log(`from db ${candidateData.Password}`);
    //       // Check if the entered email and password match
    //       if (
    //         email === candidateData.Email &&
    //         password === candidateData.Password
    //       ) {
    //         // Successful login logic here
    //         console.log("Login successful!");
    //         setLoggedIn(true);
    //         localStorage.setItem("Email", candidateData.Email);
    //         localStorage.setItem("Name", candidateData.Name);
    //         localStorage.setItem("Surname", candidateData.Surname);
    //         localStorage.setItem("loggedIn", true);
    //         localStorage.setItem("Province", candidateData.Province);
    //         localStorage.setItem("ID", candidateId);
    //         localStorage.setItem("Voted", candidateData.Voted);
    //         localStorage.setItem("Age", candidateData.Age);

    //         setError(null); // Clear any previous errors
    //         setTab("Vote");
    //       } else {
    //         // Display error message for incorrect email/password
    //         setError("Invalid email or password");
    //         console.log("invalid email or pwd");
    //       }
    //     } else {
    //       console.log("Document not found");
    //       setError("User not found");
    //     }
    //   } catch (error) {
    //     console.error("Error during login:", error.message);
    //     setError("An error occurred during login");
    //   }
    // };
    // fetchData();
    setInProgress(false);
  };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const candidateDocRef = doc(db, "users", "m@gmail.com");
  //       const candidateDocSnapshot = await getDoc(candidateDocRef);

  //       if (candidateDocSnapshot.exists()) {
  //         const candidateData = candidateDocSnapshot.data();
  //         const candidateId = candidateDocSnapshot.id;

  //         setUser({ id: candidateId, ...candidateData });

  //         console.log("Candidate data:", candidateData);
  //         console.log("Candidate ID:", candidateId);

  //         // setCandidates(newCandidatesArray);
  //       } else {
  //         // Document with the specified ID doesn't exist
  //         console.log("Document not found");
  //         // setCandidates([]);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  const [province, setProvince] = React.useState("Gauteng");

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const [gender, setGender] = React.useState("Male");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
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
        />
        <TextField
          label="Surname"
          variant="outlined"
          fullWidth
          margin="normal"
          value={surname}
          onChange={handleSurnameChange}
        />
        <TextField
          label="Age"
          variant="outlined"
          fullWidth
          margin="normal"
          value={age}
          onChange={handleAgeChange}
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
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
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
