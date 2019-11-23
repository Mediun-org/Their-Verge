import React, { Component } from 'react';


export default class Stars extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        return(
            <div>
            <form  id="form1" className="rate"  >
            <div className="rate">
            <input className = "inp1" type="radio" id="star5" name="rate"  value="5" 
              />
            <label className = "lb1"  title="text">5 stars</label>
            <input className = "inp1" type="radio" id="star4" name="rate" value="4"  
               />
            <label className = "lb1" title="text">4 stars</label>
            <input className = "inp1" type="radio" id="star3" name="rate" value="3" 
              />
            <label className = "lb1"  title="text">3 stars</label>
            <input className = "inp1" type="radio" id="star2" name="rate" value="2" 
            />
            <label className = "lb1"  title="text">2 stars</label>
            <input className = "inp1" type="radio" id="star1" name="rate" value="1" 
             />
            <label className = "lb1"  title="text">1 star</label>
            </div>
            </form>
            </div>
        )
    }
  }
  
