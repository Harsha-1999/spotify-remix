import './index.css'

const SongsItem = props => {
  const {songDetails} = props
  const {imageUrl, movieName, songName, artistName, duration} = songDetails
  return (
    <li className="song-item-container">
      <div className="song-item-small-container">
        <img
          src={imageUrl}
          alt="movie poster"
          className="song-item-movie-poster"
        />
        <div className="song-item-song-details">
          <p className="song-item-song-name">{songName}</p>
          <p className="song-item-song-artist">
            {artistName}-{movieName}
          </p>
        </div>
      </div>
      <p className="song-item-song-duration">{duration}</p>
    </li>
  )
}

export default SongsItem
