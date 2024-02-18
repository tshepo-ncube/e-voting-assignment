import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import DB from "../data/dataApi";

export default function CandidateCard({ candidateData }) {
  const [candidate, setCandidate] = React.useState(candidateData);
  const [candidateVotes, setCandidateVotes] = React.useState(
    candidateData.Votes
  );

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
      DB.incrementVotesTransaction(
        candidateData,
        handleVoteClick,

        DB.incrementProvincialTransaction
      );
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://sit.uct.ac.za/sites/default/files/styles/square_med/public/contacts/maureen_tanner.jpg?h=926b3aec&itok=fujmQ9R6"
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
