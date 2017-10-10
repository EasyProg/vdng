import React, { Component,PropTypes } from 'react';
import {Button,Icon} from 'semantic-ui-react'
import  {connect} from 'react-redux';
import  border     from '../img/switch_button.gif';
import  live       from '../img/live-icon.gif';
import  nofavorite from '../img/bookmark-white.gif';
import  favorite   from   '../img/bookmark-black-shape.gif';
import  'semantic-ui-css/semantic.min.css';
import  '../styles/css/main_styles.css';

class VideoBottomMenu extends Component
{
    static propTypes =
        {
            //setFavoriteContext:PropTypes.func.isRequired,
        };
    resolutions = ['360р','480р','720р','1080р','1440р'];
    constructor(props)      {
        super(props);
        this.state =        {
            showResolution:false,
            lock:false,
            resolution:'1080р',
            Favorite:false
        };
        this.toggleFavorite = this.toggleFavorite.bind(this);
        this.isFavorite=      this.isFavorite.bind(this);
                            }
    componentWillReceiveProps() {
        this.setState({Favorite:this.isFavorite(this.props.channelId)});
                            }

    chooseResolution (res)  {
        this.setState       ({
            showResolution:false,
            resolution:res
        });
        this.props.changeResContext(res.substr(0,res.length-1));
    }
    changeSize(e)           {
        this.props.changeSizeContext();
    }
    setLock(vl)             {
        this.setState       (
            {
                lock:!vl,
            }
                            )
                            }
    isFavorite(channelId)   {
        if (localStorage.getItem(channelId)!==null)
            return true;
        else
            return false

                            }
    setFavor() {
        this.props.setFavoriteContext();
        //this.forceUpdate();
    }
    toggleFavorite()                    {
        //this.props.dispatch(setFavor(this.props.channels,this.props.video.channelId));
        if (localStorage.getItem(this.props.channelId)===null)
            localStorage.setItem(this.props.channelId,'true');
        else localStorage.removeItem(this.props.channelId);
        this.setState({Favorite:this.isFavorite(this.props.channelId)});
        //this.forceUpdate();
        //this.isFavorite(this.props.video.channelId);
        //console.log(localStorage.getItem(this.props.video.channelId);
    }
    render () {
        {if (this.state.showResolution  === false)    {
            return (
                <div id='vdbottommenu' className="displayNone">
                    <div className="divBottomPlayer">
                        <div className="playerButtonsBottomDiv">
                            <div className="iconsLockedDiv" onClick={(e)=>this.setLock(this.state.lock)}>
                                <Icon className={this.state.lock?"big inverted lock alternate":"big inverted unlock alternate"}/>
                            </div>
                            <div className="iconsDiv">
                                <img src={this.state.Favorite?favorite:nofavorite} width={20} height={25} onClick={(e)=>this.toggleFavorite()}/>
                            </div>
                            <div className="iconsLiveDiv">
                                <img src={live} width={40} height={30} className="imgLive"/>
                            </div>
                            <div className="iconsDiv" onClick={(e) => this.setState({showResolution: true})}>
                                <div className="upper_buttons_res">
                                    {this.state.resolution}
                                </div>
                            </div>
                        </div>
                        <div className="iconResDiv" onClick={(e)=>this.changeSize(e)}>
                            <img src={border} width={25} height={25}/>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return              (
                <div id='vdbottommenu' className='divBottomPlayer'>
                    <div className="playerButtonsBottomDivRes">
                        {
                            this.resolutions.map ((elem,i)=>
                                <div key={i} className="iconsDiv" onClick={(e)=>this.chooseResolution(elem)}>{elem}</div>
                            )
                        }
                    </div>
                </div>
            )
        }
        }
    }
}

export default connect (
    state => ({ fullScreen:state.videoReducer.fullScreen,
                channelId:state.videoReducer.video.channelId
    }),
    ({})
                       )(VideoBottomMenu);