import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import DB from "../data/dataApi";

export default function OverallResultsList() {
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

      try {
        setLoading(true);

        console.log(DB.getProvinces());
      } catch (error) {
        console.error("Error fetching Provinces:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
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
          {candidates.map((candidate, index) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="https://sit.uct.ac.za/sites/default/files/styles/square_med/public/contacts/maureen_tanner.jpg?h=926b3aec&itok=fujmQ9R6"
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${candidate.Name} ${candidate.Surname}`}
                secondary={`${candidate.Votes} Votes`}
              />
            </ListItem>
          ))}
        </>
      )}
    </List>
  );
}
