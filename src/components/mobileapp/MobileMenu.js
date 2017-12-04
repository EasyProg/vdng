import React, {Component,PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setMenusVisible,getChannels,receiveData,setProgram,setElemsVis} from '../../actions/actions';
import MobileCategories from './MobileCategories';
import MobileChannels from './MobileChannels';
import parse from '../Parsing';
import hlsArray from '../../hls';
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
class MobileApp extends Component                {
    constructor(props)                           {
        super(props);
        this.getClassNameChosenMenu = this.getClassNameChosenMenu.bind(this);
        this.parseCategories = this.parseCategories.bind(this);
        this.getPrograms = this.getPrograms.bind(this);
        this.state =                             {
        itemChosen:0
                                                 }
                                                 }
    parseCategories   ()                        {
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
    getClassNameChosenMenu ()                   {
   switch (this.state.itemChosen)
                             {
       case 0: return 'menu_state_0';
       break;
       case 1: return 'menu_state_1';
       break;
       case 2: return 'menu_state_2';
       break;
                             }
                             }
    getJsonChannels(url)                        {
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
    getPrograms (url)                           {
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
    componentDidMount()                         {
        var href   = document.location.href;
        var parsed = href.substring(href.indexOf('/',10)+1);
        this.getJsonChannels('https://cdnua01.hls.tv/'+parsed+'/list.json');
        var repeat = setInterval(this.getPrograms("https://dev.hls.tv/epg/get/webplayer?secret=67afdc3ad5b664e5af80ef36e7a9e3d2"),43200000);
    }
    firstToUpperCase( str )                     {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
                                                }
    chooseSrc(categoryName)                     {
        switch (categoryName)                   {
            case 'Фильмы':
                return films;
                break;
            case 'Все жанры':
                return all;
                break;
            case 'Музыкальный':
                return music;
                break;
            case 'Развлекательный':
                return fun;
                break;
            case 'Информационный':
                return inform;
                break;
            case 'Многопрофильный':
                return multidisciplinary;
                break;
            case 'Детский':
                return kids;
                break;
            case 'Познавательный':
                return cognitive;

        }
                                                 }
    render ()                                    {
      return                                     (
        <div className="mobileMenuContainer">
            <div className="mobileMenuHeader">
            <div onClick={(e)=>this.setState({itemChosen:0})}>Categories</div>
            <div onClick={(e)=>this.setState({itemChosen:1})}>All channels</div>
            <div onClick={(e)=>this.setState({itemChosen:2})}>Tv program</div>
            </div>
            <div className="mobileHr">
            <div className={this.getClassNameChosenMenu()}/>
            </div>
            <div className="dataCont">
                {
                    this.state.itemChosen===0?<MobileCategories categories={this.parseCategories()}/>:
                    this.state.itemChosen===1?<MobileChannels/>:null
                }
            </div>
        </div>                                   )}}


const mapDispatchToProps = (dispatch) => bindActionCreators ({
    dispatch,
    getChannels,
    receiveData,
    setProgram,
    setElemsVis
}, dispatch);
export default connect (
    state =>           ({
        channel:   state.videoReducer.video.channel,
        channels:  state.channelReducer.channels,
        channelNum:state.videoReducer.video.channelNum,
        channelImg:state.videoReducer.video.img,
        category:  state.channelReducer.chosenCategory,
        program:   state.videoReducer.video.program,
        autoPlay:  state.videoReducer.autoPlay
    }),
    mapDispatchToProps
)(MobileApp);
