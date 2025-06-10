import { Formik, Field, ErrorMessage, Form } from "formik";
import styles from "./styles.module.css";
import { Towner } from "../../schemas/owner";
import { createOwner } from "../../validations/createValidations";
import { useState } from "react";
import { AlertMessageProps } from "src/common/types";
import UpdateOnActionAlert from "../../components/UpdateOnActionAlert/UpdateOnActionAlert";
import { createOwnerAlert } from "../../common/data";

const initialValues: Towner = {
  location: "",
  name: "",
};

function CreateOwner() {
  const [alert, setAlert] = useState<AlertMessageProps>()

  async function handleSubmit(values: Towner) {
    console.log("submitted!", values);
    window.shaiseAPI.createOwner(values).then((e: string) => {
      if (e === "201, owner created") { setAlert(createOwnerAlert.success) }
      else if (e === "403, owner already exists") { setAlert(createOwnerAlert.error) }
    }

    )
  };


  return (
    <>
      <h1 className={styles.mainHeader}>יצירת אדון</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={createOwner}
        onSubmit={(values: Towner) => {
          handleSubmit(values)
        }}
      >
        <Form noValidate>
          {alert !== undefined && <UpdateOnActionAlert message={alert.message} severity={alert.severity} />}
          <div className={styles.inputContainer}>
            <div>
              <label className={styles.label}>שם אדון</label>
              <Field name="name" className={styles.input} />
              <ErrorMessage
                name="name"
                className={styles.error}
                component={"div"}
              />
            </div>

            <div>
              <label className={styles.label}>מיקום</label>
              <Field name="location" className={styles.input} />
              <ErrorMessage
                name="location"
                className={styles.error}
                component={"div"}
              />
            </div>

            <button className={styles.submitButton} type="submit">
              הכן!
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}
export default CreateOwner;
