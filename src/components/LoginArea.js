import React, { Component } from "react";
import { ImCancelCircle } from "react-icons/im";
import { motion } from "framer-motion";
import ModalOverlay from "./ModalOverlay";

class LoginArea extends Component {
  constructor(props) {
    super(props);
    this.handleEscPress = this.handleEscPress.bind(this);
  }

  handleEscPress(e) {
    if (e.key === "Escape") {
      this.props.handleLoginCancel();
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
      <div className="login-div">
        <ModalOverlay onClick={this.props.handleLoginCancel} />
        <motion.div
          className="login-modal-content"
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
          <div className="login-image"></div>
          <form className="login-form">
            <ImCancelCircle
              className="login-cancel"
              onClick={this.props.handleLoginCancel}
            ></ImCancelCircle>
            <div class="form-heading">Login</div>
            <div className="form-contents">
              <label> Username </label>
              <input type="text" placeholder="Username"></input>
              <label> Password </label>
              <input type="password" placeholder="Password"></input>
              <div className="Login-Buttons">
                <button type="submit">Login</button>
                <button>SignUp</button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }
}

export default LoginArea;
