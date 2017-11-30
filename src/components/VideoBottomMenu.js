import React, { Component,PropTypes } from 'react';
import {Button,Icon} from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import {connect}     from 'react-redux';
import border        from '../img/switch_button.gif';
import live          from '../img/live-icon.gif';
import nofavorite    from '../img/bookmark-white.gif';
import favorite      from   '../img/bookmark-black-shape.gif';
import aspect        from '../img/aspect_ratio.svg';
import 'semantic-ui-css/semantic.min.css';
import '../styles/css/main_styles.css';
import * as $ from 'jquery';
import aspectratio from '../img/aspect_ratio.gif';
import {setFavor,getChannels} from '../actions/actions';



class VideoBottomMenu extends Component
{
    resolutions = ['360р','480р','720р','1080р','1440р'];
    constructor(props)                  {
        super(props);
        this.state =        {
            showResolution:false,
            lock:false,
            resolution:'1080р',
            Favorite:this.isFavorite(this.props.channelId),
            ratio:0,
            focus:0
            //isFavorite()
        };
        this.toggleFavorite = this.toggleFavorite.bind(this);
        this.isFavorite=      this.isFavorite.bind(this);
        this.filterChannels= this.filterChannels.bind(this);
    }
    shouldComponentUpdate (nextProps,nextState)
                                        {
        if (this.props.channelId!==nextProps.channelId||this.state.Favorite!==nextState.Favorite)
        {
            this.setState({Favorite:this.isFavorite(this.props.channelId)});
            console.log('changed');
            return true;
        }
        else return false
    }
    chooseResolution (res)              {
        this.setState       ({
            showResolution:false,
            resolution:res
        });
        this.props.changeResContext(res.substr(0,res.length-1));
    }
    changeSize(e)                       {
        this.props.changeSizeContext();
    }
    setLock(vl)                         {
        this.setState       (
            {
                lock:!vl,
            }
        )
    }
    isFavorite(channelId)               {
        let f =false;
        if (localStorage["myfavor"])
        var b = $.parseJSON(localStorage["myfavor"]);
        if (b)
        b.forEach((e,i)=>
        {
        if (e['id']===channelId)
        f = true
        });
        return f

                                        }
    filterChannels(channels,category)                   {
        var cat = category?category.toString():'All channels';
        if (localStorage["myfavor"])
            var myfavor = $.parseJSON(localStorage["myfavor"])||[];
        let filteredChannels = [];
        if  (channels)                                  {
            filteredChannels =  channels.filter(function(item)
            {
                let categ =  item.category.name ? item.category.name:item.category;
                if (cat !== 'Все жанры'&&cat !=='Locked'&&cat!=='undefined'&&cat!=='Любимые')
                    return       categ.toUpperCase() === cat.toUpperCase();
                else if      (cat ==='Любимые') return item.channelId && myfavor.find(x=>x.id ===item.channelId);
                else return  item.category
            })
        }
        this.props.dispatch(getChannels(filteredChannels));
        return filteredChannels;
    };
    toggleFavorite()                    {
    var myfavor = [];
    if (localStorage["myfavor"])
    myfavor = $.parseJSON(localStorage["myfavor"]);
    let  present = false;
    if  (myfavor.length>0)
        {
        myfavor.forEach((e,i) =>
        {
        if (e['id']===this.props.channelId)
        present = i;
        }
        );
        }
        if (present||present===0)
        {
        myfavor.splice(present,1);
        }
        else myfavor.push({id:this.props.channelId});
        localStorage['myfavor']=JSON.stringify(myfavor);
        this.setState({Favorite:this.isFavorite(this.props.channelId)});
        this.filterChannels(this.props.channels,this.props.channelCategory);
        }
        switchPlayback(event)           {

        event.stopPropagation();
        let items = $('#iconRes,.playerButtonsBottomDiv>.iconsDiv');
        console.log(items.length);
        let id = this.state.focus;
        let nextElem = id + 1 >= items.length ? id :  id + 1;
        let prevElem = id - 1 < 0 ? id : id - 1;
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
                    this.toggleFavorite();
                else if (this.state.focus===1)
                    this.props.changeRatioContext(this.props.ratio);
                if (this.state.focus===2)
                    this.changeSize();
                break;
            case 32:
                if (this.state.focus===0)
                    this.toggleFavorite();
                else if (this.state.focus===1)
                    this.props.changeRatioContext(this.props.ratio);
                if (this.state.focus===2)
                    this.changeSize();
                break;
            case 38:
                $('#playpause').focus();
                break;
            case 8:
                //$('.iconsDiv:first').focus();
                $('#vduppermenu').focus();
                this.props.onMouseLeave();
                break;

        }
        console.log(this.state.focus)


    }
        render ()                               {
        this.setState({Favorite:this.isFavorite(this.props.channelId)});
        {if (this.state.showResolution  === false)
        {
            return (
                <div id='vdbottommenu'
                     className="displayNone"
                     onMouseEnter={this.props.onMouseEnter}
                     onMouseLeave={this.props.onMouseLeave}>
                    <div className="bottomShadowDiv"/>
                    <div className="divBottomPlayer">
                        <div className="iconResDivNone" onClick={(e)=>this.changeSize(e)} tabIndex={1} onKeyDown={e=>this.switchPlayback(e)}>
                            <img src={border} width={25} height={25}/>
                        </div>
                        <div className="playerButtonsBottomDiv" onKeyDown={e=>this.switchPlayback(e)}>
                            <div className="iconsDisabledDiv">
                                <Icon className={this.state.lock?"big inverted lock alternate":"big inverted unlock alternate"}/>
                            </div>
                            <div className="iconsDiv" id="jtbset" onClick={(e)=>this.toggleFavorite()} tabIndex={1}>
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
                            <div className="iconsDiv" onClick={(e)=>this.props.changeRatioContext(this.props.ratio)} tabIndex={1}>
                                <img src={aspect} width={40} height={30}/>
                            </div>
                        </div>
                        <div className="iconResDiv" id="iconRes" onClick={(e)=>this.changeSize(e)} tabIndex={1} onKeyDown={e=>this.switchPlayback(e)}>
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
    state =>            ({
        fullScreen:state.videoReducer.fullScreen,
        channelId: state.videoReducer.video.channelId,
        channelCategory:state.channelReducer.chosenCategory,
        channels:state.channelReducer.channels,
    }),
    mapDispatchToProps
)(VideoBottomMenu);