import React, { useEffect, useReducer, useState } from "react";
import { AlertMessageProps, Aron, AronStatusFetchProps, LineKind, Phone, SingleAronStatusFetch } from "../../common/types";

import { useParams } from "react-router-dom";
import UtpStat from "../../components/UtpStat";
import NotFound from "../404/404";
import UpdateOnActionAlert from "../../components/UpdateOnActionAlert/UpdateOnActionAlert";



const Center: React.CSSProperties = {
  textAlign: "center",
};

const UTPGridLayout: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(calc(25 + 4), 40px)",

  // backgroundColor: "skyblue",
  justifyItems: "center",
};

export const Context = React.createContext({ alert: (a: any) => { }, data: [] })
/**
 * Shows a specific Aron with all of its values, so when a user wants to see all the status of a said Aron,
 * he can see the lines that are inside the aron, if they're occupied, change its values, etc.
 *
 * TODO: Add POST Requests to play with the data.
 * @returns Aron with all of its UTPs, and each of its states, if its free, occupied, etc.
 */
function AronStatus() {
  /**
   * A State that Data of all the UTPs of the said Aron.
   */
  const [data, setData] = useState<AronStatusFetchProps | undefined>(undefined);
  const params = useParams();
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [prevAronLines, setPrevAronLines] = useState<Phone[] | undefined>(undefined)
  const [alert, setAlert] = useState<AlertMessageProps | undefined>(undefined);

  useEffect(() => {
    window.shaiseAPI
      .getAronLines(parseInt(params.aron))
      .then((e: AronStatusFetchProps) => {
        setData({ ...e, type: "aronStatus" })
        console.log("YOO WE GOT A NEW DATA STATE", data)

      });
  }, [alert]);
  //TODO: Add option when shirshur doesn't exist (Meaning it's straight from TX1.)
  console.log("YOO WE GOT A NEW DATA STATE2", data)
  useEffect(() => {
    if (data === undefined) return;
    if (data.shirshurFromId == null) {
      window.shaiseAPI.getPhoneLines().then((e: Phone[]) => setPrevAronLines(e))
    }
    else window.shaiseAPI.getAronLines(data.shirshurFromId).then((e: AronStatusFetchProps) => setPrevAronLines(e.UTPs.map(e => e.Phone)))
  }, [data])

  if (data === undefined) return "Loading";
  if (error) return <NotFound />;


  /**
   * Calculats the UTP Index number, And tells you in what row and column it needs to be placed.
   *
   * @param id The ID OF The UTP,For example, UTP1, UTP 5, etc.
   * @returns {index : index, row: row, column, column}
   * Where Row is where to place the UTP, (for example, if its utp 24, it needs to be in ROW 1, but if its UTP 26, it needs to be in row 2)
   * Where column is where to place the inside the column space,
   *
   * In the end, this tries to mimic how UTPs look like in the real life, using Grid Layout.
   */
  function utpCoordinates(id: number) {
    const index = id - 1;
    const row = Math.floor(index / 25) + 1;
    let column = (index % 25) + 1;
    column += Math.floor((index % 25) / 5);
    return { row: row, column: column };
  }
  /**
   * Get all the UTPS from the state,
   * Since we only get from our backend server ports that have lines inside of them, and are not empty, i want to know specifically what ports are open and what  ports are closed so later when i find ports that are NOT inside this list, i can automatically realize they are empty.
   */
  const filledUtps = data.UTPs.map((e, i) => ({ utp: e.utp, index: i }));
  const UTP_AMOUNT = data.utpNum === null ? 100 : data.utpNum;

  /**
   *
   * @param utp the number of the UTP
   * @returns a default way to see UTPs that are completly empty from lines inside of them.
   */
  const emptyUTP = (utp: number) => (
    <UtpStat
      prevAronLines={prevAronLines}
      shirshurFromId={data.shirshurFromId}
      AronId={data.id}
      Phone={{
        isOccupied: false,
        lineNumber: "",
        lineType: "",
      }}
      utp={utp}
      onImgClick={() =>
        setPopup((old) => {
          return !old;
        })
      }
    />
  );

  /**
   * Calculates every UTP into a grid, and decides what location every, UTP is in,
   * when we find where in what row \ column we want to put said UTP, and in what style,
   *
   * Check if the UTP Is available from our database, if it is, then set its value thatever was written,
   * if it wasn't, then set a default empty UTP image for it.
   *
   */
  const utps = [...Array(UTP_AMOUNT).keys()].map((utp) => {
    utp++; // Arrays start at 0, UTPs at 1.
    const coordinates = utpCoordinates(utp);
    const UTPPort: React.CSSProperties = {
      gridRow: coordinates.row,
      gridColumn: coordinates.column,
    };
    // Check if the UTP we're checking is inside the state
    const isUtpInData = filledUtps.find((e) => e.utp === utp);

    return (
      <div style={UTPPort}>
        <div
          style={{
            display: "flex",
            flexDirection:
              coordinates.row % 2 === 1 ? "column" : "column-reverse", // when on second row, flip the numbers and image, so it'll look better
            marginBottom: coordinates.row % 2 === 0 ? "15px" : "0px", // when on second row, add a bit of margin to create more space.
          }}
        >
          <p style={Center}>{utp}</p>

          {isUtpInData === undefined ? (
            emptyUTP(utp)
          ) : (
            <UtpStat
              shirshurFromId={data.shirshurFromId}
              Phone={data.UTPs[isUtpInData.index].Phone}
              utp={data.UTPs[isUtpInData.index].utp}
              onImgClick={() => setPopup((old) => !old)}
              utpInfo={data.UTPs[isUtpInData.index]}
            />
          )}
        </div>
      </div>
    );
  });

  return (

    <div
      style={{ height: "100vh", width: "100vw", backgroundColor: "darkgrey" }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {alert !== undefined && <UpdateOnActionAlert intervalRefresh={500} message={alert.message} severity={alert.severity} refresh={alert.refresh} />}

        <h1 style={Center}>{data.location + " - " + data.name}</h1>
        <div dir="ltr" style={{ ...UTPGridLayout }}>

          <Context.Provider value={{ alert: setAlert, data: [data, setData] }}>
            {utps}
          </Context.Provider>
        </div>
      </div>
    </div>

  );
}

export default AronStatus;
