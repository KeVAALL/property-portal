import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationIcon from "../../Images/location.png";

import LazyLoad from "react-lazy-load";
import "./FeaturedCard.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function FeatureCard({ property, loading }) {
  // if (loading) {
  //   return (
  //     <Skeleton>
  //       <Card />
  //     </Skeleton>
  //   );
  // }

  return (
    <Card className="feature-card">
      <Box className="media-box">
        <Box alt="green iguana" className="media-image">
          {loading && (
            <Skeleton
              style={{ height: "200px", position: "absolute", top: "0px" }}
            />
          )}
        </Box>
        <Box className="media-box-content">
          <Stack sx={{ flexDirection: "row", gap: "10px" }}>
            <Chip label="Featured" className="media-chip-1" clickable />
            <Chip label="For Sale" className="media-chip-2" clickable />
          </Stack>

          <Box className="feature-icon">
            <FavoriteBorderOutlinedIcon />
          </Box>
        </Box>
      </Box>
      <CardContent>
        <Typography variant="h6" className="feature-apartment">
          {!loading ? property.prj_name : <Skeleton />}
        </Typography>
        <Typography gutterBottom variant="body2" className="feature-type">
          {!loading ? `${property.prj_type} Apartment` : <Skeleton />}
        </Typography>

        <Stack
          sx={{
            flexDirection: "row",
            gap: "25px",
            justifyContent: "space-between",
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              gap: "6px",
              my: 1,
              alignItems: "center",
              height: "20px",
            }}
          >
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <>
                <LazyLoad>
                  <img
                    src={require("../../Images/check.png")}
                    alt="location"
                    style={{ height: "20px", width: "20px" }}
                  />
                </LazyLoad>
                <Typography variant="body2" color="text.secondary">
                  {property.availability}
                </Typography>
              </>
            )}
          </Stack>

          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              my: 1,
            }}
          >
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <>
                <LazyLoad>
                  <img
                    src={require("../../Images/network.png")}
                    alt="location"
                    style={{ height: "18px", width: "18px" }}
                  />
                </LazyLoad>
                <Typography variant="body2" color="text.secondary">
                  {property.area_to} sq.ft
                </Typography>
              </>
            )}
          </Stack>
        </Stack>

        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: "6px",
            mt: 1,
            mb: 2,
          }}
        >
          {loading ? (
            <Skeleton width={340} />
          ) : (
            <>
              <LazyLoad
                onContentVisible={() => {
                  console.log("Featured Card Images Loaded!");
                }}
              >
                <img
                  src={LocationIcon}
                  alt="location"
                  style={{ height: "20px", width: "20px" }}
                />
              </LazyLoad>
              <Typography variant="body2" color="text.secondary">
                {`${property.address}, ${property.city}, ${property.state}`}
              </Typography>
            </>
          )}
        </Stack>

        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            mt: 1,
            mb: 2,
          }}
        >
          {loading ? (
            <Skeleton width={340} />
          ) : (
            <>
              <CurrencyRupeeIcon />
              <Typography variant="h6" fontSize="21px" fontWeight={600}>
                {property.price_from} - {property.price_to} Cr (All Inc)
              </Typography>
            </>
          )}
        </Stack>

        <Divider sx={{ mb: 2.5 }} />

        {loading ? (
          <Skeleton width={340} height={35} />
        ) : (
          <Button variant="contained" className="primary-button" fullWidth>
            Contact Us
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
