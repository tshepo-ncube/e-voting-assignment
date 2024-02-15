import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CandidateCard from "../candidateCard";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

import { Bar } from "react-chartjs-2";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
const db = getFirestore(app);

export default function CandidateGenderGraph() {
  const [candidates, setCandidates] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genderData, setGenderData] = useState({});

  const [chosenCandidate, setChosenCandidate] = useState("");

  const [age, setAge] = React.useState("");

  const data = {
    labels: ["Mon", "Tue", "Wed"],
    datasets: [
      {
        label: "369",
        data: [3, 6, 9],
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "369",
        data: [3, 6, 9],
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "369",
        data: [3, 6, 9],
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const handleChange = (event) => {
    setChosenCandidate(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    candidateGenderData(chosenCandidate);
  }, [chosenCandidate]);
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const candidatesSnapshot = await getDocs(usersCollection);

      const newUsersArray = [];

      candidatesSnapshot.forEach((doc) => {
        const userData = doc.data();
        const userID = doc.id; // Access the document ID
        newUsersArray.push({ id: userID, ...userData });
        console.log("User data:", userData);
        console.log("User ID:", userID);
      });

      //setCandidates(newCandidatesArray);
      setUsers(newUsersArray);
      setLoading(false);
    };

    const fetchCandidates = async () => {
      const candidatesCollection = collection(db, "candidates");
      const candidatesSnapshot = await getDocs(candidatesCollection);

      const newCandidatesArray = [];

      candidatesSnapshot.forEach((doc) => {
        const candidateData = doc.data();
        const candidateId = doc.id; // Access the document ID
        newCandidatesArray.push({ id: candidateId, ...candidateData });
        console.log("Candidate data:", candidateData);
        console.log("Candidate ID:", candidateId);
      });

      setCandidates(newCandidatesArray);
      setLoading(false);
    };

    fetchCandidates();
    fetchUsers();
  }, []);

  const candidateGenderData = (candidateID) => {
    users.forEach((user) => {
      console.log(user);
      var maleCounter = 0;
      var femaleCounter = 0;
      if (user.Voted && user.CandidateVote === candidateID) {
        if (user.Gender === "Male") {
          maleCounter = maleCounter + 1;
        } else {
          femaleCounter = femaleCounter + 1;
        }
      }

      setGenderData({ male: maleCounter, female: femaleCounter });
      return { male: maleCounter, female: femaleCounter };
    });
  };
  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <FormControl style={{ width: 160 }}>
        <InputLabel id="demo-simple-select-label">Candidate</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chosenCandidate}
          label="Candidate"
          onChange={handleChange}
        >
          {candidates.map((candidate, index) => (
            <MenuItem value={candidate.id}>{candidate.Name}</MenuItem>
          ))}

          {/* <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}
