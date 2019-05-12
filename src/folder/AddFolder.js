import React from 'react'
import {Link} from 'react-router-dom'
import NotefulContext from '../contextFolder/notefulContext';
import ValidateFolderName from './validationFolderName'
// note:
// need to validate folder name with no repeat 

class AddFolder extends React.Component{



  static contextType = NotefulContext
  constructor(props){
    super(props)
    this.state={
      name:'',
      nameValid:false,
      validationMessages:{
        name:''
      }
    }
  }
  
  handleInput=(name)=>{
    //console.log(e.target,'test handleinput')
    this.setState({name:name},()=>this.validateName(name))
  }
  


  formSubmithandle=(e)=>{    
    e.preventDefault()    
    fetch(`https://warm-escarpment-68427.herokuapp.com/api/folders`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body:JSON.stringify({folder_name:this.state.name})
}).then(res=>{
  if(!res.ok){
    return res.json().then(error=>{throw new Error(error)})
  }
  return res.json()
}).then(
  (data)=>{   
    this.context.addFolder(data)
    this.props.history.push('/')
  }
)
  }
validateName=(fieldValue)=>{
  const fieldError={...this.state.validationMessages};
  let hasError = false;  
  if(fieldValue.length===0){
    fieldError.name ='Name is required';    
    hasError = true;    
  }
  else{
    fieldError.name = ''
    hasError=false;
  }
  this.setState({
    validationMessages:fieldError,
    nameValid:!hasError
  })
}
  render(){   
    return(
      <div className='add-new-folder-container'>
        <form className='add-new-folder-form'
        onSubmit={(e)=>this.formSubmithandle(e)}>
        <h5>Create a folder</h5>      
        <label> Name:
        <input id='add-folder' name='add-folder'
          onChange={(e)=>this.handleInput(e.target.value)}/>
          <ValidateFolderName hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>
        </label>
          <button type="submit">Submit</button>
        </form>
        <Link to='/'>Back</Link>
      </div>
    )
  }
}

export default AddFolder