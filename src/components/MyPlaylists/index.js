import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import {MdArrowBack} from 'react-icons/md'
import Sidebar from '../SideBar'
import PodcastItem from '../PodcastItem'
import Loader from '../Loader'
import MediaPlayer from '../MediaPlayer'

import './index.css'

class MyPlaylists extends Component {
  state = {basicplaylistImage: [], detailedPlaylistinfo: [], isLoading: true}

  componentDidMount() {
    this.getMyPlaylistsDetails()
  }

  getBasicInfo = data => ({
    description: data.description,
    followersCount: data.followers.total,
    id: data.id,
    image: data.images[0].url,
    name: data.name,
    tracksCount: data.tracks.total,
  })

  getMyPlaylistsDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://api.spotify.com/v1/users/spotify/playlists/${id}`
    const token = Cookies.get('pa_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const myPlaylistData = await response.json()
    const basicplaylistInfo = this.getBasicInfo(myPlaylistData)
    const tracksInfo = myPlaylistData.tracks.items.map(eachTrack => ({
      addedAt: eachTrack.added_at,
      artist: eachTrack.track.artists[0].name,
      id: eachTrack.track.id,
      duration: eachTrack.track.duration_ms,
      name: eachTrack.track.name,
      songUrl: eachTrack.track.preview_url,
      albumName: eachTrack.track.album.name,
      trackNumber: eachTrack.track.track_number,
    }))
    this.setState({
      basicplaylistImage: basicplaylistInfo,
      detailedPlaylistinfo: tracksInfo,
      isLoading: false,
    })
  }

  renderMyPlaylistSongsList = () => {
    const {basicplaylistImage, detailedPlaylistinfo} = this.state
    return (
      <div className="my-playlists-page-container">
        <Sidebar />
        <div className="media-player-page">
          <div className="myplaylists-content-container">
            <Link to="/playlists">
              <button className="back-icon-container" type="button">
                <MdArrowBack className="back-icon" />
                <p className="back-text">Back</p>
              </button>
            </Link>
            <div className="playlists-page-image-text-container">
              <img
                src={basicplaylistImage.image}
                alt="playlist-poster"
                className="playlist-page-poster"
              />
              <div>
                <p className="playlists-page-sub-heading">#podcasts</p>
                <p className="tracks-count">
                  {basicplaylistImage.tracksCount} Tracks
                </p>
                <h1 className="playlists-page-heading">
                  {basicplaylistImage.name}
                </h1>
              </div>
            </div>
            <ol className="ordered-list">
              <li className="tracks-list-name-container">
                <p className="songs-headings">Track</p>
                <p className="songs-headings">Album</p>
                <p className="songs-headings">Time</p>
                <p className="songs-headings">Artist</p>
                <p className="songs-headings">Added</p>
              </li>
              <hr className="horizontal-line" />
              {detailedPlaylistinfo.map(eachTrack => (
                <PodcastItem podcastDetails={eachTrack} key={eachTrack.id} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? <Loader /> : this.renderMyPlaylistSongsList()
  }
}

export default MyPlaylists
