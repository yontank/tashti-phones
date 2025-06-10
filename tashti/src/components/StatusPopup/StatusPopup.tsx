import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { nanoid } from "nanoid";
import {
  StatusPopupProps,
  UTPStatus,
  AronStatusFetchProps,
  LineStatus,
  UTP,
  SingleAronStatusFetch,
  Phone,
} from "../../common/types";
import { useState, useEffect, useContext, useReducer } from "react";
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import { getHebrewPhoneName } from "../../common/utils";
import styles from "./styles.module.css";
import { Autocomplete, TextField, Tooltip } from "@mui/material";
import { Context } from "../../pages/Aron/AronStatus"
import { UTPAddAlert, UTPRemoveAlert } from "../../common/data";

/**
 * Right now it's being only used for AronInfo Status, to show the Status of lines,
 * TODO: Add Buttons to tell the user if he wants to commmit changes to the UTP,
 * For Example, give this line an owner, make the line "Free" again, etc.
 *
 * @returns A popup that shows information when its needed.
 */

function StatusPopup(props: StatusPopupProps) {

  const [popupState, setPopupState] = useState<UTPStatus>(UTPStatus.DEFAULT);
  const [line, setLine] = useState<string>("")
  const context = useContext(Context)
  const setAlert = context.alert
  const [data, setData] = context.data
  const [purge, setPurge] = useState<boolean>(false);
  const [used, setUsed] = useState<boolean>(props.Phone.isOccupied ?? false);
  /**
   * The Default state of the popup, will show different information about the UTP and will give us more information about it Uw
   */

  const infoTab = () => (
    <div style={{ width: "12.5em" }}>
      {/* <h1>{props.header}</h1> */}
      <table style={{ width: "100%", direction: "rtl", textAlign: "right" }}>
        <tr>
          <th>מספר:</th>
          <td>{props.line_number}</td>
        </tr>
        <tr>
          <th>utp id:</th>
          <td>{props.utp_location}</td>
        </tr>
        <tr>
          <th>סוג קו:</th>
          <td>{getHebrewPhoneName(props.lineKind)}</td>
        </tr>

        <tr>
          <th>קו שייך:</th>
          <td>{props.owner}</td>
        </tr>
        <tr>
          <th>קו שייך:</th>
          <td>{props.owner}</td>
        </tr>

        <tr>
          <th>עודכן</th>
          <td>{props.lastUpdated}</td>
        </tr>
      </table>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        {props.lineStatus !== LineStatus.NULL ? (
          <>
            <button
              className={styles.deleteButton}
              onClick={() => setPopupState(UTPStatus.DELETE)}
            >
              מחק
            </button>
            <button
              className={styles.editButton}
              onClick={() => {
                setPopupState(UTPStatus.EDIT);
              }}
            >
              עדכן
            </button>
          </>
        ) : (
          <button
            className={styles.addButton}
            onClick={() => {
              setPopupState(UTPStatus.ADD);
            }}
          >
            הוסף
          </button>
        )}
      </div>
    </div>
  );


  function handleSubmit() {

    if (popupState === UTPStatus.ADD) {
      console.log("ADDED", props);
      const lineId = props.prevAronLines.find(e => e.lineNumber === line)
      window.shaiseAPI.addUTP(props.AronId, props.utp_location, lineId.id)
        .then((e: any) => { setAlert({ ...UTPAddAlert.success, refresh: true }); console.log("WIN", e) })
        .catch((e: any) => { setAlert(UTPAddAlert.error); console.log("ERR", e) })
    } else if (popupState === UTPStatus.EDIT) {
      window.shaiseAPI.setPhoneOccupation(props.Phone.id, used)
        .then(() => setAlert({ ...UTPRemoveAlert.success, refresh: true }))
        .catch(() => setAlert(UTPRemoveAlert.warning))

    } else if (popupState === UTPStatus.DELETE) {
      if (purge)
        window.shaiseAPI.purgeLine(props.Phone.id).then(() => setAlert({ ...UTPRemoveAlert.success, refresh: true }))
      else
        window.shaiseAPI.deleteUTP(props.utpInfo.id).then(() => setAlert({ ...UTPRemoveAlert.success, refresh: true }));
    } else alert("how the fuck did u get here?");
  };
  const deletePopup = () => (
    <div style={{ width: "12.5em" }}>
      <h4>שינויים לקו</h4>

      <input type="checkbox" onChange={() => setPurge(old => !old)} checked={purge} />
      <label>מחיקת כל השירשור?</label>
      <br />
      <div className={styles.btnContainer}>
        <button className={styles.addButton} onClick={handleSubmit}>
          כן
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => setPopupState(UTPStatus.DEFAULT)}
        >
          לא
        </button>
      </div>
    </div>
  );

  const editPopup = () => (
    <div style={{ width: "12.5em" }}>
      <h4>שינוי פרטי הקו</h4>

      <input type="checkbox" onChange={() => setUsed(old => !old)} checked={used} />
      <label>סימון הקו כמשומש?</label>
      <br />
      <div className={styles.btnContainer}>
        <button
          className={styles.deleteButton}
          onClick={() => setPopupState(UTPStatus.DEFAULT)}
        >
          לא
        </button>
        <button
          className={styles.editButton}
          onClick={() => handleSubmit()}
        >
          בצע
        </button>
      </div>
    </div>
  )

  const addPopup = () => (
    <div style={{ width: "12.5em" }}>
      <h4 className={styles.mainHeader}>הוספת קו לארון</h4>
      <p className={styles.subHeader}>איזה קו נוסיף?</p>
      <Tooltip title={"הקווים שתוכל לבחור מכאן באים מהארון הקודם,שמשורשר אליו אם הארון לא משורשר מארון, תקבל את הקווים מהמרכזייה"}>
        <InfoSharpIcon style={{ position: "absolute", top: "0.25em", right: "0.25em" }} />
      </Tooltip>
      {props.prevAronLines !== undefined &&
        <Autocomplete
          autoComplete
          disablePortal
          autoSelect
          openOnFocus
          autoHighlight
          options={props.prevAronLines}
          filterOptions={(x) => x.filter((e) => e.lineNumber.includes(line))}
          getOptionLabel={(e) => { return e.lineNumber }}
          onChange={(_, v) => setLine(v!.lineNumber)}
          renderInput={(params) => (
            // <<input {...params.inputProps} />>
            <div ref={params.InputProps.ref}>
              <input type="text" {...params.inputProps} />
            </div>
          )}
        />}
      <div className={styles.btnContainer}>
        <button
          className={styles.addButton}
          onClick={() => handleSubmit()}
        >
          כן
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => setPopupState(UTPStatus.DEFAULT)}
        >
          לא
        </button>
      </div>

    </div>
  );

  function renderUTPPopup(): JSX.Element {
    if (popupState === UTPStatus.DEFAULT) return infoTab();
    else if (popupState === UTPStatus.DELETE) return deletePopup();
    else if (popupState === UTPStatus.EDIT) return editPopup();
    else if (popupState === UTPStatus.ADD) return addPopup();
  }


  return (
    <Popup
      trigger={props.trigger}
      position={"bottom left"}
      arrow
      onClose={() => setPopupState(UTPStatus.DEFAULT)}
    >
      {renderUTPPopup()}
    </Popup>
  );
}

export default StatusPopup;
