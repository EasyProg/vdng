import React, {Component,PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import '../../styles/css/main_styles.css';
import Categories from '../Categories';
import prev_button from '../../img/left-arrow-menu.svg'
import parse from '../Parsing';
import hlsArray from '../../hls';
import MenuButton from '../ui/MenuButton';
import * as $ from 'jquery';
//Categories
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
import {setMenusVisible,getChannels,receiveData,setProgram,setElemsVis} from '../../actions/actions';
//import images
class  Menu extends Component               {
    constructor(props)                      {
        super(props);
        this.toggleMenuState = this.toggleMenuState.bind(this);
        this.parseCategories = this.parseCategories.bind(this);
        this.getPrograms = this.getPrograms.bind(this);
                                            }
    getJsonChannels(url)                    {
        let context = this;
        fetch(url).then(function(response)  {
                if (response.status !== 200)
                                            {
                    console.log('Looks like it was some error ' + response.status);
                    return;
                                            }
                if  (response.headers.get("content-type").indexOf("application/json") !== -1)
                                            {
                     response.json().then   (
                        function (data)     {
                            console.log(data);
                            if (data[0])
                                context.props.dispatch(getChannels(newParse(data)));
                                            }
                                            );
                                            }
                                            }
                                            )
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
        //this.getChannels('https://admin.hls.tv/play/9762be960fd8d0586edfe1b14e391583.m3u');
        //set href
        var href   = document.location.href;
        var parsed = href.substring(href.indexOf('/',10)+1);
        //alert(parsed);
        //this.getJsonChannels(href+'/list.json');
        this.getJsonChannels('https://cdnua01.hls.tv/play/'+parsed+'/list.json');
        //67afdc3ad5b664e5af80ef36e7a9e3d2/53/stream.m3u8
        //var repeat setInterval(this.getPrograms(href+'channels.json'),43200000);
        var repeat = setInterval(this.getPrograms("https://dev.hls.tv/epg/get/webplayer?secret=67afdc3ad5b664e5af80ef36e7a9e3d2"),43200000);
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
        let c = parse(hlsArray);
        let obj = {};
        c.forEach(function(e,i){
            let str = e['category'];
            obj[str] = true;
        });
        for (var key in Object.keys(obj))
        {
            grpArr.push({name:this.firstToUpperCase(Object.keys(obj)[key]),
                src:this.chooseSrc(this.firstToUpperCase(Object.keys(obj)[key]))});
        }
        if  (localStorage.length>1)         {
            grpArr.unshift({name: 'Любимые', src: favorites});
        }
        grpArr.unshift({name:'Все жанры',src:all});
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
    render()                                {
        if  (this.props.autoPlay)
            return  (
                <div                id="menu"
                                    className="mainMenuDiv">
                    <div
                        className="menuDives"
                        onMouseEnter={e=>this.props.dispatch(setElemsVis(true))}
                        onMouseLeave={e=>this.props.dispatch(setElemsVis(false))}>
                        <Categories visible={this.props.menus.categoryMenuVisible}
                                    channelVisible={this.props.menus.channelsMenuVisible}
                                    toggleMenuStateContext={this.toggleMenuState}
                                    channels=  {this.props.channels}
                                    categories={this.parseCategories()}
                        />          {/*!this.props.menus.channelsMenuVisible&&!this.props.menus.categoryMenuVisible?"menuCenterText":*/}
                        <div        className='menuCenterText'
                                    id="menuCenterText">
                            <MenuButton
                                visible={!this.props.menus.channelsMenuVisible&&!this.props.menus.categoryMenuVisible&&!this.props.menus.programsVisible}/>
                            <img    src={this.props.channelImg} width={50} height={50}
                                    className="imgChannelStyle"/>
                            <div    className="textBlock">
                               <div className="upperText">
                                    {this.props.category}
                                    <img src={prev_button} width={20} height={20} className="arrowImg"/>
                                    <span>{this.props.channelNum}{'. '}{this.props.channel}
                                </span>
                                </div>
                                <div className="lowerText">
                                    {this.props.program?getCurrentProgram(this.props.program,this.props.channel).title:''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        else return null
    }

}
const mapDispatchToProps = (dispatch) => bindActionCreators ({
    dispatch,
    setMenusVisible,
    getChannels,
    receiveData,
    setProgram,
    setElemsVis
}, dispatch);
export default connect (
    state =>           ({
        fullScreen:state.videoReducer.fullScreen,
        channel:   state.videoReducer.video.channel,
        channels:  state.channelReducer.channels,
        channelNum:state.videoReducer.video.channelNum,
        channelImg:state.videoReducer.video.img,
        category:  state.channelReducer.chosenCategory,
        menus:     state.menuReducer.menus,
        program:   state.videoReducer.video.program,
        isParentControl:
        state.settingsReducer.parentalControl,
        autoPlay:  state.videoReducer.autoPlay
    }),
    mapDispatchToProps
)(Menu);