import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "./Property.css";
import LazyLoad from "react-lazy-load";
import Skeleton from "react-loading-skeleton";

const properties = [
  {
    name: "Pre leased",
    number: 12,
    sizeLg: 4,
    sizeMd: 6,
    photo: "property-1",
  },
  {
    name: "Rental",
    number: 15,
    sizeLg: 8,
    sizeMd: 6,
    photo: "property-2",
  },
  {
    name: "Rental",
    number: 20,
    sizeLg: 8,
    sizeMd: 6,
    photo: "property-3",
  },
  {
    name: "Resale",
    number: 15,
    sizeLg: 4,
    sizeMd: 6,
    photo: "property-4",
  },
];

export default function Property({ loading }) {
  return (
    <Grid container spacing={5}>
      {properties.map((property) => (
        <Grid item md={property.sizeLg} sm={property.sizeMd}>
          <a href="/" className="property-city">
            <Box className="property-box">
              {loading && (
                <Skeleton
                  style={{ height: "330px", position: "absolute", top: "0px" }}
                />
              )}
              <LazyLoad
                height="200"
                onContentVisible={() => {
                  console.log("Property Images Loaded!");
                }}
              >
                <img
                  src={require(`../../Images/${property.photo}.jpg`)}
                  alt="building"
                />
              </LazyLoad>
            </Box>
            <Box class="property-overlay">
              <div class="details">
                <Typography variant="h5">{property.name}</Typography>
                <Typography variant="body2">
                  {property.number} Properties
                </Typography>
              </div>
            </Box>
          </a>
        </Grid>
      ))}
    </Grid>
  );
}
