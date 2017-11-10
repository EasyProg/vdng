import React, { Component,PropTypes } from 'react';
import {Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import pause from '../img/pause-button.svg';
import play from '../img/main-play.svg';
import backward from '../img/ff-prev-button.svg';
import forward from '../img/ff-next-button.svg';
import prev from '../img/prev.svg';
import next from '../img/next.svg';
//import next from '../img/fast-forward.svg';
import {connect} from 'react-redux';
import '../styles/css/main_styles.css';
import {bindActionCreators} from 'redux';
import ProgramTime from '../components/ui/ProgramTime';
import CurrentTime from '../components/ui/CurrentTime';
import getCurrentProgram from '../components/workingDate';
import CustomProgress from '../components/ui/CustomProgress';
import {changeVideo, toggleCategory, setMenusVisible, toggleFullScreen} from '../actions/actions';
import * as $ from 'jquery';
class VideoUpperMenu extends Component                         {
    static propTypes =                                         {
        isPlaying:PropTypes.bool.isRequired
                                                               };
    constructor(props)                                         {
        super(props);
        this.switchKeyPress = this.switchKeyPress.bind(this);
        this.switchChannel = this.switchChannel.bind(this);
        this.currentProgram = this.currentProgram.bind(this);
        this.currentTime = this.currentTime.bind(this);
        this.setProgressValue =this.setProgressValue.bind(this);
        this.switchPlayback= this.switchPlayback.bind(this);
        this.state =
            {
                currentTime: 0,
                progressValue:0,
                focus:1,
            }
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
            case 32:
                $('#playpause').focus();
                console.log(this.props.toggleContext);
                this.props.toggleContext(this.props.isPlaying);
                break;
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
                        },true
                    ));
                    //$('#channels').focus();
                    $("#vduppermenu,#vdbottommenu").fadeOut(100);
                    $('#menuCenterText,.bottomShadowDiv').fadeOut(100);
                    //console.log('SHIT!@');
                }

                else if (this.props.menus.channelsMenuVisible) {
                    this.props.dispatch(setMenusVisible(
                        {
                            channelsMenuVisible: true,
                            categoryMenuVisible: true,
                            settingsVisible:     false
                        },true
                    ));
                    $('#categories').focus();
                }
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
                else if (!this.state.isOpened) {
                    $("#vduppermenu,#vdbottommenu").fadeIn(100);
                }
                break;
            }
            case 8:
            {
                if (this.props.fullScreen)
                {

                    this.props.changeSizeContext();
                }
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
    currentProgram ()                                          {
        if (this.props.video.program)
        {
            return  getCurrentProgram(this.props.video.program).prTime;
        }
        else return 0;
    }
    currentTime ()                                             {
        if (this.props.video.program)
        {
            return  getCurrentProgram(this.props.video.program).startTime;
        }
        else return 0;
    }
    setProgressValue(now,all)                                  {
        //get the current value of progress
        if (now&&all!==0)

        {
            var position = (now / all) * 100;



            this.setState({progressValue:position});
        }
    }
    switchPlayback(event)     {

        event.stopPropagation();
        let items = $('.playerButtonsDiv>img:not(.backwardActiveButton)');
        let id = this.state.focus;
        let nextElem = id + 1 >= items.length ? id :  id + 1;
        let prevElem = id - 1 < 0 ? id : id - 1;
        //console.log(nextElem+':::::::'+prevElem);
        //.props.onMouseEnter();
        switch (event.keyCode){
            case 37 :
                items[prevElem].focus();
                this.setState({focus:prevElem});
                break;
            case 39 :
                items[nextElem].focus();
                this.setState({focus:nextElem});
                break;
            case 13:
                if (this.state.focus===0)
                this.switchChannel('prev');
                else if (this.state.focus===1)
                this.props.toggleContext(this.props.isPlaying);
                if (this.state.focus===2)
                this.switchChannel('next');
            break;
            case 32:
                if (this.state.focus===0)
                this.switchChannel('prev');
                else if (this.state.focus===1)
                this.props.toggleContext(this.props.isPlaying);
                if (this.state.focus===2)
                this.switchChannel('next');
            break;
            case 40:
                $('#jtbset').focus();
                break;
            case 8:
                //$('.iconsDiv:first').focus();
                $('#vduppermenu').focus();
                this.props.onMouseLeave();
                break;

                                }
        console.log(this.state.focus)


    }
    render()   {
        return (
            <div id="vduppermenu"
                 onKeyDown={(e)=>this.switchKeyPress(e)}
                 tabIndex={1}
                 className="displayNone"
                 onMouseLeave={this.props.onMouseLeave}
                 onMouseEnter={this.props.onMouseEnter}

            >
                {this.props.video.program?<CustomProgress value={this.state.progressValue} fullScreen={this.props.fullScreen}/>:null}
                {/*<div className="circleProgressDiv"/>*/}
                {/*<progress id='progress-bar' min='0' max='100'*/}
                {/*value={this.state.progressValue}*/}
                {/*className={this.props.fullScreen?'progressBarFull':'progressBar'}/>*/}
                <div  className="divPlayer">
                    {/*<Timer isWholeProgramTime={true}/>*/}
                    {this.props.video.program?<CurrentTime startTime={this.currentTime()}
                                 videoChannel={this.props.video.channel}
                                 wholeTime={this.currentProgram()}
                                 setProgressValueContext={this.setProgressValue} onFocus={this.props.onMouseEnter} onFocusOut={this.props.onMouseLeave}/>:null}
                    <div  className="playerButtonsDiv" id="playerbuttonsdiv" onKeyDown={e=>this.switchPlayback(e)}>
                            <img src={prev} width={20} height={20} onClick={(e)=>this.switchChannel('prev')} tabIndex={1}/>
                            <img src={backward} width={25} height={25} className={this.props.isTimeShift?'backwardActiveButton':'backwardDisButton'}/>
                            <img onClick={(e)=>this.props.toggleContext(this.props.isPlaying)}
                             width={45} height={45} src={this.props.isPlaying?pause:play}
                             tabIndex={2} id="playpause"
                             onFocus={this.props.onMouseEnter}
                        />
                        <img src={forward}  width={25} height={25} className={this.props.isTimeShift?'backwardActiveButton':'backwardDisButton'}/>
                        <img src={next} width={20} height={20} onClick={(e)=>this.switchChannel('next')} tabIndex={3}/>
                    </div>
                    {this.props.video.program?<ProgramTime time={this.currentProgram()}/>:null}
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
    dispatch,changeVideo,toggleCategory,setMenusVisible,toggleFullScreen
}, dispatch);
export default connect      (
    state =>                ({
        fullScreen:state.videoReducer.fullScreen,
        channels:state.channelReducer.channels,
        video:state.videoReducer.video,
        menus:state.menuReducer.menus,
        isTimeShift:state.settingsReducer.timeShift,
        isOpened:  state.menuReducer.isOpened,

    }),
    mapDispatchToProps
)(VideoUpperMenu);