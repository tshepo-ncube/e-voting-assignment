import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CandidateCard from "./candidateCard";
import CandidateManifestoCard from "./candidateManifestoCard";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import DB from "../data/dataApi";
import { Typography } from "@mui/material";

export default function CandidatesGrid() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const candidatesData = await DB.getCandidates();
        setCandidates(candidatesData);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <Box sx={{ flexGrow: 1, marginTop: 2, padding: 4 }}>
      <center style={{ marginBottom: 10 }}>
        <Typography style={{ fontWeight: "bold", fontSize: 32 }}>
          Vote For Your Commerce Dean
        </Typography>
      </center>

      <Grid container spacing={2}>
        {loading ? (
          <>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rounded" width={250} height={120} />
            </Grid>
          </>
        ) : (
          <>
            {candidates.map((candidate, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                {/* <CandidateCard candidateData={candidate} /> */}
                <CandidateManifestoCard candidateData={candidate} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Box>
  );
}
