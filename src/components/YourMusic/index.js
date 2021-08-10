import {Component} from 'react'
import SideBar from '../SideBar'
import './index.css'

class YourMusic extends Component {
  state = {likedSongs: []}

  componentDidMount() {
    this.getMusicDetails()
  }

  getMusicDetails = async () => {
    const apiUrl = 'https://api.spotify.com/v1/me/tracks'
    const jwtToken =
      'BQArmAomBQqA9jYw8yhQLnAlz804BhPGdZP5F458AiQaYHHyH8IIcstxAGKXeEXNmbkw4F25nass4UE7PdERTmCwDUsgKDHOcEP5m9YHwd0sE-GelFzCTO2Xvzi1VO1uuxYZFuXWHnPV_QeOCioWXaierCDSQCOLv90H_ebPiR4CotB3Z76x2fUKJANqlFXwyusjRsYcDgx_EVEe1wNnNpujoC_hU1nfWN7zyGpUcTv-6fxnJph4ZcYoIVcRmE6sNTA-3XtDv7r0EMhvQg'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const musicData = await response.json()
    console.log(musicData)
    const musicDetails = musicData.items.map(eachSong => ({
      songName: eachSong.track.name,
      songUrl: eachSong.track.preview_url,
      duration: eachSong.track.duration_ms,
      movieName: eachSong.track.album.name,
      imageUrl: eachSong.track.album.images[0].url,
      releaseDate: eachSong.track.album.release_date,
      id: eachSong.track.id,
      movieId: eachSong.track.album.id,
      artistName: eachSong.track.artists[0].name,
      artistId: eachSong.track.artists[0].id,
    }))
    this.setState({likedSongs: musicDetails})
  }

  render() {
    const {likedSongs} = this.state
    return (
      <div className="music-page-container">
        <SideBar />
        <div className="music-album-container">
          <h1 className="music-page-main-heading">Your Music</h1>
        </div>
      </div>
    )
  }
}

export default YourMusic
