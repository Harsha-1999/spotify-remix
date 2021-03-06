import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SpotifyClone from './components/SpotifyClone'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './components/Profile'
import YourMusic from './components/YourMusic'
import Playlists from './components/Playlists'
import PlaylistsItemDetails from './components/PlaylistsItemDetails'
import CategoriesList from './components/CategoriesList'
import NewReleasesAlbumSongs from './components/NewReleasesAlbumSongs'
import PodcastDetailsPage from './components/PodcastDetailsPage'
import MyPlaylists from './components/MyPlaylists'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={SpotifyClone} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/music" component={YourMusic} />
      <ProtectedRoute exact path="/playlists" component={Playlists} />
      <ProtectedRoute exact path="/categories/:id" component={CategoriesList} />
      <ProtectedRoute
        exact
        path="/playlists/:id"
        component={PlaylistsItemDetails}
      />
      <ProtectedRoute
        exact
        path="/newreleases/:id"
        component={NewReleasesAlbumSongs}
      />
      <ProtectedRoute
        exact
        path="/podcasts/:id"
        component={PodcastDetailsPage}
      />
      <ProtectedRoute exact path="/myplaylists/:id" component={MyPlaylists} />
    </Switch>
  </BrowserRouter>
)

export default App
