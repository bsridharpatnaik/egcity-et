import React, { useState } from "react";
import { ReactComponent as Cross } from "../../assets/svgs/cross.svg";
import { ReactComponent as UploadIcon } from "../../assets/svgs/Folder2.svg";

import "./index.css";
import { useAddSubFolderMutation, useAddSubFolderQuery, useUploadFileMutation } from "../../service/api";


const UploadFolder = ({isOpen ,handleCloseModal}) => {
  const [files, setFiles] = useState([]);
  const [submissionData, setSubmissionData] = useState({
    folder:""
  });
  const [uploadFolder]=useAddSubFolderMutation()
//   const handleFileChange = async (event) => {
//     try {
//       const newFile = event.target.files[0];
//       if (newFile) {
//         setFiles((prevFiles) => [...prevFiles, newFile]);
//         const formData = new FormData();
//         formData.append("file", newFile);
//         const response = await uploadFile(formData);
//         setFilesDetail((prev) => [
//           ...prev,
//           {
//             fileUuid: response.data.fileUuid,
//             filename: response.data.filename,
//           },
//         ]);
//       }
//     } catch (error) {
//       console.log("Error", error);
//     }
//   };
  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name,value } = e.target;
    setSubmissionData((prevState) => ({
      ...prevState,
      [name]:value,
    }));
  };


  const submitRequest = async (e) => {
    e.stopPropagation();
   try{
     const res=await uploadFolder(submissionData.folder,)
   }catch(err){

   }
   
  };
return (
     <div className={`modal-overlay ${isOpen ? "show" : ""}`}>
       <div
        className={`modal-content ${isOpen ? "slide-up" : ""}`}
        onClick={(e) => e.stopPropagation()}
       >
        <div className="top-heading">
          <h2>Add Folder</h2>
          <Cross onClick={handleCloseModal} />
        </div>
        <div className="input-group_">
          <label htmlFor="inputField">Folder Name</label>
          <div className="input-wrapper_">
            <UploadIcon />
            <input
              id="inputField"
              name="folder"
              value={submissionData.folder}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter Folder Name"
            />
          </div>
        </div>
        <button  className="modal-add-button" onClick={submitRequest}>
        Add Folder
        </button>
      </div>
    </div>
  );
};

export default UploadFolder;
