import React, { useEffect, useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  runTransaction,
} from "firebase/firestore";
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

function LoginForm({ setLoggedIn }) {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    setEmail("");
    console.log("Email:", email);
    console.log("Password:", password);
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
            localStorage.setItem("Email", candidateData.Email);
            localStorage.setItem("Name", candidateData.Name);
            localStorage.setItem("Surname", candidateData.Surname);
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("Province", candidateData.Province);
            localStorage.setItem("ID", candidateId);
            localStorage.setItem("Voted", candidateData.Voted);
            localStorage.setItem("Age", candidateData.Age);

            setError(null); // Clear any previous errors
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
    fetchData();
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
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
