import './index.css'

const DisplaySongs = props => {
  const {listDetails} = props
  const {addedAt, artist, duration, name, albumName} = listDetails

  return (
    <li className="display-song-list">
      <p className="display-song-text">{name}</p>
      <p className="display-song-text">{albumName}</p>
      <p className="display-song-text">{duration}</p>
      <p className="display-song-text">{artist}</p>
      <p className="display-song-text">{addedAt}</p>
    </li>
  )
}

export default DisplaySongs
