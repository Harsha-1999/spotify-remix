import './index.css'

const NewReleases = props => {
  const {newDetails} = props
  const {imageUrl1, name} = newDetails

  return (
    <li className="new-release-item">
      <img src={imageUrl1} alt="movie poster" className="movie-poster" />
      <p className="movie-name">{name}</p>
    </li>
  )
}

export default NewReleases
