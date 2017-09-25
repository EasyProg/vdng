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
import {togglePlay,toggleButtons,toggleFullScreen,setChannelsVisible} from '../actions/actions';
import * as $ from 'jquery';
//import css//
//import 'semantic-ui-css/semantic.min.css'//;
import '../styles/css/main_styles.css';
var proxy = 'https://cors-anywhere.herokuapp.com/';
var timeFormat = function(seconds)  {
    var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
    var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
    var h = Math.floor(m/60)<10 ? "0"+Math.floor(m/60) : Math.floor(m/60);
    h = h ==='00'?'':h;
    if (m&&s&&h)
    return h+':'+m+":"+s;
    else if (m&&s&&!h)
    return  m+":"+s;
    else return  '00:00'
                                    };
//window.$ = window.JQuery = JQuery;
const hls = new Hls();
class VideoPlayer extends Component                {
        //vd = this.video?this.video.video:'';
        constructor(props)                         {
        super(props);
        //Bind functions
        this.changeSize = this.changeSize.bind(this);
        this.changeRes = this.changeRes.bind(this);
        this.handleCurrTime = this.handleCurrTime.bind(this);
        this.handleCurrPlayback = this.handleCurrPlayback.bind(this);
        this.toggle = this.toggle.bind(this);
        this.menuFullScreenAppears = this.menuFullScreenAppears.bind(this);
        this.handlePlay=this.handlePlay.bind(this);
        this.escFullScreen = this.escFullScreen.bind(this);
        this.state = {playerButtonsAppear:false};
        this.timer = '';
        this.state = {fullScreen:false};
        }
        //Component Functions
        componentDidMount() {
        var vd = this.video.video;
        var appearsVideo = this.menuFullScreenAppears;
        vd.addEventListener('mousemove',this.menuFullScreenAppears);
        $('#video').keydown(function(event) {
            if (event.keyCode===13)
            {
            appearsVideo();
            }
                                            });
        this.videoOnLoad();
                            }
        componentWillUnmount()  {
        //this.vd.removeEndEventListener('timeupdate');

                                }
        toggle(isPlaying)       {
        var vd = this.video.video;
        //const vd = this.video;
        this.props.dispatch(togglePlay(isPlaying));
        if (isPlaying)          {
            vd.play();
                                }
        else vd.pause();
                                }
        changeRes(res)          {
                                }
        videoOnLoad()               {
            if (this.props.video) {
                var vd = document.getElementById('video');
                if (navigator.userAgent.indexOf ('WOW64') !== -1) {
                hls.loadSource(this.props.video.link);
                }
                else {
                hls.loadSource(this.props.video.link);
                }
                hls.attachMedia(vd);
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                vd.play();
                });
                //if (vd) {
                //vd.addEventListener('timeupdate', this.handleOnPlay);
                //}
                                }
                                    }
        handleCurrTime(param)       {
        var vd = this.video.video;
        if (param===1)
        {vd.currentTime+=10;        }
        else vd.currentTime-=10;
                                    }
        handleCurrPlayback (param)  {
        var vd = this.video;
        if (param===1)
        {vd.playbackRate+=0.1;}
        else vd.playbackRate-=0.1;
                                    }
        handlePlay()                              {
        this.timer = this.state.fullScreen?
        setTimeout(function()          {
        //Скрыть плей
        $("#vduppermenu,#vdbottommenu,#menu").fadeOut(1000);
                                       },5000):
        setTimeout(function()          {
        //Скрыть плей
        $("#vduppermenu,#vdbottommenu").fadeOut(1000);
                                       },5000);

                                                  }
        menuFullScreenAppears()
        {
        //Отобразить плей
        clearTimeout(this.timer);
        $("#vduppermenu,#vdbottommenu,#menu").fadeIn(1000);
        //Запустить скрытие
        this.handlePlay();
        }
        escFullScreen()                           {
        if (   !document.fullscreenElement
            && !document.mozFullScreenElement
            && !document.webkitFullscreenElement
            && !document.msRequestFullscreen)
        this.props.dispatch(toggleFullScreen(false));
        this.setState({fullScreen:false})
                                                  }

        changeSize()                              {
        var    vd = this.video.video;
        if (   !document.fullscreenElement
            && !document.mozFullScreenElement
            && !document.webkitFullscreenElement
            && !document.msRequestFullscreen)
        //from Normal Screen to Full
        {
        this.handlePlay();
        if (vd.webkitEnterFullscreen)             {
            vd.webkitEnterFullscreen();
            this.props.dispatch(toggleFullScreen(true));
                                                  }
        else if (vd.mozRequestFullScreen)         {
                 vd.mozRequestFullScreen();
            this.props.dispatch(toggleFullScreen(true));
                                                  }
        else if (vd.msRequestFullscreen)          {
                 vd.msRequestFullscreen();
            this.props.dispatch(toggleFullScreen(true));
                                                  }
        else if (vd.requestFullscreen)            {
                 vd.requestFullscreen();
            this.props.dispatch(toggleFullScreen(true));
                                                  }
        else                                      {
        //alert('Your browsers doesn\'t support fullscreen');
                                                  }
        document.addEventListener ("webkitfullscreenchange", this.escFullScreen, false);
        this.setState({fullScreen:true});
        }
        //from fullScreen to Normal
        else                                      {
          if        (document.cancelFullScreen)
        {
                     document.cancelFullScreen();
        } else if   (document.mozCancelFullScreen)
        {
                    document.mozCancelFullScreen();
        } else if   (document.webkitCancelFullScreen)
        {
                    document.webkitCancelFullScreen();
        }
         this.props.dispatch(toggleFullScreen(false));
         this.setState({fullScreen:false});
                                                   }}
        //Component Functions
        render()        {
            this.videoOnLoad();
            return      (
                        <div             ref={(dv)=>this.div=dv} className="centerDiv">
                        <Video           isPlaying={this.props.isPlaying}
                                         fullSize= {this.props.fullScreen}
                                         video=    {this.props.video}
                                         ref=      {(video)=>this.video=video}
                        />
                        <div className="panelDiv"/>
                        <VideoUpperMenu  isPlaying={this.props.isPlaying}
                                         toggleContext={this.toggle}
                                         handleOnPlayContext={this.handleOnPlay}
                                         handleCurrentTimeContext={this.handleCurrTime}
                                         handleCurrPlaybackContext={this.handleCurrPlayback}/>
                        <VideoBottomMenu changeSizeContext={this.changeSize}
                                         changeResContext= {this.changeRes}/>
                        <div id="processDiv" className="displayNone"/>
                        </div>
                        )
                       }
                                                    }
                       const mapDispatchToProps = (dispatch) => bindActionCreators({
                       dispatch,togglePlay,toggleButtons,toggleFullScreen,setChannelsVisible
                       }, dispatch);
                       export default connect       (
                       state => ({
                       video:                state.videoReducer.video,
                       isPlaying:            state.videoReducer.isPlaying,
                       autoPlay:             state.videoReducer.autoPlay,
                       fullScreen:           state.videoReducer.fullScreen
                       }),
                       mapDispatchToProps
                                                    )(VideoPlayer);