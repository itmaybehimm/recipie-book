import React, { PureComponent } from "react";
import CardIngredients from "./CardIngredients";
import { TrendingConsumer } from "../scripts/trendingContext";
import ModalOverlay from "./ModalOverlay";
import RecipieDetails from "./RecipieDetails";
import { AnimatePresence } from "framer-motion";
import makeFirstLetterCap from "../scripts/makeFirstLetterCap.js";

class Trending extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRecipieButtonClicked: false,
      viewRecipieNumber: null,
    };
    this.handleRecipieClickFromTrending =
      this.handleRecipieClickFromTrending.bind(this);
  }
  componentDidMount() {
    if (this.dataForTrending !== null) {
      document
        .querySelectorAll(".trending-card-image")
        .forEach((image, index) => {
          image.style.backgroundImage = `url(${this.dataForTrending.recipes[index].image})`;
        });
    }
  }
  handleRecipieClickFromTrending(event) {
    const index = Number(event.target.classList[0].slice(-1));
    this.setState({
      isRecipieButtonClicked: true,
      viewRecipieNumber: index,
    });
  }
  handleRecipieViewCancel = () => {
    this.setState({
      isRecipieButtonClicked: false,
      viewRecipieNumber: null,
    });
  };
  render() {
    return (
      <>
        <TrendingConsumer>
          {(dataForTrending) => {
            this.dataForTrending = dataForTrending;

            if (dataForTrending === null) return <></>;
            return (
              <div id="Trending-div">
                <div className="add-blur"></div>
                <h1>Trending</h1>

                <div className="trending-cards-container cards-container">
                  {dataForTrending.recipes.map((item, index) => {
                    return (
                      <div
                        key={item.id}
                        className={"trending-card card trending-card-" + index}
                      >
                        <div
                          className={
                            "trending-card-image card-image trending-card-image-" +
                            index
                          }
                        >
                          <div>{makeFirstLetterCap(item.title)}</div>
                        </div>
                        <div
                          className={
                            "trending-card-info card-info trending-card-info-" +
                            index
                          }
                        >
                          <h1>
                            {" "}
                            &#x2666; {makeFirstLetterCap(item.name)} &#x2666;
                          </h1>
                          <span>
                            &#x2022; <p>Ingredients </p> &#x2022;
                          </span>
                          <div className="card-ingredients">
                            <CardIngredients
                              ingredients={item.extendedIngredients}
                            ></CardIngredients>
                          </div>
                          <button
                            onClick={this.handleRecipieClickFromTrending}
                            className={"recipie-trending-button-" + index}
                          >
                            Recipie
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }}
        </TrendingConsumer>
        <AnimatePresence>
          {this.state.isRecipieButtonClicked && (
            <>
              <ModalOverlay onClick={this.handleRecipieViewCancel} />
              <RecipieDetails
                handleRecipieViewCancel={this.handleRecipieViewCancel}
                data={
                  this.dataForTrending.recipes[this.state.viewRecipieNumber]
                }
              />
            </>
          )}
        </AnimatePresence>
      </>
    );
  }
}

export default Trending;
