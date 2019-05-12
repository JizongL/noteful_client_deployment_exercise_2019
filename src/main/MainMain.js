import React from 'react'
import NotefulContext from '../contextFolder/notefulContext'
import {Link} from 'react-router-dom'
const noteRemoveRequest=(noteId,callback)=>{
  fetch(`http://localhost:9090/api/notes/${noteId}`, {
  method: 'DELETE',
  headers: {
    'content-type': 'application/json'
  },
}).then(res=>{
  if(!res.ok){
   return res.json().then(error=>{
      throw new Error(error)
    })
  }return res.json()
  
}).then(()=>{
  callback(noteId)
})
}
class MainMain extends React.Component{  
  static contextType = NotefulContext;
render(){  
  return(
    <ul>
    {this.context.notes.map(note=>
    
      <li key={note.id}>
        <Link to={`/note/${note.id}`}>
        <h6>{note.note_name}</h6>
        </Link>
        <span>Modified {note.date_added}</span>
        <button
        onClick={()=>noteRemoveRequest(note.id,this.context.removeNote)}
        >Remove</button>
      </li>)}
      <div className='add_note'>  
        <Link to='/notes/addNote'>Add note</Link>      
      </div>
    </ul>
  )
}
}

export default MainMain