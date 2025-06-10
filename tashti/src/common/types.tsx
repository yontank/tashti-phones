import StatusPopup from "../components/StatusPopup/StatusPopup";
import { useState } from "react"
import React from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */

// SCHEMAS FROM ELECTRON PRELOAD //
/**
 * Known Schema for UTP From Backend
 */
export type UTP = {
  utp?: number;
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  PhoneId?: number;
  AronId?: number;
};
/**
 * Known Schema for Aron in backend
 */
export type Aron = {
  id?: number;
  name?: string; // For example, Merkaz Meida
  location?: string; // איפה הקו שלי נופל ב פאנל, באיזה חיבור
  utpNum?: number; // כמה חיבורים יש בפאנל
  concentration?: string; // ריכוז , האותיות הקטנות שיש לפני כל קו
  createdAt?: string;
  updatedAt?: string;
  shirshurFromId?: number;
};
/**
 * Known Schema for Owner in backend
 */
export type Owner = {
  id?: number;
  name?: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
};
/**
 * Known Schema for Phone in backend
 */
export type Phone = {
  lineType?: LineKind | ("modem" | "flexset" | "smart" | "dumb" | "");
  block?: number;
  zakif?: number;
  zug?: number;
  id?: number;
  isOccupied?: boolean;
  updatedAt?: string;
  createdAt?: string;
  lineNumber: string;
  OwnerId?: number;
};

/**
 * ENUMS FOR INFORMATION
 */
/**
 * While we query inside Home.tsx, I want to know what functions run, so instead of using strings or numbers for IDs,
 * I'll use enums.
 */
export enum queryType {
  LINE /** will run when the LINE button is chosen, for following line numbers in the computer */,
  ROLE /** The role of the phone number, is the number owned by logistics? IT? etc. */,
  LOCATION /** Locations of Arons, what numbers the Aron has and etc. */,
  MERKAZIYA /** TX1, i don't know what it'll do right now. */,
}

/**
 * The Type of models of phone types that are used
 *
 * @example Flexset is a phone type that is used at specific places.w
 *
 */
export enum LineKind {
  SMART,
  STUPID,
  FLEXSET,
  NULL,
}
/**
 * Information about what's inside the UTP.
 * is the line free, occupied?
 */
export enum LineStatus {
  OCCUPIED, // There is a line inside the UTP, but someone is using that line.
  FREE, // there is a line inside the UTP, and there's no cable or any recordings that the line is being used, so you can use it for whatever you want
  NULL, // there is no line inide the UTP
}

/**
 * A file that will save all interfaces and types for created reacat components
 * to remove unnecassery code from files
 */

export type ClickableMenuProps = {
  open: boolean;
  setOpen: any;
};

/**
 * @constant title : Header title of the Head of the list
 * @constant icon : Icon for the ehad of the list
 *
 * @constant children : all the children subheaders, returned as an array of titles, and when clicking to whre to go.e
 */
export type NestedListProps = {
  title: string;
  icon: JSX.Element;

  children?: [{ title: string; to: string }];
};

/**
 * After Reviewing a UTP, show us what information is inside that UTP.
 * The types I WANT to use for my frontend type.
 */
export interface AronInfo extends UTP {
  line_status: LineStatus;
  line_number: string; // PHONE NUMBER
  line_type: LineKind;
  role: string; // WHO OWNS THE NUMBER?
}

/**
 * After we entered the number inside the number input and we ask the backend for the reply.
 * this is what I'm expecting to get back from him. if something changes look at this pleae ;)
 */

export interface LineStatusFetchProps extends Phone {
  type: "lineStatus";
  Owner: Owner;
  UTPs: { Aron: Aron }[];
}

export type ChoiceButtonProps = {
  title: string; // the title of the button, AKA what the button does.
  onClick?: (
    a: number
  ) => void /** Merely For nesting, takes the onClick effect from the button and tells it what to do. */;
  id: number /** The id of the button */;
  currentId?: number /** The value of the latest clicked button inside a state. */;
};

export type SignularInputProps = {
  placeholder: string /** Explain what the input should do, what kind of value to enter */;
  onSubmit: () => void;
  value: string;
  setValue: (value: string) => void;
  numbersOnly?: boolean;
  maxLength?: number; // amount of letters that are allowed to be typed inside the input
  inputProp?: any;
  inputRef?: any;
};

export type TripleInput = { first: string; second: string; third: string };

export type TripleInputProps = {
  placeholder: TripleInput;
  onSubmit: () => void;
  value: string;
  setValue: (value: string) => void;
  numbersOnly?: boolean;
  label: TripleInput;
};

export interface SingleAronStatusFetch extends UTP {
  shirshurFromId?: number | null;
  Phone: Phone;
  utpInfo?: UTP
  onImgClick?: () => void;
  prevAronLines?: Phone[];

}

/**
 * The Fetch Information I need from the backend for AronStatus.
 */

export interface AronStatusFetchProps extends Aron {
  type: "aronStatus";
  UTPs: SingleAronStatusFetch[];
}

/**
 * The Popup For AronStatus, gives all the information when reviewing on a UTP.
 * FIXME : What type of schema is this??
 */
export type StatusPopupProps = {
  prevAronLines?: Phone[]
  shirshurFromId?: number | undefined;
  line_number: string;
  utp_location: number;
  lineKind: LineKind;
  owner: string;
  lastUpdated: number | string;
  header: string;
  trigger: JSX.Element;
  lineStatus?: LineStatus;
  utpInfo?: UTP
  AronId?: number
  Phone?: Phone

  onClick?: () => void;
};

/**
 * Inside the index page, when searching for Arons,
 * this is the skeleton that is used to return all Arons that are saved in DB.
 */
export type AronOptionsAutoComplete = {
  id: string;
  name: string;
  location: string;
  utp_num: number;
};

/**
 * Props for Edit Page Popup, for when I need to Edit a Information About a Line
 *
 * @var open if component is inside popup, decide if to open it or not.
 * TODO: returning data like this is bad, we need to make it dynamic for every schema.
 */
export type EditPageProps = {
  open?: boolean; // sometimes will show component inside popup, , state that will choose if to open or not
  handleSubmit?: () => void; //what to run when submitting the form?
  data: LineStatusFetchProps | AronStatusFetchProps | undefined;
  alert: AlertMessageProps | undefined;
  setAlert: React.Dispatch<React.SetStateAction<AlertMessageProps>>;
  setOpenUpdatePopup: React.Dispatch<React.SetStateAction<Boolean>>;
};

export enum UTPStatus {
  DEFAULT,
  DELETE,
  ADD,
  EDIT,
}


export type AlertMessageProps = {
  severity: "success" | "error" | "warning"
  message: string
  intervalRefresh?: number
  refresh?: boolean
}



export interface OwnerStatusFetchProps extends Owner {
  Phones: Phone[]
}

export type BreadProps = {
  open: boolean,
  setOpen: (e: any) => any,
  message: string



}