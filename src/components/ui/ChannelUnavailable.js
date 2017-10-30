/**
 * Created by Михаил on 28.10.2017.
 */
import React, {Component,PropTypes} from 'react';
import play from '../../img/play-button-play.svg';
import '../../styles/css/main_styles.css';
import * as $ from 'jquery';
import {bindActionCreators} from 'redux'
import  {connect} from 'react-redux';
import {toggleAutoPlay} from '../../actions/actions';
//default Component
export default class ChannelUnavailable extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()    {
        return  (
            <div>
                <div className="nonPlayingDiv">
                    {/*<img src={play} className="playHoldImg" onClick={this.props.onClick} onKeyDown={this.props.onKeyDown} tabIndex={1}/>*/}
                    <div className="bottomTextUn">Канал недоступен</div>
                </div>
            </div>
                )
                }
}
