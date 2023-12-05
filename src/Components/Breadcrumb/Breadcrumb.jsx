import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import "./Breadcrumb.css";

const Breadcrumb = (props) => {
  return (
    <Grid
      container
      sx={{ py: 1 }}
      className={`breadcrumb-container ${
        props.padding && `project-table-crumb`
      }`}
    >
      <Typography variant="h2" className="page-title">
        {props.PageName}
      </Typography>
      <Box>
        <Typography sx={{ pb: 0.5 }} variant="h6" className="hometext">
          <HomeIcon />
          <span className="separator">/</span>
          {props.PageName}
        </Typography>
      </Box>
    </Grid>
  );
};

export default Breadcrumb;
