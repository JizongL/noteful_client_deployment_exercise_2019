import React from 'react'
import NotefulContext from '../contextFolder/notefulContext'
import {Link} from 'react-router-dom'
class MainSidebar extends React.Component{
  static contextType = NotefulContext;
  render(){    
    return(
      <ul>
      {this.context.folders.map(folder=>
      <li key={folder.id}>
      <Link to={`/folder/${folder.id}`}>
      {folder.folder_name}
      </Link>
      </li>
    )}
    <div className='add_folder'>
      <Link to='/folder/addFolder'>Add folder</Link>
    </div>
      </ul>
    )
  }
}

export default MainSidebar