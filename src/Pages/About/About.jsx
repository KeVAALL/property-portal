import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useScrollTrigger, useTheme } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import LazyLoad from "react-lazy-load";

import Footer from "../../Components/Footer/Footer";
import Copyright from "../../Components/Copyright/Copyright";
// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "./About.css";
import { allTestimonial } from "../../Hooks/User";
import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";

const testimonials = [
  {
    name: "John Mishlen",
    role: "Executive CEO at company",
    img: "../../Images/about-company/people-1.jpg",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at luctus augue. Quisque eu mattis dolor. Nam sit amet tincidunt.",
    star: 4,
  },
  {
    name: "Moe Sondi",
    role: "Executive CEO at company",
    img: "../../Images/about-company/people-2.jpg",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan quam elit, vitae tincidunt est.",
    star: 5,
  },
  {
    name: "Mandy Floss",
    role: "Executive CEO at company",
    img: "../../Images/about-company/people-3.jpg",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget metus eget sapien luctus interdum. Vestibulum posuere urna quis",
    star: 4,
  },
  {
    name: "Moe Mishlen",
    role: "Executive CEO at company",
    img: "../../Images/about-company/people-1.jpg",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan quam elit, vitae tincidunt est",
    star: 3,
  },
  {
    name: "Moe Mishlen",
    role: "Executive CEO at company",
    img: "../../Images/about-company/people-1.jpg",
    comment:
      " Mauris at luctus augue. Quisque eu mattis dolor. Nam sit amet tincidunt",
    star: 3,
  },
  {
    name: "Moe Mishlen",
    role: "Executive CEO at company",
    img: "../../Images/about-company/people-1.jpg",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan quam elit, vitae tincidunt est",
    star: 3,
  },
];

export default function About() {
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [testimonial, setTestimonial] = useState();
  const [loading, setLoading] = React.useState(true);

  const StarRating = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      // Fill the star if i is less than or equal to the rating
      const starClass =
        i <= rating
          ? "testimonial-body-icon active-icon"
          : "testimonial-body-icon";

      stars.push(<StarIcon className={starClass} />);
    }
    return stars;
  };

  const { data, isError, error } = useQuery({
    queryKey: ["testimonials"],
    queryFn: allTestimonial,
    onSuccess: (data) => {
      setTestimonial(data.data);
    },
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Box className="about-company">
      <Box className="about-banner-section">
        <Box className="about-banner">
          <Typography className="banner-header" variant="h3" fontWeight={800}>
            About Us
          </Typography>
        </Box>
      </Box>

      <Box className="about-padding">
        <Grid container spacing={4} className="about-info">
          <Grid item md={3} className="about-building-img">
            <LazyLoad>
              <img
                src={require("../../Images/about-company/building1.png")}
                alt="build1"
              />
            </LazyLoad>
          </Grid>

          <Grid item md={6} xs={12}>
            <Stack spacing={2} className="about-info-section section">
              <Typography className="primary-text about-info-small-text">
                Our Ways
              </Typography>
              <Typography variant="h3" className="about-info-title">
                Watch Our Agents Do Their Jobs
              </Typography>
              <Typography variant="body1" className="about-info-subtitle">
                <Stack>
                  <span
                    style={{
                      padding: "30px",
                      background: "#05af7819",
                      borderRadius: "10px",
                    }}
                  >
                    <Stack direction="row" gap={5} alignItems="center">
                      <img
                        src={require("../../Images/about-company/experience.png")}
                        alt="experience"
                        style={{ height: "80px", width: "80px" }}
                      />
                      We are property consultants, We are expertise in Resale
                      Property & renting of residential in Mumbai and All Over
                      India. Our experience enables us to respond to client
                      needs in most efficient and effective manner.
                    </Stack>
                  </span>{" "}
                  <br />
                  <span
                    style={{
                      padding: "20px",
                      background: "#05af7819",
                      borderRadius: "10px",
                    }}
                  >
                    <Stack direction="row" gap={5} alignItems="center">
                      <img
                        src={require("../../Images/about-company/statistics.png")}
                        alt="experience"
                        style={{ height: "80px", width: "80px" }}
                      />
                      We have been rapidly creating and fabricating a reputation
                      in Real Estate Industry by our capacity. We have served
                      and satisfied move more than 500 + families and are
                      reliably learning and progressing with the customer needs.
                    </Stack>
                  </span>
                </Stack>
              </Typography>
              <a className="play-button" href="/about-us">
                <PlayArrowIcon color="#2cbfb9" />
              </a>
            </Stack>
          </Grid>

          <Grid item md={3} className="about-building-img">
            <LazyLoad>
              <img
                src={require("../../Images/about-company/building2.png")}
                alt="build1"
              />
            </LazyLoad>
          </Grid>
        </Grid>
      </Box>

      <Box className="section">
        <Container>
          <Stack spacing={5}>
            <Stack spacing={1}>
              <Typography className="primary-text about-info-small-text">
                Testimonials
              </Typography>
              <Typography variant="h3" className="about-info-title">
                What Are People Saying
              </Typography>
            </Stack>
            <Swiper
              spaceBetween={50}
              slidesPerView={matchesSm ? 1 : 2}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              //   navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
            >
              {testimonial?.map((user, i) => (
                <SwiperSlide key={i}>
                  <Stack spacing={2.5}>
                    <Stack spacing={1.5} className="testimonial-body">
                      <Typography className="about-info-small-text testimonial-body-title">
                        Testimonials
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent={matchesSm ? "center" : "flex-start"}
                      >
                        {!loading ? (
                          StarRating(user.rating)
                        ) : (
                          <Skeleton width={300} />
                        )}

                        {/* <StarIcon className="testimonial-body-icon active-icon" />
                        <StarIcon className="testimonial-body-icon active-icon" />
                        <StarIcon className="testimonial-body-icon active-icon" />
                        <StarIcon className="testimonial-body-icon active-icon" />
                        <StarIcon className="testimonial-body-icon" /> */}
                      </Stack>
                      <Typography variant="body2">
                        {!loading ? user.description : <Skeleton />}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={4}
                      className="testimonial-author"
                    >
                      <LazyLoad>
                        {!loading ? (
                          <img
                            key={i}
                            src={`http://localhost:3002/Uploads/Testimonial/${user?.testimonial_id}/${user?.photo}`}
                            alt="people"
                          />
                        ) : (
                          <Skeleton
                            style={{
                              width: "80px",
                              height: "80px",
                              borderRadius: "8px",
                            }}
                          />
                        )}
                      </LazyLoad>
                      <Stack spacing={1} justifyContent="center">
                        <Typography variant="body1">
                          {!loading ? (
                            user.client_name
                          ) : (
                            <Skeleton width={200} />
                          )}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="about-info-subtitle"
                        >
                          {!loading ? (
                            `${user.role} at ${user.company}`
                          ) : (
                            <Skeleton width={300} />
                          )}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </SwiperSlide>
              ))}
            </Swiper>
          </Stack>
        </Container>
      </Box>

      <footer className="footer-area section">
        <Footer />
      </footer>

      <Copyright />
    </Box>
  );
}
