import {Link} from 'react-router-dom'
import './index.css'

const PlaylistItem = props => {
  const {playlistDetails} = props
  const {id, imageUrl1, name, count} = playlistDetails

  return (
    <Link to={`/myplaylists/${id}`}>
      <li className="playlist-page-item">
        <img
          src={imageUrl1}
          alt="movie poster"
          className="playlist-page-movie-poster"
        />
        <p className="playlist-name">{name}</p>
        <p className="tracks-count">{count}Tracks</p>
      </li>
    </Link>
  )
}

export default PlaylistItem
