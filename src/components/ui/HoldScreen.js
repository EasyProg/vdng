import React, {Component,PropTypes} from 'react';
import play from '../../img/play-button-hold.gif';
import '../../styles/css/main_styles.css';
import * as $ from 'jquery';

//default Component
export default class HoldScreen extends Component
            {
constructor(props)
            {
        super(props);
            }

//handleClick(e)
            //{
//$('#video').play();

//console.log('shit');
//e.stopPropagation();
//            }
render()    {
    return  (
        <div>
            <div className="nonPlayingDiv">
                <img src={play} className="playHoldImg" onClick={this.props.onClick}/>
            </div>
        </div>
            )
            }
            }