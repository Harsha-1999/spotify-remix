import {Component} from 'react'
import PlaylistItem from '../PlaylistItem'
import SideBar from '../SideBar'
import './index.css'

class Playlists extends Component {
  state = {userDetails: {}, playlistsDetails: []}

  componentDidMount() {
    this.getUserInfo()
    this.getPlaylistsOfUser()
  }

  getFormattedData = data => ({
    displayName: data.display_name,
    followersCount: data.followers.total,
    country: data.country,
    username: data.id,
  })

  getUserInfo = async () => {
    const apiUrl = 'https://api.spotify.com/v1/me'
    const jwtToken =
      'BQArmAomBQqA9jYw8yhQLnAlz804BhPGdZP5F458AiQaYHHyH8IIcstxAGKXeEXNmbkw4F25nass4UE7PdERTmCwDUsgKDHOcEP5m9YHwd0sE-GelFzCTO2Xvzi1VO1uuxYZFuXWHnPV_QeOCioWXaierCDSQCOLv90H_ebPiR4CotB3Z76x2fUKJANqlFXwyusjRsYcDgx_EVEe1wNnNpujoC_hU1nfWN7zyGpUcTv-6fxnJph4ZcYoIVcRmE6sNTA-3XtDv7r0EMhvQg'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const formattedData = this.getFormattedData(fetchedData)
    this.setState({userDetails: formattedData})
  }

  getPlaylistsOfUser = async () => {
    const {userDetails} = this.state
    const username = '	rlpkiixmmwq9sgvu834xy5ex2'

    const playlistsUrl = `https://api.spotify.com/v1/users/${username}/playlists?limit=50`
    const jwtToken =
      'BQArmAomBQqA9jYw8yhQLnAlz804BhPGdZP5F458AiQaYHHyH8IIcstxAGKXeEXNmbkw4F25nass4UE7PdERTmCwDUsgKDHOcEP5m9YHwd0sE-GelFzCTO2Xvzi1VO1uuxYZFuXWHnPV_QeOCioWXaierCDSQCOLv90H_ebPiR4CotB3Z76x2fUKJANqlFXwyusjRsYcDgx_EVEe1wNnNpujoC_hU1nfWN7zyGpUcTv-6fxnJph4ZcYoIVcRmE6sNTA-3XtDv7r0EMhvQg'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(playlistsUrl, options)
    const playlistData = await response.json()
    const ownPlaylistsData = playlistData.items.map(eachPlaylist => ({
      id: eachPlaylist.id,
      name: eachPlaylist.name,
      imageUrl1: eachPlaylist.images[0].url,
      imageUrl2: eachPlaylist.images[1].url,
      imageUrl3: eachPlaylist.images[2].url,
      count: eachPlaylist.tracks.total,
    }))
    this.setState({playlistsDetails: ownPlaylistsData})
  }

  render() {
    const {playlistsDetails} = this.state

    return (
      <div className="playlists-page-container">
        <SideBar />
        <div className="playlists-container">
          <h1 className="playlists-page-main-heading">Your Playlists</h1>
          <ul className="playlist-page-unordered-list">
            {playlistsDetails.map(playlist => (
              <PlaylistItem playlistDetails={playlist} key={playlist.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Playlists
