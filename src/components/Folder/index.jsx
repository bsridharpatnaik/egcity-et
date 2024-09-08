import React from "react";
import "./index.css";
import { ReactComponent as FolderIcon } from "../../assets/svgs/Folder.svg";
import { ReactComponent as DeleteIcon } from "../../assets/svgs/Delete.svg";
const Folder = () => {
  function convertToTimeFormat(dateTimeString) {
    const [date, time, period] = dateTimeString.split(" ");
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes} ${period}`;
  }
  return (
    <div className="transaction-item">
      <div className="transaction-icon-folder">
        <FolderIcon />
      </div>
      <div className="transaction-details">
        <strong>Folder 1</strong>
        <p style={{ marginTop: "3px", color: "#A6AEC1", fontWeight: "200" }}>
          5 items
        </p>{" "}
      </div>
      <span style={{ color: "#A6AEC1", fontSize: "12px" }}>12/11/2002</span>
      <div className="dots-container" >
        <DeleteIcon/>
      </div>
    </div>
  );
};

export default Folder;
