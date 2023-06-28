import React, { Component } from "react";
import { FaBars } from "react-icons/fa";
import profilePic from "../images/profile.png";
import { Link } from "react-scroll";
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedin: false,
      height: 0,
    };
  }

  componentDidMount() {
    const offset = document.querySelector(".header").offsetHeight;
    this.setState({
      height: offset,
    });
  }

  render() {
    let headerClass = this.props.isScrolled
      ? "header header-scrolled"
      : "header";

    let loginButtonClass = this.props.isScrolled
      ? "login-button login-button-scrolled"
      : "login-button";

    return (
      <div className={headerClass}>
        <div className="header-left">
          <FaBars
            onClick={this.props.handleHamClick}
            className="hamburger-icon header-icon"
          />
        </div>
        <div className="header-mid">
          <ul className="header-nav-bar">
            <li className="nav-button">
              <Link
                to="Home-div"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
              >
                Home
              </Link>
            </li>

            <li className="nav-button">
              <Link
                to="Trending-div"
                spy={true}
                smooth={true}
                offset={-this.state.height}
                duration={500}
              >
                Trending
              </Link>
            </li>
            <li className="nav-button" onClick={this.props.handleSearchClick}>
              Search
            </li>
            <li className="nav-button">
              <Link
                to="About-div"
                spy={true}
                smooth={true}
                offset={-this.state.height}
                duration={500}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
        <div className="header-right">
          {this.state.isLoggedin ? (
            <img src={profilePic} alt="" className="profile-pic" />
          ) : (
            <button
              className={loginButtonClass}
              onClick={this.props.handleLoginClick}
            >
              Login
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
