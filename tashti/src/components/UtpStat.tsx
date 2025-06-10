import React, { useReducer } from "react";
import StatusPopup from "./StatusPopup/StatusPopup";
import { LineKind, LineStatus, SingleAronStatusFetch } from "../common/types";
const Center: React.CSSProperties = {
  textAlign: "center",
};


function UtpStat(e: SingleAronStatusFetch) {
  /**
   *
   * @param e Takes aron info as the backend gives us, and we return it the AronInfo We (the frontend) want
   * to make the code fit for us :)
   * @returns e as AronInfo.
   * TODO: Add Owner To Website when we get it from backend.
   */
  function adaptDBInfo(e: SingleAronStatusFetch) {
    const owner = "";
    const line_number = e.Phone.lineNumber;
    console.log("EEEE", e);

    const line_status = e.Phone.isOccupied
      ? LineStatus.OCCUPIED
      : e.Phone.lineNumber === ""
        ? LineStatus.NULL
        : LineStatus.FREE;

    let line_type = LineKind.NULL;

    if (e.Phone.lineType === "dumb") line_type = LineKind.STUPID;
    else if (e.Phone.lineType === "smart") line_type = LineKind.SMART;
    else if (e.Phone.lineType === "flexset") line_type = LineKind.FLEXSET;

    return {
      utp: e.utp,
      phone: {
        role: owner,
        line_number: line_number,
        line_status: line_status,
        line_type: line_type,
      },
    };
  }
  /**
   *
   * @param lineStatus the status of the line, it can be FREE, meaning no one is using it, OCCUPIED, and NULL (nothing inside UTP)
   * @returns the color of which we use for the port image, so the user can easly understand what status the port is in
   */
  function setColorLineStatus(lineStatus: LineStatus) {
    if (lineStatus === LineStatus.OCCUPIED) return "#880808";
    else if (lineStatus === LineStatus.FREE) return "green";
    else return "grey"; // Default -> NULL, nothing inside the port.
  }

  const utp = adaptDBInfo(e);

  return (
    <StatusPopup
      utpInfo={e.utpInfo}
      shirshurFromId={e.shirshurFromId}
      onClick={e.onImgClick}
      header={`סטטוס קו`}
      line_number={utp.phone.line_number}
      lastUpdated={"1/5/22"}
      lineKind={utp.phone.line_type}
      lineStatus={utp.phone.line_status}
      owner={utp.phone.role}
      utp_location={utp.utp}
      prevAronLines={e.prevAronLines}
      AronId={e.AronId}
      Phone={e.Phone}

      trigger={
        <img
          src="port.png"
          width={40}
          draggable={false}
          style={{
            ...Center,
            backgroundColor: setColorLineStatus(utp.phone.line_status),
            borderRadius: "5px",
            cursor: "pointer",
          }}
        />
      }
    />
  );
}
export default UtpStat;
