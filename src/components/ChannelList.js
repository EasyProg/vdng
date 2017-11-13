import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeVideo,toggleCategory,togglePlay,getChannels,setMenusVisible,setChannelProgram} from '../actions/actions';
import {Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../styles/css/main_styles.css';
import * as $ from 'jquery';
import getCurrentProgram from '../components/workingDate'
//import '../components/Channel';
import ProgramList from '../components/ProgramList';
import programs from '../program';
import parseProgram from '../components/ParseProgramLight';
import Channel from './Channel';
//import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import MenuButton from './ui/MenuButton';
import CategoryName from './ui/CategoryName';
import CustomScroll from './ui/CustomScroll';
import ReactScrollBar from 'react-scrollbar-js';
import ReactScroll from 'react-scrollbar-js';
//var    ScrollbarWrapper = require('react-scrollbar');
class   ChannelList extends Component               {
        constructor(props)                          {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.categVisible = this.categVisible.bind(this);
        this.menuFullScreenAppears = this.menuFullScreenAppears.bind(this);
        this.switchChannel = this.switchChannel.bind(this);
        this.setMenusVisibleFalse = this.setMenusVisibleFalse.bind(this);
        this.setProgramsVisible = this.setProgramsVisible.bind(this);
        this.disableFocus = this.disableFocus.bind(this);
        this.timer = '';
        this.menuTimer = '';
        this.state =                                {
        itemChosen:false,
        channelId:0,
        isClicked:false,
        program:[],
        programs:[],
        currentProgram:'',
                                                    }
                                                    }
        static propTypes  =                         {
            playList:   PropTypes.array.isRequired,
            category:   PropTypes.string.isRequired,
            visibleSetContext:PropTypes.func.isRequired
        };
        setMenusVisibleFalse()                      {
            this.props.dispatch(setMenusVisible(
                {
                    channelsMenuVisible: false,
                    categoryMenuVisible: false,
                    settingsVisible: false,
                    programsVisible: false
                },false
            ));
            $('#video').focus();
        }
        switchChannel(param='next',id,channelid)    {
            var items = $('.menuItemStyle,.menuItemStyleChosen');
            var nextElem = id + 1 >=    items.length ? 0 : id + 1;
            var prevElem = id - 1 <= 0 ?0 :     id - 1;
            if (param === 'next' && items[nextElem]){
                items[nextElem].focus();
                this.setState({itemChosen:nextElem,channelId: channelid, program: this.props.playList[nextElem].program});
                this.runningString('focus');
                                                    }
                if (param === 'prev' && items[prevElem])
                {items[prevElem].focus();
                this.setState({itemChosen:prevElem,channelId: channelid, program: this.props.playList[prevElem].program});
                this.runningString('focus');

                                                    }
                                                    }
        runningString(param)                        {
            if (param==='hover')
            {
            var str     = $('.pname_hover:hover');
            var strCont = $('.pname:hover');
            }
            if (param==='focus')
            {
            this.stopRun();
            var str     = $('.menuItemStyle:focus>.staticItem>.menuChannelName>.pname>.pname_hover');
            var strCont = $('.menuItemStyle:focus>.staticItem>.menuChannelName>.pname');
            }
            var width = str.width();
            var con_w = str.css('left');

            function run () {
                var con_len = parseInt(con_w) - (width - strCont.width());
                str.animate
                ({left:con_len + 'px'},
                    {duration: 2000,
                        complete: function ()
                    {
                            str.css('left',con_w);
                    }});}
            if (width>strCont.width())
            {
                run();
            }                                       }
        stopRun      ()                             {
            $('.pname_hover').stop(true,true);
        }
        handleKey(e,elem,i)                         {
                switch (e.keyCode)                       {


                case 39 :                                {
                    if (elem && elem.program)            {
                        this.setState({programs: parseProgram(elem.program)});
                        this.props.dispatch(setMenusVisible
                                                         (
                                                         {
                                channelsMenuVisible: true,
                                categoryMenuVisible: false,
                                settingsVisible: false,
                                programsVisible: true
                                                        }, true
                                                        ));
                                                        }
                                                        }
                break;
                case 40:
                {
                    if (elem)   {
                        // this.props.dispatch(setMenusVisible(
                        //         {
                        //         channelsMenuVisible: true,
                        //         categoryMenuVisible: false,
                        //         settingsVisible: false,
                        //         programsVisible: false
                        //         }, true
                        // ));
                        this.switchChannel('next', this.state.itemChosen || i, elem.channelId);
                                }
                }
                    break;

                case 38:
                {
                     if (elem)   {
                    //     this.props.dispatch(
                    //         setMenusVisible(
                    //             {
                    //                 channelsMenuVisible: true,
                    //                 categoryMenuVisible: false,
                    //                 settingsVisible: false,
                    //                 programsVisible: false
                    //             }, true
                    //         ));
                        this.switchChannel('prev', this.state.itemChosen || i, elem.channelId);
                                }

                }
                    break;
                case 13:                                {
                    this.handleClick(this.props.playList[this.state.itemChosen],e);
                    this.setState({itemChosen:false});
                    setTimeout(this.setMenusVisibleFalse,300);
                                                        }
                    break;
                case 32:
                    this.handleClick(this.props.playList[this.state.itemChosen],e);
                    this.props.dispatch(setMenusVisible (
                        {
                            channelsMenuVisible: false,
                            categoryMenuVisible: false,
                            settingsVisible: false,
                            programsVisible:false
                        }
                                                        ));
                    break;
                case 37:   {
                    this.props.dispatch(setMenusVisible
                    (
                        {
                            channelsMenuVisible: true,
                            categoryMenuVisible: true,
                            settingsVisible: false
                        },true
                    ));
                    //this.setState({channelId: this.state.itemChosen});
                    //
                    this.setState({channelId: -1});
                    if (this.props.menus.categoryMenuVisible)
                    $('.categoryItemChosen').focus();
                            }
                    break;
                    break;
                case 27:    {
                    this.props.dispatch(setMenusVisible(
                        {
                            channelsMenuVisible: false,
                            categoryMenuVisible: false,
                            settingsVisible: false
                        },false));
                    $('#video').focus();
                    $('#menuCenterText').fadeOut(100);
                            }
                    break;
                case 8:     {
                    this.props.dispatch(setMenusVisible(
                        {
                            channelsMenuVisible: false,
                            categoryMenuVisible: false,
                            settingsVisible: false
                        },false));
                    $('#video').focus();
                    $('#menuCenterText').fadeOut(100);
                            }
            }
        }
        handlePlay()                                {
            this.timer =
                setTimeout(function()           {
                        //Скрыть плей
                        $("#vduppermenu").fadeOut(1000);
                    }
                    ,5000);

        }
        menuFullScreenAppears()                     {
            clearTimeout(this.timer);
            clearTimeout(this.menuTimer);
            $("#vduppermenu,#vdbottommenu").fadeIn(1);
            //Запустить скрытие
            this.handlePlay();
        }
        handleClick (elem,e)                        {
            e.stopPropagation();
            e.preventDefault();
            if (elem)
            {this.setState({channelId: elem.channelId,itemChosen:elem.channelId});}
            this.props.dispatch(changeVideo(elem));
            this.props.dispatch(togglePlay(!this.props.autoPlay));
            this.props.dispatch(toggleCategory(this.props.category));
            this.setState({itemChosen:false});
            setTimeout(this.setMenusVisibleFalse,300);
                                                    }
        categVisible()                              {
            this.props.dispatch(    setMenusVisible (
                {
                    channelsMenuVisible:true,
                    categoryMenuVisible:true,
                    settingsVisible:false
                },true));

        }
        isFavorite(channelId)                       {
            if (localStorage.getItem(channelId)!==null)
            {
                return true;
            }
            else
                return false

        }
        setProgramsVisible(e,program)               {
        e.stopPropagation();
        if (program)                                {
        //this.setState({channelId: prevElem, program: this.props.playList[prevElem].program});
        this.setState({programs: parseProgram(program),program:program});
        this.props.dispatch(setMenusVisible(
                    {
                        channelsMenuVisible: true,
                        categoryMenuVisible: false,
                        settingsVisible: false,
                        programsVisible: true
                    }, true
                ));
                //set state
                $('#programList').focus();
                                                    }
                                                    }
        disableFocus()                              {
        $('#channels').focus();
                                                    }
        // shouldComponentUpdate() {
        // if
        //                         }

        componentDidUpdate(prevProps)
                                                    {
        if (prevProps.channelsMenuVisible!==this.props.channelsMenuVisible&&this.props.channelsMenuVisible!==false&&this.props.catMenuVisible===false)

        {

            $('.menuItemStyleChosen').focus();
        }

                                    }
        render()                                    {
        //this.switchChannel();
        if (this.props.playList.length)
            return                                  (
                    <div>
                    <div className={this.props.channelsMenuVisible&&this.props.catMenuVisible?
                         'menuChannelLeft':this.props.channelsMenuVisible&&
                         !this.props.catMenuVisible?'menuChannel':'menuChannelNone'}
                         onClick={this.props.onClick} id="channels" tabIndex={1}
                         onKeyDown={e=>this.handleKey(e)}
                         onMouseOver={e=>this.disableFocus()}
                    >
                        {this.props.playList.length?
                            <div className="menuHeaderCh">
                                <CategoryName visible = {this.props.menus.channelsMenuVisible&&!this.props.menus.categoryMenuVisible}
                                              categ   = {this.props.channelCategory}
                                              categVisibleContext = {this.categVisible}
                                              reversed= {false}
                                />
                                <MenuButton  visible  = {this.props.menus.channelsMenuVisible&&!this.props.menus.programsVisible}/>
                            </div>:''
                        }
                        <div className="customMenuScrollDiv">
                        <div className="customMenuDiv">
                                                        {this.props.playList.map(  (elem, i) =>
                                    <Channel
                                    key=                {i}
                                    img=                {elem.img}
                                    channelNum      =   {elem.channelNum}
                                    channelId       =   {elem.channelId}
                                    hiddenChannel   =   {this.props.channelCategory==='Locked'}
                                    programName     =   {getCurrentProgram(elem.program,elem.channel).title}
                                    favorite        =   {this.isFavorite(elem.channelId)}
                                    chosen          =   {elem.channelId===this.props.video.channelId}
                                    onClick         =   {e=>this.handleClick(elem,e)}
                                    tabIndex        =   {i}
                                    elemChosen      =   {this.state.itemChosen === i}
                                    onKeyDown       =   {e=>this.handleKey(e,elem,i)}
                                    progress        =   {elem.program?getCurrentProgram(elem.program).progressValue:-1}
                                    setProgramVisibleContext
                                                    =   {this.setProgramsVisible}
                                    program         =   {elem.program}
                                    />
                                                        )
                                                    }
                            </div>
                        </div>
                        <ProgramList
                                    visible         = {this.props.menus.programsVisible}
                                    programs        = {this.state.programs}
                                    currentProgramId={getCurrentProgram(this.state.program).current.id}
                        />
                    </div>
                    <div className="menuBottom"/>
                    </div>
            );
        else return (null)
    }
                                                    }
const mapDispatchToProps = (dispatch) => bindActionCreators
                (
                {
        dispatch,
        changeVideo,
        toggleCategory,
        togglePlay,
        getChannels,
        setMenusVisible,
        setChannelProgram
                }, dispatch);
export default
connect                 (
    state =>            ({
        video:state.videoReducer.video,
        channelCategory:state.channelReducer.chosenCategory,
        autoPlay:state.videoReducer.autoPlay,
        channelsMenuVisible:state.menuReducer.menus.channelsMenuVisible,
        catMenuVisible:state.menuReducer.menus.categoryMenuVisible,
        menus:state.menuReducer.menus,
        channels:state.channelReducer.channels,
        currentChannel:state.channelReducer.channelProgram
                        }),
                        mapDispatchToProps
                        )(ChannelList);