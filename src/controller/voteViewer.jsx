import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import OverallResultsList from "../view/resultsList";
import ProvincialResults from "../view/provincialResults";
import CandidateGenderGraph from "../view/graphs/candidateGenderGraph";
export default function VoteViewer() {
  const [alignment, setAlignment] = React.useState("Overall Results");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <center>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="Overall Results">Overall</ToggleButton>
          <ToggleButton value="Provincial Results">Provincial</ToggleButton>
          <ToggleButton value="Graphs">Graphs</ToggleButton>
        </ToggleButtonGroup>
        {/* <OverallResultsList /> */}

        {alignment === "Overall Results" ? (
          <>
            <OverallResultsList />
          </>
        ) : (
          <></>
        )}
        {alignment === "Provincial Results" ? (
          <>
            <ProvincialResults />
          </>
        ) : (
          <></>
        )}
        {alignment === "Graphs" ? (
          <>
            <CandidateGenderGraph />
          </>
        ) : (
          <></>
        )}
      </center>
    </div>
  );
}
