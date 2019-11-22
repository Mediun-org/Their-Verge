import React from "react";
import ReactDOM from "react-dom";
import "../public/style.css";
import $ from "jquery";

class Recommended extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    var that = this;
    var path = window.location.href.split("=");
    var id = path[1];
    $.ajax({
      url: "/recom/" + id,
      type: "GET",
      success: function(data) {
        console.log(data[0].topic);
        that.setState({ items: data });
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div className="recom-container">
        <div className="corner-border-next1">
          <h2 className="recom-header">RECOMMENDED</h2>
        </div>
        <div className="recom-items">
          <ul className="recom-list">
            {this.state.items.map(function(item, i) {
              {
                return (
                  <li key={i} className="recom-li">
                    <img src={item.img_url} className="img-item" />
                    <span className="title-item">{item.title}</span>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<Recommended />, document.getElementById("recom"));
