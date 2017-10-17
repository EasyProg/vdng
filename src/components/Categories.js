import React, {Component,PropTypes} from 'react';
//import elements
import {Icon} from 'semantic-ui-react';
import underline from '../img/Underline.png';
import ChannelList from '../components/ChannelList';
//import Css
import '../styles/css/main_styles.css';
import 'semantic-ui-css/semantic.min.css';
import  {connect} from 'react-redux';
import  {bindActionCreators} from 'redux';
import  {setMenusVisible,getChannels,toggleCategory} from '../actions/actions';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as $ from 'jquery';
import ReactDOM from 'react-dom';
import hlsArray from '../hls';
import parse from './Parsing';
import CategoryName from './ui/CategoryName';
import CustomScroll from './ui/CustomScroll';
import parseProgram from '../components/ParseProgramLight';
class  Categories extends Component             {

    constructor(props)                          {
    super(props);
    this.state =                                {
    itemChosen:1,
    category:'All channels',
    Menu:[]
                                                };
    this.filterChannels = this.filterChannels.bind(this);
    this.categVisible = this.categVisible.bind(this);
                                                }
    static propTypes =                          {
    visible:PropTypes.bool.isRequired,
    channelVisible:PropTypes.bool.isRequired,   };
    handleClick (index,cat)                     {
    this.setState(
                 {
    itemChosen:index,
    category:cat
                 });
    this.props.dispatch(toggleCategory(cat));
    this.props.dispatch(getChannels(this.filterChannels(parse(hlsArray),cat)));
    if (this.filterChannels(parse(hlsArray),cat).length>0)
                                                {
        this.props.dispatch(setMenusVisible(
            {
                channelsMenuVisible: true,
                categoryMenuVisible: true,
                settingsVisible: false
            }, true));
    $('.hoverDiv').animate({'width':'800'},250);
                                                }
    else    {
        this.props.dispatch(setMenusVisible(
            {
                channelsMenuVisible: false,
                categoryMenuVisible: true,
                settingsVisible: false
            }, true));
    $('.hoverDiv').animate({'width':'400'},250);
            }
                                                };
    filterChannels(channels,category)           {
    var cat = category?category.toString():'All channels';
    let filteredChannels = [];
    if   (channels)                              {
     filteredChannels =  channels.filter(function(item)
     {
         if (cat !== 'Все жанры'&&cat !=='Locked'&&cat!=='undefined'&&cat!=='Любимые')
         return       item.category.toUpperCase() === cat.toUpperCase();
         else if      (cat ==='Любимые') return item.channelId && localStorage.getItem(item.channelId);
         else return  item.category
     })
                                                 }
    this.props.dispatch(getChannels(filteredChannels));
    return filteredChannels;
                                                 };
    switchCateg(event,cat)                      {
    let elems = this.props.categories;
    var i = elems.map(x => x.category).indexOf(cat);
    var items = $('.categoryItem,.categoryItemChosen');
    var nextElem = i + 1>=   elems.length ?  0 : i + 1;
    var prevElem = i - 1<0 ? elems.length  - 1 : i - 1;
    console.log(elems.length);
    switch (event.keyCode)  {
    case 40:
    {items[nextElem].focus();
    this.setState(
    {
    itemChosen:nextElem,
    category:elems[nextElem].category,
    });
    break;}
    case 38:
    items[prevElem].focus();
    this.setState(
    {
    itemChosen:prevElem,
    category:elems[prevElem].category,
    });
    break;
    case 13:
    {
    this.handleClick(this.state.itemChosen,this.state.category);
    //$('#video').focus();
    if (this.filterChannels(parse(hlsArray),cat).length>0)
    $('#channels').focus();
    break;
    }
    case 39:                                {
        this.props.dispatch(setMenusVisible(
            {
                channelsMenuVisible: this.props.channels.length>0,
                categoryMenuVisible: false,
                settingsVisible: false
            },this.props.channels.length>0));
        console.log(this.props.channels.length);
        if (this.filterChannels(parse(hlsArray),cat).length>0)
        {
            $('#channels').focus();
            $('.hoverDiv').animate({'width':'400'},250);
        }
        else
        {
            $('#vduppermenu').focus();
        }
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
    categVisible()                              {
    if (this.props.channels.length>0)
            this.props.dispatch(setMenusVisible     (
            {
                channelsMenuVisible:true,
                categoryMenuVisible:false,
                settingsVisible:false
            }                                       ),true);
    $('.hoverDiv').animate({'width':'400'},250);
                                                    }
    componentDidMount()                             {
    //this.Menu = this.parseCategories();
    // this.props.channels.forEach((item,i)=>
    // {
    // console.log(item.channelId);
    // console.log(parseProgram(item.channelId));
    // }
    // )
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
    <CustomScroll //renderTrackHorizontal={false}
    >
    {/*style={{color:'grey',opacity:1}}>*/}
    {
                            this.props.categories.map        ((item,i)=>
                            <div key={i} className={this.state.itemChosen===i?'categoryItemChosen':'categoryItem'}
                            onClick={e=>this.handleClick (i,item.name)} tabIndex={i}>
                            <div         className="categoryImage"><img src={item.src} width="40" height="40"/></div>
                            <div         className="categoryText">
                            {item.name}
                            </div>
                            {i===0?<img src={underline} height={5} width={300} className={'categoryLine'}/>:null}
                            </div>
                                                             )
    }
    </CustomScroll>
    {/*<div className="menuBottom"/>*/}
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

