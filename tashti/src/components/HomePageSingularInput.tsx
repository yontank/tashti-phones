import { SignularInputProps } from "../common/types";
import { onLetterChanged } from "../common/utils";

function HomePageInput({
  placeholder,
  inputProp,
  onSubmit,
  value,
  setValue,
  numbersOnly = false,
  maxLength = 100,
  inputRef,
}: SignularInputProps) {
  return (
    <>
      <div style={{ width: "100%", height: "91px" }} ref={inputRef}>
        <input
          {...inputProp}
          style={{
            width: "100%",
            height: "91px",
            borderRadius: "1000px",
            fontFamily: "Heebo",
            fontWeight: "400",
            fontSize: "42px",
            direction: "rtl",
            textAlign: "center",
          }}
          value={value}
          onChange={(e) => {
            setValue(onLetterChanged(e.currentTarget.value, numbersOnly));
          }}
          onSubmit={onSubmit}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") onSubmit();
          // }}
          placeholder={placeholder}
          maxLength={maxLength}
        />
        <img
          src="search-icon.svg"
          style={{
            position: "absolute",
            left: "20px",
            width: "60px",
            bottom: "15px",
            height: "60px",
            cursor: "pointer",
          }}
          onClick={onSubmit}
        />
      </div>
    </>
  );
}

export default HomePageInput;
