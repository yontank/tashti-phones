import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";

import { useState } from "react";

import { NestedListProps } from "../common/types";

/**
 * @param title string that becomes the tittle of the List Item
 * @param icon MUI Icon so people can have a picture of the ListedItem to understand faster.
 *
 * @param children [{title: string, to: string}] a list of sublists tha are inside of the headlist, the idea for now is that it contains text(ttle) and a to button, so when you click on it the user moves to the correct issue page.
 *
 * @returns A nested list filled with a Header Item with Nested Items
 */

function NestedList(props: NestedListProps) {
  const [open, setOpen] = useState(false);

  /**
   * Using the children props.
   * Nested Items here work like this, get the array and check if it's undefined (can be for development reasons), if an array doesnt exist, dont return anything,
   * if it does, create a lsit item with the build title that was passed and the link location where it needs to be headed.
   *
   * @returns NestedLists with options for the technician to choose (For Example, Find line by location).
   */

  const nestedItems =
    props.children === undefined ? (
      <></>
    ) : (
      //TODO: ADD LINK TO CHILDREN SO U CAN CLICK
      props.children.map((props) => (
        <ListItem sx={{ margin: "0", padding: "0 2em" }}>
          <ListItemButton>
            <ListItemText secondary={props.title} sx={{ textAlign: "right" }} />
          </ListItemButton>
        </ListItem>
      ))
    );

  return (
    <List sx={{ direction: "rtl", margin: "0px -2em" }}>
      <ListItem sx={{ margin: "0", padding: "0 2em" }} onClick={() => setOpen(old => !old)}>
        <ListItemButton>
          <ListItemIcon>{props.icon}</ListItemIcon>
          <ListItemText primary="טלפוניה" sx={{ textAlign: "right" }} />
          {!open ? <ExpandMore /> : <ExpandLess />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout={"auto"} unmountOnExit>
        {nestedItems}
      </Collapse>
    </List>
  );
}

export default NestedList;
