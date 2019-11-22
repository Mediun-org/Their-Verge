import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import List from "./components/List.jsx";
import "../public/style.css";
class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <List />
      </div>
    );
  }
}
ReactDOM.render(<Article />, document.getElementById("deals"));
