import {Link} from 'react-router-dom'
import './index.css'

const NewReleases = props => {
  const {newDetails} = props
  const {id, imageUrl1, name} = newDetails

  return (
    <Link to={`/newreleases/${id}`}>
      <li className="new-release-item">
        <img src={imageUrl1} alt="movie poster" className="movie-poster" />
        <p className="movie-name">{name}</p>
      </li>
    </Link>
  )
}

export default NewReleases
