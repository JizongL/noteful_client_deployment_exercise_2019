import React from 'react'

export default function ValidateFolderName(props){
  if(props.hasError){    
    return(
      <div className='folder-name-input-error'>
        {props.message}
      </div>
    )
  }
  return<></>
}