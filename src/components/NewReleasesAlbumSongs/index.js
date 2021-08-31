import {Component} from 'react'

import {Link} from 'react-router-dom'

import {MdArrowBack} from 'react-icons/md'
import Cookies from 'js-cookie'
import NewReleaseSongItem from '../NewReleaseSongItem'
import Sidebar from '../SideBar'
import Loader from '../Loader'

import './index.css'

class NewReleasesAlbumSongs extends Component {
  state = {newAlbumImage: [], newAlbumDetails: [], isLoading: true}

  componentDidMount() {
    this.getNewReleaseAlbum()
  }

  getBasicImageInfo = data => ({
    albumId: data.id,
    albumImage: data.images[1].url,
    albumName: data.name,
    artistsName: data.artists[0].name,
    popularity: data.popularity,
    totalTracks: data.total_tracks,
  })

  getNewReleaseAlbum = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('pa_token')
    const url = `https://api.spotify.com/v1/albums/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const newData = await response.json()
    console.log(newData)
    const basicImageInfo = this.getBasicImageInfo(newData)
    const songAlbumDetails = newData.tracks.items.map(eachSong => ({
      songName: eachSong.name,
      id: eachSong.id,
      duration: eachSong.duration_ms,
      songUrl: eachSong.preview_url,
    }))
    this.setState({
      newAlbumImage: basicImageInfo,
      newAlbumDetails: songAlbumDetails,
      isLoading: false,
    })
  }

  renderNewReleaseList = () => {
    const {newAlbumImage, newAlbumDetails} = this.state
    return (
      <div className="newreleases-specific-album-container">
        <Sidebar />
        <div className="newrelease-page-content">
          <Link to="/">
            <button className="back-icon-container" type="button">
              <MdArrowBack className="back-icon" />
              <p className="back-text">Back</p>
            </button>
          </Link>
          <div className="newrelease-page-image-container">
            <img
              src={newAlbumImage.albumImage}
              alt="movie poster"
              className="newreleases-page-poster"
            />
            <div>
              <p className="newreleases-page-sub-heading">New Releases</p>
              <h1 className="newreleases-page-heading">
                {newAlbumImage.albumName}
              </h1>
              <p className="newreleases-page-artist">
                {newAlbumImage.artistsName}
              </p>
            </div>
          </div>
          <ol className="orderedlist-newrelease">
            <li className="new-releases-list-heading">
              <p className="new-heading">Track</p>
              <p className="new-heading">Time</p>
            </li>
            <hr className="horizontal-line" />
            {newAlbumDetails.map(eachSong => (
              <NewReleaseSongItem key={eachSong.id} newSongDetails={eachSong} />
            ))}
          </ol>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? <Loader /> : this.renderNewReleaseList()
  }
}

export default NewReleasesAlbumSongs
