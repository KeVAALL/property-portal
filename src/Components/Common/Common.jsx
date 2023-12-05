import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import "./Common.css";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    width: "100%",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #007fff",
    fontSize: 16,
    padding: "0.47rem 0.75rem",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "none",
      backgroundColor: "#fff",
    },
  },
}));

export const CustomFormLabel = (props) => {
  return (
    <>
      <Typography variant="h6" className="custom-form-label">
        {props.formlabel} <span className="required-label">{props.star}</span>
      </Typography>
    </>
  );
};

export const CustomFormGroup = (props) => {
  return (
    <>
      <Grid item xs={12} md={props.multiline ? 12 : 6}>
        <Typography variant="h6" className="custom-form-label">
          {props.formlabel} <span className="required-label">{props.star}</span>
        </Typography>
        {props.FormField}
      </Grid>
    </>
  );
};

export const ContainedButton = (props) => {
  return (
    <Button variant="contained" className="contained-btn">
      <Typography
        variant="body1"
        className="bold px-3"
        sx={{ textTransform: "capitalize" }}
      >
        {props.children}
      </Typography>
    </Button>
  );
};

export const CustomTextField = (props) => {
  return (
    <Box>
      <TextField
        required={props.required}
        name={props.name}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values[props.name]}
        placeholder={props.label}
        type={props.type}
        className={`custom-input ${props.startAdornment && "icon-bg"}`}
        multiline={props.multiline ? true : false}
        rows={5}
        autoComplete={props.type === "number" ? "off" : props.name}
        disabled={props.disabled}
        sx={{
          backgroundColor: props.disabled === true ? "#f2f2f2" : null,
          cursor: props.disabled === true ? "not-allowed" : null,
          border:
            props.errors[props.name] && props.touched[props.name]
              ? "1px solid red"
              : "1px solid #ced4da",
          borderRadius: 1,
        }}
        InputProps={{
          disableUnderline: true, // <== added this
          startAdornment: props.startAdornment && props.startAdornment,
          // step: "0.1",
        }}
        fullWidth
      />
      {props.errors[props.name] && props.touched[props.name] && (
        <Typography className="error">{props.errors[props.name]}</Typography>
      )}
      {props.loginError && (
        <Typography className="error">{props.loginError}</Typography>
      )}
    </Box>
  );
};

export const CustomSelectField = (props) => {
  return (
    <Box sx={{ width: "100%" }}>
      {/* <InputLabel htmlFor="demo-customized-select-native">Age</InputLabel> */}
      <NativeSelect
        id="demo-customized-select-native"
        name={props.name}
        value={props.value[props.name] || ""}
        onChange={(e) => {
          console.log(e);
          props.handleChange(e);
        }}
        sx={{ width: "100%" }}
        input={<BootstrapInput />}
      >
        {props.dropDown.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </NativeSelect>
      {props.errors[props.name] && props.touched[props.name] && (
        <Typography className="error">{props.errors[props.name]}</Typography>
      )}
    </Box>
  );
};
