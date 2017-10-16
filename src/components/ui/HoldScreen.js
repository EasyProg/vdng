import React, {Component,PropTypes} from 'react';
import play from '../../img/play-button-play.svg';
import '../../styles/css/main_styles.css';
import * as $ from 'jquery';
//default Component
export default class HoldScreen extends Component
            {
constructor(props)
            {
        super(props);
            }
componentDidMount()
{
$('.playHoldImg').focus();
}
render()    {
    return  (
        <div>
            <div className="nonPlayingDiv">
                <img src={play} className="playHoldImg" onClick={this.props.onClick} onKeyDown={this.props.onKeyDown} tabIndex={1}/>
                <div className="bottomText">Click to watch</div>
            </div>
        </div>
            )
            }
            }