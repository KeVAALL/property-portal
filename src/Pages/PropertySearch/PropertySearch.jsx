import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HouseIcon from "@mui/icons-material/House";
import { useTheme } from "@mui/material";
import { useQuery } from "react-query";

import FeatureCard from "../../Components/Feature-Card/FeaturedCard";
import Footer from "../../Components/Footer/Footer";
import Copyright from "../../Components/Copyright/Copyright";
import "./PropertySearch.css";
import { allProject } from "../../Hooks/Project";

const ITEM_HEIGHT = 20;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const locations = [
  "Los Angeles",
  "San Francisco, CA",
  "The Weldon",
  "San Diego",
];
const properties = ["Commercial", "Residential"];

export default function PropertySearch() {
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = React.useState(true);

  const { data, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: allProject,
    onSuccess: (data) => {
      setResultProperties(data.data);
      setFilterProperty(data.data);
    },
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const [locationName, setLocationName] = React.useState([]);
  const [propertyType, setPropertyType] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [resultProperties, setResultProperties] = React.useState();
  const [filterProperty, setFilterProperty] = React.useState();

  const searchData = (data) => {
    const formattedData = data.toLowerCase();
    const filteredData = resultProperties.filter((property) =>
      property.prj_name.toLowerCase().includes(formattedData)
    );
    setFilterProperty(filteredData);
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setLocationName(typeof value === "string" ? value.split(",") : value);
  };
  const handlePropertyChange = (event) => {
    const {
      target: { value },
    } = event;
    setPropertyType(typeof value === "string" ? value.split(",") : value);
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Box className="property-search">
      <Box className="property-search-section">
        <Box className="property-search-banner">
          <Typography className="banner-header" variant="h3" fontWeight={800}>
            Properties
          </Typography>
        </Box>
      </Box>

      <Box className="section">
        <Container>
          <Box className="property-search-box">
            <form>
              <Grid container spacing={2}>
                <Grid item md={4} sm={4} xs={12}>
                  <TextField
                    variant="standard"
                    className="property-search-main"
                    InputProps={{
                      disableUnderline: true, // <== added this
                      startAdornment: <SearchIcon className="search-icon" />,
                      endAdornment: (
                        <button type="submit" className="property-search-btn">
                          <Typography variant="body2">Search</Typography>
                        </button>
                      ),
                    }}
                    type="text"
                    name="search"
                    placeholder="Search"
                    onChange={(e) => {
                      // setQuery(e.target.value);
                      searchData(e.target.value);
                    }}
                    fullWidth
                  />
                </Grid>

                <Grid item md={4} sm={4} xs={12}>
                  <FormControl className="property-search-select-box" fullWidth>
                    <InputLabel id="location-checkbox-label">
                      Location
                    </InputLabel>
                    <Select
                      className="property-search-select-box-field"
                      labelId="location-checkbox-label"
                      id="location-checkbox"
                      multiple
                      label="Location"
                      value={locationName}
                      onChange={handleChange}
                      startAdornment={
                        <LocationOnIcon className="select-icon" />
                      }
                      input={<OutlinedInput label="Location" />}
                      renderValue={(selected) => {
                        return selected.join(", ");
                      }}
                      fullWidth
                      MenuProps={MenuProps}
                    >
                      {locations.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={locationName.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={4} sm={4} xs={12}>
                  <FormControl className="property-search-select-box" fullWidth>
                    <InputLabel id="property-type-checkbox-label">
                      Property
                    </InputLabel>
                    <Select
                      className="property-search-select-box-field"
                      labelId="property-type-checkbox-label"
                      id="property-type-checkbox"
                      multiple
                      label="Property"
                      value={propertyType}
                      onChange={handlePropertyChange}
                      startAdornment={<HouseIcon className="select-icon" />}
                      input={<OutlinedInput label="Location" />}
                      renderValue={(selected) => {
                        return selected.join(", ");
                      }}
                      fullWidth
                      MenuProps={MenuProps}
                    >
                      {properties.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={propertyType.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Box>

      <Box sx={{ padding: "0px 25px 40px 25px" }}>
        <Container>
          <Stack direction="row" className="properties-result-filter">
            <Typography variant="h6">
              Showing{" "}
              <span className="property-total">{filterProperty?.length}</span>{" "}
              properties
            </Typography>

            <Grid container spacing={matchesSm ? 0 : matchesMd ? 1 : 4}>
              {filterProperty?.map((property) => (
                <Grid item md={4} sm={6} xs={12}>
                  <FeatureCard property={property} loading={loading} />
                </Grid>
              ))}
            </Grid>
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
