import React, {Component,PropTypes} from 'react';
import {Icon} from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import {setMenusVisible,getChannels,receiveData,setProgram} from '../../actions/actions';
import {connect} from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import '../../styles/css/main_styles.css';
import Categories from '../Categories';
import HomeMenu from '../HomeMenu';
import home from '../../img/hm.png';
import prev_button from '../../img/play-previous-button.gif'
import * as $ from 'jquery';
import parse from '../Parsing';
import hlsArray from '../../hls';
import MenuButton from '../ui/MenuButton';
import glasses from '../../img/3d-glasses.png';
import caravan from '../../img/caravan.png';
import film from '../../img/film-roll.png';
import scene from '../../img/scene.png';
import mask from '../../img/mask.png';
import headphones from '../../img/headphones.png';
import star from '../../img/shooting-star.png';
import masks from '../../img/theater.png';
import play from '../../img/play-categ.png';
import lock from '../../img/lock.png';
import all from '../../img/crowd-of-users.png';
//import images
class  Menu extends Component               {
    constructor(props)                      {
        super(props);
        this.toggleMenuState = this.toggleMenuState.bind(this);
        this.parseCategories = this.parseCategories.bind(this);
        this.getPrograms = this.getPrograms.bind(this);
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
                        data.forEach(function (elem) {
                                if (Number(elem['channel_id']) === e['channelId'])
                                f.push(elem);
                                                     }
                        )
                        }
                    );
                    c.props.dispatch(setProgram(c.props.channels,f));

                    //c.props.dispatch(receiveData(f));
                                            });
                                            });
                                            }
    componentDidMount()                     {
     var repeat =setInterval(this.getPrograms("https://dev.hls.tv/epg/get/webplayer?secret=67afdc3ad5b664e5af80ef36e7a9e3d2"),43200000);
                                            }
    firstToUpperCase( str )                 {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
    }
    chooseSrc(categoryName) {
        switch (categoryName)   {
            case 'Фильмы': return film;
                break;
            case 'Все жанры':return all;
                break;
            case 'Музыкальный':return headphones;
                break;
            case 'Развлекательный':return masks

        }
    }
    parseCategories ()                      {
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
             grpArr.unshift({name: 'Любимые', src: star});
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
    render()   {
        if  (!this.props.fullScreen&&this.props.autoPlay)
            return (
                <div id="menu" className="mainMenuDiv">
                    <div className="menuDives">
                        <MenuButton visible={!this.props.menus.channelsMenuVisible&&!this.props.menus.categoryMenuVisible&&!this.props.menus.programsVisible}/>
                        <Categories visible={this.props.menus.categoryMenuVisible}
                                    channelVisible={this.props.menus.channelsMenuVisible}
                                    toggleMenuStateContext={this.toggleMenuState}
                                    channels={this.props.channels}
                                    categories={this.parseCategories()}

                        />
                        <div className={this.props.fullScreen&&!this.props.menus.channelsMenuVisible&&!this.props.menus.categoryMenuVisible?"menuCenterText":'displayNone'}>
                            <div className="menuCenterTextBig">
                                <img src={this.props.channelImg} width={50} height={50} className="imgChannelStyle"/>
                                {this.props.category}
                                <img src={prev_button} width={30} height={30}/>
                                <span className="menuCenterTextBigBold">{this.props.channelId}{'. '}{this.props.channel}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="menuDives">
                    </div>
                </div>
                );
        else return null
    }

}
const mapDispatchToProps = (dispatch) => bindActionCreators(  {
    dispatch,setMenusVisible,getChannels,receiveData,setProgram
                                                              }, dispatch);
export default connect (
    state =>           ({
        fullScreen:state.videoReducer.fullScreen,
        channel:   state.videoReducer.video.channel,
        channels:  state.channelReducer.channels,
        channelId: state.videoReducer.video.channelId,
        channelImg:state.videoReducer.video.img,
        category:  state.channelReducer.chosenCategory,
        menus:     state.menuReducer.menus,
        isParentControl: state.settingsReducer.parentalControl,
        autoPlay:state.videoReducer.autoPlay
    }),
    mapDispatchToProps
)(Menu);