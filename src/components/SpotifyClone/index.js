import {Component} from 'react'
import Cookies from 'js-cookie'
import moment from 'moment'

import NewReleases from '../NewReleases'
import GenresMood from '../GenresMood'
import EditorsPick from '../EditorsPick'
import SideBar from '../SideBar'
import Loader from '../Loader'

import './index.css'

class SpotifyClone extends Component {
  state = {
    userCountryDetails: [],
    musicDetails: [],
    genresMoodDetails: [],
    newReleaseData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getHomePageList()
    this.getUserInfo()
    this.getGenreAndMoods()
    this.getNewReleases()
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
    const fetchedUserData = await response.json()
    const formattedData = this.getFormattedData(fetchedUserData)
    this.setState({userCountryDetails: formattedData})
  }

  getHomePageList = async () => {
    const {userCountryDetails} = this.state
    const country = 'IN'
    const timeStamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')
    const musicUrl = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${timeStamp}`
    const token = Cookies.get('pa_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(musicUrl, options)
    const musicData = await response.json()
    const updatedEditorsPicks = musicData.playlists.items.map(eachData => ({
      description: eachData.description,
      id: eachData.id,
      imageUrl: eachData.images[0].url,
      name: eachData.name,
    }))
    this.setState({
      musicDetails: updatedEditorsPicks,
    })
  }

  getGenreAndMoods = async () => {
    const genresUrl = 'https://api.spotify.com/v1/browse/categories'
    const token = Cookies.get('pa_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(genresUrl, options)
    if (response.ok === true) {
      const genresData = await response.json()
      const genresAndMoodData = genresData.categories.items.map(eachGenre => ({
        id: eachGenre.id,
        name: eachGenre.name,
        imageUrl: eachGenre.icons[0].url,
        href: eachGenre.href,
      }))
      this.setState({genresMoodDetails: genresAndMoodData})
    }
  }

  getNewReleases = async () => {
    const {userCountryDetails} = this.state
    const country = 'IN'
    const newReleaseUrl = `https://api.spotify.com/v1/browse/new-releases?country=${country}`
    const token = Cookies.get('pa_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(newReleaseUrl, options)
    if (response.ok === true) {
      const newMovieReleaseData = await response.json()
      const newReleaseDetails = newMovieReleaseData.albums.items.map(
        eachMovieSongs => ({
          id: eachMovieSongs.id,
          name: eachMovieSongs.name,
          releaseDate: eachMovieSongs.release_date,
          newReleasePrecision: eachMovieSongs.release_date_precision,
          totalTracks: eachMovieSongs.total_tracks,
          imageUrl1: eachMovieSongs.images[0].url,
          imageUrl2: eachMovieSongs.images[1].url,
          imageUrl3: eachMovieSongs.images[2].url,
        }),
      )
      this.setState({newReleaseData: newReleaseDetails, isLoading: false})
    }
  }

  renderHomepage = () => {
    const {musicDetails, genresMoodDetails, newReleaseData} = this.state
    return (
      <div className="main-container">
        <SideBar />
        <div className="content-container">
          <h1 className="editor-title">Editors Pick</h1>
          <ul className="editor-container">
            {musicDetails.map(eachAlbum => (
              <EditorsPick editorsDetails={eachAlbum} key={eachAlbum.id} />
            ))}
          </ul>

          <h1 className="editor-title">Genres & Moods</h1>
          <ul className="genres-container">
            {genresMoodDetails.map(eachMood => (
              <GenresMood genresDetails={eachMood} key={eachMood.id} />
            ))}
          </ul>

          <h1 className="editor-title">New releases</h1>
          <ul className="new-releases-container">
            {newReleaseData.map(eachAlbum => (
              <NewReleases newDetails={eachAlbum} key={eachAlbum.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? <Loader /> : this.renderHomepage()
  }
}

export default SpotifyClone
