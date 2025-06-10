import { ChoiceButtonProps } from "../common/types";
/**
 *
 * @param props The props the button takes to visualize what it looks like, when it's pressed, its title. etc.
 * @returns A Button for the Home Menu Of The Line page.
 */
function ChoiceButton(props: ChoiceButtonProps) {
  const { id } = props;

  const clicked = id === props.currentId;
  return (
    <div
      style={{
        width: "185px",
        height: "60px",
        borderRadius: "33.48px",
        backgroundColor: clicked ? "#42B240" : "#FFF",
        fontWeight: "400",
        fontFamily: "Jost",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "28.12px",
      }}
      onClick={() => {
        props.onClick?.(id);
      }}
    >
      <p
        style={{
          fontFamily: "Heebo",
          color: clicked ? "#FFF" : "#8F908F",
          fontWeight: "400",
        }}
      >
        {props.title}
      </p>
    </div>
  );
}

export default ChoiceButton;
