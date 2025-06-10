import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function NotFound() {
  let navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.mainHeader}>מה שחיפשת לא קיים :(</h1>
      <h2 className={styles.secondaryHeader}>
        האם תהיה מעוניין באחת מהאופציות הבאות?
      </h2>
      <div className={styles.btnContainer}>
        <button
          className={styles.greenButton}
          onClick={() => navigate("/createAron")}
        >
          ליצירת ארון חדש
        </button>
        <button
          className={styles.secondButton}
          onClick={() => navigate("/createPhone")}
        >
          יצירת קו חדש
        </button>
        <button
          className={styles.greenButton}
          onClick={() => navigate("/createOwner")}
        >
          יצירת בעלים חדשים
        </button>
      </div>
    </div>
  );
}

export default NotFound;
