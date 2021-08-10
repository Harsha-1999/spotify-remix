import {Component} from 'react'

import {Link} from 'react-router-dom'

import {MdArrowBack} from 'react-icons/md'
import SideBar from '../SideBar'

import './index.css'

class PlaylistsItemDetails extends Component {
  state = {playlistBasicInfo: [], allTracksInfo: []}

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
    const jwtToken =
      'BQArmAomBQqA9jYw8yhQLnAlz804BhPGdZP5F458AiQaYHHyH8IIcstxAGKXeEXNmbkw4F25nass4UE7PdERTmCwDUsgKDHOcEP5m9YHwd0sE-GelFzCTO2Xvzi1VO1uuxYZFuXWHnPV_QeOCioWXaierCDSQCOLv90H_ebPiR4CotB3Z76x2fUKJANqlFXwyusjRsYcDgx_EVEe1wNnNpujoC_hU1nfWN7zyGpUcTv-6fxnJph4ZcYoIVcRmE6sNTA-3XtDv7r0EMhvQg'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const playlistListItemData = await response.json()
    const basicInfo = this.getBasicInfo(playlistListItemData)
    const tracksInfo = playlistListItemData.tracks.items.map(eachTrack => ({}))
    this.setState({playlistBasicInfo: basicInfo})
  }

  render() {
    const {playlistBasicInfo} = this.state
    return (
      <div className="playlist-page-details">
        <SideBar />
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
        </div>
      </div>
    )
  }
}

export default PlaylistsItemDetails
