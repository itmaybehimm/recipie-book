import React, { Component } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import LoginArea from "../components/LoginArea";
import { AnimatePresence } from "framer-motion";
import Home from "../components/Home";
import About from "../components/About";
import Trending from "../components/Trending";
import SearchArea from "../components/SearchArea";
import Contact from "../components/Contact";
class MainBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSideBarVisible: false,
      isScrolled: false,
      isLoginClicked: false,
      isSearchClicked: false,
      isContactClicked: false,
    };
  }

  handleSideBarCancel = () => {
    this.setState({
      isSideBarVisible: false,
    });
  };

  handleHamClick = () => {
    this.setState({
      isSideBarVisible: true,
    });
  };

  handleLoginClick = () => {
    this.setState({
      isLoginClicked: true,
    });
  };

  handleLoginCancel = () => {
    this.setState({
      isLoginClicked: false,
    });
  };

  handleBodyScroll = () => {
    if (window.scrollY > 30) {
      this.setState({
        isScrolled: true,
      });
    } else {
      this.setState({
        isScrolled: false,
      });
    }
  };

  handleSearchClick = () => {
    this.setState({
      isSearchClicked: true,
    });
  };

  handleSearchCancel = () => {
    this.setState({
      isSearchClicked: false,
    });
  };

  handleContactClick = () => {
    console.log(this.state.isSearchClicked);
    this.setState({
      isContactClicked: true,
    });
  };

  handleContactCancel = () => {
    this.setState({
      isContactClicked: false,
    });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleBodyScroll);
  }

  render() {
    return (
      <>
        <Header
          handleHamClick={this.handleHamClick}
          isScrolled={this.state.isScrolled}
          handleLoginClick={this.handleLoginClick}
          handleSearchClick={this.handleSearchClick}
        />
        <AnimatePresence>
          {this.state.isSideBarVisible && (
            <SideBar
              handleSideBarCancel={this.handleSideBarCancel}
              handleSearchClick={this.handleSearchClick}
              handleContactClick={this.handleContactClick}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {this.state.isLoginClicked && (
            <LoginArea handleLoginCancel={this.handleLoginCancel}></LoginArea>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {this.state.isSearchClicked && (
            <SearchArea
              handleSearchCancel={this.handleSearchCancel}
            ></SearchArea>
          )}
        </AnimatePresence>
        <Home />
        <Trending />
        <About />
        <AnimatePresence>
          {this.state.isContactClicked && (
            <Contact handleContactCancel={this.handleContactCancel}></Contact>
          )}
        </AnimatePresence>
      </>
    );
  }
}

export default MainBody;
