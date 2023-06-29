import React, { Component } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { AnimatePresence } from "framer-motion";
import Home from "../components/Home";
import About from "../components/About";
import Trending from "../components/Trending";
import SearchArea from "../components/SearchArea";
import Contact from "../components/Contact";
import PageFooter from "../components/PageFooter";

class MainBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSideBarVisible: false,
      isScrolled: false,
      isSearchClicked: false,
      isContactClicked: false,
      isCompressed: false,
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

  handleResize = () => {
    if (window.innerWidth < 600) {
      this.setState({
        isCompressed: true,
      });
    } else {
      this.setState({
        isCompressed: false,
      });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleBodyScroll);
    window.addEventListener("resize", this.handleResize);
    if (window.innerWidth < 600) {
      this.setState({
        isCompressed: true,
      });
    } else {
      this.setState({
        isCompressed: false,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleBodyScroll);
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    return (
      <>
        <Header
          handleHamClick={this.handleHamClick}
          isScrolled={this.state.isScrolled}
          handleContactClick={this.handleContactClick}
          handleSearchClick={this.handleSearchClick}
          isCompressed={this.state.isCompressed}
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

        <PageFooter />
      </>
    );
  }
}

export default MainBody;
