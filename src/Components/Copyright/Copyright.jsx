import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React from "react";
import "./Copyright.css";

export default function Copyright() {
  return (
    <Box className="copyright">
      <Stack className="container copyright-divider">
        {/* <Container> */}
        <Typography variant="body1">
          © 2023 Homeco. All rights reserved by{" "}
          <span style={{ color: "#2cbfb9" }}>Rabs Net Solutions</span>
        </Typography>
        {/* </Container> */}
      </Stack>
    </Box>
  );
}
