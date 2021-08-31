import {Link} from 'react-router-dom'
import './index.css'

const CategoryItem = props => {
  const {categoryDetails} = props
  const {id, imageUrl, name, tracksCount} = categoryDetails
  return (
    <Link to={`/podcasts/${id}`}>
      <li className="category-container">
        <img src={imageUrl} className="podcast-image" />
        <p className="podcast-name">{name}</p>
        <p className="podcast-tracks">{tracksCount} Tracks</p>
      </li>
    </Link>
  )
}

export default CategoryItem
