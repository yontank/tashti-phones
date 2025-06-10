import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Aron, AronOptionsAutoComplete, AronStatusFetchProps } from "../../common/types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createAronSchema } from "../../validations/createValidations";
import { Autocomplete, TextField } from "@mui/material";
import config from "forge.config";
import HomePageInput from "src/components/HomePageSingularInput";

const initialValues = {
  name: "",
  utp_num: "",
  concentration: "",
  shirshurFromId: "",
};
type Option = { id: string, label: string }

function CreateAron() {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    window.shaiseAPI.getAronsList().then((e: AronOptionsAutoComplete[]) => e.map(x => ({ id: x.id, label: x.location }))).then((e: Option[]) => setOptions(e))
  }, [])
  
  const [chosenShirShur, setChosenShirShur] = useState<Option>({ label: "פקעריה", id: "1" });

  if (options.length === 0) return <></>
  return (
    <>
      <h1 className={styles.mainHeader}>יצירת ארון</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={createAronSchema}
        onSubmit={() => {
          //TODO: add API to create aron from Preload.tsx
          alert("There's no Create Aron API Yet :( Blame the arab man");

          //TODO: If i get 200, send SUCCESS Alert

          //TODO: If I get 404, Send ERROR Alert
        }}
      >
        {({ values, setFieldValue }) => (
          <Form noValidate>
            <div className={styles.inputContainer}>
              <div>
                <label className={styles.label}>שם הארון</label>
                <Field className={styles.input} name="name" type="text" />
                <ErrorMessage
                  name="name"
                  className={styles.error}
                  component={"div"}
                />
              </div>
              <div>
                <label className={styles.label}>כמות UTP</label>
                <Field className={styles.input} name="utp_num" type="text" />
                <ErrorMessage
                  name="utp_num"
                  className={styles.error}
                  component={"div"}
                />
              </div>
              <div>
                <label className={styles.label}>ריכוז</label>
                <Field
                  className={styles.input}
                  name="concentration"
                  type="text"
                />
                <ErrorMessage
                  name="concentration"
                  className={styles.error}
                  component={"div"}
                />
              </div>
              <div>
                <label className={styles.label}>היכן השירשור</label>

                <Field name="shirshurFromId">
                  {(props: any) => (
                    <Autocomplete
                      {...props.field}
                      // getOptionLabel={(e: Option) => e.label}
                      // onKeyDown={(e) => { e.preventDefault(); }}
                      options={options}

                      onChange={(event, newValue: Option) => {
                        setFieldValue("shirshurFromId", newValue.id);
                        setChosenShirShur(newValue);
                      }}
                      // isOptionEqualToValue={(option: Option, value: Option) => { console.log("option, value", option, value); return option.id === value.id }}
                      value={chosenShirShur.label}
                      renderInput={(params) => (
                        <TextField
                          sx={{ backgroundColor: "white", width: "16em", height: "4em", border: "none", outline: "none", "& fieldset": { border: 'none' }, borderRadius: "2em" }}
                          {...params}
                          {...props.field}
                          type="text"
                          placeholder="שירשור"

                        />
                      )}
                    />
                  )}
                </Field>
                {/* <Field
                   className={styles.input}
                   name="shirshurFromId"
                   type="text"
                 /> */}
                <ErrorMessage
                  name="shirshurFromId"
                  className={styles.error}
                  component={"div"}
                />
              </div>

              <button className={styles.submitButton} type="submit">
                הכן!
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default CreateAron;
