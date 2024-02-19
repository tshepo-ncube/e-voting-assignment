import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import DB from "../../data/dataApi";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
        <p>
          Welcome to the online voting form, Please login to cast your vote!
        </p>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
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
