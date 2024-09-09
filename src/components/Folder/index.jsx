import React, { useState } from "react";
import "./index.css";
import { ReactComponent as FolderIcon } from "../../assets/svgs/Folder.svg";
import { ReactComponent as DeleteIcon } from "../../assets/svgs/Delete.svg";


const Folder = ({item, refetch, setFolderId}) => {
  function convertToTimeFormat(dateTimeString) {
    const [date, time, period] = dateTimeString.split(" ");
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes} ${period}`;
  }

  const fetchFolder = ()=>{
    setFolderId(item.id || "");
  }

  return (
    <div onClick={fetchFolder} className="transaction-item">
      <div className="transaction-icon-folder">
        <FolderIcon />
      </div>
      <div className="transaction-details">
        <strong>{item.name}</strong>
        <p style={{ marginTop: "3px", color: "#A6AEC1", fontWeight: "200" }}>
          {item.itemCount}
        </p>{" "}
      </div>
      <span style={{ color: "#A6AEC1", fontSize: "12px" }}>{item.lastUpdateDate || ""}</span>
      <div className="dots-container" >
        <DeleteIcon/>
      </div>
    </div>
  );
};

export default Folder;
