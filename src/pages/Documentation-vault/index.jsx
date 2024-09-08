import React from 'react'
import { useGetDocumentationVaultQuery } from '../../service/api'

const Documentation = () => {
  const {data} =useGetDocumentationVaultQuery()
  console.log("Data",data);
  
  return (
    <div>
      Documentation
    </div>
  )
}

export default Documentation
