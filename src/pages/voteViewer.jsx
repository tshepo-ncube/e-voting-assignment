import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import OverallResultsList from "../components/resultsList";
import ProvincialResults from "../components/provincialResults";
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
          <ToggleButton value="Overall Results">Overall Results</ToggleButton>
          <ToggleButton value="Provincial Results">
            Provincial Results
          </ToggleButton>
          {/* <ToggleButton value="ios">iOS</ToggleButton> */}
        </ToggleButtonGroup>

        {/* <OverallResultsList /> */}

        {alignment == "Overall Results" ? (
          <>
            <OverallResultsList />
          </>
        ) : (
          <>
            <ProvincialResults />
          </>
        )}
      </center>
    </div>
  );
}
