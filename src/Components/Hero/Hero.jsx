import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { useQuery } from "react-query";
import FeatureCard from "../Feature-Card/FeaturedCard";
import Property from "../Property/Property";
import ChooseUs from "../ChooseUs/ChooseUs";
import AboutUs from "../AboutUs/AboutUs";
import Footer from "../Footer/Footer";
// Import Swiper React components
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "./Hero.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Copyright from "../Copyright/Copyright";
import LazyLoad from "react-lazy-load";
import { allProject } from "../../Hooks/Project";

export default function Hero() {
  const items = [
    {
      className: ".banner-img",
      description: "Find Your Dream Home",
    },
    {
      className: ".banner-img",
      description: "Hello World!",
    },
  ];
  const [loading, setLoading] = React.useState(true);
  const [featureProperties, setFeatureProperties] = React.useState();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: allProject,
    onSuccess: (data) => {
      setFeatureProperties(data.data);
    },
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const chooseUs = [
    {
      title: "Financing Easy",
      description:
        "Believe in our service & Care. Aliquam dictum elit vitae mauris facilisis at dictum urna",
    },
    {
      title: "Trusted",
      description:
        "Believe in our service & Care. Aliquam dictum elit vitae mauris facilisis at dictum urna",
    },
    {
      title: "24/7 Support",
      description:
        "Believe in our service & Care. Aliquam dictum elit vitae mauris facilisis at dictum urna",
    },
  ];
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box className="hero">
      <Box className="hero-section">
        <Swiper
          direction="vertical"
          className="carousel-wrapper"
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          // navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {items.map((item, i) => (
            <SwiperSlide key={i}>
              <Box className="banner-img">
                <Typography variant="h3" className="banner-header">
                  {item.description}
                </Typography>
                <Typography variant="body1">
                  Lorem ipsum, dolor sit amet consectetur!
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box className="feature section">
        <Stack spacing={5} sx={{ alignItems: "center" }}>
          <Stack className="hero-section-title">
            <Typography variant="h3" fontWeight={600} gutterBottom>
              Featured Properties
            </Typography>
            <Typography variant="body1" color="#777">
              Handpicked properties by our team.
            </Typography>
          </Stack>
          <Container>
            <Swiper
              spaceBetween={20}
              slidesPerView={matchesSm ? 1 : matchesMd ? 2 : 3}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              // navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
            >
              {featureProperties?.map((property, i) => (
                <SwiperSlide key={i}>
                  <FeatureCard property={property} loading={loading} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Container>
        </Stack>
      </Box>

      <Box className="section">
        <Stack className="properties">
          <Stack className="hero-section-title">
            <Typography variant="h3" fontWeight={600} gutterBottom>
              Find Properties in These Cities
            </Typography>
            <Typography variant="body1" color="#777">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
          </Stack>

          <Property loading={loading} />
        </Stack>
      </Box>

      <Box className="why-us-section section">
        <Stack>
          <Stack className="hero-section-title">
            <Typography variant="h3" fontWeight={600} gutterBottom>
              Why Choose Us
            </Typography>
            <Typography variant="body1" color="#777">
              We provide full service at every step.
            </Typography>
          </Stack>
          <Grid container spacing={5} className="why-us container">
            {chooseUs.map((choose, i) => (
              <Grid item md={4} sm={6} xs={12} key={i}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <ChooseUs chooseUs={choose} />
                  {i + 1 !== chooseUs.length ? (
                    <LazyLoad>
                      <img
                        className="choose-us-arrow"
                        src={require("../../Images/choose-us/arrow-right.png")}
                        alt="arrow"
                      />
                    </LazyLoad>
                  ) : (
                    <LazyLoad>
                      <img
                        className="choose-us-arrow disabled-arrow"
                        src={require("../../Images/choose-us/arrow-right.png")}
                        alt="arrow"
                      />
                    </LazyLoad>
                  )}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>

      <Box className="about-section section">
        <AboutUs loading={loading} />
      </Box>

      <footer className="footer-area section">
        <Footer />
      </footer>

      <Copyright />
    </Box>
  );
}

// {
/* <Carousel
          className="carousel-wrapper"
          showThumbs={false}
          autoPlay
          swipeable
          interval={2000}
        > */
// }
// import { Carousel as SwipableCarousel } from "@trendyol-js/react-carousel";
// {
/* <Box className="banner-img">
        <Typography variant="h4" className="banner-header">
          Find Your Dream Home
        </Typography>
        <Typography variant="body1">
          From as low as $10 per day with limited time offer discounts
        </Typography>
      </Box> */
// }
// {
/* <SwipableCarousel
              show={4}
              slide={3}
              swiping={true}
              leftArrow={false}
              rightArrow={false}
            > */
// }
// {
/* <SwipableCarousel
          show={1}
          slide={1}
          swiping={true}
          leftArrow={false}
          rightArrow={false}
          autoSwipe={true}
          infinite
          className="carousel-wrapper"
        > */
// }
// {
/* <Carousel>
        {items.map((item, i) => (
          <Box className="banner-img">
            <Typography variant="h4" className="banner-header">
              {item.description}
            </Typography>
            <Typography variant="body1">
              From as low as $10 per day with limited time offer discounts
            </Typography>
          </Box>
        ))}
      </Carousel> */
// }
// const featureProperties = [
//   {
//     apartmentType: "Renovated",
//     price: 10000,
//     address: "1421 San Pedro St, Los Angeles, CA",
//     beds: 4,
//     baths: 6,
//   },
//   {
//     apartmentType: "Renovated",
//     price: 164296,
//     address: "8706 Herrick Ave, Los Angeles",
//     beds: 3,
//     baths: 3,
//   },
//   {
//     apartmentType: "Renovated",
//     price: 23000,
//     address: "Gastonia, NC",
//     beds: 7,
//     baths: 5,
//   },
// {
//   apartmentType: "Renovated",
//   price: 45000,
//   address: "Colorado Springs, CO",
//   beds: 4,
//   baths: 6,
// },
// {
//   apartmentType: "Renovated",
//   price: 10000,
//   address: "8706 Herrick Ave, Los Angeles",
//   beds: 4,
//   baths: 6,
// },
// ]
