import './index.css'

const CategoryItem = props => {
  const {categoryDetails} = props
  const {imageUrl, name, tracksCount} = categoryDetails
  return (
    <li className="category-container">
      <img src={imageUrl} className="podcast-image" />
      <p className="podcast-name">{name}</p>
      <p className="podcast-tracks">{tracksCount} Tracks</p>
    </li>
  )
}

export default CategoryItem
