import React, { Component } from "react";
import { motion } from "framer-motion";
import makeFirstLetterCap from "../scripts/makeFirstLetterCap";
import { ImCancelCircle } from "react-icons/im";
class RecipieDetails extends Component {
  constructor(props) {
    super(props);

    this.handleEscPress = this.handleEscPress.bind(this);
  }
  handleEscPress(e) {
    if (e.key === "Escape") {
      this.props.handleRecipieViewCancel();
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleEscPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEscPress);
  }

  render() {
    const { data } = this.props;
    return (
      <motion.div
        className="recipie-full-detail"
        initial={{
          transform: "scale(0)",
        }}
        animate={{
          transform: "scale(1)",
        }}
        exit={{
          transform: "scale(0)",
        }}
      >
        <ImCancelCircle
          onClick={this.props.handleRecipieViewCancel}
          className="cancel-button"
        ></ImCancelCircle>
        <h1>&#x2666; Ingredients &#x2666; </h1>
        <div className="recipie-view-ingredients">
          {data.extendedIngredients.length === 0 ? (
            <h1>Unavilable</h1>
          ) : (
            data.extendedIngredients.map((item, index) => {
              return (
                <span key={index}>
                  &#x2022; {makeFirstLetterCap(item.name)} &#x2022;
                </span>
              );
            })
          )}
        </div>
        <h1>&#x2666; Instructions &#x2666;</h1>
        <ul className="recipie-view-instructions">
          {data.analyzedInstructions.length === 0 ? (
            <h1>Unavailable</h1>
          ) : (
            data.analyzedInstructions[0].steps.map((item, index) => {
              return <li key={index}>{makeFirstLetterCap(item.step)}</li>;
            })
          )}
        </ul>
      </motion.div>
    );
  }
}

export default RecipieDetails;
