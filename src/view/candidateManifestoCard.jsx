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

  console.log(candidate);

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
    //if (false) {
    console.log();
    if (localStorage.getItem("Voted") === "true") {
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
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={candidateData.ImageUrl}
          >
            {candidateVotes}
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
        image={candidateData.ImageUrl}
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
