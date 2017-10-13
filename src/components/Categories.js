import React, {Component,PropTypes} from 'react';
//import images
import glasses from '../img/3d-glasses.png';
import caravan from '../img/caravan.png';
import film from '../img/film-roll.png';
import scene from '../img/scene.png';
import mask from '../img/mask.png';
import headphones from '../img/headphones.png';
import star from '../img/shooting-star.png';
import masks from '../img/theater.png';
import underline from '../img/Underline.png';
import play from '../img/play-categ.png';
import lock from '../img/lock.png';
import all from '../img/crowd-of-users.png';
//import elements
import {Icon} from 'semantic-ui-react';
import ChannelList from '../components/ChannelList';
import hlsArray from '../hls';
//import Css
import '../styles/css/main_styles.css';
import 'semantic-ui-css/semantic.min.css';
import  {connect} from 'react-redux';
import  {bindActionCreators} from 'redux';
import  {setMenusVisible,getChannels,toggleCategory} from '../actions/actions';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as $ from 'jquery';
import ReactDOM from 'react-dom';
import parse from './Parsing';
import CategoryName from './ui/CategoryName';
import {Scrollbars} from 'react-custom-scrollbars';
class  Categories extends Component             {

    constructor(props) {
    super(props);
    this.state =                                {
    itemChosen:1,
    category:'All channels',
                                                };
    this.filterChannels = this.filterChannels.bind(this);
    this.categVisible = this.categVisible.bind(this);
}
    static propTypes =                          {
    visible:PropTypes.bool.isRequired,
    channelVisible:PropTypes.bool.isRequired,
                                                };
    handleClick (index,cat)                     {
    this.setState(
    {
    itemChosen:index,
    category:cat
    });
    this.props.dispatch(toggleCategory(cat));
    this.props.dispatch(getChannels(this.filterChannels(parse(hlsArray),cat)));
    if (this.filterChannels(parse(hlsArray),cat).length>0)
    this.props.dispatch(setMenusVisible         (
                                                {
    channelsMenuVisible:true,
    categoryMenuVisible:true,
    settingsVisible:false
                                                },true));
    else
    this.props.dispatch(setMenusVisible(
                                                {
    channelsMenuVisible:false,
    categoryMenuVisible:true,
    settingsVisible:false
                                                },true));
                                                }
    Menu =                                      [
    {name:'Favorites',   src:star,      category:'Любимые'},
    {name:'All',         src:all,       category:'All channels'},
    {name:'Now watching',src:play,      category: 54},
    {name:'TV Shows',    src:scene,     category:'Shows'},
    {name:'Films',       src:film,      category:'Фильмы'},
    {name:'Music',       src:headphones,category:'Музыкальный'},
    {name:'Popular',     src:mask,      category:'Популярное'},
    {name:'3D / VR',     src:glasses,   category:'3D'},
    {name:'Travel',      src:caravan,   category:'Путешевствия'},
    {name:'Comedy',      src:masks,     category:'Развлекательный'},
    {name:'Blocked',     src:lock,      category:'Locked'},
                                                 ];
    filterChannels(channels,category)           {
    var cat = category?category.toString():'All channels';
    let filteredChannels = [];
    if   (channels)                             {
     filteredChannels =  channels.filter(function(item)
     {
         if (cat !== 'All channels'&&cat !=='Locked'&&cat!=='undefined'&&cat!=='Любимые')
         return       item.category.toUpperCase() === cat.toUpperCase();
         else if      (cat ==='Любимые') return item.channelId && localStorage.getItem(item.channelId);
         else return  item.category
     })
                                                }
    this.props.dispatch(getChannels(filteredChannels));
    return filteredChannels;
                                                };
    switchCateg(event,cat)                      {
    var i = this.Menu.map(x => x.category).indexOf(cat);
    var items = document.getElementsByClassName('classSelector');
    //
    var nextElem = i + 1>=   this.Menu.length ?  0 : i + 1;
    var prevElem = i - 1<0 ? this.Menu.length  - 1 : i - 1;
    switch (event.keyCode)  {
    case 40:
    {items[nextElem].focus();
    this.setState(
    {
    itemChosen:nextElem,
    category:this.Menu[nextElem].category,
    });
    break;}
    case 38:
    items[prevElem].focus();
    this.setState(
    {
    itemChosen:prevElem,
    category:this.Menu[prevElem].category,
    });
    break;
    case 13:
    {this.handleClick(this.state.itemChosen,this.state.category);
    //$('#video').focus();
    $('#channels').focus();
    break;
    }
    case 39:        {
        this.props.dispatch(setMenusVisible(
            {
                channelsMenuVisible: this.props.channels.length>0,
                categoryMenuVisible: false,
                settingsVisible: false
            },this.props.channels.length>0));
        $('#channels').focus();
    break;
                    }
    case 27: {
        this.props.dispatch(setMenusVisible(
            {
                channelsMenuVisible: false,
                categoryMenuVisible: false,
                settingsVisible: false
            },false));
        $('#video').focus();
    }
    break;
    case 8: {
        this.props.dispatch(setMenusVisible(
            {
                channelsMenuVisible: false,
                categoryMenuVisible: false,
                settingsVisible: false
            }));
        $('#video').focus();
    }
    break;
    default:
                            }
                                                    }
    categVisible()                                  {
    if (this.props.channels.length>0)
            this.props.dispatch(setMenusVisible     (
            {
                channelsMenuVisible:true,
                categoryMenuVisible:false,
                settingsVisible:false
            }                                       ),true);

                                                    }
    render()                                        {
    return                                          (
    <div className="hoverDiv">
    <div className={this.props.visible?"categoryPanel":"categoryPanelNone"} tabIndex={1} id="categories"
         onKeyDown={(e)=>this.switchCateg(e,this.state.category)}>
        <div className="menuHeaderCat">
            <CategoryName visible ={true}
                          categ   ={this.props.channelCategory}
                          categVisibleContext = {this.categVisible}
                          reversed={true}
            />
        </div>
    <Scrollbars>
    {
                            this.Menu.map        ((item,i)=>
                            <div key={i} className={this.state.itemChosen===i?'categoryItemChosen':'categoryItem'}
                            onClick={e=>this.handleClick (i,item.category)} tabIndex={i}>
                            <div         className="categoryImage"><img src={item.src} width="40" height="40"/></div>
                            <div         className="categoryText">
                            {item.name}
                            </div>
                            {i===0?<img src={underline} height={5} width={300} className={'categoryLine'}/>:null}
                            </div>
                                                 )
    }
    </Scrollbars>
    <div className="menuBottom"/>
    </div>
        <div className="innerDiv">
            <ChannelList
                playList={this.props.channels}
                category={this.state.category}
                visibleSetContext={this.props.toggleMenuStateContext}
                tabIndex={1}
            />
         </div>
    </div>
                                                    )
                                                    }
                                                    }
const mapDispatchToProps = (dispatch) =>
bindActionCreators({
dispatch,setMenusVisible,getChannels,toggleCategory
                   },       dispatch);
export default connect(
    state => ({channels:state.channelReducer.channels,
               channelCategory:state.channelReducer.chosenCategory,
               isFavor:state.channelReducer.isFavor
             }),
    mapDispatchToProps
)(Categories);

