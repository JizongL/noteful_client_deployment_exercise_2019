import React from 'react'

import {Link} from 'react-router-dom'
import NotefulContext from '../contextFolder/notefulContext'

const noteRemoveRequest=(noteId,callback)=>{
  fetch(`https://warm-escarpment-68427.herokuapp.com/api/notes/${noteId}`, {
  method: 'DELETE',
  headers: {
    'content-type': 'application/json'
  },
})

.then(()=>{  
  callback(noteId)
})
}

class FolderMain extends React.Component{
  
  static contextType = NotefulContext;
render(){  
  const notesForFolder = this.context.notes.filter(note=>
    Number(note.folder)===Number(this.props.match.params.folderId)
  )  
  return(
    <ul>
    {notesForFolder.map(note=>
      <li key={note.id}>
        <Link to={`/note/${note.id}`}>
        <h6>{note.note_name}</h6>
        </Link>
        <span>Modified {note.date_added}</span>
        <button
        onClick={()=>noteRemoveRequest(note.id,this.context.removeNote)}
        >Remove</button>
      </li>)}
      <Link to='/notes/addNote'>Add note</Link>
    </ul>
  )
}
}

export default FolderMain