import { ClickableMenuProps } from "../common/types";

import { ButtonBase } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

/**
 * @author Yehonatan <Avrahimi>So the user</Avrahimi>
 * so the user knows where to click to open the side-bar ( just like in youtube).
 * It;s basically a menu icon wrapped inside a button
 * @param shouldOpen a boolean that opens/closes the drawer [ uses state]
 * @returns A Clickable menu icon
 */

function ClickableMenuIcon({ open, setOpen }: ClickableMenuProps) {
  return (
    <ButtonBase
      sx={{
        borderRadius: "50%",
        padding: "0.4em",
        width: "2.5em",
        height: "2.5em",
      }}
      onClick={() => setOpen(open)}
    >
      <MenuIcon sx={{ cursor: "pointer" }} />
    </ButtonBase>
  );
}

export default ClickableMenuIcon;
