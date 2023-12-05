import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddHomeIcon from "@mui/icons-material/AddHome";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  CustomFormGroup,
  CustomSelectField,
  CustomTextField,
} from "../../Components/Common/Common";
import { Alert } from "@mui/material";
import { AddTestimonialData } from "../../Hooks/User";

export default function AddTestimonial() {
  const imageRef = useRef();
  const [imageError, setImageError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const { mutate } = AddTestimonialData();

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

  const validationSchema = Yup.object({
    clientName: Yup.string()
      .matches(
        /^[a-zA-Z0-9 ]*$/,
        "Project Name can only contain letters, numbers, and a single space"
      )
      .required("Project Name is required"),
    role: Yup.string().required("Role is required"),
    company: Yup.string().required("Company is required"),
    ratings: Yup.number(),
    description: Yup.string(),
  });

  const formValues = {
    clientName: "",
    role: "",
    company: "",
    ratings: "",
    description: "",
  };

  return (
    <Box sx={{ py: 1, width: "100%" }}>
      <Grid
        container
        columnSpacing={4}
        sx={{ marginLeft: "0px !important", width: "100% !important" }}
      >
        <Breadcrumb PageName="Add Testimonials" />

        <Grid item xs={6} md={8} sx={{ paddingRight: "32px !important" }}>
          <Box className="custom-card">
            <Divider />
            <Box sx={{ mt: 3 }}>
              <Formik
                initialValues={formValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setImageError("");
                  if (imagePreview === null) {
                    setImageError("Please select an Image");
                    setSubmitting(false);
                    return;
                  }
                  mutate({ ...values, imagePreview });
                  setTimeout(() => {
                    setSubmitting(false);
                    resetForm();
                    setImagePreview(null);

                    imageRef.current.value = "";
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
                        formlabel="Client Name"
                        star="*"
                        FormField={
                          <CustomTextField
                            label="Client Name"
                            name="clientName"
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
                        formlabel="Role"
                        star="*"
                        FormField={
                          <CustomTextField
                            label="Role"
                            name="role"
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
                        formlabel="Company"
                        star="*"
                        FormField={
                          <CustomTextField
                            label="Company"
                            name="company"
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
                        formlabel="Rating"
                        star="*"
                        FormField={
                          <CustomSelectField
                            label="Rating"
                            name="ratings"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            value={values}
                            errors={errors}
                            touched={touched}
                            dropDown={["1", "2", "3", "4", "5"]}
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
                            "Add Review"
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
                Project Client Image
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
                    alt="preview"
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
        </Grid>
      </Grid>
    </Box>
  );
}
