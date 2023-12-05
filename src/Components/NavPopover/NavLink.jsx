import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./NavLink.css";

export default function NavLinks({
  id,
  openedPopover,
  popoverAnchor,
  popoverEnter,
  popoverLeave,
  nav,
}) {
  return (
    <Popover
      className="popover-thumb"
      style={{
        borderRadius: 10,
        pointerEvents: "none",
        marginTop: 5,
        overflow: "hidden",
      }}
      id={id}
      open={openedPopover}
      anchorEl={popoverAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <ul
        style={{ pointerEvents: "auto" }}
        onMouseEnter={popoverEnter}
        onMouseLeave={popoverLeave}
      >
        {nav.map((item, i) => (
          <li key={i}>
            {/* <NavigateNextIcon /> */}
            <a href={item.split(" ").join("-").toLowerCase()}>
              <Typography
                variant="body2"
                sx={{ textTransform: "capitalize", color: "black" }}
              >
                {item}
              </Typography>
            </a>
          </li>
        ))}
      </ul>
    </Popover>
  );
}

//"@mui/styles": "^5.14.5",
// PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave }}
// const useStyles = makeStyles((theme) => ({
//   popover: {
//     pointerEvents: "none",
//   },
//   popoverContent: {
//     pointerEvents: "auto",
//   },
// }));
// {
/* <li>
  <a href="/">
    <Typography
      variant="body2"
      sx={{ textTransform: "capitalize", color: "black" }}
    >
      Home
    </Typography>
  </a>
</li>
<li>
  <a href="/">
    <Typography
      variant="body2"
      sx={{ textTransform: "capitalize", color: "black" }}
    >
      Archives
    </Typography>
  </a>
</li> */
// }
