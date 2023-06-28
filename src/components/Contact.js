import React, { Component } from "react";
import ModalOverlay from "./ModalOverlay";
import { motion } from "framer-motion";
import { ImCancelCircle } from "react-icons/im";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.handleEscPress = this.handleEscPress.bind(this);
  }

  handleEscPress(e) {
    if (e.key === "Escape") {
      this.props.handleContactCancel();
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleEscPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEscPress);
  }

  render() {
    return (
      <div className="contact-div">
        <ModalOverlay onClick={this.props.handleContactCancel} />
        <motion.div
          className="contact-modal-content"
          initial={{
            opacity: "0%",
            transform: "scale(0)",
          }}
          animate={{
            opacity: "100%",
            transform: "scale(1)",
          }}
          exit={{
            opacity: "0%",
            transform: "scale(0)",
          }}
        >
          <ImCancelCircle
            className="contact-cancel"
            onClick={this.props.handleContactCancel}
          ></ImCancelCircle>
          <div className="Contact-blur"></div>
          <div className="contact-left">
            <div class="form-heading">Contact Us</div>
            <div className="form-contents">
              <label> Email </label>
              <span>himansupradhan472@gmail.com</span>
              <label> Phone </label>
              <span>+977 182738121</span>
              <div className="contact-Buttons">
                <button>Copy</button>
              </div>
            </div>
          </div>
          <form className="contact-form">
            <div class="form-heading">Leave Contact</div>
            <div className="form-contents">
              <label> Email </label>
              <input type="text" placeholder="Email"></input>
              <label> Phone </label>
              <input type="text" placeholder="Phone"></input>
              <div className="contact-Buttons">
                <button type="submit">Submit</button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }
}

export default Contact;
