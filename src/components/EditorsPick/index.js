import {Link} from 'react-router-dom'
import './index.css'

const EditorsPick = props => {
  const {editorsDetails} = props
  const {imageUrl, name, id} = editorsDetails
  return (
    <Link to={`/playlists/${id}`}>
      <li className="editor-item">
        <img src={imageUrl} alt="editors-poster" className="editor-image" />
        <p className="editor-name">{name}</p>
      </li>
    </Link>
  )
}

export default EditorsPick
