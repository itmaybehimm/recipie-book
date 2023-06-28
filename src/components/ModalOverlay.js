import React, { Component } from "react";
import { motion } from "framer-motion";
class ModalOverlay extends Component {
  componentDidMount() {
    document.querySelector("body").style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.querySelector("body").style.overflow = "auto";
  }
  render() {
    return (
      <motion.div
        className="modal-wrapper"
        initial={{ opacity: "0%" }}
        animate={{ opacity: "30%" }}
        exit={{ opacity: "0%" }}
        onClick={this.props.onClick}
      ></motion.div>
    );
  }
}

export default ModalOverlay;
