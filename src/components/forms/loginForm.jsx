import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
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

function LoginForm({ setLoggedIn, setTab }) {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [inProgress, setInProgress] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setInProgress(true);
    // Add your login logic here
    setEmail("");
    console.log("Email:", email);
    console.log("Password:", password);

    const fetchUser = async () => {
      try {
        setInProgress(true);
        const status = await DB.loginUser(email, password);

        if (status.loggedIn) {
          // Successful login logic here
          console.log("Login successful!");
          setLoggedIn(true);
          handleClick();

          setError(null); // Clear any previous errors
          setTab("Vote");
        } else {
          setError(status.Error);
        }
      } catch (error) {
        console.error("Error loggin in:", error);
      } finally {
        setInProgress(false);
      }
    };
    const fetchData = async () => {
      try {
        const candidateDocRef = doc(db, "users", "m@gmail.com");
        const candidateDocSnapshot = await getDoc(candidateDocRef);

        if (candidateDocSnapshot.exists()) {
          const candidateData = candidateDocSnapshot.data();
          const candidateId = candidateDocSnapshot.id;

          setUser({ id: candidateId, ...candidateData });

          console.log("Candidate data:", candidateData);
          console.log("Candidate ID:", candidateId);
          console.log(`from db ${candidateData.Email}`);
          console.log(`from db ${candidateData.Password}`);
          // Check if the entered email and password match
          if (
            email === candidateData.Email &&
            password === candidateData.Password
          ) {
            // Successful login logic here
            console.log("Login successful!");
            setLoggedIn(true);
            handleClick();
            localStorage.setItem("Email", candidateData.Email);
            localStorage.setItem("Name", candidateData.Name);
            localStorage.setItem("Surname", candidateData.Surname);
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("Province", candidateData.Province);
            localStorage.setItem("ID", candidateId);
            localStorage.setItem("Voted", candidateData.Voted);
            localStorage.setItem("Age", candidateData.Age);

            setError(null); // Clear any previous errors
            setTab("Vote");
          } else {
            // Display error message for incorrect email/password
            setError("Invalid email or password");
            console.log("invalid email or pwd");
          }
        } else {
          console.log("Document not found");
          setError("User not found");
        }
      } catch (error) {
        console.error("Error during login:", error.message);
        setError("An error occurred during login");
      }
    };
    fetchUser();
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
        Age : 19 Email : "m@gmail.com" ID : 232 Name : "Mana" Password :
        "password" Province : "Gauteng" Surname : "Ncube" "Voted " : false
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
          login
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
