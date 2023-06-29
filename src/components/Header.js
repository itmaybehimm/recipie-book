import React, { Component } from "react";
import { FaBars } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
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

    let headerButtonClass = this.props.isScrolled
      ? "header-button-scrolled"
      : "";

    let headerButtonClassForSearch = this.props.isScrolled
      ? "header-search-button-scrolled"
      : "";

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
          {this.props.isCompressed ? (
            <button
              className={"header-search-button " + headerButtonClassForSearch}
              onClick={this.props.handleSearchClick}
            >
              <BiSearchAlt2 className={"header-icon"}></BiSearchAlt2>
            </button>
          ) : (
            <button
              className={"header-button  " + headerButtonClass}
              onClick={this.props.handleContactClick}
            >
              Contact
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
