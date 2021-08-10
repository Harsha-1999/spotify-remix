import './index.css'

const PlaylistItem = props => {
  const {playlistDetails} = props
  const {imageUrl1, name, count} = playlistDetails

  return (
    <li className="playlist-page-item">
      <img
        src={imageUrl1}
        alt="movie poster"
        className="playlist-page-movie-poster"
      />
      <p className="playlist-name">{name}</p>
      <p className="tracks-count">
        <span>{count} </span>Tracks
      </p>
    </li>
  )
}

export default PlaylistItem
