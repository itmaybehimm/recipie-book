import React, { PureComponent } from "react";
import ModalOverlay from "./ModalOverlay";
import { AnimatePresence, motion } from "framer-motion";
import getDataFromApi from "../scripts/dataFromApi";
import CardIngredients from "./CardIngredients";
import makeFirstLetterCap from "../scripts/makeFirstLetterCap";
import RecipieDetails from "./RecipieDetails";
class SearchArea extends PureComponent {
  constructor(props) {
    super(props);

    this.searchRef = React.createRef();
    this.handleKeyPressSearch = this.handleKeyPressSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      isResultReady: false,
      isSearching: null,
      isSearchValid: null,
      searchRecipie: null,
      searchData: null,
      isRecipieButtonClicked: false,
      viewRecipieNumber: null,
    };
  }

  async handleSearch(e) {
    if (e.key === "Enter") {
      const val = e.target.value.toLowerCase();
      await this.setState({
        isResultReady: false,
        isSearchValid: true,
        isSearching: true,
        searchRecipie: val,
      });
      const apiKey = "60f59ee313784aba8db8b3845e70df49";
      let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${this.state.searchRecipie}&number=5`;
      let data = await getDataFromApi(url);
      let listOfId = null;
      if (data === null || data.totalResults === 0) {
        this.setState({
          isSearchValid: false,
          isResultReady: false,
        });
        return;
      }
      listOfId = data.results.reduce((acc, item) => {
        return acc + item.id + ",";
      }, "");
      listOfId = listOfId.slice(0, -1);

      url = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${apiKey}&ids=${listOfId}`;
      data = await getDataFromApi(url);
      if (data !== null) {
        this.setState({
          isResultReady: true,
          isSearchValid: true,
        });
        this.dataForSearch = data;
      }
    }
  }
  handleRecipieClickForSearch = (event) => {
    const index = Number(event.target.classList[0].slice(-1));
    this.setState({
      isRecipieButtonClicked: true,
      viewRecipieNumber: index,
    });
  };
  componentDidMount() {
    this.searchRef.current.focus();
    window.addEventListener("keypress", this.handleKeyPressSearch);
    console.log(this.state.isSearchValid);
  }

  componentDidUpdate() {
    if (this.state.isResultReady) {
      document
        .querySelectorAll(".search-card-image")
        .forEach((image, index) => {
          image.style.backgroundImage = `url(${this.dataForSearch[index].image})`;
        });
    }
  }
  handleRecipieViewCancel = () => {
    this.setState({
      isRecipieButtonClicked: false,
      viewRecipieNumber: null,
    });
  };

  handleKeyPressSearch(e) {
    if (e.key === "Escape") {
      if (this.state.isRecipieButtonClicked === true) {
        this.setState({
          isRecipieButtonClicked: false,
        });
      } else {
        this.setState({
          isSearching: false,
          searchRecipie: null,
        });
        this.props.handleSearchCancel();
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keypress", this.handleKeyPressSearch);
  }

  render() {
    const offset = document.querySelector(".header").offsetHeight + "px";
    return (
      <>
        <ModalOverlay onClick={this.handleSearchCancel}> </ModalOverlay>
        <motion.div className="search-area">
          <motion.div
            className="search-bar"
            initial={{
              top: "-100px",
              opacity: "0px",
            }}
            animate={{
              top: `${offset}`,
            }}
            exit={{
              top: "-100px",
            }}
          >
            <input
              ref={this.searchRef}
              type="input"
              placeholder="Search"
              onKeyDown={this.handleSearch}
            ></input>
          </motion.div>

          <motion.div
            className="search-result-area"
            animate={{
              transform: "translateX(0px)",
            }}
            exit={{
              transform: "translateX(100%)",
            }}
          >
            <div className="search-blur"></div>
            {this.state.isSearchValid === null ? (
              <></>
            ) : (
              this.state.isSearchValid || <h1>Invalid Search</h1>
            )}
            {this.state.isResultReady && (
              <div className="search-card-container cards-container">
                {this.dataForSearch.map((item, index) => {
                  return (
                    <motion.div
                      key={item.id}
                      className={"search-card card search-card-" + index}
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
                        transform: "translateX(100%)",
                      }}
                    >
                      <div
                        className={
                          "search-card-image card-image search-card-image-" +
                          index
                        }
                      >
                        <div>{makeFirstLetterCap(item.title)}</div>
                      </div>
                      <div
                        className={
                          "search-card-info card-info search-card-info-" + index
                        }
                      >
                        <h1>
                          {" "}
                          &#x2666; {makeFirstLetterCap(item.dishTypes[0])}{" "}
                          &#x2666;
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
                          onClick={this.handleRecipieClickForSearch}
                          className={"recipie-search-button-" + index}
                        >
                          Recipie
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
        <AnimatePresence>
          {this.state.isRecipieButtonClicked && (
            <>
              <RecipieDetails
                handleRecipieViewCancel={this.handleRecipieViewCancel}
                data={this.dataForSearch[this.state.viewRecipieNumber]}
              />
            </>
          )}
        </AnimatePresence>
      </>
    );
  }
}

export default SearchArea;
