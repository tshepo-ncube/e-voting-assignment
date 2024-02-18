import React, { useState, useEffect } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Avatar from "@mui/material/Avatar";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import DB from "../data/dataApi";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import PlaceIcon from "@mui/icons-material/Place";
import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  doc,
  getDocs,
  runTransaction,
} from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Typography } from "@mui/material";
import getProvinces from "../data/utils";

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

export default function ProvincialResults() {
  const [open, setOpen] = React.useState(false);
  const [candidates, setCandidates] = useState([]);
  const [users, setUsers] = useState([]);
  const [candidateMap, setCandidateMap] = useState({});
  const [provinceData, setProvinceData] = useState({
    "Eastern Cape": {},
    "Free State": {},
    Gauteng: {},
    "KwaZulu-Natal": {},
    Limpopo: {},
    Mpumalanga: {},
    "North West": {},
    "Northern Cape": {},
    "Western Cape": {},
  });
  const [loading, setLoading] = useState(true);
  // Function to get candidate name by id

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const candidatesData = await DB.getCandidates();
        setCandidates(candidatesData);
        const lastCandidate = candidatesData[candidatesData.length - 1];
        console.log(candidatesData[candidatesData.length - 1]);
        setCandidateMap({
          candidateId: lastCandidate.id,
          candidateNames: `${lastCandidate.Name} ${lastCandidate.Surname}`,
        });

        const provData = await DB.getProvinces();

        setProvinceData(provData);
      } catch (error) {
        console.error("Error fetching Candidates &/ Provinces:", error);
      } finally {
        setLoading(false);
      }
    };

    // const fetchCandidates = async () => {
    //   const candidatesCollection = collection(db, "candidates");
    //   const candidatesSnapshot = await getDocs(candidatesCollection);
    //   var provincial = {
    //     "Eastern Cape": [],
    //     "Free State": [],
    //     Gauteng: [],
    //     "KwaZulu-Natal": [],
    //     Limpopo: [],
    //     Mpumalanga: [],
    //     "North West": [],
    //     "Northern Cape": [],
    //     "Western Cape": [],
    //   };

    //   const newCandidatesArray = [];

    //   candidatesSnapshot.forEach((doc) => {
    //     const candidateData = doc.data();
    //     const candidateId = doc.id; // Access the document ID
    //     newCandidatesArray.push({ id: candidateId, ...candidateData });
    //     console.log("Candidate data:", candidateData);
    //     console.log("Candidate ID:", candidateId);
    //     var map = {
    //       candidateId: `${candidateData.Name} ${candidateData.Surname}`,
    //     };
    //     console.log(map);
    //     setCandidateMap({
    //       candidateId: candidateData.id,
    //       candidateNames: `${candidateData.Name} ${candidateData.Surname}`,
    //     });
    //   });
    //   newCandidatesArray.sort((a, b) => b.Votes - a.Votes);
    //   setCandidates(newCandidatesArray);
    //   setLoading(false);
    // };

    fetchData();
    //fetchCandidates();
  }, []);

  // useEffect(() => {
  //   const fetchCandidates = async () => {
  //     const candidatesCollection = collection(db, "candidates");
  //     const candidatesSnapshot = await getDocs(candidatesCollection);
  //     var provincial = {
  //       "Eastern Cape": [],
  //       "Free State": [],
  //       Gauteng: [],
  //       "KwaZulu-Natal": [],
  //       Limpopo: [],
  //       Mpumalanga: [],
  //       "North West": [],
  //       "Northern Cape": [],
  //       "Western Cape": [],
  //     };

  //     const newCandidatesArray = [];

  //     candidatesSnapshot.forEach((doc) => {
  //       const candidateData = doc.data();
  //       const candidateId = doc.id; // Access the document ID
  //       newCandidatesArray.push({ id: candidateId, ...candidateData });
  //       console.log("Candidate data:", candidateData);
  //       console.log("Candidate ID:", candidateId);
  //       var map = {
  //         candidateId: `${candidateData.Name} ${candidateData.Surname}`,
  //       };
  //       console.log(map);
  //       setCandidateMap({
  //         candidateId: candidateData.id,
  //         candidateNames: `${candidateData.Name} ${candidateData.Surname}`,
  //       });
  //     });
  //     newCandidatesArray.sort((a, b) => b.Votes - a.Votes);
  //     setCandidates(newCandidatesArray);
  //     setLoading(false);
  //   };

  //   const fetchProvinces = () => {
  //     Gauteng();
  //     Limpopo();
  //     KZN();
  //     NorthWest();
  //     WesternCape();
  //     EasternCape();
  //     NorthernCape();
  //     FreeState();
  //     mpumalanga();
  //     setLoading(false);
  //   };

  //   const Gauteng = async () => {
  //     const provincialResultsCollection = collection(db, "provincialResults");
  //     const gautengDocRef = doc(provincialResultsCollection, "Gauteng");

  //     const gautengDoc = await getDoc(gautengDocRef);

  //     if (gautengDoc.exists()) {
  //       const candidateData = gautengDoc.data();
  //       console.log("Province Results for Gauteng --------------------");

  //       // setCandidates([candidateData]);

  //       // Convert the object into an array of key-value pairs
  //       const keyValueArray = Object.entries(candidateData);

  //       // Sort the array based on the values (second element in each pair)
  //       keyValueArray.sort((a, b) => b[1] - a[1]);

  //       // Convert the sorted array back into an object
  //       const sortedObject = Object.fromEntries(keyValueArray);

  //       console.log(candidateData);

  //       var provinceTemp = provinceData;
  //       provinceTemp["Gauteng"] = sortedObject;

  //       setProvinceData(provinceTemp);

  //       console.log(provinceData);
  //       console.log(candidateMap);
  //     } else {
  //       console.log("Document not found.");
  //       //setCandidates([]);
  //     }
  //   };
  //   const Limpopo = async () => {
  //     const provincialResultsCollection = collection(db, "provincialResults");
  //     const gautengDocRef = doc(provincialResultsCollection, "Limpopo");

  //     const gautengDoc = await getDoc(gautengDocRef);

  //     if (gautengDoc.exists()) {
  //       const candidateData = gautengDoc.data();
  //       console.log("Province Results for Gauteng --------------------");

  //       // setCandidates([candidateData]);

  //       // Convert the object into an array of key-value pairs
  //       const keyValueArray = Object.entries(candidateData);

  //       // Sort the array based on the values (second element in each pair)
  //       keyValueArray.sort((a, b) => b[1] - a[1]);

  //       // Convert the sorted array back into an object
  //       const sortedObject = Object.fromEntries(keyValueArray);

  //       console.log(candidateData);

  //       var provinceTemp = provinceData;
  //       provinceTemp["Limpopo"] = sortedObject;

  //       setProvinceData(provinceTemp);

  //       console.log(provinceData);
  //       console.log(candidateMap);
  //     } else {
  //       console.log("Document not found.");
  //       //setCandidates([]);
  //     }
  //   };

  //   const KZN = async () => {
  //     const provincialResultsCollection = collection(db, "provincialResults");
  //     const gautengDocRef = doc(provincialResultsCollection, "KwaZulu-Natal");

  //     const gautengDoc = await getDoc(gautengDocRef);

  //     if (gautengDoc.exists()) {
  //       const candidateData = gautengDoc.data();
  //       console.log("Province Results for Gauteng --------------------");

  //       // setCandidates([candidateData]);

  //       // Convert the object into an array of key-value pairs
  //       const keyValueArray = Object.entries(candidateData);

  //       // Sort the array based on the values (second element in each pair)
  //       keyValueArray.sort((a, b) => b[1] - a[1]);

  //       // Convert the sorted array back into an object
  //       const sortedObject = Object.fromEntries(keyValueArray);

  //       console.log(candidateData);

  //       var provinceTemp = provinceData;
  //       provinceTemp["KwaZulu-Natal"] = sortedObject;

  //       setProvinceData(provinceTemp);

  //       console.log(provinceData);
  //       console.log(candidateMap);
  //     } else {
  //       console.log("Document not found.");
  //       //setCandidates([]);
  //     }
  //   };
  //   const WesternCape = async () => {
  //     const provincialResultsCollection = collection(db, "provincialResults");
  //     const gautengDocRef = doc(provincialResultsCollection, "Western Cape");

  //     const gautengDoc = await getDoc(gautengDocRef);

  //     if (gautengDoc.exists()) {
  //       const candidateData = gautengDoc.data();
  //       console.log("Province Results for Gauteng --------------------");

  //       // setCandidates([candidateData]);

  //       // Convert the object into an array of key-value pairs
  //       const keyValueArray = Object.entries(candidateData);

  //       // Sort the array based on the values (second element in each pair)
  //       keyValueArray.sort((a, b) => b[1] - a[1]);

  //       // Convert the sorted array back into an object
  //       const sortedObject = Object.fromEntries(keyValueArray);

  //       console.log(candidateData);

  //       var provinceTemp = provinceData;
  //       provinceTemp["Western Cape"] = sortedObject;

  //       setProvinceData(provinceTemp);

  //       console.log(provinceData);
  //       console.log(candidateMap);
  //     } else {
  //       console.log("Document not found.");
  //       //setCandidates([]);
  //     }
  //   };
  //   const NorthWest = async () => {
  //     const provincialResultsCollection = collection(db, "provincialResults");
  //     const gautengDocRef = doc(provincialResultsCollection, "North West");

  //     const gautengDoc = await getDoc(gautengDocRef);

  //     if (gautengDoc.exists()) {
  //       const candidateData = gautengDoc.data();
  //       console.log("Province Results for Gauteng --------------------");

  //       // setCandidates([candidateData]);

  //       // Convert the object into an array of key-value pairs
  //       const keyValueArray = Object.entries(candidateData);

  //       // Sort the array based on the values (second element in each pair)
  //       keyValueArray.sort((a, b) => b[1] - a[1]);

  //       // Convert the sorted array back into an object
  //       const sortedObject = Object.fromEntries(keyValueArray);

  //       console.log(candidateData);

  //       var provinceTemp = provinceData;
  //       provinceTemp["North West"] = sortedObject;

  //       setProvinceData(provinceTemp);

  //       console.log(provinceData);
  //       console.log(candidateMap);
  //     } else {
  //       console.log("Document not found.");
  //       //setCandidates([]);
  //     }
  //   };
  //   const EasternCape = async () => {
  //     const provincialResultsCollection = collection(db, "provincialResults");
  //     const gautengDocRef = doc(provincialResultsCollection, "Eastern Cape");

  //     const gautengDoc = await getDoc(gautengDocRef);

  //     if (gautengDoc.exists()) {
  //       const candidateData = gautengDoc.data();
  //       console.log("Province Results for Gauteng --------------------");

  //       // setCandidates([candidateData]);

  //       // Convert the object into an array of key-value pairs
  //       const keyValueArray = Object.entries(candidateData);

  //       // Sort the array based on the values (second element in each pair)
  //       keyValueArray.sort((a, b) => b[1] - a[1]);

  //       // Convert the sorted array back into an object
  //       const sortedObject = Object.fromEntries(keyValueArray);

  //       console.log(candidateData);

  //       var provinceTemp = provinceData;
  //       provinceTemp["Eastern Cape"] = sortedObject;

  //       setProvinceData(provinceTemp);

  //       console.log(provinceData);
  //       console.log(candidateMap);
  //     } else {
  //       console.log("Document not found.");
  //       //setCandidates([]);
  //     }
  //   };
  //   const NorthernCape = async () => {
  //     const provincialResultsCollection = collection(db, "provincialResults");
  //     const gautengDocRef = doc(provincialResultsCollection, "Northern Cape");

  //     const gautengDoc = await getDoc(gautengDocRef);

  //     if (gautengDoc.exists()) {
  //       const candidateData = gautengDoc.data();
  //       console.log("Province Results for Gauteng --------------------");

  //       // setCandidates([candidateData]);

  //       // Convert the object into an array of key-value pairs
  //       const keyValueArray = Object.entries(candidateData);

  //       // Sort the array based on the values (second element in each pair)
  //       keyValueArray.sort((a, b) => b[1] - a[1]);

  //       // Convert the sorted array back into an object
  //       const sortedObject = Object.fromEntries(keyValueArray);

  //       console.log(candidateData);

  //       var provinceTemp = provinceData;
  //       provinceTemp["Northern Cape"] = sortedObject;

  //       setProvinceData(provinceTemp);

  //       console.log(provinceData);
  //       console.log(candidateMap);
  //     } else {
  //       console.log("Document not found.");
  //       //setCandidates([]);
  //     }
  //   };
  //   const FreeState = async () => {
  //     const provincialResultsCollection = collection(db, "provincialResults");
  //     const gautengDocRef = doc(provincialResultsCollection, "Free State");

  //     const gautengDoc = await getDoc(gautengDocRef);

  //     if (gautengDoc.exists()) {
  //       const candidateData = gautengDoc.data();
  //       console.log("Province Results for Gauteng --------------------");

  //       // setCandidates([candidateData]);

  //       // Convert the object into an array of key-value pairs
  //       const keyValueArray = Object.entries(candidateData);

  //       // Sort the array based on the values (second element in each pair)
  //       keyValueArray.sort((a, b) => b[1] - a[1]);

  //       // Convert the sorted array back into an object
  //       const sortedObject = Object.fromEntries(keyValueArray);

  //       console.log(candidateData);

  //       var provinceTemp = provinceData;
  //       provinceTemp["Free State"] = sortedObject;

  //       setProvinceData(provinceTemp);

  //       console.log(provinceData);
  //       console.log(candidateMap);
  //     } else {
  //       console.log("Document not found.");
  //       //setCandidates([]);
  //     }
  //   };
  //   const mpumalanga = async () => {
  //     const provincialResultsCollection = collection(db, "provincialResults");
  //     const gautengDocRef = doc(provincialResultsCollection, "Mpumalanga");

  //     const gautengDoc = await getDoc(gautengDocRef);

  //     if (gautengDoc.exists()) {
  //       const candidateData = gautengDoc.data();
  //       console.log("Province Results for Gauteng --------------------");

  //       // setCandidates([candidateData]);

  //       // Convert the object into an array of key-value pairs
  //       const keyValueArray = Object.entries(candidateData);

  //       // Sort the array based on the values (second element in each pair)
  //       keyValueArray.sort((a, b) => b[1] - a[1]);

  //       // Convert the sorted array back into an object
  //       const sortedObject = Object.fromEntries(keyValueArray);

  //       console.log(candidateData);

  //       var provinceTemp = provinceData;
  //       provinceTemp["Mpumalanga"] = sortedObject;

  //       setProvinceData(provinceTemp);

  //       console.log(provinceData);
  //       console.log(candidateMap);
  //     } else {
  //       console.log("Document not found.");
  //       //setCandidates([]);
  //     }
  //   };
  //   // const fetchUsers = async () => {
  //   //   const usersCollection = collection(db, "users");
  //   //   const usersSnapshot = await getDocs(candidatesCollection);

  //   //   const usersArray = [];

  //   //   usersSnapshot.forEach((doc) => {
  //   //     const userData = doc.data();
  //   //     const userId = doc.id; // Access the document ID
  //   //     usersArray.push({ id: userId, ...userData });
  //   //     console.log("User data:", userData);
  //   //     console.log("User ID:", userId);

  //   //     //first checking if the user did vote!
  //   //     if (userData.Voted) {
  //   //         var userProvince = userData.Province;
  //   //         var tshepoObject = candidates.find(
  //   //           (candidate) => candidate.id === userData.CandidateVote
  //   //         );
  //   //         provincial[userProvince][userData.CandidateVote].push({
  //   //           candidateID: userData.CandidateVote,
  //   //           provincialVotes:
  //   //         });
  //   //     }
  //   //   });
  //   //   newCandidatesArray.sort((a, b) => b.Votes - a.Votes);
  //   //   setCandidates(newCandidatesArray);
  //   //   setLoading(false);
  //   // };

  //   fetchCandidates();
  //   fetchProvinces();
  //   //fetchUsers();
  // }, []);
  const handleClick = () => {
    setOpen(!open);
  };
  const getCandidateNameById = (id) => {
    const candidate = candidates.find((candidate) => candidate.id === id);
    return candidate ? candidate.Name : "Candidate not found";
  };
  function isObjectNotEmpty(obj) {
    return !(Object.keys(obj).length === 0 && obj.constructor === Object);
  }

  console.log(getCandidateNameById());
  console.log(`Limpopo Data :${provinceData["Limpopo"]}`);
  console.log(provinceData["Limpopo"]);
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Highest Number Of Votes In Each Province
        </ListSubheader>
      }
    >
      {loading ? (
        <>
          <Stack spacing={1}>
            {/* <Skeleton variant="text" sx={{ fontSize: "1rem" }} /> */}
            {/* For other variants, adjust the size with `width` and `height` */}
            {/* <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} /> */}
            <Skeleton key={"12"} variant="rounded" width={340} height={60} />
            <Skeleton key={"2"} variant="rounded" width={340} height={60} />
            <Skeleton key={"3"} variant="rounded" width={340} height={60} />
            <Skeleton key={"4"} variant="rounded" width={340} height={60} />
            <Skeleton key={"5"} variant="rounded" width={340} height={60} />
            <Skeleton key={"6"} variant="rounded" width={340} height={60} />
          </Stack>
        </>
      ) : (
        <>
          {/* <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton> */}
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemText primary="Gauteng" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Whoo" />
          </ListItemButton> */}

              {isObjectNotEmpty(provinceData["Gauteng"]) ? (
                <>
                  {Object.entries(provinceData["Gauteng"]).map(
                    ([key, value]) => (
                      // <div key={key}>
                      //   Key: {key}, Value: {value}
                      // </div>

                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://sit.uct.ac.za/sites/default/files/styles/square_med/public/contacts/maureen_tanner.jpg?h=926b3aec&itok=fujmQ9R6"
                            sx={{ width: 30, height: 30 }}
                          >
                            {value}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={getCandidateNameById(key)} />
                        <ListItemText primary={`${value} Votes`} />
                      </ListItemButton>
                    )
                  )}
                </>
              ) : (
                <>
                  <Typography>Sorry, No voting data from Gauteng</Typography>
                </>
              )}

              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="mamam" />
          </ListItemButton> */}
            </List>
          </Collapse>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemText primary="Limpopo" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Whoo" />
          </ListItemButton> */}

              {isObjectNotEmpty(provinceData["Limpopo"]) ? (
                <>
                  {Object.entries(provinceData["Limpopo"]).map(
                    ([key, value]) => (
                      // <div key={key}>
                      //   Key: {key}, Value: {value}
                      // </div>

                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://sit.uct.ac.za/sites/default/files/styles/square_med/public/contacts/maureen_tanner.jpg?h=926b3aec&itok=fujmQ9R6"
                            sx={{ width: 30, height: 30 }}
                          >
                            {value}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={getCandidateNameById(key)} />
                      </ListItemButton>
                    )
                  )}
                </>
              ) : (
                <>
                  <Typography>Sorry, No voting data from Limpopo</Typography>
                </>
              )}

              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="mamam" />
          </ListItemButton> */}
            </List>
          </Collapse>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemText primary="Western Cape" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Whoo" />
          </ListItemButton> */}

              {isObjectNotEmpty(provinceData["Western Cape"]) ? (
                <>
                  {Object.entries(provinceData["Western Cape"]).map(
                    ([key, value]) => (
                      // <div key={key}>
                      //   Key: {key}, Value: {value}
                      // </div>

                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://sit.uct.ac.za/sites/default/files/styles/square_med/public/contacts/maureen_tanner.jpg?h=926b3aec&itok=fujmQ9R6"
                            sx={{ width: 30, height: 30 }}
                          >
                            {value}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={getCandidateNameById(key)} />
                      </ListItemButton>
                    )
                  )}
                </>
              ) : (
                <>
                  <Typography>
                    Sorry, No voting data from Western Cape
                  </Typography>
                </>
              )}

              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="mamam" />
          </ListItemButton> */}
            </List>
          </Collapse>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemText primary="Eastern Cape" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Whoo" />
          </ListItemButton> */}

              {isObjectNotEmpty(provinceData["Eastern Cape"]) ? (
                <>
                  {Object.entries(provinceData["Eastern Cape"]).map(
                    ([key, value]) => (
                      // <div key={key}>
                      //   Key: {key}, Value: {value}
                      // </div>

                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://sit.uct.ac.za/sites/default/files/styles/square_med/public/contacts/maureen_tanner.jpg?h=926b3aec&itok=fujmQ9R6"
                            sx={{ width: 30, height: 30 }}
                          >
                            {value}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={getCandidateNameById(key)} />
                      </ListItemButton>
                    )
                  )}
                </>
              ) : (
                <>
                  <Typography>
                    Sorry, No voting data from Eastern Cape
                  </Typography>
                </>
              )}

              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="mamam" />
          </ListItemButton> */}
            </List>
          </Collapse>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemText primary="KwaZulu-Natal" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Whoo" />
          </ListItemButton> */}

              {isObjectNotEmpty(provinceData["KwaZulu-Natal"]) ? (
                <>
                  {Object.entries(provinceData["KwaZulu-Natal"]).map(
                    ([key, value]) => (
                      // <div key={key}>
                      //   Key: {key}, Value: {value}
                      // </div>

                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://sit.uct.ac.za/sites/default/files/styles/square_med/public/contacts/maureen_tanner.jpg?h=926b3aec&itok=fujmQ9R6"
                            sx={{ width: 30, height: 30 }}
                          >
                            {value}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={getCandidateNameById(key)} />
                      </ListItemButton>
                    )
                  )}
                </>
              ) : (
                <>
                  <Typography>
                    Sorry, No voting data from KwaZulu-Natal
                  </Typography>
                </>
              )}

              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="mamam" />
          </ListItemButton> */}
            </List>
          </Collapse>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemText primary="Mpumalanga" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Whoo" />
          </ListItemButton> */}

              {isObjectNotEmpty(provinceData["Mpumalanga"]) ? (
                <>
                  {Object.entries(provinceData["Mpumalanga"]).map(
                    ([key, value]) => (
                      // <div key={key}>
                      //   Key: {key}, Value: {value}
                      // </div>

                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://sit.uct.ac.za/sites/default/files/styles/square_med/public/contacts/maureen_tanner.jpg?h=926b3aec&itok=fujmQ9R6"
                            sx={{ width: 30, height: 30 }}
                          >
                            {value}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={getCandidateNameById(key)} />
                      </ListItemButton>
                    )
                  )}
                </>
              ) : (
                <>
                  <Typography>Sorry, No voting data from Mpumalanga</Typography>
                </>
              )}

              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="mamam" />
          </ListItemButton> */}
            </List>
          </Collapse>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemText primary="North West" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Whoo" />
          </ListItemButton> */}

              {isObjectNotEmpty(provinceData["North West"]) ? (
                <>
                  {Object.entries(provinceData["North West"]).map(
                    ([key, value]) => (
                      // <div key={key}>
                      //   Key: {key}, Value: {value}
                      // </div>

                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://sit.uct.ac.za/sites/default/files/styles/square_med/public/contacts/maureen_tanner.jpg?h=926b3aec&itok=fujmQ9R6"
                            sx={{ width: 30, height: 30 }}
                          >
                            {value}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={getCandidateNameById(key)} />
                      </ListItemButton>
                    )
                  )}
                </>
              ) : (
                <>
                  <Typography>Sorry, No voting data from North West</Typography>
                </>
              )}

              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="mamam" />
          </ListItemButton> */}
            </List>
          </Collapse>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemText primary="Northern Cape" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Whoo" />
          </ListItemButton> */}

              {isObjectNotEmpty(provinceData["Northern Cape"]) ? (
                <>
                  {Object.entries(provinceData["Northern Cape"]).map(
                    ([key, value]) => (
                      // <div key={key}>
                      //   Key: {key}, Value: {value}
                      // </div>

                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://sit.uct.ac.za/sites/default/files/styles/square_med/public/contacts/maureen_tanner.jpg?h=926b3aec&itok=fujmQ9R6"
                            sx={{ width: 30, height: 30 }}
                          >
                            {value}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={getCandidateNameById(key)} />
                      </ListItemButton>
                    )
                  )}
                </>
              ) : (
                <>
                  <Typography>
                    Sorry, No voting data from Northern Cape
                  </Typography>
                </>
              )}

              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="mamam" />
          </ListItemButton> */}
            </List>
          </Collapse>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
            <ListItemText primary="Free State" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Whoo" />
          </ListItemButton> */}

              {isObjectNotEmpty(provinceData["Free State"]) ? (
                <>
                  {Object.entries(provinceData["Free State"]).map(
                    ([key, value]) => (
                      // <div key={key}>
                      //   Key: {key}, Value: {value}
                      // </div>

                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <Avatar
                            alt="Remy Sharp"
                            src="https://sit.uct.ac.za/sites/default/files/styles/square_med/public/contacts/maureen_tanner.jpg?h=926b3aec&itok=fujmQ9R6"
                            sx={{ width: 30, height: 30 }}
                          >
                            {value}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={getCandidateNameById(key)} />
                      </ListItemButton>
                    )
                  )}
                </>
              ) : (
                <>
                  <Typography>Sorry, No voting data from Free State</Typography>
                </>
              )}

              {/* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="mamam" />
          </ListItemButton> */}
            </List>
          </Collapse>
        </>
      )}
    </List>
  );
}
