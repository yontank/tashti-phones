import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import "reactflow/dist/style.css";
import { Aron } from "../common/types";

const LineInfoNode = memo(({ data }: NodeProps<Aron>) => {
  console.log("NODE DATA", data);
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div
        style={{
          width: "8em",
          borderRadius: "4px",
          background: "#ADD8E6",
          height: "3.2em",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "small" }}> {data.Aron.location}</p>
        <hr />
        <p>{data.utp}</p>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
});

export default LineInfoNode;
