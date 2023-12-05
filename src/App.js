import React, { useEffect } from "react";

import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import Service from "./Pages/Service/Service";
import PropertySearch from "./Pages/PropertySearch/PropertySearch";
import Register from "./Components/Register/Register";
import LogIn from "./Components/Login/Login";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddProject from "./Pages/AddProject/AddProject";
import EditForm from "./Pages/EditForm/EditForm";
import "./App.css";
import Table3 from "./Components/Project-table/Table-3";
import AddTestimonial from "./Pages/AddTestimonial/AddTestimonial";

const theme = createTheme({
  typography: {
    fontFamily: "Geologica, sans-serif",
  },
});
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Header />}>
                <Route path="/" element={<Hero />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/service" element={<Service />} />
                <Route path="/property-search" element={<PropertySearch />} />
              </Route>

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              >
                <Route path="add-project" element={<AddProject />} />
                <Route path="add-testimonial" element={<AddTestimonial />} />
                <Route path="edit-project" element={<EditForm />} />
                <Route path="project-table" element={<Table3 />} />
              </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<LogIn />} />
            </Routes>
          </Router>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={true} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default App;

// import AuthProvider, { useAuth } from "./context/AuthContext";
// import EnhancedTable from "./Components/Project-table/Table";
// import BasicTable from "./Components/Project-table/BasicTable";
// import Table2Main from "./Components/Project-table/Table-2";
// import users from "./MOCK_DATA.json";
// import { useMemo } from "react";
// {
/* <EnhancedTable /> */
/* <BasicTable data={data} columns={columns} /> */
// }
// const { currentUser, setCurrentUser } = useAuth();
// useEffect(() => {
//   async function checkLogin() {
//     const response = await getLoginCheck();
//     console.log(response.data);

//     if (response.data === "Session found") {
//       console.log(Cookies.get("name"));
//       const name = Cookies.get("name");
//       // setCurrentUser(name);
//     }
//     if (response.data === "Session not found") {
//       // setCurrentUser(null);
//     }
//   }

//   checkLogin();
// }, []);
// useEffect(() => {
//   const { isLoading, isError, data, error } = useQuery(
//     "getLoginCheck",
//     getLoginCheck
//   );

//   if (isLoading) {
//     return (
//       <Alert severity="info" sx={{ mt: 0 }}>
//         Please wait..,
//       </Alert>
//     );
//   }
//   if (!isLoading) {
//     console.log(data.data);
//     if (data.data === "Session found") {
//       // setCurrentUser(data.data);
//     }
//     if (data.data === "Session not found") {
//       // setCurrentUser(null);
//     }
//   }
// }, []);
// const data = useMemo(() => users, []);
//   const columns = [
//     {
//       header: "ID",
//       accessorKey: "id",
//       footer: "ID",
//     },
//     // {
//     //   header: "Name",
//     //   columns: [
//     //     {
//     //       header: "First",
//     //       accessorKey: "first_name",
//     //       footer: "First name",
//     //     },
//     //     {
//     //       header: "Last",
//     //       accessorKey: "last_name",
//     //       footer: "Last name",
//     //     },
//     //   ],
//     // },
//     // {
//     //   header: 'Name',
//     //   accessorFn: row => `${row.first_name} ${row.last_name}`,
//     // },
//     {
//       header: "Project Name",
//       accessorKey: "project_name",
//       footer: "Project Name",
//     },
//     // {
//     //   header: 'Last name',
//     //   accessorKey: 'last_name',
//     //   footer: 'Last name',
//     // },
//     {
//       header: "Email",
//       accessorKey: "email",
//       footer: "Email",
//     },
//     {
//       header: "Gender",
//       accessorKey: "gender",
//       footer: "Gender",
//     },
//     {
//       header: "Date of birth",
//       accessorKey: "dob",
//       footer: "Date of birth",
//       // cell: (info) =>
//       //   Date.fromISO(info.getValue()).toLocaleString(Date.DATE_MED),
//     },
//   ];
