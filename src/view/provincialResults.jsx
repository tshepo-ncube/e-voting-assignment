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

    fetchData();
    //fetchCandidates();
  }, []);

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
              {isObjectNotEmpty(provinceData["Limpopo"]) ? (
                <>
                  {Object.entries(provinceData["Limpopo"]).map(
                    ([key, value]) => (
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
              {isObjectNotEmpty(provinceData["Eastern Cape"]) ? (
                <>
                  {Object.entries(provinceData["Eastern Cape"]).map(
                    ([key, value]) => (
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
              {isObjectNotEmpty(provinceData["Mpumalanga"]) ? (
                <>
                  {Object.entries(provinceData["Mpumalanga"]).map(
                    ([key, value]) => (
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
              {isObjectNotEmpty(provinceData["North West"]) ? (
                <>
                  {Object.entries(provinceData["North West"]).map(
                    ([key, value]) => (
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
              {isObjectNotEmpty(provinceData["Northern Cape"]) ? (
                <>
                  {Object.entries(provinceData["Northern Cape"]).map(
                    ([key, value]) => (
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
              {isObjectNotEmpty(provinceData["Free State"]) ? (
                <>
                  {Object.entries(provinceData["Free State"]).map(
                    ([key, value]) => (
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
            </List>
          </Collapse>
        </>
      )}
    </List>
  );
}
