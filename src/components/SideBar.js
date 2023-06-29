import React, { Component } from "react";
import { BiArrowBack, BiSolidSearch } from "react-icons/bi";
import { AiFillHome, AiFillFire } from "react-icons/ai";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
import { FaNewspaper } from "react-icons/fa";
import { motion } from "framer-motion";
import ModalOverlay from "./ModalOverlay";
import { Link } from "react-scroll";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.sideBarIconsNav = [
      {
        name: "Home",
        icon: <AiFillHome />,
      },
      {
        name: "About",
        icon: <FaNewspaper />,
      },
      {
        name: "Trending",
        icon: <AiFillFire />,
      },
    ];
    this.sideBarIconsUseCase = [
      {
        name: "Search",
        icon: <BiSolidSearch />,
      },
      {
        name: "Contact",
        icon: <BiSolidPhoneCall />,
      },
    ];
    this.handleEscPress = this.handleEscPress.bind(this);
    this.state = {
      height: 0,
    };
  }

  handleEscPress(e) {
    if (e.key === "Escape") {
      this.props.handleSideBarCancel();
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleEscPress);
    const offset = document.querySelector(".header").offsetHeight;
    this.setState({
      height: offset,
    });
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEscPress);
  }

  render() {
    return (
      <>
        <ModalOverlay onClick={this.props.handleSideBarCancel} />

        <motion.div
          id="side-bar"
          initial={{ transform: "translateX(-100px)" }}
          animate={{ transform: "translateX(0px)" }}
          exit={{ transform: "translateX(-100%)" }}
        >
          <ul className="side-bar-icon-list">
            <li
              onClick={this.props.handleSideBarCancel}
              className="side-bar-icon"
            >
              <BiArrowBack />
              <span>Back</span>
            </li>
            {this.sideBarIconsNav.map((icon, index) => {
              return (
                <li
                  className={"side-bar-icon side-bar-icon-" + icon.name}
                  key={index}
                >
                  <Link
                    to={icon.name + "-div"}
                    smooth={true}
                    offset={icon.name === "Home" ? 0 : -this.state.height}
                    duration={500}
                    onClick={this.props.handleSideBarCancel}
                  >
                    {icon.icon}
                    <span>{icon.name}</span>
                  </Link>
                </li>
              );
            })}
            {this.sideBarIconsUseCase.map((icon, index) => {
              return (
                <li
                  className={"side-bar-icon side-bar-icon-" + icon.name}
                  key={index}
                  onClick={() => {
                    if (icon.name === "Search") {
                      this.props.handleSearchClick();
                    } else if (icon.name === "Contact") {
                      this.props.handleContactClick();
                    }
                    this.props.handleSideBarCancel();
                  }}
                >
                  {icon.icon}
                  <span>{icon.name}</span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </>
    );
  }
}

export default SideBar;
