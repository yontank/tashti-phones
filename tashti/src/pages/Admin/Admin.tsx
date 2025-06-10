import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import AronShirshur from "./AronShirshur";

export default function Admin() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClick = () => {
    window.shaiseAPI.syncDB().then((message) => {
      console.log(message);
      setMessage(message);
      setOpen(true);
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  window.shaiseAPI.getShirshurToAron(12).then(console.log)

  return (
    <>
      <h1 style={{ padding: "10vh" }}>Admin</h1>
      <div
        style={{
          width: "50vw",
          margin: "auto",
        }}
      >
        <div>
          <h4>Choose Sqlite DB : </h4>
          <input type="file" onChange={(e) => { console.log("TARGET FILE " + e.target.files[0].path) }} />
        </div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Database</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Button variant="contained" onClick={handleClick}>
              Sync database
            </Button>
          </AccordionDetails>
        </Accordion>
      </div>
      <div>
        <AronShirshur />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
    </>
  );
}
