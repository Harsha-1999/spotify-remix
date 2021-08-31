import './index.css'

const MediaPlayer = () => (
  <div className="media-player-container">
    <audio controls>
      <source src="https://p.scdn.co/mp3-preview/db40ab496ac6cbfdc8b87e8ecf2032b18073b1e5?cid=f25d283eae8046588034aee0a42c0f31" />
      <track src="captions_en.vtt" kind="captions" />
    </audio>
  </div>
)

export default MediaPlayer
