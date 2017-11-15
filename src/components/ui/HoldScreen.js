import React, {Component,PropTypes} from 'react';
import play from '../../img/play-button-play.svg';
import '../../styles/css/main_styles.css';
import * as $ from 'jquery';
import {bindActionCreators} from 'redux'
import  {connect} from 'react-redux';
import {toggleAutoPlay} from '../../actions/actions';
//default Component
class HoldScreen extends Component
            {
constructor(props)
            {
        super(props);
            }
componentDidMount()
{
$("#vduppermenu,#vdbottommenu").fadeOut(10);
$('.playHoldImg').focus();
this.props.dispatch(toggleAutoPlay(false));
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

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        dispatch,toggleAutoPlay
    }, dispatch);
export default connect      (
    state => ({
    }),
    mapDispatchToProps
)(HoldScreen);