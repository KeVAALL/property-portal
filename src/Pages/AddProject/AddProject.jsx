import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import { Formik } from "formik";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import AddHomeIcon from "@mui/icons-material/AddHome";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import {
  CustomTextField,
  CustomSelectField,
  CustomFormGroup,
} from "./../../Components/Common/Common";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import * as Yup from "yup";
import "./AddProject.css";

import { Country, City, State } from "../../Data/CountryStateCity";
import { addProject, AddProjectData } from "../../Hooks/Project";

export default function AddProject() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [date, onDateChange] = useState(new Date());
  const imageRef = useRef();
  const galleryRef = useRef();
  const [imageError, setImageError] = useState("");
  const [galleryError, setGalleryError] = useState("");
  const { mutate } = AddProjectData();

  function filterCity(selectedState) {
    let myCity = City.filter(
      (City) => selectedState.countryCode.indexOf(City.countryCode) !== -1
    );
    return myCity.filter(
      (citynew) => selectedState.isoCode.indexOf(citynew.stateCode) !== -1
    );
  }

  const validationSchema = Yup.object({
    projectName: Yup.string()
      .matches(
        /^[a-zA-Z0-9 ]*$/,
        "Project Name can only contain letters, numbers, and a single space"
      )
      .required("Project Name is required"),
    areaFrom: Yup.number().required("Area From is required"),
    // .matches(/^\d+$/, "Area From can only contain numbers only")
    areaTo: Yup.number().required("Area To is required"),
    // .matches(/^\d+$/, "Area From can only contain numbers only")
    priceFrom: Yup.number().required("Price From is required"),
    // .min(1000, "Price must be greater than or equal to 10000"),
    priceTo: Yup.number().required("Price To is required"),
    // .min(10000, "Price must be greater than or equal to 15000"),
    // .max(50000),
    projectRERA: Yup.string()
      .matches(/^P\d+$/, "Invalid Project RERA")
      .required("Project RERA is required"),
    towers: Yup.string()
      .matches(/^\d+$/, "Invalid Towers")
      .required("Towers is required"),
  });

  const formValues = {
    projectName: "",
    projectBanner: "",
    projectType: "",
    projectCategory: "",
    projectArea: "",
    availability: "",
    projectRERA: "",
    areaFrom: "",
    areaTo: "",
    priceFrom: "",
    priceTo: "",
    projectConfiguration: "",
    towers: "",
    state: "",
    city: "",
    address: "",
    description: "",
  };

  const [imagePreview, setImagePreview] = useState(null);
  const [singleImage, setSingleImage] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [urlSelectedFiles, setUrlSelectedFiles] = useState([]);

  const handleImageChange = (event) => {
    console.log(event.target.files[0]);
    const file = event.target.files[0];

    if (file) {
      setImageError("");
      const reader = new FileReader();

      reader.onload = (e) => {
        console.log(e.target);
        setImagePreview({
          url: e.target.result,
          name: event.target.files[0].name,
        });
      };

      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleFileChange = (event) => {
    if (selectedFiles.length >= 0) {
      setGalleryError("");
    }
    const files = Array.from(event.target.files);
    console.log(files);
    setSelectedFiles([...selectedFiles, ...files]);

    if (files.length === 1) {
      console.log("One file");
      setImageError("");
      const reader = new FileReader();

      reader.onload = (e) => {
        console.log(e.target);

        setUrlSelectedFiles([
          ...urlSelectedFiles,
          {
            url: e.target.result,
            name: event.target.files[0].name,
          },
        ]);
      };

      reader.readAsDataURL(event.target?.files[0]);
    }
    if (files.length > 1) {
      console.log("Multiple file");

      files.map((file, i) => {
        setImageError("");
        const reader = new FileReader();

        reader.onload = (e) => {
          console.log(e.target);

          setUrlSelectedFiles((previous) => {
            return [
              ...previous,
              {
                url: e.target.result,
                name: file.name,
              },
            ];
          });
        };

        // reader.readAsDataURL(event.target?.files);
        reader.readAsDataURL(file);
      });
    }

    console.log(urlSelectedFiles);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = selectedFiles.filter((file, i) => i !== index);
    const urlUpdatedFiles = urlSelectedFiles.filter((file, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setUrlSelectedFiles(urlUpdatedFiles);
  };

  return (
    <Box sx={{ py: 1, width: "100%" }}>
      <Grid
        container
        columnSpacing={4}
        sx={{ marginLeft: "0px !important", width: "100% !important" }}
      >
        <Breadcrumb PageName="Add Project" />

        <Grid item xs={6} md={8} sx={{ paddingRight: "32px !important" }}>
          <Box className="custom-card">
            <Divider />
            <Box sx={{ mt: 3 }}>
              <Formik
                initialValues={formValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  // const formData = new FormData();
                  // formData.append("image", imageRef.current.files[0]);
                  setImageError("");
                  setGalleryError("");
                  if (imagePreview === null) {
                    setImageError("Please select an Image");
                    setSubmitting(false);
                    return;
                  }
                  if (selectedFiles.length === 0) {
                    setGalleryError("Please select images");
                    setSubmitting(false);
                    return;
                  }
                  console.log(imagePreview);
                  console.log(urlSelectedFiles);

                  mutate({ ...values, imagePreview, urlSelectedFiles });
                  setTimeout(() => {
                    setSubmitting(false);
                    resetForm();
                    setImagePreview(null);
                    setSelectedFiles([]);
                    setUrlSelectedFiles([]);
                    imageRef.current.value = "";
                    galleryRef.current.value = "";
                  }, 2000);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  resetForm,
                  isSubmitting,
                }) => (
                  <Box
                    component="form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleSubmit();
                    }}
                    sx={{
                      mt: 1,
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Grid container columnSpacing={6} rowSpacing={3}>
                      <CustomFormGroup
                        formlabel="Project Name"
                        star="*"
                        FormField={
                          <CustomTextField
                            label="Project Name"
                            name="projectName"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            values={values}
                            errors={errors}
                            touched={touched}
                            type="text"
                            required={true}
                          />
                        }
                      />
                      <CustomFormGroup
                        formlabel="Project Type"
                        star="*"
                        FormField={
                          <CustomSelectField
                            label="Project Type"
                            name="projectType"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values}
                            errors={errors}
                            touched={touched}
                            dropDown={["Residential", "Apartment", "Building"]}
                          />
                        }
                      />
                      <CustomFormGroup
                        formlabel="Project Category"
                        star="*"
                        FormField={
                          <CustomSelectField
                            label="Project Category"
                            name="projectCategory"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values}
                            errors={errors}
                            touched={touched}
                            dropDown={["Bungalow", "Apartment"]}
                          />
                        }
                      />
                      {/* <CustomFormGroup
                        formlabel="Project Area (in Acres)"
                        star="*"
                        FormField={
                          <CustomTextField
                            label="Project Area"
                            name="projectArea"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            values={values}
                            errors={errors}
                            touched={touched}
                            type="number"
                            required={true}
                            startAdornment={
                              <img
                                src={require("../../Images/square-ruler.png")}
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  marginRight: "12px",
                                }}
                                alt="ruler"
                              />
                            }
                          />
                        }
                      /> */}
                      <CustomFormGroup
                        formlabel="Select Availability"
                        star="*"
                        FormField={
                          <CustomSelectField
                            label="Availability"
                            name="availability"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values}
                            errors={errors}
                            touched={touched}
                            dropDown={[
                              "Ready To Move",
                              "Under Construction",
                              "New Launch",
                            ]}
                          />
                        }
                      />

                      {values.availability.length > 0 ? (
                        <>
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>

                          {/* {values.availability === "Under Construction" ||
                          values.availability === "New Launch" ? (
                            <CustomFormGroup
                              formlabel="Possession"
                              star="*"
                              FormField={
                                <DatePicker
                                  onChange={onDateChange}
                                  value={date}
                                  style={{}}
                                />
                              }
                            />
                          ) : (
                            <></>
                          )} */}

                          <CustomFormGroup
                            formlabel="Towers"
                            star="*"
                            FormField={
                              <CustomTextField
                                label="Towers"
                                name="towers"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                type="text"
                                required={true}
                              />
                            }
                          />
                          <CustomFormGroup
                            formlabel="Floors"
                            star="*"
                            FormField={
                              <CustomTextField
                                label="Floors"
                                name="floors"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                type="text"
                                required={true}
                              />
                            }
                          />
                          {/* <CustomFormGroup
                            formlabel="Project Configuration (BHK)"
                            star="*"
                            FormField={
                              <CustomTextField
                                label="Price Configuration"
                                name="projectConfiguration"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                type="number"
                                required={true}
                              />
                            }
                          /> */}

                          <CustomFormGroup
                            formlabel="Project Area"
                            star="*"
                            FormField={
                              <CustomTextField
                                label="Project Area"
                                name="projectArea"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                type="number"
                                required={true}
                                startAdornment={
                                  <Box sx={{ width: "50%" }}>
                                    <Typography variant="body1">
                                      Sq Ft
                                    </Typography>
                                    {/* <CustomSelectField
                                      // label="Availability"
                                      name="area-unit"
                                      handleChange={handleChange}
                                      handleBlur={handleBlur}
                                      value={values}
                                      errors={errors}
                                      touched={touched}
                                      dropDown={["Sq Ft", "Acres", "Marla"]}
                                    /> */}
                                  </Box>
                                }
                              />
                            }
                          />
                          <CustomFormGroup
                            formlabel="Project URL"
                            star="*"
                            FormField={
                              <CustomTextField
                                label="Project URL"
                                name="project-url"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                type="text"
                                required={true}
                              />
                            }
                          />
                          <CustomFormGroup
                            formlabel="Project RERA"
                            star="*"
                            FormField={
                              <CustomTextField
                                label="Project RERA"
                                name="projectRERA"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                type="text"
                                required={true}
                              />
                            }
                          />

                          <CustomFormGroup
                            formlabel="Price From (In Cr.)"
                            star="*"
                            FormField={
                              <CustomTextField
                                label="Price From"
                                name="priceFrom"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                type="number"
                                step
                                required={true}
                                startAdornment={
                                  <CurrencyRupeeIcon className="currency-icon" />
                                }
                              />
                            }
                          />
                          <CustomFormGroup
                            formlabel="Price To (In Cr.)"
                            star="*"
                            FormField={
                              <CustomTextField
                                label="Price To"
                                name="priceTo"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                type="number"
                                required={true}
                                startAdornment={
                                  <CurrencyRupeeIcon className="currency-icon" />
                                }
                              />
                            }
                          />

                          <CustomFormGroup
                            formlabel="State"
                            star="*"
                            FormField={
                              <CustomTextField
                                label="State"
                                name="state"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                type="text"
                                required={true}
                              />
                            }
                          />
                          <CustomFormGroup
                            formlabel="City"
                            star="*"
                            FormField={
                              <CustomTextField
                                label="City"
                                name="city"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                type="text"
                                required={true}
                              />
                            }
                          />
                          <CustomFormGroup
                            formlabel="Address"
                            multiline
                            star="*"
                            FormField={
                              <CustomTextField
                                label="Address"
                                name="address"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                type="text"
                                multiline
                                required={true}
                              />
                            }
                          />
                          <CustomFormGroup
                            formlabel="Description"
                            multiline
                            star="*"
                            FormField={
                              <CustomTextField
                                label="Description"
                                name="description"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                type="text"
                                multiline
                                required={true}
                              />
                            }
                          />
                        </>
                      ) : (
                        <></>
                      )}

                      <Grid item md={6}></Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "25px",
                        }}
                      >
                        <Button
                          className={
                            !isSubmitting
                              ? "contained-button"
                              : "outlined-button"
                          }
                          disabled={isSubmitting ? true : false}
                          startIcon={!isSubmitting ? <AddHomeIcon /> : null}
                          type="submit"
                          variant="contained"
                          sx={{ mt: 3, mb: 2, justifySelf: "center" }}
                        >
                          {!isSubmitting ? (
                            "Add Project"
                          ) : (
                            <Stack
                              flexDirection="row"
                              sx={{
                                alignItems: "center",
                                gap: 1,
                                fontWeight: 600,
                              }}
                            >
                              <img
                                src={require("../../Images/Pulse-2.gif")}
                                style={{ height: "30px", width: "30px" }}
                                alt="loading..."
                              />
                              <Typography variant="body2" fontWeight={600}>
                                Adding...
                              </Typography>
                            </Stack>
                          )}
                        </Button>

                        <Button
                          className="outlined-button"
                          startIcon={<RestartAltIcon />}
                          type="reset"
                          variant="outlined"
                          onClick={() => {
                            resetForm();
                            setSelectedFiles([]);
                            setImagePreview(null);
                          }}
                          sx={{ mt: 3, mb: 2, justifySelf: "center" }}
                        >
                          Reset
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Formik>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={4} sx={{ paddingRight: "32px !important" }}>
          <Box className="custom-card">
            <Box className="custom-card-header">
              <Typography gutterBottom variant="h6" className="project-title">
                Project Banner Image
              </Typography>
            </Box>
            <Divider />
            <div className="file-input-container">
              <label
                for="fileInput"
                className={!imagePreview ? "file-label" : "Change-Banner-Label"}
              >
                {!imagePreview ? "Choose a file" : <CloseIcon />}
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className={!imagePreview ? "hidden-input" : "Change-Banner-Btn"}
                id="fileInput"
                ref={imageRef}
              />
              {imagePreview && (
                <div style={{ marginTop: "10px" }} className="selected-file">
                  <img
                    src={imagePreview.url}
                    className="prj-image-preview"
                    alt="Image Preview"
                  />
                </div>
              )}
            </div>
          </Box>
          {imageError && (
            <Alert sx={{ mb: 5 }} severity="error">
              {imageError}
            </Alert>
          )}

          <Box className="custom-card">
            <Box className="custom-card-header">
              <Typography gutterBottom variant="h6" className="project-title">
                Project Gallery
              </Typography>
            </Box>
            <Divider />
            <div className="file-input-container">
              <label
                for="imageInput"
                className={
                  !selectedFiles.length > 0
                    ? "file-label-image-preview"
                    : "hidden-input"
                }
              >
                Choose images
              </label>
              <input
                type="file"
                id="imageInput"
                name="prj_gallery"
                accept="image/*"
                multiple
                // className={!selectedFiles ? "hidden-input" : ""}
                className="hidden-input"
                onChange={handleFileChange}
                ref={galleryRef}
              />
              <div
                className={
                  !selectedFiles.length > 0
                    ? "hidden-input"
                    : "image-preview-container"
                }
              >
                {selectedFiles.map((file, index) => (
                  <div key={index} className="image-preview-wrapper">
                    <CloseIcon
                      className="Change-Banner-Label-image-preview"
                      onClick={() => handleRemoveImage(index)}
                    />
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Image ${index}`}
                      className="image-preview"
                    />
                  </div>
                ))}
                <div className="add-more">
                  <label
                    for="imageInput"
                    className={
                      selectedFiles.length > 0
                        ? "file-label-add-more"
                        : "hidden-input"
                    }
                  >
                    <AddPhotoAlternateOutlinedIcon />
                    <div>Add More</div>
                  </label>
                  <input
                    type="file"
                    id="imageInput"
                    name="prj_gallery"
                    accept="image/*"
                    multiple
                    className="hidden-input"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
          </Box>
          {galleryError && (
            <Alert sx={{ mb: 5 }} severity="error">
              {galleryError}
            </Alert>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

// {
/* <Grid container spacing={2}>
                  <Grid item xs={6} md={2} className="custom-from-group">
                    <Typography variant="h6" className="custom-form-label">
                      Country
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Select
                      name="country"
                      options={Country}
                      getOptionLabel={(options) => {
                        return options["name"];
                      }}
                      getOptionValue={(options) => {
                        return options["name"];
                      }}
                      value={selectedCountry}
                      onChange={(item) => {
                        setSelectedCountry(item);
                        setSelectedState([]);
                        setSelectedCity([]);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={2} className="custom-from-group">
                    <Typography variant="h6" className="custom-form-label">
                      State
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Select
                      name="state"
                      options={
                        selectedCountry !== null
                          ? State.filter(
                              (State) =>
                                selectedCountry.isoCode.indexOf(
                                  State.countryCode
                                ) !== -1
                            )
                          : []
                      }
                      getOptionLabel={(options) => {
                        return options["name"];
                      }}
                      getOptionValue={(options) => {
                        return options["name"];
                      }}
                      value={selectedState}
                      onChange={(item) => {
                        setSelectedState(item);
                        setSelectedCity([]);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={2} className="custom-from-group">
                    <Typography variant="h6" className="custom-form-label">
                      City
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Select
                      name="city"
                      options={
                        selectedState !== null && selectedState.length !== 0
                          ? filterCity(selectedState)
                          : []
                      }
                      getOptionLabel={(options) => {
                        return options["name"];
                      }}
                      getOptionValue={(options) => {
                        return options["name"];
                      }}
                      value={selectedCity}
                      onChange={(item) => {
                        setSelectedCity(item);
                      }}
                    />
                  </Grid>
                </Grid> */
// }
// {
/* <input
              type="file"
              id="imageInput"
              name="prj_gallery"
              accept="image/*"
              className={!selectedFiles ? "hidden-input" : "Change-Banner-Btn"}
              multiple
              onChange={handleFileChange}
            /> */
// }
// {
/* <div className="image-preview-container">
              {selectedFiles.map((file, index) => (
                <div key={index} className="image-preview-wrapper">
                  <label
                    for="fileInput"
                    className={
                      // !imagePreview ? "file-label" :
                      "Change-Banner-Label-image-preview"
                    }
                  >
                    <CloseIcon
                      sx={{ fontSize: "15px" }}
                      onClick={() => handleRemoveImage(index)}
                    />
                  </label>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Image ${index}`}
                    className="image-preview"
                  />
                </div>
              ))}
            </div> */
// }
// {
/* <CustomFormGroup
                            formlabel="Area From"
                            star="*"
                            FormField={
                              <CustomTextField
                                label="Area From"
                                name="areaFrom"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                type="number"
                                required={true}
                              />
                            }
                          />
                          <CustomFormGroup
                            formlabel="Area To"
                            star="*"
                            FormField={
                              <CustomTextField
                                label="Area To"
                                name="areaTo"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                values={values}
                                errors={errors}
                                touched={touched}
                                type="number"
                                required={true}
                              />
                            }
                          /> */
// }
