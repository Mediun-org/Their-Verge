import React, { Component } from "react";
export default class Next extends Component {
    constructor(props) {
        super(props);
        
        
      }
    render() {
        return (
            <div>
                <div className="main-contaner">
                    <div className="left-main-contant">
                        <div className="corner-border-next">
                            <h2 corner-border-next>NEXT UP IN TECH</h2>
                        </div>
                        <ul className="next-list">
                            {this.props.article.map(item => {
                               return <li key={item._id}><a href="#">{item.title}</a></li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}