import React from 'react'
import {Link} from 'react-router-dom'
import NotefulContext from '../contextFolder/notefulContext';


class AddNote extends React.Component{
  static contextType = NotefulContext
  constructor(props){
    super(props)    
    this.state={
      note_name:'',
      content:'',
      folder:'',      
    }
  }
  
  newNoteRequest=(e)=>{
    e.preventDefault()  
    if(this.state.folder)
    fetch(`https://warm-escarpment-68427.herokuapp.com/api/notes`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body:JSON.stringify(this.state)
}).then(res=>{
  if(!res.ok){    
    throw new Error("error")
  }
  
  return res.json()
}).then(
  (data)=>{    
    this.context.addNote(data)
    this.props.history.push(`/folder/${this.state.folder}`)
  })
  }

  inputNameHanle=(e)=>{
    this.setState({note_name:e.target.value})
  }

  inputContentHandle=(e)=>{
    
    this.setState({content:e.target.value})
  }

  inputFolderHandle=(e)=>{
    let newFolder = e.target.value
    const foundFolder = this.context.folders.filter(folder=>folder.folder_name===newFolder)    
    this.setState({folder:foundFolder[0].id})
  }

  render(){   
    const folderOption = this.context.folders.map(folder=>
       <option id ={folder.id} key={folder.id}>{folder.folder_name}</option>
     )
      


    return(
      <div className='add-note-container'>
      <form className='add-note-form'
      onSubmit={(e)=>this.newNoteRequest(e)}>
        <label>Name
        <input placeholder='name' onChange={(e)=>this.inputNameHanle(e)}/>
        </label>
        <label>Content
        <textarea placeholder='content' onChange={(e)=>this.inputContentHandle(e)}/>
        </label>
        <label>Folder
        <select onChange={(e)=>this.inputFolderHandle(e)}>
        <option >choose folder</option>
        {folderOption}
        </select>
        </label>

      <button type='submit'>Submit</button>
      </form>
      <Link to='/'>Back</Link>
      </div>
    )
  }
}

export default AddNote