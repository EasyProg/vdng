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
import menu from '../img/main_menu.gif';
import point from '../img/pointing-to-left.gif';
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
class Categories extends Component              {
    constructor(props) {
    super(props);
    this.state =                                {
    itemChosen:0,
    category:'All channels',
    //channels:this.props.channels
                                                };
    this.filterChannels = this.filterChannels.bind(this);
    this.categVisible = this.categVisible.bind(this);
}
    static propTypes =                          {
    visible:PropTypes.bool.isRequired,
    channelVisible:PropTypes.bool.isRequired,
    //channels:PropTypes.array.isRequired
                                                };
    handleClick (index,cat)                     {
    this.setState(
    {
    itemChosen:index,
    category:cat

    //categoryId:0,
    //channels:this.filterChannels(parse(hlsArray),cat)
    });
    //this.props.dispatch();
    this.props.dispatch(toggleCategory(cat));
    this.props.dispatch(getChannels(this.filterChannels(parse(hlsArray),cat)));
    this.props.dispatch(setMenusVisible         (
                                                {
    channelsMenuVisible:true,
    categoryMenuVisible:true,
    settingsVisible:false
                                                }));
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
filterChannels(channels,category)                {
var cat = category?category.toString():'All channels';
let filteredChannels = [];
if   (channels) {
     filteredChannels =  channels.filter(function(item)
     {
     if (cat !=='All channels'&&cat !=='Любимые'&&cat !=='Locked'&&cat!=='undefined')
     return item.category.toUpperCase() === cat.toUpperCase();
     else return item.category
     })
                }
    this.props.dispatch(getChannels(filteredChannels));
    return filteredChannels;
                                                  };
    switchCateg(event,cat)                        {
    var i = this.Menu.map(x => x.category).indexOf(cat);
    var items = document.getElementsByClassName('categoryItem');
    //
    var nextElem = i + 1 >= this.Menu.length ? 0 : i + 1;
    var prevElem = i - 1 < 0 ? this.Menu.length  - 1 : i - 1;
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
    $('#video').focus();
    break;}
    default:
    $('#video').focus();
}
                                                    }
    categVisible()                                  {
        this.props.dispatch(setMenusVisible     (
            {
                channelsMenuVisible:false,
                categoryMenuVisible:true,
                settingsVisible:false
            }                                   ));

                                                    }

render()                                            {
    return                                          (
    <div className="hoverDiv">
    <div className={this.props.visible?"categoryPanel":"categoryPanelNone"} tabIndex={1} id="categories"
         onKeyDown={(e)=>this.switchCateg(e,this.state.category)}>
        <div className="menuHeaderCat">
            {/*<div className='divSideBar' onClick={(e) => this.props.toggleMenuStateContext()}>*/}
                {/*<img src={menu} height={45} width={30}/>*/}
            {/*</div>*/}
            {/*<div className="menuHeaderCircleDiv" onClick={(e)=>this.categVisible()}>*/}
                {/*<img src={point} width={20} height={20}/>*/}
            {/*</div>{this.state.category}*/}
            <CategoryName visible ={true}
                          categ   ={this.props.channelCategory}
                          categVisibleContext = {this.categVisible}
                          reversed={true}
            />
        </div>
    <PerfectScrollbar>
    {
                            this.Menu.map ((item,i)=>
                            <div key={i} className='categoryItem' onClick={e=>this.handleClick (i,item.category)} tabIndex={i}>
                            <div         className="categoryImage"><img src={item.src} width="40" height="40"/></div>
                            <div         className="categoryText">
                            {item.name}
                            </div>
                            <img src={underline} height={5} width={300} className={this.state.itemChosen===i?'categoryLine':'categoryLineNone'}/>
                            </div>
                                                    )
    }
    </PerfectScrollbar>
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
             }),
    mapDispatchToProps
)(Categories);

