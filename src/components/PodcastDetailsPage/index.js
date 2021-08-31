import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {Component} from 'react'
import {MdArrowBack} from 'react-icons/md'

import Sidebar from '../SideBar'
import PodcastItem from '../PodcastItem'
import MediaPlayer from '../MediaPlayer'
import Loader from '../Loader'

import './index.css'

class PodcastDetailsPage extends Component {
  state = {podcastImageInfo: [], podcastSongInfo: [], isLoading: true}

  componentDidMount() {
    this.getMusicDetails()
  }

  getBasicImageInfo = data => ({
    description: data.description,
    followersCount: data.followers.total,
    id: data.id,
    image: data.images[0].url,
    name: data.name,
    tracksCount: data.tracks.total,
  })

  getMusicDetails = async () => {
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
    const podcastSongsDetails = await response.json()
    console.log(podcastSongsDetails)
    const basicInfo = this.getBasicImageInfo(podcastSongsDetails)
    const tracksInfo = podcastSongsDetails.tracks.items.map(eachTrack => ({
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
      podcastImageInfo: basicInfo,
      podcastSongInfo: tracksInfo,
      isLoading: false,
    })
  }

  renderPodcastMusicList = () => {
    const {podcastImageInfo, podcastSongInfo} = this.state
    return (
      <div className="podcast-page-container">
        <Sidebar />
        <div className="media-player-page">
          <div className="podcast-playlist-details-container">
            <Link to="/">
              <button className="back-icon-container" type="button">
                <MdArrowBack className="back-icon" />
                <p className="back-text">Back</p>
              </button>
            </Link>
            <div className="playlists-page-image-text-container">
              <img
                src={podcastImageInfo.image}
                alt="playlist-poster"
                className="playlist-page-poster"
              />
              <div>
                <p className="playlists-page-sub-heading">#podcasts</p>
                <p className="tracks-count">
                  {podcastImageInfo.tracksCount} Tracks
                </p>
                <h1 className="playlists-page-heading">
                  {podcastImageInfo.name}
                </h1>
              </div>
            </div>
            <ol className="new-ordered-list">
              <li className="tracks-list-name-container">
                <p className="songs-headings">Track</p>
                <p className="songs-headings">Album</p>
                <p className="songs-headings">Time</p>
                <p className="songs-headings">Artist</p>
                <p className="songs-headings">Added</p>
              </li>
              <hr className="horizontal-line" />
              {podcastSongInfo.map(eachTrack => (
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
    return isLoading ? <Loader /> : this.renderPodcastMusicList()
  }
}

export default PodcastDetailsPage
