import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Footer from "../../Components/Footer/Footer";
import Copyright from "../../Components/Copyright/Copyright";
import "./Service.css";
import LazyLoad from "react-lazy-load";

export default function Service() {
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box className="service">
      <Box className="service-section">
        <Box className="service-banner">
          <Typography className="banner-header" variant="h3" fontWeight={800}>
            Services
          </Typography>
        </Box>
      </Box>

      <Box className="service-summary section">
        <Container>
          <Grid container spacing={10} alignItems="center">
            <Grid item md={6} xs={12}>
              <Stack spacing={5}>
                <Stack spacing={2}>
                  <Typography variant="h3" className="service-summary-title">
                    Providing The Best Customer Service
                  </Typography>
                  <Typography
                    variant="body1"
                    className="service-summary-description"
                  >
                    We are a group of experienced professionals who specialize
                    in Resale Property renting of residential properties. We
                    deal in Multi-storey Apartment, Builder Floor Apartment,
                    Residential House, Residential Plot, Commercial Office
                    Space, Commercial Shop, Commercial Showroom bungalows in
                    Mumbai. <br />
                    <br /> With our voluminous experience and in-depth market
                    knowledge, we ensure quick deal closure.
                  </Typography>
                  <button className="learn-more-btn">
                    <Typography variant="body1">Learn More</Typography>
                  </button>
                </Stack>
              </Stack>
            </Grid>

            <Grid item md={6} xs={12}>
              <LazyLoad>
                <img
                  src={require("../../Images/service/service-2.png")}
                  alt="service"
                  style={{ width: "100%" }}
                />
              </LazyLoad>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box className="service-offers section">
        <Container className="service-card-parent-wrapper">
          <Stack spacing={5}>
            <Stack spacing={1}>
              <Typography className="primary-text about-info-small-text">
                Services
              </Typography>
              <Typography variant="h3" className="about-info-title">
                You Need It, We Got It
              </Typography>
            </Stack>

            <Grid container spacing={2} className="service-card-wrapper">
              <Grid item md={4} xs={12}>
                <Card className="service-card">
                  <Stack spacing={1} alignItems="center">
                    <LazyLoad>
                      <img
                        src={require("../../Images/service/sold.png")}
                        alt="sold"
                        className="service-card-image"
                      />
                    </LazyLoad>
                    <Typography variant="h6" className="service-card-title">
                      Real Estate Services
                    </Typography>
                    <Typography
                      variant="body2"
                      className="service-summary-description"
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </Typography>
                  </Stack>

                  <a href="/">
                    <span>Get Started</span>
                    <NavigateNextIcon className="next-icon" />
                  </a>
                </Card>
              </Grid>

              <Grid item md={4} xs={12}>
                <Card className="service-card">
                  <Stack spacing={1} alignItems="center">
                    <LazyLoad>
                      <img
                        src={require("../../Images/service/building.png")}
                        alt="sold"
                        className="service-card-image"
                      />
                    </LazyLoad>
                    <Typography variant="h6" className="service-card-title">
                      Business Services
                    </Typography>
                    <Typography
                      variant="body2"
                      className="service-summary-description"
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </Typography>
                  </Stack>

                  <a href="/">
                    <span>Get Started</span>
                    <NavigateNextIcon className="next-icon" />
                  </a>
                </Card>
              </Grid>

              <Grid item md={4} xs={12}>
                <Card className="service-card">
                  <Stack spacing={1} alignItems="center">
                    <LazyLoad>
                      <img
                        src={require("../../Images/service/tax.png")}
                        alt="sold"
                        className="service-card-image"
                      />
                    </LazyLoad>
                    <Typography variant="h6" className="service-card-title">
                      Tax Services
                    </Typography>
                    <Typography
                      variant="body2"
                      className="service-summary-description"
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </Typography>
                  </Stack>

                  <a href="/">
                    <span>Get Started</span>
                    <NavigateNextIcon className="next-icon" />
                  </a>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>

      <Box className="service-box-section">
        <Container>
          <Box className="service-box">
            <Grid container spacing={matchesSm ? 4 : matchesMd ? 2 : 15}>
              <Grid item md={4} xs={12}>
                <Typography
                  className="service-box-title"
                  variant="h4"
                  fontWeight={800}
                >
                  Need More Information On Real Estate?
                </Typography>
              </Grid>

              <Grid item md={8} xs={12}>
                <Stack spacing={2}>
                  <Typography variant="body1">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled.
                  </Typography>
                  <button className="btn-light service-box-btn">
                    <Typography variant="body1">Find Out More</Typography>
                  </button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <footer className="footer-area section">
        <Footer />
      </footer>

      <Copyright />
    </Box>
  );
}
