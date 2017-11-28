import  React, {Component} from 'react';
import  {connect} from 'react-redux';
import  {ReactTransitionGroup} from 'react-transition-group';
//import own components
import  VideoBottomMenu from '../components/VideoBottomMenu';
import  VideoUpperMenu from '../components/VideoUpperMenu'  ;
import  Video from '../components/Video';
import  Menu from '../components/ui/Menu';
import  Hls from 'hls.js';
//import Event Listener
import {bindActionCreators} from 'redux';
import {togglePlay,toggleButtons,toggleFullScreen,setMenusVisible,networkError,setFavor} from '../actions/actions';
import * as $ from 'jquery';
import '../styles/css/main_styles.css';
var config =
    {
    capLevelToPlayerSize: true,
    maxBufferSize: 2,
    maxBufferLength: 5
    };
class VideoPlayer extends Component     {
    constructor(props)                  {
    super(props);
    //Bind functions
    this.changeSize    =         this.changeSize.bind(this);
    this.changeRes     =         this.changeRes.bind(this);
    this.handleCurrTime=         this.handleCurrTime.bind(this);
    this.handleCurrPlayback =    this.handleCurrPlayback.bind(this);
    this.toggle        =         this.toggle.bind(this);
    this.menuFullScreenAppears = this.menuFullScreenAppears.bind(this);
    this.handlePlay    =         this.handlePlay.bind(this);
    this.escFullScreen =         this.escFullScreen.bind(this);
    this.videoOnLoad   =         this.videoOnLoad.bind(this);
    this.changeRatio   =         this.changeRatio.bind(this);
    this.setError =              this.setError.bind(this);
    this.timer = '';
    this.state = {fullScreen:false,networkError:false,ratio:0};
    this.hls = new Hls();
    this.int = null;
                                        }
    windowResize()                      {
                if (window.innerWidth>=720)
            //Issue with font fixed
                $('.menuChannel').css({"fontSize":'1.3vw'});
                $('.menuChannelProgram').css({"fontSize":'1.3vw'});
                $('.divCateg').css({"fontSize":'1.6vw'});
                $('.categoryPanel').css({"fontSize":'1.3vw'});
                $('.epgShowButton').css({"right":"3vw"});
                $('.dayListItem').css({"fontSize":'1.2vw'});
                $('.blockChainDiv').css({"fontSize":'1.4vw'});
                if  (window.innerWidth<=720)
                {
                $('body').css('overflow-x','scroll');
                $('.menuChannel').css({"fontSize":'9px'});
                $('.divCateg').css({"fontSize":'12px'});
                $('.categoryPanel').css({"fontSize":'9px'});
                $('.epgShowButton').css({"right":"1rem"});
                $('.dayListItem').css({"fontSize":'7px'});
                $('.menuChannelProgram').css({"fontSize":'9px'});
                $('.blockChainDiv').css({"fontSize":'11px'});
                }
                else $('body').css('overflow-x','hidden');
                if (window.innerHeight<=480)
                                                    {
                $('body').css('overflow-y','auto');
                                                    }
                else
                $('body').css('overflow-y','hidden');
                if (window.innerHeight<=720)        {
                //console.log('Shit');
                $('.epgShowButton').css({"width":'3.5vh'});
                $('.epgShowButton').css({"height":'3.5vh'});
                $('.epgShowButton').css({"right":'2rem'});
                $('.menuChannelName').css({"height":'7vh'});
                $('.tvimg').css({"width":'5.5vh'});
                $('.tvimg').css({"height":'5vh'})
                                                    }
                if (window.innerHeight>=720)        {
                //console.log('Shit');
                $('.epgShowButton').css({"width":'3.5vw'});
                $('.epgShowButton').css({"height":'3.5vw'});
                $('.menuChannelName').css({"height":'6vw'});
                $('.tvimg').css({"width":'5.5vw'});
                $('.tvimg').css({"height":'5vw'})
                                                    }
                                                    }
    componentDidMount()                 {
                this.videoOnLoad ();
                var f = this;
                $(document).ready(function()        {
                f.windowResize();
                });
                $(window).resize (function()        {
                f.windowResize();
                                                    }

                                                    );
                                                    }
    componentDidUpdate()                {
        this.videoOnLoad();
                                                    }
    toggle(isPlaying)                   {
                    var  vd = document.getElementById('video');
                    //this.video.video;
                    //console.log(vd);
                    this.props.dispatch(togglePlay(isPlaying));
                    if (isPlaying)                  {
                        vd.play();

                                                    }
                    else {
                        vd.pause();
                        //hls.stopLoad();
                    }

                                                    }
    changeRes(res)                      {
                }
    setError(param)                     {
    this.setState({networkError:param});
    }
    videoOnLoad()                       {
        var vd = document.getElementById('video');
        var reg = /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i;
        if (this.int)                           {
            clearInterval(this.int);
                                                }
        var b = this;
                if (b.hls)                      {
                    b.hls.detachMedia();
                    b.hls.destroy();
                    //b.hls.stopLoad();
                    b.hls = new Hls();
                }
        console.log('hls Created');

        if  (this.props.video&&navigator.userAgent.search(reg)===-1&&this.props.video.link)
        {
            this.hls.loadSource(this.props.video.link);
            this.hls.attachMedia(vd);
            this.props.dispatch(networkError(false));
            //this.hls.startLoad();
            this.hls.on(Hls.Events.MANIFEST_PARSED,
                function ()
                {
                    {
                        if (this.state.video.isPlaying)
                        {
                            vd.play();
                        }
                        else
                        {
                            vd.pause();
                        }
                    }
                });
            var funcCnt = this;
            this.hls.on(Hls.Events.ERROR, function
                (event, data)
            {
                {
                    switch (data.type)
                    {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                        {   console.log('Network error , try to reload...');
                            //funcCnt.hls.startLoad();
                            funcCnt.props.dispatch(networkError(true));
                        }
                            break;
                        default:
                            break;
                    }
                }
            });
        }
        //this.hls=hls;
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
            setTimeout(function()
            {
                //Скрыть плей
                $("#vduppermenu,#vdbottommenu,#menuCenterText,.bottomShadowDiv").fadeOut(1000);
            },5000):
            setTimeout(function()               {
                //Скрыть плей
                if ($('#channels').className==='menuChannel')
                {$('#video').focus();}
                $("#vduppermenu,#vdbottommenu,#menuCenterText,.bottomShadowDiv").fadeOut(1000);
            },5000);
        $('#video').focus();
    }
    componentWillReceiveProps(nextProps){
        this.setState({networkError:false});
        //this.videoOnLoad();
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
                $("#vduppermenu,#vdbottommenu,#menuCenterText,.bottomShadowDiv").fadeIn(1);
                //Запустить скрытие
                this.handlePlay();
            }
            this.toggle(this.props.isPlaying);
            $('#playpause').focus();
            if (!this.props.isPlaying) {
            $('#video').focus();
            }
        }
        //Отобразить плей
        else if (this.props.isOpened===false&&this.props.autoPlay)
        {
            clearTimeout(this.timer);
            //#menuCenterText
            $("#vduppermenu,#vdbottommenu,#menuCenterText,.bottomShadowDiv").fadeIn(1);
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
        var videoBlock = document.getElementById('centerDiv');
        var menu = document.getElementById('menu');
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
                videoBlock.mozRequestFullScreen();
                this.props.dispatch(toggleFullScreen(true));
            }
            else if (vd.msRequestFullscreen)    {
                videoBlock.msRequestFullscreen();
                this.props.dispatch(toggleFullScreen(true));
            }
            else if (vd.requestFullscreen)      {
                vd.requestFullscreen();
                videoBlock.requestFullscreen();
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
    componentWillUnmount()              {
        if (this.hls)
        this.hls.destroy();
    }
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
    changeRatio (rat)                   {
        switch(rat)                      {
            case 0:
                this.setState({ratio:1});
                break;
            case 1:
                this.setState({ratio:2});
                break;
            case 2:
                this.setState({ratio:3});
                break;
            case 3:
                this.setState({ratio:4});
                break;
            case 4:
                this.setState({ratio:0});
                break;
        }
    }
    render()                            {
        this.videoOnLoad();
        return                          (
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
                                 //networkError={this.state.networkError}
                                 ratio=       {this.state.ratio}
                                 videoOnLoadContext = {this.videoOnLoad}
                />
                {/*<div className="bottomPlayback">*/}
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
                                 changeRatioContext={this.changeRatio}
                                 onMouseEnter={e=>this.menuFullScreenAppears('mouseEnter')}
                                 onMouseLeave={e=>this.menuFullScreenAppears()}
                                 ratio=       {this.state.ratio}

                />
                <Menu/>
            </div>                              )

    }
}
const mapDispatchToProps = (dispatch) =>
        bindActionCreators(                     {
        dispatch,togglePlay,toggleButtons,
        toggleFullScreen,setMenusVisible,setFavor,networkError
                                                }, dispatch);
export default connect                          (
    state =>                                    ({
        video:                state.videoReducer.video,
        isPlaying:            state.videoReducer.isPlaying,
        autoPlay:             state.videoReducer.autoPlay,
        fullScreen:           state.videoReducer.fullScreen,
        isOpened:             state.menuReducer.isOpened,
        isVisible:            state.menuReducer.elemsVisible,
        //networkError:       state.videoReducer.networkError
                                                 }),
    mapDispatchToProps
)(VideoPlayer);