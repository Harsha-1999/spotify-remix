import {Component} from 'react'
import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'
import {MdArrowBack} from 'react-icons/md'

import CategoryItem from '../CategoryItem'
import SideBar from '../SideBar'
import Loader from '../Loader'

import './index.css'

class CategoriesList extends Component {
  state = {categoryData: [], userDetails: [], isLoading: true}

  componentDidMount() {
    this.getCategoryData()
    this.getUserInfo()
  }

  getFormattedData = data => ({
    displayName: data.display_name,
    followersCount: data.followers.total,
    country: data.country,
    username: data.id,
  })

  getUserInfo = async () => {
    const apiUrl = 'https://api.spotify.com/v1/me'
    const token = Cookies.get('pa_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const formattedData = this.getFormattedData(fetchedData)
    this.setState({userDetails: formattedData})
  }

  getCategoryData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const {userDetails} = this.state
    const country = 'IN'

    const apiUrl = `https://api.spotify.com/v1/browse/categories/${id}/playlists?country=${country}`
    const token = Cookies.get('pa_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const categoriesData = await response.json()
    const categoriesDetails = categoriesData.playlists.items.map(
      eachCategory => ({
        description: eachCategory.description,
        id: eachCategory.id,
        imageUrl: eachCategory.images[0].url,
        name: eachCategory.name,
        tracksCount: eachCategory.tracks.total,
      }),
    )
    this.setState({categoryData: categoriesDetails, isLoading: false})
  }

  renderCategoryList = () => {
    const {categoryData} = this.state
    return (
      <div className="categories-page">
        <SideBar />
        <div className="containers-content-container">
          <Link to="/">
            <button className="back-icon-container" type="button">
              <MdArrowBack className="back-icon" />
              <p className="back-text">Back</p>
            </button>
          </Link>
          <h1 className="podcast-heading">Podcast</h1>
          <ul className="category-item-container">
            {categoryData.map(eachData => (
              <CategoryItem categoryDetails={eachData} key={eachData.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? <Loader /> : this.renderCategoryList()
  }
}

export default CategoriesList
