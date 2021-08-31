import './index.css'

const PodcastItem = props => {
  const {podcastDetails} = props
  const {addedAt, artist, duration, name, albumName} = podcastDetails

  return (
    <li className="podcast-song-container">
      <p className="podcast-song-list">{name}</p>
      <p className="podcast-song-list">{albumName}</p>
      <p className="podcast-song-list">{duration}</p>
      <p className="podcast-song-list">{artist}</p>
      <p className="podcast-song-list">{addedAt}</p>
    </li>
  )
}

export default PodcastItem
