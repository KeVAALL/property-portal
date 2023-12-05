import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import { Formik } from "formik";
import { useActionData, useNavigate } from "react-router-dom";
import { getLoginCheck, UserLogin } from "../../Hooks/User";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import { useAuth } from "../../context/AuthContext";
import { CustomFormGroup, CustomTextField } from "../Common/Common";
import { Stack } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LogIn() {
  const navigate = useNavigate();
  // const { setCurrentUser } = useAuth();
  const {
    mutate: loginMutate,
    isSuccess,
    isLoading: loginIsLoading,
  } = UserLogin();
  const notify = () => toast.success("Login Successful");
  const [loginUsernameError, setLoginUsernameError] = React.useState("");
  const [loginPasswordError, setLoginPasswordError] = React.useState("");

  const validationSchema = Yup.object({
    username: Yup.string().required("Name is required"),
    // .min(6, "More than 6 letters"),
    // .matches(
    //   /^[a-zA-Z0-9 ]*$/,
    //   "Project Name can only contain letters, numbers, and a single space"
    // )
    password: Yup.string().required("Password is required"),
    // .min(8, "Password must be at least 8 characters")
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    //   "Password must contain at least one letter and one number"
    // ),
  });

  const formValues = {
    username: "",
    password: "",
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Toaster position="top-center" reverseOrder={false} />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setLoginPasswordError("");
              setLoginUsernameError("");
              loginMutate(values, {
                onSuccess: (data) => {
                  if (data?.data.status === "Login Done") {
                    Cookies.set("name", data.data.name, {
                      domain: "localhost",
                      path: "/",
                      expires: 365,
                    });
                    // setCurrentUser(data.data.name);
                    notify();
                    setTimeout(() => {
                      navigate("/dashboard");
                    }, 3000);
                  }
                  if (data?.data === "User doesn't exist") {
                    setLoginUsernameError(data.data);
                  }
                  if (data?.data === "Incorrect Password") {
                    setLoginPasswordError(data.data);
                  }
                },
              });
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
                sx={{ mt: 1, width: "100%" }}
              >
                <Stack spacing={3}>
                  <CustomFormGroup
                    formlabel="Username"
                    star="*"
                    FormField={
                      <CustomTextField
                        label="Username"
                        name="username"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        values={values}
                        errors={errors}
                        touched={touched}
                        type="text"
                        loginError={loginUsernameError}
                        required={true}
                      />
                    }
                  />
                  <CustomFormGroup
                    formlabel="Password"
                    star="*"
                    FormField={
                      <CustomTextField
                        label="Password"
                        name="password"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        values={values}
                        errors={errors}
                        touched={touched}
                        type="password"
                        loginError={loginPasswordError}
                        required={true}
                      />
                    }
                  />

                  <LoadingButton
                    type="submit"
                    loading={loginIsLoading}
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2 }}
                  >
                    Log In
                  </LoadingButton>
                </Stack>
              </Box>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
