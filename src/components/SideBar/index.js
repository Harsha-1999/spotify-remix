import {Link} from 'react-router-dom'
import {Component} from 'react'

import {FaMusic} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'
import {AiFillHome} from 'react-icons/ai'
import {RiPlayListFill} from 'react-icons/ri'
import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

class SideBar extends Component {
  render() {
    return (
      <div>
        <nav className="nav-bar-container">
          <Link to="/profile">
            <img
              src="https://res.cloudinary.com/duzbddgog/image/upload/v1628170904/Vector_y0dyuw.png"
              className="side-bar-spotify-logo"
              alt="spotify logo"
            />
          </Link>
          <div>
            <ul className="unordered-elements">
              <Link to="/profile">
                <li className="list">
                  <button type="button" className="button">
                    <CgProfile className="side-bar-logo" />
                    <p className="sidebar-label">Profile</p>
                  </button>
                </li>
              </Link>
              <Link to="/">
                <li className="list">
                  <button type="button" className="button">
                    <AiFillHome className="side-bar-logo" />
                    <p className="sidebar-label">Home</p>
                  </button>
                </li>
              </Link>
              <Link to="/music">
                <li className="list">
                  <button type="button" className="button">
                    <FaMusic className="side-bar-logo" />
                    <p className="sidebar-label">YourMusic</p>
                  </button>
                </li>
              </Link>
              <Link to="/playlists">
                <li className="list">
                  <button type="button" className="button">
                    <RiPlayListFill className="side-bar-logo" />
                    <p className="sidebar-label">Playlists</p>
                  </button>
                </li>
              </Link>
            </ul>
          </div>
        </nav>

        <nav className="mobile-nav-bar">
          <div className="mobile-navbar-container">
            <Link to="/profile">
              <img
                src="https://res.cloudinary.com/duzbddgog/image/upload/v1628170904/Vector_y0dyuw.png"
                alt="spotify logo"
                className="side-bar-spotify-logo"
              />
            </Link>
            <button type="button" className="nav-button">
              <GiHamburgerMenu className="ham-icon" />
            </button>
          </div>
        </nav>
      </div>
    )
  }
}

export default SideBar
