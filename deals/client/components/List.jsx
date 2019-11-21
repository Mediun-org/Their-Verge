import React, { Component } from "react";
import $ from "jquery";


export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deals: []
    };
  }
  componentDidMount(){
    this.getData();
  }
  getData(){
    console.log(this.state.data);
    var that = this;
    var path = window.location.href.split("=");
    var id = path[1];
    console.log(id);
    
    $.ajax({
      url: "/deals/"+id,
      type: "GET",
      data:this.state,
      success: function (data) {
        this.setState({
           deals: data
        })
      }.bind(this),
      error: function (err) {
        console.log("error");
      }
    });
  }
  
  render() {
    return (
      <div className="l-col__sidebar">
        <div className="c-list">
            <h3 className="c-list__title">
                <span className="c-list__title-wrapper">
                <a href="/good-deals">
                <span className="c-list__title-text">
                Good Deals
                </span>
                </a>
                </span>
            </h3>
            <div className="c-list__body">
              <ol className="orderedlist">
                <div>
                  {this.state.deals.map(item => {
                    return <li key={item.id}>
                    <a href="#" className="c-list__link" >
                        <img className="c-list__image" src={item.img_url}></img>
                      <span className="c-title">{item.title}</span>
                    </a>
                  </li> 
                  })} 
                </div> 
              </ol>
            </div>  
            <div className="c-list__cta">
              <a className="c-list__more" href="/good-deals">More in Good Deals</a>
            </div>
        </div>
      </div>
    );
  }
}
