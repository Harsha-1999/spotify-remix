import {Component} from 'react'
import Cookies from 'js-cookie'
import SideBar from '../SideBar'
import SongsItem from '../songsItem'
import Loader from '../Loader'
import './index.css'

class YourMusic extends Component {
  state = {likedSongs: [], isLoading: true}

  componentDidMount() {
    this.getMusicDetails()
  }

  getMusicDetails = async () => {
    const apiUrl = 'https://api.spotify.com/v1/me/tracks'
    const token = Cookies.get('pa_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const musicData = await response.json()
    console.log(musicData)
    const musicDetails = musicData.items.map(eachSong => ({
      songName: eachSong.track.name,
      songUrl: eachSong.track.preview_url,
      duration: eachSong.track.duration_ms,
      movieName: eachSong.track.album.name,
      imageUrl: eachSong.track.album.images[1].url,
      releaseDate: eachSong.track.album.release_date,
      id: eachSong.track.id,
      movieId: eachSong.track.album.id,
      artistName: eachSong.track.artists[0].name,
      artistId: eachSong.track.artists[0].id,
    }))
    this.setState({likedSongs: musicDetails, isLoading: false})
  }

  renderMusicPage = () => {
    const {likedSongs} = this.state
    return (
      <div className="music-page-container">
        <SideBar />
        <div className="music-album-container">
          <h1 className="music-page-main-heading">Your Music</h1>
          <ul>
            {likedSongs.map(eachSong => (
              <SongsItem songDetails={eachSong} key={eachSong.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? <Loader /> : this.renderMusicPage()
  }
}

export default YourMusic
