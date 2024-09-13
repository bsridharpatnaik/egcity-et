import React, { useState } from "react";
import "./index.css";
import { ReactComponent as FolderIcon } from "../../assets/svgs/Folder.svg";
import { ReactComponent as DeleteIcon } from "../../assets/svgs/Delete.svg";
import { useDeleteFileMutation, useDeleteFolderMutation } from "../../service/api";
import { toast } from "react-toastify";

const Folder = ({ item, file, refetch, setFolderId,folderId}) => {
 const[delteFolder] = useDeleteFolderMutation()
 const[deleteFile] = useDeleteFileMutation() 
  // Function to convert the date-time string
  function convertToTimeFormat(dateTimeString) {
    const [date, time, period] = dateTimeString.split(" ");
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes} ${period}`;
  }
  // Function to fetch the folder details
  const fetchFolder = () => {
    setFolderId(item.id || "");
  };

  // Function to determine the preview URL based on file extension
  const getPreviewUrl = (filename) => {
    const fileExtension = filename?.split(".").pop().toLowerCase();

    let previewUrl = "";
    switch (fileExtension) {
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        previewUrl = "https://via.placeholder.com/150?text=Image+Preview";
        break;
      case "pdf":
        previewUrl = "https://via.placeholder.com/150?text=PDF+Preview";
        break;
      case "doc":
      case "docx":
        previewUrl = "https://via.placeholder.com/150?text=Word+Preview";
        break;
      case "xls":
      case "xlsx":
        previewUrl = "https://via.placeholder.com/150?text=Excel+Preview";
        break;
      default:
        previewUrl = "https://via.placeholder.com/150?text=File+Preview";
    }
    return previewUrl;
  };
const handleClick=async(e)=>{
  e.stopPropagation()
  try{
const res=file ? await deleteFile(item.id) : await delteFolder(item.id)
console.log("Res",res);
if(res?.data?.success){
  toast.success(res.data.message)
}
  }catch(err){
    console.log("Err",err);
    toast.error(err.data.message)
  }
}
  return (
    <div onClick={fetchFolder} className="transaction-item">
      <div className="transaction-icon-folder">
        {file ? (
          <img
            src={getPreviewUrl(item.filename)}
            alt="file preview"
            style={{ width: "50px", height: "50px" }} // Adjust the size as needed
          />
        ) : (
          <FolderIcon />
        )}
      </div>
      <div className="transaction-details">
      <span>  {file ? item?.filename : item.name}</span>
        <p style={{ marginTop: "3px", color: "#A6AEC1", fontWeight: "200" }}>
          {item.itemCount}
        </p>
      </div>
      <span style={{ color: "#A6AEC1", fontSize: "12px",marginTop:"20px" }}>
        {item.lastUpdateDate || ""}
      </span>
      <div className="dots-container_folder">
        <DeleteIcon onClick={handleClick} />
      </div>
    </div>
  );
};

export default Folder;
