import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import LazyLoad from "react-lazy-load";

import "./Footer.css";

const listing = [
  "Properties",
  // "Add Properties",
  // "Submit Property",
  "Login",
  "Signup",
];
const importants = [
  "About Us",
  // "Pricing","Blog",
  "FAQ",
  "Contact Us",
];
const contact = [
  {
    icon: <PhoneInTalkOutlinedIcon color="#2cbfb9" />,
    value: "+91 95949 29302",
  },
  {
    icon: <AttachEmailOutlinedIcon color="#2cbfb9" />,
    value: "info@gurukrupainfinity.com",
  },
  {
    icon: <PinDropOutlinedIcon color="#2cbfb9" />,
    value:
      "Gurukrupa Infinity 904, Balaji Business Park, 400059, Andheri East, Mumbai, Maharashtra 400059.",
  },
];

export default function Footer() {
  return (
    <Container>
      <Grid container spacing={5}>
        <Grid item md={12} xs={12}>
          <Grid container className="footer-form">
            <Grid item md={4} sm={6}>
              <Stack spacing={1}>
                <Typography variant="body2" className="footer-form-label">
                  For Rant house offer
                </Typography>
                <Typography variant="h1" className="footer-form-title">
                  Join Our Community
                </Typography>
              </Stack>
            </Grid>
            <Grid item md={8} sm={6}>
              <form className="footer-form-main">
                <input
                  className="footer-form-input"
                  type="email"
                  name="Email"
                  placeholder="Enter your email address"
                />
                <button
                  type="submit"
                  className="primary-button footer-form-submit"
                >
                  <Typography variant="h6">Subscribe Now</Typography>
                </button>
              </form>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={4} sm={6} xs={12}>
              <Stack spacing={2}>
                <LazyLoad>
                  <img
                    src={require("../../Images/logo1.png")}
                    alt="logo"
                    style={{ height: "100px", width: "100px" }}
                  />
                </LazyLoad>
                <Typography variant="body2" className="footer-about-text">
                  There are many variatons of pass Ipsum available, but the
                  majority alteration in some form, by inject randomised words
                </Typography>
                <Stack direction="row" spacing={2} className="footer-links">
                  <a href="/">
                    <LazyLoad>
                      <img
                        src={require("../../Images/facebook-1.png")}
                        alt="fb"
                      />
                    </LazyLoad>
                  </a>
                  <a href="/">
                    <LazyLoad>
                      <img
                        src={require("../../Images/whatsapp-1.png")}
                        alt="whatsapp"
                        className="whatsapp-icon"
                      />
                    </LazyLoad>
                  </a>
                  <a href="/">
                    <LazyLoad>
                      <img
                        src={require("../../Images/youtube-1.png")}
                        alt="fb"
                        className="yt-icon"
                      />
                    </LazyLoad>
                  </a>
                </Stack>
              </Stack>
            </Grid>
            <Grid item md={2} sm={6} xs={12}>
              <Stack spacing={4}>
                <Typography variant="h5" className="widget-title">
                  Listing
                </Typography>
                <ul className="list-none">
                  {listing.map((item) => (
                    <li>
                      <a href="/">
                        <LazyLoad>
                          <img
                            src={require("../../Images/remove.png")}
                            alt="remove"
                          />
                        </LazyLoad>
                        <Typography variant="body1">{item}</Typography>
                      </a>
                    </li>
                  ))}
                </ul>
              </Stack>
            </Grid>
            <Grid item md={2} sm={6} xs={12}>
              <Stack spacing={4}>
                <Typography variant="h5" className="widget-title">
                  Important
                </Typography>
                <ul className="list-none">
                  {importants.map((item) => (
                    <li>
                      <a href="/">
                        <LazyLoad>
                          <img
                            src={require("../../Images/remove.png")}
                            alt="remove"
                          />
                        </LazyLoad>
                        <Typography variant="body1">{item}</Typography>
                      </a>
                    </li>
                  ))}
                </ul>
              </Stack>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Stack spacing={4}>
                <Typography variant="h5" className="widget-title">
                  Contact Us
                </Typography>
                <ul className="list-none">
                  {contact.map((item) => (
                    <li>
                      <Stack direction="row" spacing={2}>
                        {item.icon}
                        <a href="/" className="contact-body">
                          <Typography variant="body1">{item.value}</Typography>
                        </a>
                      </Stack>
                    </li>
                  ))}
                </ul>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
