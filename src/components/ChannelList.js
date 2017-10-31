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
var    ScrollbarWrapper = require('react-scrollbar');
class  ChannelList extends Component                {
    constructor(props)                              {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.categVisible = this.categVisible.bind(this);
        this.menuFullScreenAppears = this.menuFullScreenAppears.bind(this);
        this.switchChannel = this.switchChannel.bind(this);
        this.setMenusVisibleFalse = this.setMenusVisibleFalse.bind(this);
        this.timer = '';
        this.menuTimer = '';
        this.state =                                 {
             itemChosen:0,
             channelId:-1,
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
    switchChannel(param='next',i=0)                  {
        var items = $('.menuItemStyle,.menuItemStyleChosen,.menuItemStylefocus');
        var nextElem = i + 1 >= items.length ? 0 : i + 1;
        var prevElem = i - 1 < 0 ? items.length - 1 : i - 1;
        if (param === 'next' && items[nextElem])     {
            items[nextElem].focus();
            this.setState({channelId: nextElem, program: this.props.playList[nextElem].program});
                                                     }
            if (param === 'prev' && items[prevElem])
                                                     {
                items[prevElem].focus();
                this.setState({channelId: prevElem, program: this.props.playList[prevElem].program});

                                                     }
                                                     }
    handleKey(e,elem)                           {
            switch (e.keyCode)                      {


            case 39 :                       {
                if (elem && elem.program)   {
                    this.setState({programs: parseProgram(elem.program)});
                    this.props.dispatch(setMenusVisible(
                                            {
                            channelsMenuVisible: true,
                            categoryMenuVisible: false,
                            settingsVisible: false,
                            programsVisible: true
                                            }, true
                                            ));
                    console.log('aasasasa');
                    $('#programList').focus();

                                            }
                                            }
            break;
            case 40:
                this.switchChannel('next', this.state.channelId);
                break;
            case 38:
                this.switchChannel('prev', this.state.channelId);
                break;
            case 13:                                {
                this.handleClick(this.props.playList[this.state.channelId],e);
                setTimeout(this.setMenusVisibleFalse,300);

                                                    }
                break;
            case 32:
                this.handleClick(this.props.playList[this.state.channelId],e);
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
                this.props.dispatch(setMenusVisible (
                    {
                        channelsMenuVisible: true,
                        categoryMenuVisible: true,
                        settingsVisible: false
                    },true
                ));
                $('#categories').focus();
            }
                break;
                break;
            case 27:    {
                this.props.dispatch(setMenusVisible(
                    {
                        channelsMenuVisible: false,
                        categoryMenuVisible: false,
                        settingsVisible: false
                    }));
                $('#video').focus();
            }
                break;
            case 8:     {
                this.props.dispatch(setMenusVisible(
                    {
                        channelsMenuVisible: false,
                        categoryMenuVisible: false,
                        settingsVisible: false
                    }));
                $('#video').focus();
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
        this.props.dispatch(changeVideo(elem));
        this.props.dispatch(togglePlay(!this.props.autoPlay));
        this.props.dispatch(setMenusVisible
            (
                {
                    programsVisible: false,
                    channelsMenuVisible: true,
                    categoryMenuVisible: this.props.menus.categoryMenuVisible,
                    settingsVisible: false
                }
                ,
                true));
        //var parseProgramsArr = parseProgram(elem.program);
        // if (parseProgramsArr.length > 0)
        // {
        //     this.props.dispatch(setMenusVisible
        //     (
        //         {
        //             programsVisible: true,
        //             channelsMenuVisible: true,
        //             categoryMenuVisible: false,
        //             settingsVisible: false
        //         }
        //         ,
        //         true));
        //     this.setState({programs: parseProgramsArr});
        //
        //
        //
        // }
        // else {
        //     this.props.dispatch(setMenusVisible
        //     (
        //         {
        //             programsVisible: false,
        //             channelsMenuVisible: true,
        //             categoryMenuVisible: this.props.menus.categoryMenuVisible,
        //             settingsVisible: false
        //         }
        //         ,
        //         true
        //     ));
        // }
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
    render()                                    {
        //this.switchChannel();
        if (this.props.playList.length)
            return                              (
                    <div>
                    <div className={this.props.channelsMenuVisible&&this.props.catMenuVisible?
                         'menuChannelLeft':this.props.channelsMenuVisible&&
                         !this.props.catMenuVisible?'menuChannel':'menuChannelNone'}
                         onClick={this.props.onClick} id="channels" tabIndex={1}
                         onKeyDown={e=>this.handleKey(e)}
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
                        <CustomScroll>
                            {this.props.playList.map((elem, i) =>
                                <Channel
                                    key={i}
                                    img={elem.img}
                                    channelNum      =   {elem.channelNum}
                                    channelId       =   {elem.channelId}
                                    hiddenChannel   =   {this.props.channelCategory==='Locked'}
                                    programName     =   {getCurrentProgram(elem.program,elem.channel).title}
                                    favorite        =   {this.isFavorite(elem.channelId)}
                                    chosen          =   {elem.channelId===this.props.video.channelId&&elem.category===this.props.video.category}
                                    onClick         =   {e=>this.handleClick(elem,e)}
                                    tabIndex        =   {i}
                                    elemChosen      =   {i === this.state.channelId}
                                    onKeyDown       =   {e=>this.handleKey(e,elem)}
                                    progress        =   {elem.program?getCurrentProgram(elem.program).progressValue:-1}
                                />
                            )
                            }
                        </CustomScroll>
                        <ProgramList
                                    visible = {this.props.menus.programsVisible}
                                    programs={this.state.programs}
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