import { HebrewPhoneNames, HebrewUTPInfo } from "./data";
import { LineKind, LineStatus } from "./types";

/**
 * a function that takes a date and returns its date in string format, since i didnt find a JS function that does it for me kappa.
  
 * @param date a Date object to get the [day,month,year] format.
 * @returns a string with the day,month,year 
 */
export function getCurrentDate(date: Date) {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  return day + "/" + month + "/" + year;
}

/**
 *
 * @param value The Current Value of the input after the user pressed on a key.
 * @returns  the updated string that is showed inside the input
 */
export function onLetterChanged(value: string, numbersOnly: boolean = false) {
  /**
   * If the input accepts numbers only, it'll check if the new letter that was added is a number,
   * if it was, then all is goodf and the new value is being sent
   * but if it wasnt and the value has a new letter that was added that WASNT a number, it'll delete it and send the old value.
   *
   */
  if (numbersOnly) {
    const reg = new RegExp("^[0-9]{0,20}$");
    if (reg.test(value)) return value;
    else return value.slice(0, -1);
  }

  return value;
}

/**
 * Since some users don't understand english, a function like this is a must.
 * @param lineKind The type of line we're using, stupid smart etc.
 * @returns the name of the phone in hebrew
 */
export function getHebrewPhoneName(lineKind: LineKind) {
  return HebrewPhoneNames.get(lineKind);
}

/**
 *
 * @param lineStatus returns the state of the utp, is it in use, is it free to take the UTP with its line nad use it?
 * @returns the state of UTP in hebrew.
 */
export function GetHebrewUTPInfo(lineStatus: LineStatus) {
  return HebrewUTPInfo.get(lineStatus);
}

