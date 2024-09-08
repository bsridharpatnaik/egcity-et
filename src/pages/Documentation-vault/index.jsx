import React, { useState } from 'react'
import Folder from '../../components/Folder'
import { ReactComponent as Left } from "../../assets/svgs/arrowleft.svg";
import AddButton from '../../components/AddButton';
import Menu from '../../components/Menu';
import UploadFolder from '../../components/UploadFolder';
import UploadFile from '../../components/UploadFile';

const Documentation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen,setIsOpen]=useState(false)
  const [isFileOpen,setIsFileOpen]=useState(false)


  const items = [
    {
      label: "Add Folder",
      onClick: () => {
        setIsOpen(true)
        setShowMenu(false);
      },
    },
    {
      label: "Add File",
      onClick: () => {
        setIsFileOpen(true)
        setShowMenu(false);
      },
    },
  ];
  return (
    <div className='wrapper'>
    <div className='wrapper_container_heading'>
      <div className='text_container'>
        <Left />
        <h5 >Document Vault</h5>
        </div>
      </div>
      {Array.from({length:10})?.map((val, index) => {
        return <Folder />;
      })}
        <div className="add-btn" >
        <AddButton onClick={()=>setShowMenu((prev)=>!prev)} style={{ position: "relative" }} />
        {showMenu &&  <Menu items={items} documentPage={true} />}
      </div>
      <UploadFolder isOpen={isOpen} handleCloseModal={()=>setIsOpen(false)}  />
      <UploadFile isOpen={isFileOpen} handleCloseModal={()=>setIsFileOpen(false)}  />


    </div>
  )
}

export default Documentation
