import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeVideo,toggleCategory,togglePlay,getChannels,setChannelsVisible} from '../actions/actions';
import {Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../styles/css/main_styles.css';
import * as $ from 'jquery';
import point from '../img/pointing-to-left.gif'
//import '../components/Channel';
import Channel from './Channel';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
    class ChannelList extends Component     {
    constructor(props)                      {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.categVisible = this.categVisible.bind(this);
}
    static propTypes = {
    playList:   PropTypes.array.isRequired,
    category:   PropTypes.string.isRequired,
    visibleSetContext:PropTypes.func.isRequired
};
    handleKey(elem,e)                       {
    if (e.keyCode===13)
    {
        this.handleClick (elem);
    }
                                        }
    handleClick (elem)                      {
this.props.dispatch(changeVideo(elem));
this.props.dispatch(toggleCategory(elem.category));
this.props.dispatch(togglePlay(!this.props.autoPlay));
this.props.dispatch(setChannelsVisible({
    channelsMenuVisible:false,
    categoryMenuVisible:false,
    settingsVisible:false
}));
//Set UI
    }
    categVisible()                          {
        this.props.dispatch(setChannelsVisible  (
            {
                channelsMenuVisible:false,
                categoryMenuVisible:true,
                settingsVisible:false
            }                               ))

    }

    render(){
        return         (
        <div>
        <div className={this.props.channelsMenuVisible?'menuChannel':'menuChannelNone'} onClick={this.props.onClick} id="channels">
        {this.props.playList.length?<div className="menuHeaderCh">
            <div className="menuHeaderCircleDiv" onClick={(e)=>this.categVisible()}>
                <img src={point} width={20} height={20}/>
            </div>{this.props.channelCategory}</div>:''}
               <PerfectScrollbar>
               {this.props.playList.map((elem, i) =>
                            <Channel
                            key={i}
                            channelId       =   {elem.channelId}
                            hiddenChannel   =   {this.props.category==='Locked'}
                            programName     =   {elem.channel}
                            favorite        =   {this.props.category==='Любимые'}
    chosen          =   {elem.channelId===this.props.video.channelId&&elem.category===this.props.video.category}
    onClick         =   {e=>this.handleClick(elem)}
    onKeyDown       =   {e=>this.handleKey(elem,e)}
                            />
               )
               }
               </PerfectScrollbar>
               </div>
               </div>
               )
        }
                                        }
const mapDispatchToProps = (dispatch) => bindActionCreators({
dispatch,
changeVideo,
toggleCategory,
togglePlay,
getChannels,
setChannelsVisible
}, dispatch);
export default connect(
state => ({
video:state.videoReducer.video,
channelCategory:state.channelReducer.chosenCategory,
autoPlay:state.videoReducer.autoPlay,
    channelsMenuVisible:state.menuReducer.menus.channelsMenuVisible
}),
mapDispatchToProps
)(ChannelList);




