import {Component} from 'react'
import Cookies from 'js-cookie'
import PlaylistItem from '../PlaylistItem'
import SideBar from '../SideBar'
import Loader from '../Loader'
import './index.css'

class Playlists extends Component {
  state = {userDetails: {}, playlistsDetails: [], isLoading: true}

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

  getPlaylistsOfUser = async () => {
    const {userDetails} = this.state
    const username = '	rlpkiixmmwq9sgvu834xy5ex2'

    const playlistsUrl = `https://api.spotify.com/v1/users/${username}/playlists?limit=50`
    const token = Cookies.get('pa_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
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
    this.setState({playlistsDetails: ownPlaylistsData, isLoading: false})
  }

  renderPlaylistPage = () => {
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

  render() {
    const {isLoading} = this.state
    return isLoading ? <Loader /> : this.renderPlaylistPage()
  }
}

export default Playlists
