import { Aron } from "./common/types";
import { Taron } from "./schemas/aron";
import { TcreatePhone } from "./schemas/phone";

export interface IShaiseAPI {
  getPhoneLine: (line: string) => Promise<T>,
  getLineFromTX1: (zakif: number, block: number, zug: number) => Promise<"404 phone not found" | Phone>,
  getPhoneLines: () => Promise,
  createPhoneLine: (tPhone: TcreatePhone) => Promise<T>,
  createOwner: (tOwner: Towner) => Promise,
  getAronLines: (aronId: number) => Promise<AronStatusFetchProps>,
  editLineNituv: (lineId: number, utps: { AronID: number, utp: number }[]) => Promise<string>,
  ownerSearch: (ownerName: string) => Promise<Owner[]>,
  assignLineToOwner: (lineId: number, ownerId: number) => Promise,
  getAronsList: () => Promise<T>,
  aronSearch: (aronLocation: string) => Promise<T>,
  editUTP: (utpId: number, phoneId: number) => Promise,
  addUTP: (aronId: number, utpNum: number, phoneId: number) => Promise,
  deleteUTP: (utpId: number) => Promise<number>,
  syncDB: () => Promise<string>,
  getShirshurToAron: (aronId: number) => Promise,
  getOwnerLines: (ownerId: number) => Promise<OwnerStatusFetchProps>
  setPhoneOccupation: (phoneId: number, isOccupied: boolean) => Promise<number>,
  purgeLine: (PhoneId: number) => Promise<number | "404 owner not found">,

}

declare global {
  interface Window {
    shaiseAPI: IShaiseAPI
  }
}