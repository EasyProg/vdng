import React, { Component,PropTypes } from 'react';
import {Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import pause from '../img/pause-button.gif';
import play from '../img/play-rounded-button.gif';
import backward from '../img/fast-backward-button.gif';
import forward from '../img/fast-forward-button.gif';
import prev from '../img/play-prev.gif';
import next from '../img/play-next.gif';
import '../styles/css/main_styles.css';
    import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeVideo,
        toggleCategory,
        setMenusVisible,
        toggleFullScreen} from '../actions/actions';
import Timer from '../components/ui/Timer';
import * as $ from 'jquery';
class VideoUpperMenu extends Component                         {
    static propTypes = {
    isPlaying:PropTypes.bool.isRequired
};
    constructor(props)      {
    super(props);
    this.switchKeyPress = this.switchKeyPress.bind(this);
    this.switchChannel = this.switchChannel.bind(this);
                            }
    componentDidMount()                                        {
        var func = this.switchKeyPress;
        var t = this;
        $('#video').focus();
        $('#video').keydown(function(event)                    {
        //event.preventDefault();
        func(event);
                                                               });

                                                               }

    switchKeyPress(event)                                      {
        //event.stopPropagation();
        switch (event.keyCode)                                 {
            case 40:
                this.switchChannel('next');
                break;
            case 38:
                this.switchChannel('prev');
                break;
            case 37:                                           {
                if (!this.props.menus.channelsMenuVisible)     {
                    //this.props.dispatch(getChannels(parse(hlsArray)));
                    this.props.dispatch(setMenusVisible(
                        {
                            channelsMenuVisible: true,
                            categoryMenuVisible: false,
                            settingsVisible: false
                        }
                    ));
                    $('#channels').focus();
                    //console.log('SHIT!@');
                                                               }

                else if (this.props.menus.channelsMenuVisible) {
                    this.props.dispatch(setMenusVisible(
                        {
                            channelsMenuVisible: true,
                            categoryMenuVisible: true,
                            settingsVisible:     false
                        }
                    ));
                    $('#categories').focus();
                                                               }
                break;
                                                               }
            case 39:                                           {
                if (this.props.menus.channelsMenuVisible&&
                    this.props.menus.categoryMenuVisible)      {
                this.props.dispatch(setMenusVisible(
                        {
                            channelsMenuVisible: false,
                            categoryMenuVisible: true,
                            settingsVisible:     false
                        }
                                                    ));
                                                               }
                else if (!this.props.menus.channelsMenuVisible&&
                         this.props.menus.categoryMenuVisible) {
                this.props.dispatch(setMenusVisible(
                        {
                            channelsMenuVisible: false,
                            categoryMenuVisible: false,
                            settingsVisible:     false
                        }
                    ));
                                                               }
                else if (!this.props.menus.channelsMenuVisible&&
                         !this.props.menus.categoryMenuVisible)
                this.props.dispatch(setMenusVisible(
                    {
                            channelsMenuVisible: false,
                            categoryMenuVisible: false,
                            settingsVisible:     true
                    }
                ));
                break;
                                                               }
            case 13:                                           {
                if (this.props.menus.channelsMenuVisible)
                this.props.dispatch(setMenusVisible(
            {
                channelsMenuVisible: false,
                categoryMenuVisible: false,
                settingsVisible:     false
            }
                ));
                break;
                                                               }
            default:break;
                                                               }
                                                               }
    switchChannel(param='next')                                {
        var i = this.props.channels.map(x =>
            x.channelId).indexOf(this.props.video.channelId);
        let isOver = i + 1 < this.props.channels.length;
        let isPos = i - 1 >= 0;
        var nextElem = this.props.channels[i + 1];
        var prevElem = this.props.channels[i - 1];
        if (param === 'next') {
            if (!isOver) nextElem = this.props.channels[0];
            if (nextElem) {
                this.props.dispatch(changeVideo(nextElem));
            }
        }
        if (param === 'prev') {
            if (!isPos) prevElem = this.props.channels[this.props.channels.length - 1];
            if (prevElem) {
                this.props.dispatch(changeVideo(prevElem));
            }
        }
    }
//onClick={(e)=>this.props.handleCurrentTimeContext(0)}
        render()
            {
            return (
            <div id="vduppermenu" onKeyDown={(e)=>this.switchKeyPress(e)} tabIndex={1} className="displayNone">
            <progress id='progress-bar' min='0' max='100' value='0' className='displayNone'><div className="progressDiv"/></progress>
            <div  className="divPlayer">
            <Timer isWholeProgramTime={true}/>
            <div  className="playerButtonsDiv">
            <img src={prev} width={20} height={20} onClick={(e)=>this.switchChannel('prev')}/>
            <img src={backward} className={this.props.isTimeShift?'backwardActiveButton':'backwardDisButton'}/>
            <img  onClick={(e)=>this.props.toggleContext(this.props.isPlaying)} width={45} height={45} src={this.props.isPlaying?pause:play} />
            <img src={forward}  className={this.props.isTimeShift?'backwardActiveButton':'backwardDisButton'}/>
            <img src={next} width={20} height={20} onClick={(e)=>this.switchChannel('next')}/>
            </div>
            <Timer isWholeProgramTime={false}/>
            </div>
            </div>
                   )
            }
                                                            }
const mapDispatchToProps = (dispatch) => bindActionCreators({
dispatch,changeVideo,toggleCategory,setMenusVisible,toggleFullScreen
}, dispatch);
export default connect      (
    state =>        ({ fullScreen:state.videoReducer.fullScreen,
    channels:state.channelReducer.channels,
    video:state.videoReducer.video,
    menus:state.menuReducer.menus,
    isTimeShift:state.settingsReducer.timeShift
}),
              mapDispatchToProps
                            )(VideoUpperMenu);