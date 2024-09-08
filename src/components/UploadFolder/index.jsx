import React, { useState } from "react";
import { ReactComponent as Cross } from "../../assets/svgs/cross.svg";
import { ReactComponent as UploadIcon } from "../../assets/svgs/Folder2.svg";

import "./index.css";


const UploadFolder = ({isOpen ,handleCloseModal}) => {
  const [files, setFiles] = useState([]);
  const [submissionData, setSubmissionData] = useState({});
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

  const handleInputChange = (e, name) => {
    const { value, type, checked } = e.target;
    setSubmissionData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


//   const submitRequest = async (e) => {
//     e.stopPropagation();
//     const todayDate =  getFormattedDate();
//     const data = {
//       transactionType: submissionData.transactionType.toUpperCase(),
//       date: todayDate,
//       title: submissionData.title,
//       party: submissionData.selectedParty,
//       amount: submissionData.amount,
//       files: filesDetail,
//     };
//    try{
//     if(isUpdate){
//      const response=await update({id:dataToShow.id , data});
//      if(response?.error){
//       toast.error(response?.error?.data?.message)
//     }else{
//       setSubmissionData({
//         title: "",
//         amount: 0,
//         selectedParty: null,
//         transactionType: "Income",
//       });
//       setValue({})
//       setFiles([]);
//       setFilesDetail([]);
//       setIsModalOpen(false)
//       toast.success("Updated Successfully")
//     }
//     }else{
//       const response = await createTransaction(data);
//       if(response?.error){
//         toast.error(response?.error?.data?.message)
//       }else{
//         setSubmissionData({
//           title: "",
//           amount: 0,
//           selectedParty: null,
//           transactionType: "Income",
//         });
//         setValue({})
//         setFiles([]);
//         setFilesDetail([]);
//         setIsModalOpen(false)

//         toast.success("Added Successfully")
//       }

//     }
//    }catch(error){
//     setSubmissionData({
//       title: "",
//       amount: 0,
//       selectedParty: null,
//       transactionType: "Income",
//     });
//     setValue({})
//     setFiles([]);
//     setFilesDetail([]);
//    }
//   };
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
              value={submissionData.amount}
              onChange={(e) => handleInputChange(e, "amount")}
              type="number"
              placeholder="Enter Folder Name"
            />
          </div>
        </div>
        <button  className="modal-add-button">
        Add Folder
        </button>
      </div>
    </div>
  );
};

export default UploadFolder;
