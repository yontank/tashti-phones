import React, { useEffect, useState } from "react";
import { TripleInput, TripleInputProps } from "../common/types";
import { onLetterChanged } from "../common/utils";
import ChoiceButton from "./ChoiceButton";

/**
 *
 * @param placeholder placeholder for the three inputs, tells the user what's valid input, saved as an object {first, second, third}
 * @param label the label that's below the input, usually to tell what kind of data to enter.
 * @param onSubmit a function that runs after we've finished with entering everything into our input, so we want to execute the next command into our backend or something
 * @param setValue update the new value inside another file's state.
 *
 * @returns 3 inputs that are saved with a submit button.
 */
function HomePageThreeInput({
  placeholder,
  onSubmit,
  setValue,
  label,
  numbersOnly = true,
}: TripleInputProps) {
  const inputStyle: React.CSSProperties = {
    width: "90%",
    height: "91px",
    borderRadius: "1000px",
    fontFamily: "Heebo",
    fontWeight: "400",
    fontSize: "42px",
    direction: "rtl",
    textAlign: "center",
    margin: "auto",
    display: "block",
    border: "none",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    textAlign: "center",
    color: "white",
    display: "block",
    fontFamily: "Heebo",
    fontWeight: 400,
    fontSize: "31px",
    lineHeight: "45.53px",
  };

  /**
   * Each input has its own state that needs to be taken care of, so this state takes care of every input,
   * the first input, second and so on.
   */
  const [data, setData] = useState<TripleInput>({
    first: "",
    second: "",
    third: "",
  });
  /**
   * This state is being used for updating reasons.
   * After we click on the "submit" button and the HandleSubmit function is ran,
   * we need to update the state of Home.tsx, but since changing states is asynchronous we need to wait for it to update,
   *
   * this is the only way i've found I can "Wait" long enough for the new value to update inside setValue.
   */
  const [loading, setloading] = useState<boolean>(false);

  /**
   * After we click on the "Submit" button, run HandleSubmit, take all the values from the state,
   * send it to the state inside the parent (Home.tsx), and send the signal we've finished updating the values, so we can
   * tell the function to execute what's next after the user finished entering the correct info.
   */
  function handleSubmit() {
    const submitData = data.first + "-" + data.second + "-" + data.third;

    setValue(submitData);
    setloading(true);
  }

  /**
   * As written above, setValue is asyncronous, so i had to wait for it to update before executing the command "onSubmit",
   * since if i didn't do it this way, the value inside Home.tsx state wouldn't have updated and the search query would've sent an empty string.
   * if someone found a better way, be my guest to try it..
   */
  useEffect(() => {
    if (loading) onSubmit();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          justifyContent: "space-between",
          direction: "rtl",
        }}
      >
        <div>
          <input
            style={inputStyle}
            maxLength={2}
            autoFocus
            placeholder={placeholder.first}
            value={data.first}
            onChange={(e) => {
              setData({
                ...data,
                first: onLetterChanged(e.currentTarget.value, numbersOnly),
              });
            }}
          />
          <label style={labelStyle}>{label.first}</label>
        </div>
        <div>
          <input
            style={inputStyle}
            maxLength={2}
            placeholder={placeholder.second}
            value={data.second}
            onChange={(e) => {
              setData({
                ...data,
                second: onLetterChanged(e.currentTarget.value, numbersOnly),
              });
            }}
          />
          <label style={labelStyle}>{label.second}</label>
        </div>
        <div>
          <input
            style={inputStyle}
            maxLength={3}
            placeholder={placeholder.third}
            value={data.third}
            onChange={(e) => {
              setData({
                ...data,
                third: onLetterChanged(e.currentTarget.value, numbersOnly),
              });
            }}
          />
          <label style={labelStyle}>{label.third}</label>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: "2em",
        }}
      >
        <ChoiceButton
          id={0}
          currentId={0}
          title="אישור"
          onClick={() => {
            handleSubmit();
          }}
        />
      </div>
    </>
  );
}

export default HomePageThreeInput;
