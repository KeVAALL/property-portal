import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import Footer from "../../Components/Footer/Footer";
import Copyright from "../../Components/Copyright/Copyright";
import "./Contact.css";
import LazyLoad from "react-lazy-load";

export default function Contact() {
  return (
    <Box className="contact">
      <Box className="contact-section">
        <Box className="contact-banner">
          <Typography className="banner-header" variant="h3" fontWeight={800}>
            Contact Us
          </Typography>
        </Box>
      </Box>

      <Box className="section">
        <Container>
          <Grid container spacing={4}>
            <Grid item md={8} sm={12}>
              <Card className="contact-card">
                <Typography variant="h4" className="contact-title">
                  Lets Get in Touch
                </Typography>
                <Grid container rowSpacing={5} columnSpacing={10}>
                  <Grid item md={6} sm={6} xs={12}>
                    <TextField
                      id="standard-basic"
                      label="Name"
                      variant="standard"
                      InputLabelProps={{ style: { color: "#586167" } }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <TextField
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                      InputLabelProps={{ style: { color: "#586167" } }}
                      fullWidth
                    />
                  </Grid>

                  <Grid item md={6} sm={6} xs={12}>
                    <TextField
                      id="standard-basic"
                      label="Phone"
                      variant="standard"
                      InputLabelProps={{ style: { color: "#586167" } }}
                      fullWidth
                    />
                  </Grid>

                  <Grid item md={6} sm={6} xs={12}>
                    <TextField
                      id="standard-basic"
                      label="Subject"
                      variant="standard"
                      InputLabelProps={{ style: { color: "#586167" } }}
                      fullWidth
                    />
                  </Grid>

                  <Grid item md={12} xs={12}>
                    <TextField
                      id="standard-basic"
                      label="Your Message"
                      variant="standard"
                      InputLabelProps={{ style: { color: "#586167" } }}
                      fullWidth
                      multiline
                      rows={4}
                      maxRows={8}
                    />
                  </Grid>

                  <Grid item md={8} sm={0} xs={0}></Grid>
                  <Grid item md={4} xs={12}>
                    <button className="contact-submit">
                      <Typography variant="body1">Submit</Typography>
                    </button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item md={4} xs={12}>
              <Grid container rowSpacing={4}>
                <Grid item xs={12}>
                  <Card className="contact-card">
                    <Grid
                      container
                      sx={{ alignItems: "center" }}
                      className="contact-boxes"
                    >
                      <Grid item md={4} xs={12}>
                        <Box className="contact-icons">
                          <LazyLoad>
                            <img
                              src={require("../../Images/contact-us/location-pin.png")}
                              alt="location"
                            />
                          </LazyLoad>
                        </Box>
                      </Grid>
                      <Grid item md={8} xs={12}>
                        <Stack>
                          <Typography
                            variant="h5"
                            className="contact-icon-title"
                          >
                            Location
                          </Typography>
                          <Typography variant="body2">
                            Gateway of India, Apollo Bunder, Colaba, Mumbai,
                            Maharashtra 400001, India
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card className="contact-card">
                    <Grid
                      container
                      sx={{ alignItems: "center" }}
                      className="contact-boxes"
                    >
                      <Grid item md={4} xs={12}>
                        <Box className="contact-icons">
                          <LazyLoad>
                            <img
                              src={require("../../Images/contact-us/contact.png")}
                              alt="location"
                            />
                          </LazyLoad>
                        </Box>
                      </Grid>
                      <Grid item md={8} xs={12}>
                        <Stack spacing={1}>
                          <Stack>
                            <Typography
                              variant="body1"
                              className="contact-icon-email"
                            >
                              Email
                            </Typography>
                            <Typography variant="body2">
                              youremail@gmial.com
                            </Typography>
                          </Stack>

                          <Stack>
                            <Typography
                              variant="body1"
                              className="contact-icon-phone"
                            >
                              Phone
                            </Typography>
                            <Typography variant="body2">
                              +91 95949 29302
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card className="contact-card">
                    <Grid
                      container
                      className="contact-boxes"
                      sx={{ alignItems: "center" }}
                    >
                      <Grid item xs={12}>
                        <Stack>
                          <Typography
                            variant="h5"
                            className="contact-icon-title"
                          >
                            Follow Us
                          </Typography>
                          <ul className="social-area">
                            <li>
                              <LazyLoad>
                                <img
                                  src={require("../../Images/contact-us/facebook.png")}
                                  alt="fb"
                                />
                              </LazyLoad>
                            </li>
                            <li>
                              <LazyLoad>
                                <img
                                  src={require("../../Images/contact-us/twitter.png")}
                                  alt="fb"
                                />
                              </LazyLoad>
                            </li>
                            <li>
                              <LazyLoad>
                                <img
                                  src={require("../../Images/contact-us/instagram.png")}
                                  alt="fb"
                                />
                              </LazyLoad>
                            </li>
                          </ul>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.237000202681!2d72.84585747474947!3d19.141100349926486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63a8226883b%3A0x5f12597ccc023804!2sRABS%20Net%20Solutions!5e0!3m2!1sen!2sin!4v1695362217449!5m2!1sen!2sin"
                // width="600"
                // height="450"
                // style="border:0;"
                // allowfullscreen=""
                // loading="lazy"
                // referrerpolicy="no-referrer-when-downgrade"
                className="map"
              ></iframe>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <footer className="footer-area section">
        <Footer />
      </footer>

      <Copyright />
    </Box>
  );
}
