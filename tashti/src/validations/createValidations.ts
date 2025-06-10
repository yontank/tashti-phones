import { ViewKanban } from "@mui/icons-material";
import { HebrewRegex, validMsg } from "../common/data";
import { object, string, number, date, InferType } from "yup";

export const createAronSchema = object({
  name: string()
  .required(validMsg.required)
  .trim()
  .matches(HebrewRegex, validMsg.Hebrew),
  utp_num: number()
    .typeError(validMsg.number)
    .positive(validMsg.positive)
    .required(validMsg.required),
  concentration: string().uppercase().required(validMsg.required),

  shirshurFromId: number()
    .typeError(validMsg.number)
    .positive(validMsg.positive)
    .min(1)
    .required(validMsg.required),
});

export const createPhoneLine = object({
  block: number()
    .typeError(validMsg.number)
    .max(10, "עד הספרה 10")
    .positive(validMsg.positive),
  zakif: number()
    .typeError(validMsg.number)
    .positive(validMsg.positive)
    .max(10, "עד הספרה 10"),
  zug: number()
    .typeError(validMsg.number)
    .positive(validMsg.positive)
    .max(200, "זוג מגיע עד 200"),

  lineNumber: number()
    .typeError(validMsg.number)
    .max(9999, "מספר טלפון לא תקין")
    .positive(validMsg.positive),

  lineType: string()
    .trim()
    .matches(/(stupid)|(smart)|(flexset)|(modem)/),
});

export const createOwner = object({
  name: string().required(validMsg.required).matches(HebrewRegex, validMsg.Hebrew),
  location: string().required(validMsg.required),
});
