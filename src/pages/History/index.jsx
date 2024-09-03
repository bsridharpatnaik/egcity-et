import React from 'react'
import "./index.css"
import { ReactComponent as Left } from "../../assets/svgs/arrowleft.svg";
import Transaction from '../../components/Transaction';

const History = () => {
  return (
    <div className='wrapper'>
    <div className='wrapper_container_heading'>
      <div className='text_container'>
        <Left />
        <h5>History</h5>
        </div>
     
      </div>
      {Array.from({ length: 8 }).map((val, index) => {
        return <Transaction key={index} borderBottom="1px solid #F7F9FC" background="unset" showIcon={false} showDetails={false} date={true} historyLog={true} />;
      })}
    </div>
  )
}

export default History
