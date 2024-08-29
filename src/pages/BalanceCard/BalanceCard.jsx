import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./Balancecard.css";
import logo from '../../assets/evergreen.png';
import three from "../../assets/three.svg";
import frame from "../../assets/Frame2.svg";
import icon from "../../assets/Icon.svg";
import income from "../../assets/Download.svg"
import expense from "../../assets/Upload.svg"
import Transaction from '../../components/Transaction';

function BalanceCard() {
  const [toggle, setToggle] = useState('D');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleToggle = (value) => {
    setToggle(value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
const user=JSON.parse(localStorage.getItem("user"))
  return (
    <div>
      <div  className="balance-card">
      <div className="header">
        <div style={{display:"flex",gap:"5px"}}>
          <img src={logo} alt="Logo" className="logo" />
          <p style={{fontSize:"14px" , color:"#fff"}}>Hi, {user?.username}</p>
        </div>
        <div className="user-info">
          <div className="icons">
            <img src={icon} alt="Search Icon" className="search-icon" />
           {!user?.username &&<a href='/login'><img src={three} alt="Menu Icon" className="menu-icon"  /></a> } 
            <img src={frame} alt="Frame Icon" className="frame-icon" />
          </div>
        </div>
      </div>
      <div className="balance-info">
        <div>
          <p>Total Balance</p>
          <h2>$1,540.99</h2>
        </div>
        <div className="toggle-group">
          <div
            className={`toggle-btn ${toggle === 'D' ? 'selected' : ''}`}
            onClick={() => handleToggle('D')}
          >
            D
          </div>
          <div
            className={`toggle-btn ${toggle === 'M' ? 'selected' : ''}`}
            onClick={() => handleToggle('M')}
          >
            M
          </div>
        </div>
      </div>
      <div className="date-selector">
        <button className="prev-date">{"<"}</button>
        <div className="date-display">
          {toggle === 'D' ? (
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="d, MMM yy EEE"
            />
          ) : (
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMM yy"
              showMonthYearPicker
            />
          )}
        </div>
        <button className="next-date">{">"}</button>
      </div>
      </div>
      {/* Adding Transaction History */}
      <div className="transaction-info">
  <div className="c-f">
    <span>C/F</span>
    <span>$960.00</span>
  </div>
  <div className="summary">
    <div className="summary-item">
      <div className="summary-icon">
      <img src={income} alt="Total Income"  style={{width:"24px",height:"44px"}}    />

        </div>
     <div className='text'>
     <p>Total Income</p>
     <h3 className="amount positive">$1277.00</h3>
     </div>
    </div>
    <div className="summary-item">
      <div className="summary-icon-ex">
      <img src={expense} alt="Total Expenses" style={{width:"24px",height:"44px"}}  />

      </div>
     <div className='text'>
     <p>Total Expenses</p>
     <h3 className="amount negative">$750.00</h3>
     </div>
    </div>
  </div>
  <div className="transaction-history">
  <h4>Transaction History</h4>
  {Array.from({ length: 6 }).map((val, index) => {
    return <Transaction key={index} />;
})}
</div>
</div>
    </div>
  );
}

export default BalanceCard;
