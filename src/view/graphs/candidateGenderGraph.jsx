import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CandidateCard from "../candidateCard";
import CircularProgress from "@mui/material/CircularProgress";
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
  LineElement,
  PointElement,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

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

import DB from "../../data/dataApi";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

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
  const [histogramData, setHistogramData] = useState([]);

  const handleChange = (event) => {
    setChosenCandidate(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    candidateGenderData(chosenCandidate);
    candidateAgeData(chosenCandidate);
  }, [chosenCandidate]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await DB.getUsers(setUsers, setLoading);
    };

    const fetchCandidates = async () => {
      const candidates = await DB.getCandidatesGraph(
        setCandidates,
        setChosenCandidate,
        setLoading
      );
    };

    fetchCandidates();
    fetchUsers();
  }, []);
  const data = {
    labels: ["Gender"],
    datasets: [
      {
        label: "Female",
        data: [genderData.female],
        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
      },
      {
        label: "Male",
        data: [genderData.male],
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const ageData = {
    labels: ["Mon", "Tue", "Wed"],
    datasets: [
      {
        labels: "Sales of the week",
        data: [3, 6, 9],
        backgroundColor: "aqua",
        borderColor: "black",
        pointBorderColor: "aqua",
      },
    ],
  };

  const ageOptions = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 3,
        max: 9,
      },
    },
  };

  // Chart configuration
  const options = {
    scales: {
      x: {
        type: "category",
        labels: data.labels,
      },
      y: {
        beginAtZero: false, // Set to false
        min: 0, // Set the minimum value
        max: 100, // Set the maximum value
      },
    },
  };
  const candidateGenderData = (candidateID) => {
    var maleCounter = 0;
    var femaleCounter = 0;
    users.forEach((user) => {
      console.log(user);

      if (user.Voted && user.CandidateVote === candidateID) {
        if (user.Gender === "Male") {
          maleCounter = maleCounter + 1;
        } else {
          femaleCounter = femaleCounter + 1;
        }
      }
    });
    console.log({ male: maleCounter, female: femaleCounter });
    setGenderData({ male: maleCounter, female: femaleCounter });
    return { male: maleCounter, female: femaleCounter };
  };

  const candidateAgeData = (candidateID) => {
    var _18_24 = 0;
    var _25_34 = 0;
    var _35_44 = 0;
    var _45_54 = 0;
    var _55_more = 0;
    users.forEach((user) => {
      console.log(user);
      console.log(`User Age : ${user.Age}`);
      console.log(
        `${user.Name} :CandID ${candidateID} |  Voted For : ${user.CandidateVote}`
      );
      if (user.Voted && user.CandidateVote === candidateID) {
        console.log(
          `${user.Name} voted for ${candidateID}, they are ${user.CandidateVote}`
        );
        if (user.Age >= 18 && user.Age <= 24) {
          _18_24 = _18_24 + 1;
        }
        if (user.Age > 24 && user.Age <= 34) {
          _25_34 = _25_34 + 1;
        }
        if (user.Age > 34 && user.Age <= 44) {
          _35_44 = _35_44 + 1;
        }
        if (user.Age > 44 && user.Age <= 54) {
          _45_54 = _45_54 + 1;
        }
        if (user.Age > 54) {
          _55_more = _55_more + 1;
        }
      }
    });
    setHistogramData([_18_24, _25_34, _35_44, _45_54, _55_more]);
    // console.log({ male: maleCounter, female: femaleCounter });
    // setGenderData({ male: maleCounter, female: femaleCounter });
    return [_18_24, _25_34, _35_44, _45_54, _55_more];
  };

  // useEffect(() => {
  //   // ... other code ...

  //   // Get the canvas element inside the useEffect block
  //   const ctx = document.getElementById("myChart");
  //   // Check if there is an existing Chart instance
  //   const existingChart = ChartJS.getChart(ctx);

  //   // Destroy the existing Chart instance if it exists
  //   if (existingChart) {
  //     existingChart.destroy();
  //   }
  //   // Create the chart inside the useEffect block
  //   new ChartJS(ctx, {
  //     type: "line",
  //     data: {
  //       labels: ["Mon", "Tue", "Wed"],
  //       datasets: [
  //         {
  //           labels: "Sales of the week",
  //           data: [3, 6, 9],
  //           backgroundColor: "aqua",
  //           borderColor: "black",
  //           pointBorderColor: "aqua",
  //         },
  //       ],
  //     },
  //     options: ageOptions,
  //   });
  // }, [ageData, ageOptions]);

  const chartData = {
    labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
    datasets: [
      {
        label: "Number of Voters",
        data: histogramData,
        backgroundColor: "green", // Adjust the color as needed
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "category",
        labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
      },
      y: {
        beginAtZero: true,
        min: 0, // Set the minimum value
        max: 100, // Set the maximum value
        title: {
          display: true,
          text: "Number of Voters",
        },
      },
    },
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      {loading ? (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Skeleton variant="rounded" width={"100%"} height={250} />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Skeleton variant="rounded" width={"100%"} height={250} />
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <>
          <div>
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
              </Select>
            </FormControl>

            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Bar data={chartData} options={chartOptions} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Bar
                    style={{ padding: 20, width: "80%" }}
                    data={data}
                    options={options}
                  ></Bar>
                </Grid>
              </Grid>
            </Box>
          </div>
        </>
      )}
    </Box>
  );
}
