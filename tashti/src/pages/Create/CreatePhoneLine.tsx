import React, { useState } from "react";
import styles from "./styles.module.css";
import { Formik, Form, Field, ErrorMessage, FieldArrayConfig } from "formik";
import { TcreatePhone } from "../../schemas/phone";
import HomePageThreeInput from "../../components/HomePageThreeInput";
import { merkaziyaConfig, HebrewPhoneNames, createLineAlert, AlertProps, } from "../../common/data";
import { createPhoneLine } from "../../validations/createValidations";
import { Autocomplete, TextField } from "@mui/material";
import UpdateOnActionAlert from "../../components/UpdateOnActionAlert/UpdateOnActionAlert";
import { AlertMessageProps } from "src/common/types";

const initialValues: TcreatePhone = {
  block: 0,
  lineNumber: "",
  lineType: "",
  zakif: 0,
  zug: 0,
};
const lineType = ["stupid", "smart", "flexset", "modem"]


function CreatePhoneLine() {
  const [alert, setAlert] = useState<{ severity: "success" | "error" | "warning", message: string }>();
  async function handleSubmit(values: TcreatePhone) {
    const abc = await window.shaiseAPI.createPhoneLine(values).then(res => {
      if (res === "201, phone created") setAlert(createLineAlert.success)
      else if (res === "403, phone already exists") setAlert(createLineAlert.error)
    })
  }


  return (
    <>
      <h1 className={styles.mainHeader}>יצירת קו</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={createPhoneLine}
        onSubmit={(values: TcreatePhone) => {
          handleSubmit(values)
        }}
      >{({ values, handleChange }) => (

        <Form noValidate>
          {alert !== undefined && <UpdateOnActionAlert message={alert.message} severity={alert.severity} refresh={true} intervalRefresh={1000} />}
          <div className={styles.inputContainer}>
            <div className={styles.threeInputContainer}>
              <div className={styles.threeInputDiv}>
                <label className={styles.threeInputLabel}>זקיף </label>
                <Field name="zakif" className={styles.threeInput} />
                <ErrorMessage
                  name="zakif"
                  className={styles.error}
                  component={"div"}
                />
              </div>
              <div className={styles.threeInputDiv}>
                <label className={styles.threeInputLabel}>בלוק </label>
                <Field name="block" className={styles.threeInput} />
                <ErrorMessage
                  name="block"
                  className={styles.error}
                  component={"div"}
                />
              </div>
              <div className={styles.threeInputDiv}>
                <label className={styles.threeInputLabel}>זוג </label>
                <Field name="zug" className={styles.threeInput} />
                <ErrorMessage
                  name="zug"
                  className={styles.error}
                  component={"div"}
                />
              </div>
            </div>
            <div>
              <label className={styles.label}>מספר קו</label>
              <Field name="lineNumber" className={styles.input} />
              <ErrorMessage
                name="lineNumber"
                className={styles.error}
                component={"div"}
              />
            </div>
            <div>
              <label className={styles.label}>סוג קו</label>
              <Field name="lineType">
                {(props: any) => (
                  <Autocomplete
                    {...props.field}
                    onKeyDown={(e) => { e.preventDefault(); }}
                    options={lineType}
                    // getOptionLabel={(option: { label: string, type: string }) => option.type}
                    onChange={(event, newValue) => {
                      props.form.setFieldValue("lineType", newValue);
                    }}
                    value={values.lineType ?? null}
                    renderInput={(params) => (
                      <TextField
                        sx={{ backgroundColor: "white", width: "16em", height: "4em", border: "none", outline: "none", "& fieldset": { border: 'none' }, borderRadius: "2em" }}
                        {...params}
                        {...props.field}
                        type="text"
                        placeholder="lineType"

                      />
                    )}
                  />
                )}
              </Field>

              <ErrorMessage
                name="lineType"
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
export default CreatePhoneLine;
