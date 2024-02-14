import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  getDoc,
  setDoc,
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

export default function CandidateCard({ candidateData }) {
  const [candidate, setCandidate] = React.useState(candidateData);
  const [candidateVotes, setCandidateVotes] = React.useState(
    candidateData.Votes
  );

  const incrementProvincialTransaction = async (userProvince) =>
    // async function incrementVotesTransaction(candidateId)
    {
      const provinceRef = doc(db, "provincialResults", "Gauteng");

      try {
        // Start a transaction
        await runTransaction(db, async (transaction) => {
          // Get the current data of the document
          const docSnapshot = await transaction.get(provinceRef);

          // Check if the document exists
          if (!docSnapshot.exists()) {
            throw new Error("Province document does not exist!");
          }

          // Get the current value of the dynamic field
          const dynamicFieldName = "Thspoe";
          const currentVotes = docSnapshot.data()[dynamicFieldName] || 0;

          // Increment the value by 1
          const newVotes = currentVotes + 1;

          // Create an object to update the dynamic field
          const updateObject = { [dynamicFieldName]: newVotes };

          // Update the document with the incremented value
          transaction.update(provinceRef, updateObject);
        });

        console.log("Transaction successfully committed!");
        handleVoteClick();
        handleVotedFor();
      } catch (error) {
        console.error("Transaction failed:", error.message);
      }
    };

  const incrementVotesTransaction = async (candidateId) =>
    // async function incrementVotesTransaction(candidateId)
    {
      const candidateRef = doc(db, "candidates", candidateId);

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
        handleVoteClick();
        handleVotedFor();
        incrementProvincialTransaction();
      } catch (error) {
        console.error("Transaction failed:", error.message);
      }
    };

  const candidateHasVoted = () => {
    console.log("hey there...");
  };

  const updateVotedField = async () => {
    const userEmail = localStorage.getItem("Email");
    const userRefDoc = doc(db, "users", userEmail);

    try {
      // Fetch the existing document
      const userDoc = await getDoc(userRefDoc);

      if (userDoc.exists()) {
        // Document exists, update the "Voted" field
        await updateDoc(userRefDoc, {
          Voted: true,
        });

        console.log("Document updated successfully");
        localStorage.setItem("Voted", true);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleVotedFor = async () => {
    const userEmail = localStorage.getItem("Email");
    const userRefDoc = doc(db, "users", userEmail);

    try {
      // Fetch the existing document
      const userDoc = await getDoc(userRefDoc);

      if (userDoc.exists()) {
        // Document exists, update the "Voted" field
        await updateDoc(userRefDoc, {
          CandidateVote: candidateData.id,
        });

        // await setDoc(
        //   userRefDoc,
        //   { CandidateVote: candidateData.id } // Replace 'Voted' with the actual field name in your document
        //   // { merge: true }
        // );

        console.log("Document updated successfully");
        localStorage.setItem("Voted", true);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  console.log(candidate);
  // Initialize Firebase
  //   const app = initializeApp(firebaseConfig);
  //   const db = app.firestore();
  //   const analytics = getAnalytics(app);
  const incrementStuff = () => {
    incrementVotesTransaction("Tshepo");
  };

  const handleVoteClick = () => {
    // Increment the "Votes" value by 1
    const updatedCandidateData = {
      ...candidate,
      Votes: candidate.Votes + 1,
    };

    // Update the state with the new data
    setCandidate(updatedCandidateData);

    const updatedVotes = candidateVotes + 1;
    setCandidateVotes(updatedVotes);
    updateVotedField();
  };

  const makeAVote = () => {
    console.log("checking if user has voted");
    if (false) {
      //if (localStorage.getItem("Voted")) {
      alert("You cannot vote 2 times");
    } else {
      //alert("you have not voted");
      // incrementVotesTransaction("Tshepo");
      incrementVotesTransaction(candidateData.id);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // Initialize Firebase (replace with your Firebase config)

  //     //firebase.initializeApp(firebaseConfig);

  //     // Firestore reference
  //     //const db = firebase.firestore();

  //     // Specify your document ID
  //     const docId = "yourDocId";

  //     // Create a reference to the specific document in the "candidates" collection
  //     // const candidatesCollection = collection(db, "candidates");
  //     // const candidateSnapshot = await getDoc(candidatesCollection);
  //     const candidateDocRef = doc(db, "candidates", "cLflbdkulEPm8svZxzht");
  //     // Set up the listener for changes in the "Votes" field
  //     const unsubscribe = candidateDocRef.onSnapshot((doc) => {
  //       if (doc.exists) {
  //         const votesData = doc.data()?.Votes; // Assuming "Votes" is the field you're interested in

  //         // Log when "Votes" changes
  //         console.log(`Votes changed to: ${votesData}`);

  //         // Update the state
  //         // setVotes(votesData);
  //       } else {
  //         console.log("Document does not exist");
  //       }
  //     });

  //     // Clean up the listener when the component is unmounted
  //     return () => {
  //       unsubscribe();
  //     };
  //   };

  //   fetchData();
  // }, []);

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
        <Button size="small" color="primary" onClick={makeAVote}>
          Vote
        </Button>

        <Typography gutterBottom component="div">
          {candidateVotes} Votes
        </Typography>
      </CardActions>
    </Card>
  );
}
