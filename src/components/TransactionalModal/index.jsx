import React, { useEffect, useState } from "react";
import { ReactComponent as Cross } from "../../assets/svgs/cross.svg";
import CreatableSelect from "react-select/creatable";
import "./index.css";
import {
  useCreateTransactionMutation,
  useGetExistingPartyQuery,
  useUploadFileMutation,
} from "../../service/api";

const AddTransactionModal = ({dataToShow, isOpen, onClose, isUpdate }) => {
  const { data, isLoading: existingPartyloading } = useGetExistingPartyQuery();
  const [createTransaction, { isLoading: creatingTransactionLoading }] =
    useCreateTransactionMutation();
  const [uploadFile, { isLoading: fileLoading }] = useUploadFileMutation();
  const [files, setFiles] = useState([]);
  const [filesDetail, setFilesDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState();
  const [submissionData, setSubmissionData] = useState({});
useEffect(()=>{
  const defaultValue = {
    title:dataToShow.title ??  "",
    amount:dataToShow.amount ??  0,
    description:dataToShow.description ??  "",
    selectedParty:dataToShow.selectedParty ??  null,
    transactionType:dataToShow.transactionType ??  "Income",
  };
  setSubmissionData(defaultValue)
 
  setFiles(dataToShow?.fileInfos)
},[dataToShow.id])
   console.log("Data to show",dataToShow);
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
      border: "1px solid #E0E0E0",
      borderRadius: "5px",
      backgroundColor: "#F9F9F9",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "5px",
      zIndex: 2,
    }),
    input: (provided) => ({
      ...provided,
      padding: "2px",
      fontSize: "14px",
    }),
  };

  const createOption = (label) => ({
    label,
    value: label,
  });

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setOptions((prev) => [...prev, { label: inputValue, value: inputValue }]);
      setIsLoading(false);
      setSubmissionData((prevState) => ({
        ...prevState,
        selectedParty: inputValue,
      }));
      setValue(newOption);
    }, 1000);
  };

  const handleFileChange = async (event) => {
    try {
      const newFile = event.target.files[0];
      if (newFile) {
        setFiles((prevFiles) => [...prevFiles, newFile]);
        const formData = new FormData();
        formData.append("file", newFile);
        const response = await uploadFile(formData);
        setFilesDetail((prev) => [
          ...prev,
          {
            fileUuid: response.data.fileUuid,
            filename: response.data.filename,
          },
        ]);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };


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

  function getFormattedDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const handleSelectChange = (selectedOption) => {
    setSubmissionData((prevState) => ({
      ...prevState,
      selectedParty: selectedOption.value,
    }));
  };

  const submitRequest = async (e) => {
    e.stopPropagation();
    const todayDate =  getFormattedDate();
    const data = {
      transactionType: submissionData.transactionType.toUpperCase(),
      date: todayDate,
      title: submissionData.title,
      description: submissionData.description,
      party: submissionData.selectedParty,
      amount: submissionData.amount,
      files: filesDetail,
    };
   try{
    const response = await createTransaction(data);
   }catch(error){
console.log("Error",error);
   }finally{
    setSubmissionData({
      title: "",
      amount: 0,
      description: "",
      selectedParty: null,
      transactionType: "Income",
    });
    setFiles([]);
    setFilesDetail([]);
   }
  
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const newArr = data.map((item) => ({ label: item, value: item }));
      setOptions(newArr);
    }
  }, [data]);

  return (
    <div className={`modal-overlay ${isOpen ? "show" : ""}`}>
      <div
        className={`modal-content ${isOpen ? "slide-up" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="top-heading">
          <h2>{isUpdate ? `Update` : `Add`}</h2>
          <Cross onClick={onClose} />
        </div>
        <div className="modal-radio-group">
          <label>
            <input
              type="radio"
              name="transactionType"
              value="Income"
              checked={submissionData.transactionType === "Income"}
              onChange={(e) => handleInputChange(e, "transactionType")}
              defaultChecked
            />
            Income
          </label>
          <label>
            <input
              type="radio"
              name="transactionType"
              value="Expense"
              checked={submissionData.transactionType === "Expense"}
              onChange={(e) => handleInputChange(e, "transactionType")}
            />
            Expenses
          </label>
        </div>

        <div className="input-group_">
          <label htmlFor="inputField">Title</label>
          <div className="input-wrapper_">
            <input
              id="inputField"
              type="text"
              value={submissionData.title}
              onChange={(e) => handleInputChange(e, "title")}
              placeholder="Enter Title"
            />
          </div>
        </div>

        <div className="input-group_">
          <label htmlFor="inputField">Amount</label>
          <div className="input-wrapper_">
            <input
              id="inputField"
              value={submissionData.amount}

              onChange={(e) => handleInputChange(e, "amount")}
              type="number"
              placeholder="Enter Amount"
            />
          </div>
        </div>
        <div className="input-group_">
          <label htmlFor="inputField">Description</label>
          <div className="input-wrapper_">
            <textarea
              id="inputField"
              value={submissionData.description}

              onChange={(e) => handleInputChange(e, "description")}
              placeholder="Query Here"
            />
          </div>
        </div>

        <div className="input-group_">
          <label>Select Party</label>
          {/* <Select
            options={options}
            styles={customStyles}
            placeholder="Select Party"
          /> */}
          <CreatableSelect
            isClearable
            isDisabled={isLoading}
            isLoading={isLoading}
            onChange={handleSelectChange}
            onCreateOption={handleCreate}
            options={options}
            styles={customStyles}
            value={value}
          />
        </div>

        <div className="modal-upload input-group_">
          <label>Upload Document</label>
          <div className="upload-box">
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label htmlFor="fileInput" className="upload-box-label">
              Browse Files
            </label>
            <p>JPG, PNG, PDF, EXCEL</p>
          </div>
          <div className="file-preview">
          {files?.map((file, index) => {
  let previewUrl;

  try {
    previewUrl = URL.createObjectURL(file);
  } catch (error) {
    console.error("Error creating object URL:", error);

    const fileExtension = file?.name?.split('.').pop().toLowerCase();

    switch (fileExtension) {
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        previewUrl = 'https://via.placeholder.com/150?text=Image+Preview';
        break;
      case 'pdf':
        previewUrl = 'https://via.placeholder.com/150?text=PDF+Preview';
        break;
      case 'doc':
      case 'docx':
        previewUrl = 'https://via.placeholder.com/150?text=Word+Preview';
        break;
      case 'xls':
      case 'xlsx':
        previewUrl = 'https://via.placeholder.com/150?text=Excel+Preview';
        break;
      default:
        previewUrl = 'https://via.placeholder.com/150?text=File+Preview';
    }
  }

  return (
    <div key={index} className="file-item">
      <img
        src={previewUrl}
        alt="file preview"
        className="file-preview-image"
      />
      <span className="file-name">{file?.name ?? file.filename}</span>
      <Cross
        onClick={() => handleRemoveFile(index)}
        className="remove-file-icon"
      />
    </div>
  );
})}

          </div>
        </div>

        <button onClick={submitRequest} className="modal-add-button">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTransactionModal;
