import {Component} from 'react'
import SideBar from '../SideBar'

import './index.css'

class Profile extends Component {
  state = {userDetails: {}}

  componentDidMount() {
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

  render() {
    const {userDetails} = this.state
    const {displayName, followersCount} = userDetails
    return (
      <div className="profile-page-container">
        <SideBar />
        <div className="profile-container">
          <div className="user-info-container">
            <div className="image-container">
              <img
                src="https://res.cloudinary.com/duzbddgog/image/upload/v1628246871/main_profile_yxlzc6.png"
                className="profile-image"
                alt="profile"
              />
            </div>
            <h1 className="username">{displayName}</h1>
            <div className="counts-container">
              <p className="follower-count">{followersCount}</p>
              <p className="playlists-count">0</p>
            </div>
            <div className="counts-container">
              <p className="profile-followers">FOLLOWERS</p>
              <p className="profile-playlists">PLAYLISTS</p>
            </div>
            <button className="logout-btn" type="button">
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
