import { Autocomplete } from "@mui/material";
import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import styles from "./styles.module.css";
import { ArrowDownward, FolderCopyOutlined } from "@mui/icons-material";
import {
  AlertMessageProps,
  Aron,
  AronOptionsAutoComplete,
  AronStatusFetchProps,
  EditPageProps,
  LineStatusFetchProps,
  Owner,
} from "../../common/types";
import UpdateOnActionAlert from "../UpdateOnActionAlert/UpdateOnActionAlert";
import { changeLineAlert } from "../../common/data";
type shirshur = {
  lineNumber: string,
  owner: string,
  lineType: string,
  name: string,
  // shirshurUTP: { id: number }[]
  shirshurUTP: any
}

const phones = ["modem", "flexset", "smart", "stupid"]
function EditPhoneInfo(props: EditPageProps) {
  const [options, setOptions] = useState<AronOptionsAutoComplete[]>([]);
  const [ownerOptions, setOwnerOptions] = useState<Owner[]>([]);
  const [submitValues, setSubmitValues] = useState<shirshur>({
    lineNumber: "",
    owner: "",
    lineType: "",
    name: "",

    shirshurUTP: [],
  });
  const [shirshur, setShirshur] = useState([]); // if its empty, it must not have been called.
  useEffect(() => {
    window.shaiseAPI
      .getAronsList()
      .then((e: AronOptionsAutoComplete[]) => setOptions(e));

    window.shaiseAPI.ownerSearch("").then((e) => setOwnerOptions(e));
  }, []);

  useEffect(() => {
    if (props.data.type === "lineStatus") {
      const { lineNumber, lineType, Owner, }: LineStatusFetchProps = props.data
      const ownerName = Owner != null ? Owner.name : ""
      const LT = (lineType) !== null ? lineType.toString() : "";

      setSubmitValues((old) => ({ ...old, lineNumber: lineNumber, owner: ownerName, lineType: LT }))
    }
  }, [])

  function checkForShirshur() {
    const chosenAron: any = options.find(e => { return e.location === submitValues.name })
    console.log("chosen aron", chosenAron, "chosen ID", submitValues.name)
    // options.forEach(e => console.log("Options", e))
    window.shaiseAPI.getShirshurToAron(chosenAron.id)
      .then((e: AronOptionsAutoComplete[]) => { setShirshur(e) });


  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name, id } = e.target;
    console.log("IN FORM", value, name, id)
    if (name === "ShirshurUTP") {
      /** Specifically For ShirshurUTP,  */
      setSubmitValues((old) => ({
        ...old,
        shirshurUTP: { ...old.shirshurUTP, [id]: value },
      }));
    } /** Specifically for any other input text */ else
      setSubmitValues((old) => ({ ...old, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent,
    data: LineStatusFetchProps | AronStatusFetchProps
  ) {
    e.preventDefault();
    if (shirshur.length == 0) {
      checkForShirshur();
      return;
    }

    if (data.type === "lineStatus") {

      const shirshurArray = Object.keys(submitValues.shirshurUTP).map((key) => ({ AronID: parseInt(key), utp: parseInt(submitValues.shirshurUTP[key]/*  */) }))

      /** No API to change Line's Type, Intended? */



      /** connecting line to owner, if chosen */
      const { owner } = submitValues
      if (owner.length != 0) {
        window.shaiseAPI.ownerSearch(submitValues.owner)
          .then((owner: Owner[]) => { console.log("GAYS FIRST", owner), window.shaiseAPI.assignLineToOwner(data.id, owner[0].id) })
          .then(e => console.log("GAYS", e))
          .catch(e => console.log("GAYS LOG" + e))
      }

      window.shaiseAPI.editLineNituv(data.id, shirshurArray)
        .then((e) => {
          console.log("ALERT AA" , e)
          if (e === "201, nituv edited"){
            setInterval(() => props.setAlert(changeLineAlert.success), 1500)
            props.setOpenUpdatePopup(false)
          }
          else
            props.setAlert(changeLineAlert.warning)
        }
        )
        .catch(() => props.setAlert(changeLineAlert.warning))
    }
    else { }


    console.log("FINAL DATA PS", submitValues)
    return;
  }

  const shirshurInput = () => {
    console.log("SHIRSHUR", shirshur)
    return shirshur.map((shirshur, i, array) => (
      <div className={styles.Container}>
        <div className={styles.shirshurContainer}>
          <label className={styles.shirshurLabel}>
            {shirshur.location + " - " + shirshur.name}
          </label>
          <input
            className={styles.shirshurInput}
            placeholder="UTP"
            name={"ShirshurUTP"}
            id={shirshur.id}
            onChange={handleChange}
          />
        </div>
        {(i + 1 != array.length) && <ArrowDownward />}
      </div>
    ));
  };



  return (<>
    <div className={styles.outDiv}>
      {props.alert !== undefined && <UpdateOnActionAlert message={props.alert.message} severity={props.alert.severity} />}
      <h1 className={styles.title}>שינוי פרטי קו</h1>

      <div className={styles.inDiv}>
        <form
          onSubmit={(e) => handleSubmit(e, props.data)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>פרטי הקו</h2>
          <label className={styles.labelStyle}>
            מספר קו
            <input
              type="number"
              onChange={handleChange}
              name="lineNumber"
              className={styles.inputStyle}
              value={
                props.data.type === "lineStatus"
                  ? props.data.lineNumber
                  : submitValues.lineNumber
              }
              readOnly={props.data.type === "lineStatus"}
            // onKeyDown={(e) =>
            // e.key === "Enter" && refillNumberInfo(data.line)
            // }
            />
          </label>
          {/* <label className={styles.labelStyle}>
            סוג קו:
            <Autocomplete
              autoComplete
              disablePortal
              onSelect={handleChange}
              autoSelect
              openOnFocus
              autoHighlight
              options={phones}
              onInputChange={(event, newInputValue) => {
                setSubmitValues((old) => ({ ...old, lineType: newInputValue }));
              }}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input
                    type="text"
                    name="lineType"
                    onChange={handleChange}
                    {...params.inputProps}
                    className={styles.inputStyle}
                    value={submitValues.lineType}
                  />
                </div>
              )}
            />
          </label> */}
          <label className={styles.labelStyle}>
            בעל תפקיד
            {/* <input
              type="text"
              onChange={handleChange}
              name="owner"
              className={styles.inputStyle}
              value={data.owner}
            /> */}
            <Autocomplete
              autoComplete
              disablePortal
              onSelect={handleChange}
              autoSelect
              openOnFocus
              autoHighlight
              options={ownerOptions}
              getOptionLabel={(e) => e.name}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input
                    type="text"
                    name="owner"
                    onChange={handleChange}
                    {...params.inputProps}
                    className={styles.inputStyle}
                  />
                </div>
              )}
            />
          </label>

          <br />

          {/*  */}
          <h2>שירשור הארון</h2>
          {shirshurInput()}
          {shirshur.length == 0 &&
            (<div>
              <div className={styles.aronDiv}>
                <label className={styles.aronDivLabel}>שם ארון </label>
                <Autocomplete
                  autoComplete
                  disablePortal
                  onSelect={handleChange}
                  autoSelect
                  openOnFocus
                  autoHighlight
                  options={options}
                  getOptionLabel={(e: AronOptionsAutoComplete) => e.location}
                  renderOption={(props, option) => {
                    return (
                      <li {...props}>
                        {option.location + " | " + option.name ?? ""}
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        {...params.inputProps}
                        className={styles.aronDivAronInput}
                      />
                    </div>
                  )}
                />
              </div>
            </div>)
          }

          <button type="submit" className={styles.submitButton}>
            עדכון
          </button>
        </form>
      </div>
    </div></>
  );
}

export default EditPhoneInfo;
