import React, { Component,PropTypes } from 'react';
import {Button,Icon} from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import border     from '../img/switch_button.gif';
import live       from '../img/live-icon.gif';
import nofavorite from '../img/bookmark-white.gif';
import favorite   from   '../img/bookmark-black-shape.gif';
import aspect     from '../img/aspect_ratio.svg';
import 'semantic-ui-css/semantic.min.css';
import '../styles/css/main_styles.css';
import * as $ from 'jquery';
import aspectratio from '../img/aspect_ratio.gif';
import {setFavor,getChannels} from '../actions/actions';



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
            Favorite:this.isFavorite(this.props.channelId),
            ratio:0
            //isFavorite()
        };
        this.toggleFavorite = this.toggleFavorite.bind(this);
        this.isFavorite=      this.isFavorite.bind(this);
        this.filterChannels= this.filterChannels.bind(this);
        this.changeRatio  = this.changeRatio.bind(this);
    }
    shouldComponentUpdate (nextProps,nextState)
    {
        if (this.props.channelId!==nextProps.channelId||this.state.Favorite!==nextState.Favorite)
        {   console.log(nextProps.channelId);
            this.setState({Favorite:this.isFavorite(this.props.channelId)});

            return true;
        }
        else return false
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
        {
            return true;
        }
        else
            return false

    }
    filterChannels(channels,category)   {
        console.log(channels);
        console.log(category);
        var cat = category?category.toString():'All channels';
        let filteredChannels = [];
        if   (channels)
        {
            filteredChannels =  channels.filter(function(item)
            {
                if (cat !==  'Все жанры'&&cat !=='Locked'&&cat!=='undefined'&&cat!=='Любимые')
                return       item.category.toUpperCase() === cat.toUpperCase();
                else if      (cat ==='Любимые') return item.channelId && localStorage.getItem(item.channelId);
                else return  item.category
            })
        }
        this.props.dispatch(getChannels(filteredChannels));
                                        };
    toggleFavorite()                    {
        if  (localStorage.getItem(this.props.channelId)===null)
        {
             localStorage.setItem(this.props.channelId, 'true');
        }

        else localStorage.removeItem(this.props.channelId);
        this.setState({Favorite:this.isFavorite(this.props.channelId)});
        this.filterChannels(this.props.channels,this.props.channelCategory);
        }
    changeRatio()                       {
    switch(this.state.ratio)            {
        case 0:
        {
        this.setState({ratio:1});
        }
        break;
        case 1:
        {
        this.setState({ratio:2});
        }
        break;
        case 2:
        {
        this.setState({ratio:3});
        }
        break;
        case 3:
        {
        this.setState({ratio:0});
        }
        break;
                                        }
                                        }

    render () {
        this.setState({Favorite:this.isFavorite(this.props.channelId)});
        {if (this.state.showResolution  === false)
        {
            return (
                <div id='vdbottommenu'
                     className="displayNone"
                     onMouseEnter={this.props.onMouseEnter}
                     onMouseLeave={this.props.onMouseLeave}>
                    <div className="divBottomPlayer">
                        <div className="playerButtonsBottomDiv">
                            <div className="iconsDisabledDiv">
                                <Icon className={this.state.lock?"big inverted lock alternate":"big inverted unlock alternate"}/>
                            </div>
                            <div className="iconsDiv" onClick={(e)=>this.toggleFavorite()}>
                                <img src={this.state.Favorite?favorite:nofavorite} width={20} height={25}/>
                            </div>
                            <div className="iconsDisabledDiv">
                                <img src={live} width={40} height={30} className="imgLive"/>
                            </div>
                            <div className="iconsDisabledDiv">
                                <div className="upper_buttons_res">
                                    {this.state.resolution}
                                </div>
                            </div>
                            <div className="iconsDiv">
                                <img src={aspect} width={40} height={30} onClick={this.changeRatio}/>
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
            return                                      (
                <div id='vdbottommenu'
                     className='divBottomPlayer'
                     onMouseEnter={this.props.onMouseEnter}
                     onMouseLeave={this.props.onMouseLeave}>
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

const mapDispatchToProps = (dispatch) => bindActionCreators
({
    dispatch,
    setFavor,getChannels
},  dispatch);
export default connect  (
    state =>            ({fullScreen:state.videoReducer.fullScreen,
        channelId: state.videoReducer.video.channelId,
        channelCategory:state.channelReducer.chosenCategory,
        channels:state.channelReducer.channels,
    }),
    mapDispatchToProps
)(VideoBottomMenu);