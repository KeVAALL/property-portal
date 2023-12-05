import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import "./ChooseUs.css";
import LazyLoad from "react-lazy-load";

export default function ChooseUs({ chooseUs }) {
  const [hover, setHover] = useState(false);

  return (
    <Card
      className="choose-us"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <Box className="icon">
        <LazyLoad
          onContentVisible={() => {
            console.log("Choose Us Loaded!");
          }}
        >
          <img
            className="icon-picture"
            src={require(`../../Images/choose-us/${
              !hover ? "high-five.png" : "high-five-white.png"
            }`)}
            alt="high-five"
          />
        </LazyLoad>
      </Box>
      <Stack className="details">
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {chooseUs.title}
        </Typography>
        <Typography variant="body2" color="#777">
          {chooseUs.description}
        </Typography>
      </Stack>
    </Card>
  );
}
