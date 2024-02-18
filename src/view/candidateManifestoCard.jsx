import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DB from "../data/dataApi";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CandidateManifestoCard({ candidateData }) {
  const [expanded, setExpanded] = React.useState(false);
  const [candidate, setCandidate] = React.useState(candidateData);
  const [candidateVotes, setCandidateVotes] = React.useState(
    candidateData.Votes
  );
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //   const updateVotedField = async () => {
  //     const userEmail = localStorage.getItem("Email");
  //     const userRefDoc = doc(db, "users", userEmail);

  //     try {
  //       // Fetch the existing document
  //       const userDoc = await getDoc(userRefDoc);

  //       if (userDoc.exists()) {
  //         // Document exists, update the "Voted" field
  //         await updateDoc(userRefDoc, {
  //           Voted: true,
  //         });

  //         console.log("Document updated successfully");
  //         localStorage.setItem("Voted", true);
  //       } else {
  //         console.log("Document does not exist");
  //       }
  //     } catch (error) {
  //       console.error("Error updating document:", error);
  //     }
  //   };

  //   const handleVotedFor = async () => {
  //     const userEmail = localStorage.getItem("Email");
  //     const userRefDoc = doc(db, "users", userEmail);

  //     try {
  //       // Fetch the existing document
  //       const userDoc = await getDoc(userRefDoc);

  //       if (userDoc.exists()) {
  //         // Document exists, update the "Voted" field
  //         await updateDoc(userRefDoc, {
  //           CandidateVote: candidateData.id,
  //         });

  //         // await setDoc(
  //         //   userRefDoc,
  //         //   { CandidateVote: candidateData.id } // Replace 'Voted' with the actual field name in your document
  //         //   // { merge: true }
  //         // );

  //         console.log("Document updated successfully");
  //         localStorage.setItem("Voted", true);
  //       } else {
  //         console.log("Document does not exist");
  //       }
  //     } catch (error) {
  //       console.error("Error updating document:", error);
  //     }
  //   };

  console.log(candidate);
  // Initialize Firebase
  //   const app = initializeApp(firebaseConfig);
  //   const db = app.firestore();
  //   const analytics = getAnalytics(app);

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
    DB.updateVotedField();
  };

  const makeAVote = () => {
    console.log("checking if user has voted");
    if (false) {
      //if (localStorage.getItem("Voted")) {
      alert("You cannot vote 2 times");
    } else {
      //alert("you have not voted");
      // incrementVotesTransaction("Tshepo");
      DB.incrementVotesTransaction(
        candidateData,
        handleVoteClick,
        DB.handleVotedFor,
        DB.incrementProvincialTransaction
      );
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${candidateData.Name} ${candidateData.Surname}`}
        subheader={` ${candidateVotes} Votes`}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://sit.uct.ac.za/sites/default/files/styles/square_med/public/contacts/maureen_tanner.jpg?h=926b3aec&itok=fujmQ9R6"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {candidateData.About}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" color="primary" onClick={makeAVote}>
          Vote
        </Button>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon  />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{candidateData.Manifesto}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}