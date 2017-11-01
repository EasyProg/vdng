import  React, {Component} from 'react';
import  {connect} from 'react-redux';
import  {ReactTransitionGroup} from 'react-transition-group';
//import own components
import  VideoBottomMenu from '../components/VideoBottomMenu';
import  VideoUpperMenu from '../components/VideoUpperMenu'  ;
import  Video from '../components/Video';
import  Hls from 'hls.js';
//import Event Listener
import {bindActionCreators} from 'redux';
import {togglePlay,toggleButtons,toggleFullScreen,setMenusVisible,setFavor} from '../actions/actions';
import * as $ from 'jquery';
import '../styles/css/main_styles.css';
var hls = new Hls();
class VideoPlayer extends Component         {
    constructor(props)                      {
        super(props);
        //Bind functions
        this.changeSize    = this.changeSize.bind(this);
        this.changeRes     = this.changeRes.bind(this);
        this.handleCurrTime= this.handleCurrTime.bind(this);
        this.handleCurrPlayback = this.handleCurrPlayback.bind(this);
        this.toggle        = this.toggle.bind(this);
        this.menuFullScreenAppears = this.menuFullScreenAppears.bind(this);
        this.handlePlay    =    this.handlePlay.bind(this);
        this.escFullScreen = this.escFullScreen.bind(this);
        this.videoOnLoad   = this.videoOnLoad.bind(this);
        this.timer = '';
        this.state = {fullScreen:false,networkError:false};
                                            }
        //Component Functions
        componentDidMount()                 {
        this.videoOnLoad();
                                            }
        toggle(isPlaying)                   {
                var  vd = document.getElementById('video');
                //this.video.video;
                //console.log(vd);
                this.props.dispatch(togglePlay(isPlaying));
                if (isPlaying)                   {
                    vd.play();

                }
                else
                    vd.pause();

                                                 }
        changeRes(res)                      {
            }
        videoOnLoad()                       {
            var vd = document.getElementById('video');
            var reg = /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i;
            //hls.detachMedia();
            //console.log(vd);
            //console.log(hls);

            // if (hls)
            // {   //console.log('DESTROYING');
            //     hls.detachMedia();
            //     hls.destroy();}
            if  (this.props.video&&navigator.userAgent.search(reg)===-1)
            //false)
            {
                hls.loadSource(this.props.video.link);
                hls.attachMedia(vd);
                hls.on(Hls.Events.MANIFEST_PARSED,
                    function ()
                    {
                            {
                            vd.play();
                            }
                    });
                var funcCnt = this;
                hls.on(Hls.Events.ERROR, function (event, data)
            {
                    {
                        switch (data.type)
                        {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                            {
                                funcCnt.setState({networkError:true});
                                //console.log(Hls.ErrorTypes.NETWORK_ERROR + 'NETWORK ERRROR!!!!!!_!!!!!');


                            }
                                break;
                            default:
                                break;
                        }
                    }
            });
            }
                                            }
        handleCurrTime(param)               {
            var vd = this.video.video;
            if (param===1)
            {
                vd.currentTime+=10;         }
            else vd.currentTime-=10;
                                            }
        handleCurrPlayback (param)          {
            var vd = this.video;
            if (param===1)
            {vd.playbackRate+=0.1;}
            else vd.playbackRate-=0.1;
        }
        handlePlay()                        {
            this.timer = this.state.fullScreen?
                setTimeout(function()               {
                    //Скрыть плей
                    $("#vduppermenu").fadeOut(1000);
                                                    },5000):
                setTimeout(function()               {
                    //Скрыть плей
                    if ($('#channels').className==='menuChannel')
                    {$('#video').focus();}
                    $("#vduppermenu,#vdbottommenu,#menuCenterText").fadeOut(1000);
                                                    },5000);
        }
        componentWillReceiveProps(nextProps){
            this.setState({networkError:false});
        if (nextProps.isVisible===true)
            this.menuFullScreenAppears('mouseEnter');
                                            }
        menuFullScreenAppears(param)        {
            if (param==='mouseEnter')
            {
                clearTimeout(this.timer);
                return
            }
            else if (param===true)          {
                this.props.dispatch(setMenusVisible
                (
                    {
                        programsVisible: false,
                        channelsMenuVisible: false,
                        categoryMenuVisible: false,
                        settingsVisible: false,
                        vdArchVisible: false
                    }
                    ,
                    false));
                if (!this.props.fullScreen)
                {
                    clearTimeout(this.timer);
                    //$('.menuCenterText').css({"display":"flex"});
                    $("#vduppermenu,#vdbottommenu,#menuCenterText").fadeIn(1);
                    //Запустить скрытие
                    this.handlePlay();
                }
                if (this.props.fullScreen)   {
                    this.toggle(this.props.isPlaying);
                }
                                             }
            //Отобразить плей
            else if (this.props.isOpened===false&&this.props.autoPlay)
            {
                clearTimeout(this.timer);
                //$('.menuCenterText').css({"display":"flex"});
                //#menuCenterText
                    $("#vduppermenu,#vdbottommenu,#menuCenterText").fadeIn(1);
                //Запустить скрытие
                this.handlePlay();
            }
            else if (param==='visible')     {
                clearTimeout(this.timer);
                                            }
                                            }
        escFullScreen()                     {
            if (!document.fullscreenElement
                && !document.mozFullScreenElement
                && !document.webkitFullscreenElement
                && !document.msRequestFullscreen)
                {
                this.props.dispatch(toggleFullScreen(false));
                this.setState({fullScreen:false})}
                                                    }
        changeSize()                        {
            var vd = document.getElementById('video');
            if (   !document.fullscreenElement
                && !document.mozFullScreenElement
                && !document.webkitFullscreenElement
                && !document.msRequestFullscreen)
            //from Normal Screen to Full
                                                    {
                this.handlePlay();
                if (vd.webkitEnterFullscreen)       {
                    vd.webkitEnterFullscreen();
                    this.props.dispatch(toggleFullScreen(true));
                }
                else if (vd.mozRequestFullScreen)   {
                    vd.mozRequestFullScreen();
                    this.props.dispatch(toggleFullScreen(true));
                }
                else if (vd.msRequestFullscreen)    {
                    vd.msRequestFullscreen();
                    this.props.dispatch(toggleFullScreen(true));
                }
                else if (vd.requestFullscreen)      {
                    vd.requestFullscreen();
                    this.props.dispatch(toggleFullScreen(true));
                }
                document.addEventListener ("webkitfullscreenchange", this.escFullScreen, false);
                $('#video').focus();
                this.setState({fullScreen:true});
                                                    }
            //from fullScreen to Normal
            else                                    {
                if        (document.cancelFullScreen)
                                                    {
                    document.cancelFullScreen();
                                                    }
                else if   (document.mozCancelFullScreen)
                                                    {
                    document.mozCancelFullScreen();
                                                    }
                else if   (document.webkitCancelFullScreen)
                                                    {
                    document.webkitCancelFullScreen();
                                                    }
                this.props.dispatch(toggleFullScreen(false));
                this.setState({fullScreen:false});
                document.removeEventListener("webkitfullscreenchange",this.escFullScreen);
                                                    }}
        shouldComponentUpdate(nextProps,nextState)
                                            {
        //&& nextProps.isOpened!==false
        if  (nextProps.isOpened!==this.props.isOpened||nextProps.isVisible!==this.props.isVisible)
//&& (nextProps.isOpened!==false||nextProps.isOpened!==true)
        {
            return false
        }

        else return true
        }

    //Element render
    render()                                {
        this.videoOnLoad();
        return                              (
            <div                 ref=         {(dv)=>this.div=dv}
                                 className="centerDiv" id="centerDiv">
                <Video           isPlaying  = {this.props.isPlaying}
                                 fullSize   = {this.props.fullScreen}
                                 video      = {this.props.video}
                                 ref        = {(video)=>this.video=video}
                                 onClick    = {e=>this.menuFullScreenAppears(true)}
                                 onMouseMove= {e=>this.menuFullScreenAppears()}
                                 onDblClick = {e=>this.changeSize()}
                                 isOpened   = {this.props.isOpened}
                                 networkError={this.state.networkError}

                />
                {/*<div className="panelDiv" id="panelDiv"/>*/}
                <VideoUpperMenu  isPlaying={this.props.isPlaying}
                                 toggleContext={this.toggle}
                                 handleOnPlayContext={this.handleOnPlay}
                                 handleCurrentTimeContext={this.handleCurrTime}
                                 handleCurrPlaybackContext={this.handleCurrPlayback}
                                 onMouseEnter={e=>this.menuFullScreenAppears('mouseEnter')}
                                 onMouseLeave={e=>this.menuFullScreenAppears()}
                                 changeSizeContext={this.changeSize}
                />
                <VideoBottomMenu changeSizeContext={this.changeSize}
                                 changeResContext= {this.changeRes}
                                 onMouseEnter={e=>this.menuFullScreenAppears('mouseEnter')}
                                 onMouseLeave={e=>this.menuFullScreenAppears()}
                />
            </div>                          )

                                            }
                                            }
const mapDispatchToProps = (dispatch) =>
    bindActionCreators(     {
    dispatch,togglePlay,toggleButtons,
    toggleFullScreen,setMenusVisible,setFavor
                            }, dispatch);
export default connect      (
    state =>                ({
        video:                state.videoReducer.video,
        isPlaying:            state.videoReducer.isPlaying,
        autoPlay:             state.videoReducer.autoPlay,
        fullScreen:           state.videoReducer.fullScreen,
        isOpened:             state.menuReducer.isOpened,
        isVisible:            state.menuReducer.elemsVisible,
        //networkError:         state.videoReducer.networkError
                             }),
                             mapDispatchToProps
                            )(VideoPlayer);