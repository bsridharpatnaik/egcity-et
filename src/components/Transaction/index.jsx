import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import { ReactComponent as Dots } from "../../assets/svgs/blackdots.svg";
import Menu from "../Menu";
import { format } from "date-fns";
import { useDeleteTransactionMutation } from "../../service/api";
const Transaction = ({
  activeTab,
  borderBottom,
  background,
  showIcon,
  showDetails,
  date,
  historyLog,
  item,
  handleAddButtonClick,
  setIsUpdate,
}) => {

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd/MM/yyyy");
  const items = [
    {
      label: "Edit",
      onClick: () => {
        handleAddButtonClick(item);
        setIsUpdate(true);
        setShowMenu(false);
      },
    },
    {
      label: "Delete",
      onClick: () => {
         handleDelete()
        setShowMenu(false);
      },
    },
  ];
    const [deleteTransaction] = useDeleteTransactionMutation()
const handleDelete=async()=>{
 try{
   const res= await deleteTransaction(item.id)
   
 }catch(err){
  console.log("Err",err);
 }
}
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  function convertToTimeFormat(dateTimeString) {
    const [date, time, period] = dateTimeString.split(" ");
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes} ${period}`;
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="transaction-item"
      style={{ borderBottom: borderBottom, backgroundColor: background }}
    >
      <div className="transaction-icon">AT</div>
      <div className="transaction-details">
        <strong>{item?.title}</strong>
        {historyLog && (
          <span style={{ color: "#666875" }}> &nbsp;Added a new expense</span>
        )}
        {date ? (
          <>
            <p
              style={{ marginTop: "3px", color: "#A6AEC1", fontWeight: "200" }}
            >
              {formattedDate}
            </p>{" "}
          </>
        ) : (
          <>
            <p>{item?.party}</p>
          </>
        )}
      </div>
      {showDetails && (
        <div className="transaction-amt">
          <div className="transaction-amount positive">${item?.amount}</div>
          <div className="transaction-time">
            {convertToTimeFormat(item?.modificationDate)}
          </div>
        </div>
      )}
      <div
        className="dots-container"
        ref={menuRef}
        style={{ position: "relative" }}
      >
        {showIcon && (
          <Dots className="frame-icon" onClick={() => setShowMenu(!showMenu)} />
        )}
        {showMenu && <Menu items={items} />}
      </div>
    </div>
  );
};

export default Transaction;
