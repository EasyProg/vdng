'use strict';
import React, {Component,PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import '../../styles/css/main_styles.css';
import ChannelList from '../../components/ChannelList';
import Categories from '../Categories';
import prev_button from '../../img/left-arrow-menu.svg'
import parse from '../Parsing';
import hlsArray from '../../hls';
import MenuButton from '../ui/MenuButton';
import CategoryName from '../ui/CategoryName';
import * as $ from 'jquery';
import all from '../../img/categ/all.svg';
import inform from '../../img/categ/inform.svg';
import kids from '../../img/categ/kids.svg';
import music from '../../img/categ/music.svg';
import sport from '../../img/categ/sport.svg';
import child from '../../img/categ/inform.svg';
import fun from '../../img/categ/fun.svg';
import films from '../../img/categ/films.svg';
import MainMenu from '../../components/ui/MainMenu';
import favorites from '../../img/categ/favorites.svg';
import cognitive from '../../img/cognitive.svg';
import getCurrentProgram from '../../components/workingDate';
import newParse from '../../components/parseFromJson';
import multidisciplinary from '../../img/categ/multidisciplinary.svg';
import ProgramList from '../../components/ProgramList';
import DetailView from '../../components/ui/DetailView';
import {setMenusVisible,
        getChannels,
        receiveData,
        setProgram,
        setElemsVis,
        networkError} from '../../actions/actions';
//import images
class  Menu extends Component                   {
        constructor(props)                      {
        super(props);
        this.toggleMenuState = this.toggleMenuState.bind(this);
        this.parseCategories = this.parseCategories.bind(this);
        this.getPrograms = this.getPrograms.bind(this);
        this.menuWidthChange = this.menuWidthChange.bind(this);
        this.categVisible = this.categVisible.bind(this);
        this.getProgramDetail = this.getProgramDetail.bind(this);
        this.state = ({channels:this.props.channels,details:{}});
                                                }
        getJsonChannels(url)                    {
            var c = this;
            let context = this;

                    fetch(url).
                    then(function(response)     {
                    //alert(response.status);
                    if (response.status !== 200)
                    {
                        console.log('Looks like it was some error !!!!!!!!!!!!!!!!!' + response.status);
                        return;
                    }
                    else if  (response.headers.get("content-type").indexOf("application/json") !== -1)
                                                {
                        response.json().then    (
                            function (data)     {
                                if (data[0])
                                {   let channels = newParse(data);
                                    context.setState({channels:channels});
                                    context.props.dispatch(getChannels(channels));
                                }
                                                }
                                                );
                                                }
                                                })
                    .catch(function(err)        {
                    //c.props.dispatch(networkError(true));
                                                });

                                                }
        getPrograms (url)                       {
            var c = this;
            fetch(url)
                .then(function(response)        {
                    if (response.status!==200)  {
                        console.log('Looks like it was some error ' + response.status);
                        return;
                    }
                    response.json().then(function(data)
                    {
                        let f = [];
                        c.props.channels.forEach
                        (
                            (e,i)=>
                            {
                                data.forEach(function (elem)
                                    {
                                        if (Number(elem['channel_id']) === e['channelId'])
                                            f.push(elem);
                                    }
                                )
                            }
                        );
                        c.props.dispatch(setProgram(c.props.channels,f));
                    });
                });
        }
        componentDidMount()                     {
            var href   = document.location.href;
            var parsed = href.substring(href.indexOf('/',10)+1);
            this.getJsonChannels('https://cdnua02.hls.tv/play/'+parsed+'/list.json');
            //var repeat = setInterval(this.getPrograms("https://dev.hls.tv/epg/get/webplayer?secret=67afdc3ad5b664e5af80ef36e7a9e3d2"),43200000);
            var repeat = setInterval(this.getPrograms("https://cdnua01.hls.tv/epg/"+parsed+'/channels.json'),43200000);
                                                }
        firstToUpperCase( str )                 {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
                                                }
        chooseSrc(categoryName)                 {
            switch (categoryName)               {
                case 'Фильмы': return films;
                    break;
                case 'Все жанры':return all;
                    break;
                case 'Музыкальный':return music;
                    break;
                case 'Развлекательный':return fun;
                    break;
                case 'Информационный':return inform;
                    break;
                case 'Многопрофильный':return multidisciplinary;
                    break;
                case 'Детский':return kids;
                    break;
                case 'Познавательный':return cognitive;

                                                }
                                                }
        parseCategories   ()                    {
            let grpArr = [];
            var favor =  [];
            if (localStorage["myfavor"]!==undefined)
            {
            favor = $.parseJSON(localStorage["myfavor"]);
            }
            if (!Array.prototype.find) {
                Object.defineProperty(Array.prototype, "find",{
                    value: function(predicate) {
                        if (this === null) {
                            throw new TypeError('Array.prototype.find called on null or undefined');
                        }
                        if (typeof predicate !== 'function') {
                            throw new TypeError('predicate must be a function');
                        }
                        var list = Object(this);
                        var length = list.length >>> 0;
                        var thisArg = arguments[1];
                        var value;

                        for (var i = 0; i < length; i++)
                            {
                            value = list[i];
                            if (predicate.call(thisArg, value, i, list)) {
                                return value;
                            }
                            }
                        return undefined;
                    }
                });
            }
            var jCont = this;
            if (this.state.channels.length>0)
            {
                //var jCont = this;
                this.state.channels.forEach(function (e, i)  {
                    let cat = jCont.firstToUpperCase(e['category']['name']||e['category']);
                    if (grpArr.find(x=>x.name===cat)===undefined)
                        grpArr.push({name:cat,src:e['category']['icon']||jCont.chooseSrc(cat)});
                                                             });
            }
            else if (this.props.channels.length>0)
            {
                //var jCont = this;
                this.props.channels.forEach(function (e, i)  {
                    let cat = jCont.firstToUpperCase(e['category']['name']||e['category']);
                    if (grpArr.find(x=>x.name===cat)===undefined)
                        grpArr.push({name:cat,src:e['category']['icon']||jCont.chooseSrc(cat)});
                                                             });
            }
            //myfavor.find(x=>x.id ===item.channelId)
            if (favor.length > 0&&this.props.channels.find(x=>x.channelId === favor[0]['id']))
            {
            grpArr.unshift({name: 'Любимые', src: favorites});
                                                 }
            grpArr.unshift({name: 'Все жанры', src: all});
            return grpArr;
                                                 }
        toggleMenuState(menuType = 'left')      {
            //e.stopPropagation();
            //console.log('Event Log');
            var channelsState = this.props.menus.channelsMenuVisible;
            var settingsState = this.props.menus.settingsVisible;
            //Туггл кнопок если стейт изменился
            if (menuType !== 'left')
            {
                this.props.dispatch(setMenusVisible
                ({
                    channelsMenuVisible:false,
                    categoryMenuVisible:false,
                    settingsVisible:!settingsState
                }));
            }
                                                }
        menuWidthChange()                       {
            if (this.props.isOpened===false)
                return  'menuContainerNone';
            else if  (
                this.props.menus.channelsMenuVisible&&
                this.props.menus.programsVisible&&
                this.props.menus.detailMenuVisible
            )
                return  "threeMenuContainer";
            else if   ((this.props.menus.channelsMenuVisible&&
                !this.props.menus.categoryMenuVisible&&
                !this.props.menus.programsVisible)||
                (this.props.menus.categoryMenuVisible&&!this.props.menus.programsVisible&&!this.props.menus.channelsMenuVisible)
            )
                return  'menuContainer';
            else if  (
                this.props.menus.channelsMenuVisible&&
                (this.props.menus.categoryMenuVisible||
                    this.props.menus.programsVisible)&&!this.props.menus.detailMenuVisible
            )
                return  "twoMenuContainer";
                                                }
        categVisible()                          {
            if (this.props.menus.categoryMenuVisible)
            {
                if (this.props.channels.length > 0)
                    this.props.dispatch(setMenusVisible(
                        {
                            channelsMenuVisible: true,
                            categoryMenuVisible: false,
                            settingsVisible: false
                        }, true));
            }
            if (!this.props.menus.categoryMenuVisible)
            {
                this.props.dispatch(    setMenusVisible (
                    {
                        channelsMenuVisible:true,
                        categoryMenuVisible:true,
                        settingsVisible:false
                    },true));
                $('.categoryItemChosen').focus();

            }
        }
        getProgramDetail(details,title)         {
        this.setState({detail:details,title:title});
                                                 }


        render()                                 {
                 if  (this.props.autoPlay)
                 return                          (
                                    <div id="menu"
                                    className="mainMenuDiv">
                                    <div
                                    className="menuDives"
                                    onMouseEnter={e=>this.props.dispatch(setElemsVis(true))}
                                    onMouseLeave={e=>this.props.dispatch(setElemsVis(false))}>
                                    <div className={this.menuWidthChange()}>
                                    <CategoryName     visible ={this.props.menus.categoryMenuVisible||this.props.menus.channelsMenuVisible}
                                                      categ   ={this.props.category}
                                                      categVisibleContext = {this.categVisible}
                                                      reversed={!this.props.menus.categoryMenuVisible?true:false}
                                    />
                                    <Categories       visible={this.props.menus.categoryMenuVisible}
                                                      channelVisible={this.props.menus.channelsMenuVisible}
                                                      toggleMenuStateContext={this.toggleMenuState}
                                                      channels=  {this.props.channels.length===0?this.state.channels:this.props.channels}
                                                      categories={this.parseCategories()}
                                    />
                                    <ChannelList
                                                      playList={this.props.channels.length===0?this.state.channels:this.props.channels}
                                                      category={this.props.category}
                                                      visibleSetContext={this.toggleMenuState}
                                                      tabIndex={1}
                                    />
                                    <ProgramList
                                                      visible         = {this.props.menus.programsVisible}
                                                      programs        = {this.props.programs}
                                                      currentProgramId= {getCurrentProgram(this.props.prog).current.id}
                                                      currentIndex=     {getCurrentProgram(this.props.prog).index}
                                                      getProgramDetailContext={this.getProgramDetail}

                                    />
                                    <DetailView       visible={this.props.menus.detailMenuVisible}
                                                      detail= {this.state.detail}
                                                      title=  {this.state.title}
                                    />
                                    </div>
                                    {!this.props.isOpened?
                                    <div className='menuCenterText'
                                     id="menuCenterText">
                                    <div className="shitDiv">
                                    <MenuButton visible={true}/>
                                    {/*visible={!this.props.menus.channelsMenuVisible&&!this.props.menus.categoryMenuVisible&&!this.props.menus.programsVisible}/>*/}
                                    <img src={this.props.channelImg}
                                    className="imgChannelStyle"/>
                                    <div className="textBlock">
                                    <div className="upperText">
                                    {this.props.category}
                                    <img src={prev_button} width={20} height={20} className="arrowImg"/>
                                    <span>{this.props.channelNum}{'. '}{this.props.channel}
                                    </span>
                                    </div>
                                    <div className="lowerText">
                                    {this.props.program ? getCurrentProgram(this.props.program, this.props.channel).title : ''}
                                    </div>
                                    </div>
                                    </div>
                                    </div>:null
                                    }
                                    </div>
                                    </div>
                );
                else return null
                }
                                                }

        const mapDispatchToProps = (dispatch) => bindActionCreators
                                                    ({
        dispatch,
        setMenusVisible,
        getChannels,
        receiveData,
        setProgram,
        setElemsVis,
        networkError
        }, dispatch);
        export default connect                      (
        state =>                                    ({
        fullScreen:state.videoReducer.fullScreen,
        channel:   state.videoReducer.video.channel,
        channels:  state.channelReducer.channels,
        channelNum:state.videoReducer.video.channelNum,
        channelImg:state.videoReducer.video.img,
        category:  state.channelReducer.chosenCategory,
        programs:  state.channelReducer.programs,
        prog:      state.channelReducer.program,
        menus:     state.menuReducer.menus,
        isOpened:  state.menuReducer.isOpened,
        program:   state.videoReducer.video.program,
        isParentControl:
        state.settingsReducer.parentalControl,
        autoPlay:  state.videoReducer.autoPlay
                                                    }),
        mapDispatchToProps
                                                    )(Menu);