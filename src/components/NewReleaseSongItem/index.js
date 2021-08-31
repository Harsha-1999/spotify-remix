import './index.css'

const NewReleaseSongItem = props => {
  const {newSongDetails} = props
  const {songName, duration} = newSongDetails
  return (
    <li className="newrelease-song-list">
      <p className="newrelease-song-names">{songName}</p>
      <p className="newrelease-song-names">{duration}</p>
    </li>
  )
}

export default NewReleaseSongItem
