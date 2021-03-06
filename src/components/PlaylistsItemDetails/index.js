import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import {MdArrowBack} from 'react-icons/md'
import SideBar from '../SideBar'
import DisplaySongs from '../DisplaySongs'
import Loader from '../Loader'
import MediaPlayer from '../MediaPlayer'

import './index.css'

class PlaylistsItemDetails extends Component {
  state = {playlistBasicInfo: [], allTracksInfo: [], isLoading: true}

  componentDidMount() {
    this.getPlaylistItemDetails()
  }

  getBasicInfo = data => ({
    description: data.description,
    followersCount: data.followers.total,
    id: data.id,
    image: data.images[0].url,
    name: data.name,
  })

  getPlaylistItemDetails = async () => {
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
    const playlistListItemData = await response.json()
    console.log(playlistListItemData)
    const basicInfo = this.getBasicInfo(playlistListItemData)
    const tracksInfo = playlistListItemData.tracks.items.map(eachTrack => ({
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
      playlistBasicInfo: basicInfo,
      allTracksInfo: tracksInfo,
      isLoading: false,
    })
  }

  renderPlaylistItemDetails = () => {
    const {playlistBasicInfo, allTracksInfo} = this.state
    return (
      <div className="playlist-page-details">
        <SideBar />
        <div>
          <div className="playlist-page-content-container">
            <Link to="/">
              <button className="back-icon-container" type="button">
                <MdArrowBack className="back-icon" />
                <p className="back-text">Back</p>
              </button>
            </Link>
            <div className="playlists-page-image-text-container">
              <img
                src={playlistBasicInfo.image}
                alt="playlist-poster"
                className="playlist-page-poster"
              />
              <div>
                <p className="playlists-page-sub-heading">Editors picks</p>
                <h1 className="playlists-page-heading">
                  {playlistBasicInfo.name}
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
              {allTracksInfo.map(eachTrack => (
                <DisplaySongs listDetails={eachTrack} key={eachTrack.id} />
              ))}
            </ol>
          </div>
          <MediaPlayer />
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? <Loader /> : this.renderPlaylistItemDetails()
  }
}

export default PlaylistsItemDetails
