import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
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
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

export default function OverallResultsList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
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
      newCandidatesArray.sort((a, b) => b.Votes - a.Votes);
      setCandidates(newCandidatesArray);
      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {/* <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Candidate 1" secondary="15 Votes" />
      </ListItem> */}

      {loading ? (
        <>
          <Stack spacing={1}>
            {/* <Skeleton variant="text" sx={{ fontSize: "1rem" }} /> */}
            {/* For other variants, adjust the size with `width` and `height` */}
            {/* <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} /> */}
            <Skeleton variant="rounded" width={340} height={60} />
            <Skeleton variant="rounded" width={340} height={60} />
            <Skeleton variant="rounded" width={340} height={60} />
            <Skeleton variant="rounded" width={340} height={60} />
            <Skeleton variant="rounded" width={340} height={60} />
            <Skeleton variant="rounded" width={340} height={60} />
          </Stack>
        </>
      ) : (
        <>
          {candidates.map((candidate, index) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${candidate.Name} ${candidate.Surname}`}
                secondary={`${candidate.Votes} Votes`}
              />
            </ListItem>
          ))}
        </>
      )}

      {/* <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Candidate 1" secondary="15 Votes" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Candidate 1" secondary="15 Votes" />
      </ListItem> */}

      {/* <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Candidate 1" secondary="15 Votes" />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Candidate 1" secondary="15 Votes" />
      </ListItem> */}
      {/* 
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Candidate 1" secondary="15 Votes" />
      </ListItem> */}
    </List>
  );
}
