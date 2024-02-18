import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CandidateCard from "./candidateCard";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
  runTransaction,
} from "firebase/firestore";

import DB from "../data/dataApi";
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
//const analytics = getAnalytics(app);
const db = getFirestore(app);
//candidateCard.jsx:32  Uncaught (in promise) TypeError: (0 , firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(...).doc is not a function

export default function CandidatesGrid() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      // const candidatesCollection = collection(db, "candidates");
      // const candidatesSnapshot = await getDocs(candidatesCollection);

      // const newCandidatesArray = [];

      // candidatesSnapshot.forEach((doc) => {
      //   const candidateData = doc.data();
      //   const candidateId = doc.id; // Access the document ID
      //   newCandidatesArray.push({ id: candidateId, ...candidateData });
      //   console.log("Candidate data:", candidateData);
      //   console.log("Candidate ID:", candidateId);
      // });

      // setCandidates(newCandidatesArray);
      // setLoading(false);

      try {
        setLoading(true);
        const candidatesData = await DB.getCandidates();
        setCandidates(candidatesData);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <Box sx={{ flexGrow: 1, marginTop: 2, padding: 4 }}>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={6} md={4} lg={3}>
          <CandidateCard candidateData={candidates[0]} />
        </Grid> */}

        {loading ? (
          <>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
          </>
        ) : (
          <>
            {candidates.map((candidate, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <CandidateCard candidateData={candidate} />
              </Grid>
            ))}
          </>
        )}

        {/* <Grid item xs={12} sm={6} md={4} lg={3}>
          <CandidateCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CandidateCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CandidateCard />
        </Grid> */}
      </Grid>
    </Box>
  );
}
