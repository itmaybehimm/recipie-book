import { Component } from "react";
import "./App.css";

import MainBody from "./pages/MainBody";

import "./styles/header.css";
import "./styles/sidebar.css";
import "./styles/general.css";
import "./styles/footer.css";
import "./styles/mainBody.css";
import "./styles/about-trending.css";
import "./styles/recipie-full-detail.css";
import "./styles/search-area.css";
import "./styles/contact.css";
class App extends Component {
  render() {
    return (
      <div className="App">
        <MainBody></MainBody>
      </div>
    );
  }
}

export default App;
