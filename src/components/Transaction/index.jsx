import React from 'react'
import "./index.css"
const Transaction = () => {
  return (
   
    <div className="transaction-item">
      <div className="transaction-icon">AT</div>
      <div className="transaction-details">
        <strong>Grocery</strong>
        <p>Abhay Traders</p>
      </div>
      <div className="transaction-amount positive">+$278</div>
      <div className="transaction-time">10:00 AM</div>
    </div>

  )
}

export default Transaction
