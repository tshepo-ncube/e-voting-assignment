import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function LoginForm({ setLoggedIn, setTab }) {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [inProgress, setInProgress] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInProgress(true);
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
            setTab("Vote");
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
    setInProgress(false);
  };

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
        {inProgress ? (
          <>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </>
        ) : (
          <></>
        )}
        <Button variant="contained" color="primary" type="submit">
          login
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
