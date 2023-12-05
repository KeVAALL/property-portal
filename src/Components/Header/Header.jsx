import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import CallIcon from "@mui/icons-material/Call";
import HeaderLogo from "../../Images/logo1.png";

import { Link, Outlet, useLocation } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import "./Header.css";

function Header(props) {
  const [navBackground, setNavBackground] = React.useState("appBarTransparent");

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };
  const { pathname } = useLocation();

  const drawerLinks = [
    {
      name: "Home",
      link: "",
      icon: <HomeIcon />,
    },
    {
      name: "About Us",
      link: "about-us",
      icon: <InfoIcon />,
    },
    {
      name: "Service",
      link: "service",
      icon: <HomeRepairServiceIcon />,
    },
    {
      name: "Property Search",
      link: "property-search",
      icon: <ManageSearchIcon />,
    },
    {
      name: "Contact",
      link: "contact",
      icon: <CallIcon />,
    },
  ];
  //

  React.useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 80;
      if (show) {
        setNavBackground("appBarSolid");
      } else {
        setNavBackground("appBarTransparent");
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        className={
          navBackground === "appBarTransparent" ? "top-header" : "header-solid"
        }
      >
        <Toolbar>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <LazyLoad>
              <img
                src={HeaderLogo}
                className={
                  navBackground === "appBarTransparent"
                    ? "header-logo"
                    : "header-transit"
                }
                alt="Logo"
              />
            </LazyLoad>
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawerOpen}
            sx={{ color: "black", display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawerOpen}>
            <Box p={2} width={250} role="presentation">
              <List>
                {drawerLinks.map((link, index) => (
                  <ListItem
                    component={Link}
                    to={link.link}
                    key={link.name}
                    style={{ textDecoration: "none", color: "black" }}
                    className={
                      pathname.split("/").join("") === link.link &&
                      "active-link"
                    }
                    onClick={() => {
                      toggleDrawerOpen();
                      console.log(pathname.split("/").join(""));
                    }}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemIcon>{link.icon}</ListItemIcon>
                      <ListItemText primary={link.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          {/* {links.map((item) => (
            <NavLinks
              id={item.options["aria-owns"]}
              openedPopover={item.openedPopover}
              popoverAnchor={item.popoverAnchor}
              popoverEnter={item.options.onMouseEnter}
              popoverLeave={item.options.onMouseLeave}
              nav={item.nav}
            />
          ))} */}

          <nav className="header-social-icons">
            <Stack
              sx={{
                flexDirection: "row",
                flexShrink: 1,
                gap: 5,
                alignItems: "center",
              }}
            >
              <li className="dropitem">
                <a
                  href="/"
                  className={navBackground === "appBarSolid" && "solid-icons"}
                >
                  <span class="title">Home</span>
                </a>
              </li>
              <li>
                <a
                  href="/about-us"
                  className={navBackground === "appBarSolid" && "solid-icons"}
                  // ref={aboutPopoverAnchor}
                  // aria-owns="dashboard-mouse-over-popover"
                  // aria-haspopup={true}
                  // onMouseEnter={aboutPopoverEnter}
                  // onMouseLeave={aboutPopoverLeave}
                >
                  <span class="title">About Us</span>
                </a>
              </li>
              <li>
                <a
                  href="/service"
                  className={navBackground === "appBarSolid" && "solid-icons"}
                >
                  <span class="title">Services</span>
                </a>
              </li>
              <li>
                <a
                  href="/property-search"
                  className={navBackground === "appBarSolid" && "solid-icons"}
                >
                  <span class="title">Properties</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className={navBackground === "appBarSolid" && "solid-icons"}
                >
                  <span class="title">Contact Us</span>
                  <span class="arrow"></span>
                </a>
              </li>
            </Stack>
          </nav>
        </Toolbar>
      </AppBar>

      <Outlet />
    </Box>
  );
}

export default Header;

// <Link
//   // to={link.name.toLowerCase().split(" ").join("-")}
//   style={{ textDecoration: "none", color: "black" }}
//   to={link.link}
//   onClick={toggleDrawerOpen}
// >
// {
/* <Box sx={{ display: { xs: "none", sm: "flex" } }}>
             {navItems.map((item, id) => (
            // <CustomMenu MenuItem={item} key={id} />
            // <Button key={item} sx={{ color: "#000", borderRadius: 30 }}>
            //   {item}
            // </Button>
          ))} 
          </Box> */
// }
// {
/* <a
              // onMouseEnter={handlePopoverOpen}
              //   onClick={
              //     anchorEl === null ? handlePopoverOpen : handlePopoverClose
              //   }
              // href="/"
              >
                {/* <span> */
// }
// <NotificationsNoneIcon />

// {
/* </span> */
// }
//   </a>
//   <a>
//     <DarkModeOutlinedIcon />
//   </a>
//   <a>
//     <ChatBubbleOutlineIcon />
//   </a>
//   <a>
//     <BookmarkBorderIcon />
//   </a>
// const links = [
//   {
//     //   icon: <DashboardCustomizeOutlinedIcon sx={{ fontSize: "20px" }} />,
//     label: "About Us",
//     openedPopover: aboutOpenedPopover,
//     popoverAnchor: aboutPopoverAnchor,
//     options: {
//       ref: aboutPopoverAnchor,
//       "aria-owns": "dashboard-mouse-over-popover",
//       "aria-haspopup": true,
//       onMouseEnter: aboutPopoverEnter,
//       onMouseLeave: aboutPopoverLeave,
//     },
//     nav: ["About Us", "Awards and Certificates", "Events Gallery"],
//   },
//   {
//     //   icon: <HomeOutlinedIcon sx={{ fontSize: "20px" }} />,
//     label: "Commercial",
//     openedPopover: commercialOpenedPopover,
//     popoverAnchor: commercialPopoverAnchor,
//     options: {
//       ref: commercialPopoverAnchor,
//       "aria-owns": "site-mouse-over-popover",
//       "aria-haspopup": true,
//       onMouseEnter: commercialPopoverEnter,
//       onMouseLeave: commercialPopoverLeave,
//     },
//     nav: ["Site Visit 1", "Site Visit 2", "Site Visit 3"],
//   },
//   {
//     //   icon: <SensorOccupiedOutlinedIcon sx={{ fontSize: "20px" }} />,
//     label: "Brokers",
//     openedPopover: purchaseOpenedPopover,
//     popoverAnchor: purchasePopoverAnchor,
//     options: {
//       ref: purchasePopoverAnchor,
//       "aria-owns": "broker-over-popover",
//       "aria-haspopup": true,
//       onMouseEnter: purchasePopoverEnter,
//       onMouseLeave: purchasePopoverLeave,
//     },
//     nav: ["All Brokers", "Add Brokers", "Edit Brokers"],
//   },
// ]
// const navItems = [
//   <BookmarkBorderIcon />,
//   <NotificationsNoneIcon />,
//   <ChatBubbleOutlineIcon />,
//   <DarkModeOutlinedIcon />,
// ];
// const [aboutOpenedPopover, setAboutOpenedPopover] = React.useState(false);
// const [commercialOpenedPopover, setCommercialOpenedPopover] =
//   React.useState(false);
// const [purchaseOpenedPopover, setPurchaseOpenedPopover] =
//   React.useState(false);
// const aboutPopoverAnchor = React.useRef(null);
// const commercialPopoverAnchor = React.useRef(null);
// const purchasePopoverAnchor = React.useRef(null);

// const aboutPopoverEnter = ({ currentTarget }) => {
//   setAboutOpenedPopover(true);
// };
// const aboutPopoverLeave = ({ currentTarget }) => {
//   setAboutOpenedPopover(false);
// };
// const commercialPopoverEnter = ({ currentTarget }) => {
//   setCommercialOpenedPopover(true);
// };
// const commercialPopoverLeave = ({ currentTarget }) => {
//   setCommercialOpenedPopover(false);
// };
// const purchasePopoverEnter = ({ currentTarget }) => {
//   setPurchaseOpenedPopover(true);
// };
// const purchasePopoverLeave = ({ currentTarget }) => {
//   setPurchaseOpenedPopover(false);
// };
