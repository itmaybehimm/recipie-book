import React, { PureComponent } from "react";
import makeFirstLetterCap from "../scripts/makeFirstLetterCap";

class CardIngredients extends PureComponent {
  render() {
    return (
      <ul>
        {this.props.ingredients.map((item, index) => {
          return (
            <li className="trending-ingredient card-ingredient" key={index}>
              {makeFirstLetterCap(item.name)}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default CardIngredients;
