import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CardMedia from "@mui/material/CardMedia";

import "./AboutUs.css";
import LazyLoad from "react-lazy-load";
import Skeleton from "react-loading-skeleton";

export default function AboutUs({ loading }) {
  return (
    <Grid container spacing={5} className="container">
      <Grid
        item
        md={4}
        sm={12}
        sx={{
          paddingTop: {
            sm: "0px !important",
          },
        }}
      >
        <Box className="about-us-image">
          <Box className="about-us-image-main">
            <LazyLoad
              onContentVisible={() => {
                console.log("About Us Loaded!");
              }}
            >
              {loading ? (
                <Skeleton
                  style={{
                    width: "280px",
                    height: "400px",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <img
                  className="about-us-img"
                  // sx={{ backgroundSize: "contain" }}
                  src={require("../../Images/property-5.jpg")}
                  alt="green iguana"
                />
              )}
            </LazyLoad>

            <Box className="about-us-experience">
              <Typography className="about-us-experience-title">
                12 years <span>Experience</span>
              </Typography>
            </Box>
          </Box>
          <Box className="about-us-ceo">
            <Box className="about-us-ceo-image">
              {loading ? (
                <Skeleton
                  style={{
                    width: "100px",
                    height: "200px",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <>
                  <Box className="ceo-overlay" />
                  <LazyLoad>
                    <CardMedia
                      component="img"
                      //   className="about-us-img"
                      sx={{ backgroundSize: "contain" }}
                      image={require("../../Images/ceo.jpg")}
                      alt="green iguana"
                    />
                  </LazyLoad>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item md={1} className="about-us-divider" />
      <Grid item md={7} sm={12} className="about-us-grid">
        <Container className="about-us-detail-container">
          <Box className="about-us-header">
            <Box>
              <span className="header-banner">About Us</span>
            </Box>
            <Typography variant="h3" fontWeight={600}>
              Have done some Cool Stuff with common users
            </Typography>
            <Stack spacing={2} className="about-us-content">
              <Typography className="about-us-content-text">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable.
              </Typography>
              <Typography className="about-us-focus-text">
                Over 20 years' experience providing top quality house Booking in
                to the rant and sell for your Amazing Dream & Make you Happy
              </Typography>
            </Stack>
            <Stack className="about-us-flex-space">
              <Stack>
                <Box className="about-us-icons">
                  <LazyLoad>
                    <img
                      src={require("../../Images/users.png")}
                      className="about-us-icon-image"
                      alt="users"
                    />
                  </LazyLoad>
                </Box>
                <Typography className="about-us-icon-number">
                  90k+ Renters
                </Typography>
                <Typography variant="body1" className="about-us-icon-text">
                  believe in our service & Care
                </Typography>
              </Stack>

              <Stack sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Box className="about-us-icons">
                  <LazyLoad>
                    <img
                      src={require("../../Images/house-building.png")}
                      className="about-us-icon-image"
                      alt="users"
                    />
                  </LazyLoad>
                </Box>
                <Typography className="about-us-icon-number">
                  120k+ Renters
                </Typography>
                <Typography variant="body1" className="about-us-icon-text">
                  house ready for occupancy
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
