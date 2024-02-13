import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
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
//candidateCard.jsx:32  Uncaught (in promise) TypeError: (0 , firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(...).doc is not a function

async function incrementVotesTransaction(candidateId) {
  const candidateRef = doc(db, "candidates", "mMeaHNX1CaZfmP9hqlH5");

  try {
    // Start a transaction
    await runTransaction(db, async (transaction) => {
      // Get the current data of the document
      const docSnapshot = await transaction.get(candidateRef);

      // Check if the document exists
      if (!docSnapshot.exists()) {
        throw new Error("Candidate document does not exist!");
      }

      // Increment the "Votes" field by 1
      const currentVotes = docSnapshot.data().Votes || 0;
      const newVotes = currentVotes + 1;

      // Update the document with the incremented value
      transaction.update(candidateRef, { Votes: newVotes });
    });

    console.log("Transaction successfully committed!");
  } catch (error) {
    console.error("Transaction failed:", error.message);
  }
}

export default function CandidateCard({ candidateData }) {
  const [candidate, setCandidate] = React.useState(candidateData);
  console.log(candidate);
  // Initialize Firebase
  //   const app = initializeApp(firebaseConfig);
  //   const db = app.firestore();
  //   const analytics = getAnalytics(app);
  const incrementStuff = () => {
    incrementVotesTransaction("Tshepo");
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://plus.unsplash.com/premium_photo-1663932464823-1e85942a1115?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {candidateData.Name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={incrementStuff}>
          Vote
        </Button>

        <Typography gutterBottom component="div">
          5 Votes
        </Typography>
      </CardActions>
    </Card>
  );
}
