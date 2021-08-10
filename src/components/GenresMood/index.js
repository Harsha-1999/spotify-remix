import {Link} from 'react-router-dom'
import './index.css'

const GenresMood = props => {
  const {genresDetails} = props
  const {imageUrl, name, id} = genresDetails
  const num = Math.ceil(Math.random() * 18)
  return (
    <Link to={`/categories/${id}`}>
      <li className={`genre-item bg-${num}`}>
        <p className="genre-name">{name}</p>
        <img src={imageUrl} alt="genre img" className="genre-image" />
      </li>
    </Link>
  )
}

export default GenresMood
