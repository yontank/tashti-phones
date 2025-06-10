/**
 * This file should be used to save data of configuration of different parts of the frontend developement,
 * we wouldn't want a huge fucking array of component settings, do we? :)
 */

import { LineKind, LineStatus, TripleInput } from "./types";

export const merkaziyaConfig: { label: TripleInput; placeholder: TripleInput } =
{
  label: { first: "זקיף", second: "בלוק", third: "זוג" },
  placeholder: { first: "1", second: "5", third: "22" },
};

export const lineConfig: {
  placeholder: string;
  numbersOnly: boolean;
  maxLength?: number;
} = {
  placeholder: "תרשום מספר, לדוגמה 6921",
  numbersOnly: true,
  maxLength: 4,
};
export const locationConfig: {
  placeholder: string;
  numbersOnly: boolean;
  maxLength?: number;
} = {
  placeholder: "תרשום מיקום, לדוגמה מרכז מידע",
  numbersOnly: false,
};
export const roleConfig: {
  placeholder: string;
  numbersOnly: boolean;
  maxLength?: number;
} = {
  placeholder: "רשום תפקיד, למשל מוקד המוקדים",
  numbersOnly: false,
};
/**
 * TODO: Don't show those files for all the world to see.. fix it!
 */
export const HebrewPhoneNames = new Map<LineKind, string>();
HebrewPhoneNames.set(LineKind.SMART, "חכם");
HebrewPhoneNames.set(LineKind.STUPID, "טיפש");
HebrewPhoneNames.set(LineKind.FLEXSET, "פלקסט");
HebrewPhoneNames.set(LineKind.NULL, "");

export const HebrewUTPInfo = new Map<LineStatus, string>();
HebrewUTPInfo.set(LineStatus.FREE, "פנוי");
HebrewUTPInfo.set(LineStatus.OCCUPIED, "תפוס");
HebrewUTPInfo.set(LineStatus.NULL, "ריק");


export const validMsg = {
  required: 'שדה חובה',
  number: 'רק מספרים',
  positive: 'מספר חיובי',
  negative: 'מספר שלילי',
  Hebrew: 'לרשום בעברית'


}

export const HebrewRegex = /^[\u0590-\u05fe ]+$/i

export type AlertProps = {
  success?: { severity: ("success" | "warning" | "error"), message: string }
  warning?: { severity: ("success" | "warning" | "error"), message: string }
  error?: { severity: ("success" | "warning" | "error"), message: string }
}

export const lineType = [{ label: "dumb", type: "טיפש" }, { label: "smart", type: "חכם" }, { label: "flexset", type: "פלקסט" }, { label: "modem", type: "מודם" },]

export const UTPRemoveAlert: AlertProps = { success: { severity: "success", message: "הקו נמחק בהצלחה מהנקודה!" }, error: { severity: "warning", message: "הייתה בעייה עם מחיקת הקו מהנקודה." } }
export const UTPAddAlert: AlertProps = { success: { severity: "success", message: "הקו הוסף בהצלחה לנקודה" }, error: { severity: "warning", message: "הייתה בעייה עם הוספת הקו" } }

export const createLineAlert: AlertProps = {
  success: {
    severity: "success",
    message: "הקו הוסף בהצלחה למערכת"
  },
  error: {
    severity: "error",
    message: "הייתה בעיה עם הוספת הקו, יכול להיות שהקו קיים?"
  }
}

export const createOwnerAlert: AlertProps = {
  success: {
    severity: "success",
    message: "האדון הוסף בהצלחה למערכת"
  },
  error: {
    severity: "error",
    message: "הייתה בעיה עם הוספת האדון, יכול להיות שהקו קיים?"
  }
}

export const changeLineAlert: AlertProps = {
  success: {
    severity: "success",
    message: "השינויים התקבלו בהצלחה"
  },
  warning: {
    severity: "warning",
    message: "היו בעיות עם השינויים"
  }
}