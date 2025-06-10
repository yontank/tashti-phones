import { useState, useEffect } from "react";
import { AlertMessageProps, Aron, LineStatusFetchProps } from "../../common/types";
import "reactflow/dist/style.css";
import { useParams } from "react-router-dom";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  NodeTypes,
  Edge,
} from "reactflow";
import { getCurrentDate } from "../../common/utils";
import LineInfoNode from "../../components/LineInfoNode";
import NotFound from "../404/404";
const nodeTypes: NodeTypes = { lineNode: LineInfoNode };
import styles from "./LineStatus.module.css";
import EditPhoneInfo from "../../components/EditPhoneInfo/EditPhoneInfo";
import Popup from "reactjs-popup";

function LineStatus() {
  const { line } = useParams();
  const [data, setData] = useState<undefined | LineStatusFetchProps>(undefined);
  const [nodes, setNodes, onNodesChanges] = useNodesState([]);
  const [edges, setEdges, onEdgesChanges] = useEdgesState([]);
  const [openUpdatePopup, setOpenUpdatePopup] = useState<Boolean>(false);
  const [alert, setAlert] = useState<AlertMessageProps | undefined>(undefined);
  const [onDeleteButton, setOnDeleteButton] = useState<boolean>(false);


  useEffect(() => {
    window.shaiseAPI
      .getPhoneLine(line)
      .then((e: LineStatusFetchProps | "404 phone not found") => {
        if (e === "404 phone not found") return;

        /**
         * Get all the information needed from the backend about the said Line, where it's going? who is the owner?
         * For future use, if anyone wants to use the data (like inside the status div) they can enter the the data state to get the information.
         */
        setData({ ...e, type: "lineStatus" });
        /**
         * This line of code creates the nodes we see on the screen, it shows the div that tells us the location of the UTP, name and concentration
         * I Wrote it like this inside the useEffect because
         * 1) It's better to render it once, so lets do it the moment we get our info
         * 2) i didn't find a better way to do it since data COULD be undefined while we try to enter into it.
         *
         * the code is simple, for every aron, we get from our fetch, tell me how to render it correctly.
         *
         * What's its ID for linking it to another Aron?
         * What's is its type?
         * And where to place it.
         *
         *
         */

        /**
         * The Root of all numbers, Its job to render as the "Root" of all numbers,
         * right now im not getting this as aron, so Im showing it like this.
         */
        const defaultTx1 = {
          id: "0",
          type: "lineNode",
          position: { x: -150, y: -200 },
          data: {
            utp: e.zakif + " - " + e.block + " - " + e.zug,
            Aron: { location: "TX1" },
          },
        };

        setNodes([
          ...e.UTPs.map((e, i: number) => ({
            id: e.Aron.id.toString(),
            type: "lineNode",
            /**
             * I wanted to create the nodes to print randomly at the screen everytime so it'll look dynamic.
             *
             * I wanted the first node (Always will be TX1) to be at the same place, the same time (AKA i==0)
             * everything else, i want to print randomly,
             *
             * X: print somewhere between 50 pixels right or left, and make sure the boxes don't collide, so add (70 | -70) for each node
             * Y: Just create 150 pixels up or down
             *
             */
            position:
              i === 0
                ? { x: -60, y: -0 }
                : {
                  x: (Math.random() * 50 + (i % 2 === 0 ? 70 : -70)) * i,
                  y: Math.random() * 150 + 80,
                },
            data: e,
          })),
          defaultTx1,
        ]);
        /**
         * Same idea, this will connect all the strings between each aron to show you on the screen the shirshur that happens between each and every aron.
         */

        /**
         * Since the Ids Im getting from the the aron Array are not in incermanting number,
         *lets
         * 1) Connect the first Aron (Tx1) to the first Aron that we get from the arons from the fetch
         * 2) connect all the other arons by sequential order inside the array.
         *
         */
        let aronData: React.SetStateAction<Edge<any>[]> = [];
        // First Edge, between TX1 to first Aron.
        aronData.push({
          id: "0 -" + e.UTPs[0].Aron.id.toString(),
          source: "0",
          target: e.UTPs[0].Aron.id.toString(),
          animated: true,
        });
        // (If exists) all the other ones.
        for (let i = 0; i < e.UTPs.length - 1; i++) {
          aronData.push({
            id:
              e.UTPs[i].Aron.id.toString() +
              "-" +
              e.UTPs[i + 1].Aron.id.toString(),
            source: e.UTPs[i].Aron.id.toString(),
            target: e.UTPs[i + 1].Aron.id.toString(),
            animated: true,
          });
        }

        setEdges(aronData);
      });
  }, [alert]);

  if (data == undefined) return <NotFound />;

  return (
    <>
      <Popup
        children={<EditPhoneInfo data={data} alert={alert} setAlert={setAlert} setOpenUpdatePopup={setOpenUpdatePopup} />}
        open={openUpdatePopup.valueOf()}
        onClose={() => setOpenUpdatePopup(false)}
      />{" "}
      <div
        style={{
          width: "80vw",
          height: "100vh",
          position: "absolute",
          left: "0%",
          direction: "ltr",
          backgroundColor: "#FFF",
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChanges}
          onEdgesChange={onEdgesChanges}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div
        style={{
          width: "20vw",
          height: "calc(100vh)",
          backgroundColor: "rgb(147, 244, 145)",
          position: "absolute",
          right: "0",
          bottom: "0",
          textAlign: "center",
          margin: "0",
          padding: "0",
        }}
      >
        <h1>סטטוס קו </h1>
        <hr style={{
          border: 0,
          height: "2px",
          backgroundColor: "white",
          margin: "2px",
        }} />

        <table style={{ width: "100%", direction: "rtl", textAlign: "right" }}>
          <tr>
            <th>מספר:</th>
            <td>{data.lineNumber}</td>
          </tr>
          <tr>
            <th>סוג קו:</th>
            <td>{data.lineType}</td>
          </tr>
          {/* <tr>
            <th>קוד קו:</th>
            <td>{data.id}</td>
          </tr> */}
          <tr>
            <th>בעלים:</th>
            <td>{data.Owner !== null && data.Owner.name}</td>
          </tr>
          <tr>
            <th>סטטוסים</th>
            {/* <td>{data.data.lineData.status}</td> */}
          </tr>
          <tr>
            <th>עודכן לאחרונה:</th>
            <td>{getCurrentDate(new Date(data.updatedAt))}</td>
          </tr>
        </table>
        <div className={styles.buttonsContainer}>
          <button
            className={styles.updateButton}
            onClick={() => setOpenUpdatePopup((old) => !old)}
          >
            עדכון פרטים
          </button>
          <button className={styles.deleteButton} onClick={() => setOnDeleteButton(old => !old)}>מחק שרשור</button>
          <Popup
            onClose={() => setOnDeleteButton(false)}
            closeOnEscape
            arrow={true}
            closeOnDocumentClick
            open={onDeleteButton}
            position={"top center"}
          >
            <div>
              <h4 style={{ textAlign: "center" }}>אתה בטוח?</h4>
              <div className={styles.buttonsContainerDeleteButton}>
                <button className={styles.addButton} onClick={() => { window.shaiseAPI.purgeLine(data.id).then(() => setInterval(() => { setOnDeleteButton(false); setAlert(alert) }, 1000)) }}>כן</button>
                <button className={styles.deleteButton} onClick={() => setOnDeleteButton(false)}>לא</button>
              </div>
            </div>

          </Popup>
        </div >
      </div >
    </>
  );
}
export default LineStatus;
