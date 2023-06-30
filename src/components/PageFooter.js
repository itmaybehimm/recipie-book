import React, { Component } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { BsFacebook, BsInstagram, BsLinkedin, BsGithub } from "react-icons/bs";
class PageFooter extends Component {
  constructor(props) {
    super(props);

    this.logoArray = [
      <BsFacebook />,
      <BsInstagram />,
      <BsLinkedin />,
      <BiLogoGmail />,
      <BsGithub />,
    ];
    this.logoLink = [
      "https://www.facebook.com/himansupradhan472?mibextid=LQQJ4d",
      "https://www.instagram.com/itmaybehimm/",
      "https://www.linkedin.com/in/himanshu-pradhan-780aa415a",
      "https://mail.google.com/mail/?view=cm&fs=1&to=himansupradhan472@gmail.com",
      "https://github.com/itmaybehimm",
    ];
  }
  render() {
    return (
      <div className="footer">
        <div className="footer-blur"></div>
        <div className="footer-left">
          <div className="mail-me">Mail:</div>
          <div className="mail">
            44600, THE KATHMANDU MAIL , KATHMANDU , NEPAL{" "}
          </div>
          <div className="contact">CONTACT:</div>
          <div className="logos">
            {this.logoArray.map((item, index) => {
              return (
                <a
                  key={index}
                  id="index"
                  href={this.logoLink[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.logoArray[index]}
                </a>
              );
            })}
          </div>
        </div>
        <div className="footer-right">
          <div className="email">Email:</div>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=himansupradhan472@gmail.com"
            className="email-add"
            target="_blank"
            rel="noopener noreferrer"
          >
            himansupradhan472@gmail.com
          </a>
          <div className="copyright-text">
            &copy; Copyright 2023, Himanshu Pradhan
          </div>
        </div>
      </div>
    );
  }
}

export default PageFooter;
