import React, {Component,PropTypes} from 'react';
import '../../styles/css/main_styles.css';
export default class Rating extends Component {
    constructor(props)      {
        super(props);
        this.fillElems = this.fillElems.bind(this);
                            }
static
      propTypes = {
      rate : PropTypes.number.isRequired,
      maxRate: PropTypes.number.isRequired,
      chosen:  PropTypes.bool.isRequired
                };
    fillElems(lenght=5)    {
     var arr = [];
     for (var i=0;i<lenght;i++) {
         arr.push(i);
                                }
     return arr;
                           }
    render ()              {
        this.starArr = this.fillElems(this.props.maxRate);
        return  (
            <span className="rateContainer">
                {
                    this.starArr.map((elem,i)=>
                    <div key={i}
                    className={this.props.rate>i&&!this.props.chosen?
                        'rateDivFilled':this.props.rate>i&&this.props.chosen?
                        'rateDivFilledChosen':'rateDivEmpty'}/>)

                }
            </span>
                )
                           }
                                             }