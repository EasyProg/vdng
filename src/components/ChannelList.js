    import React, {Component,PropTypes} from 'react';
    import {connect} from 'react-redux';
    import {bindActionCreators} from 'redux';
    import {changeVideo,toggleCategory,togglePlay,getChannels,setMenusVisible} from '../actions/actions';
    import {Button} from 'semantic-ui-react';
    import 'semantic-ui-css/semantic.min.css';
    import '../styles/css/main_styles.css';
    import * as $ from 'jquery';
    //import '../components/Channel';
    import ProgramList from '../components/ProgramList';
    import programs from '../program';
    import parseProgram from '../components/ParseProgramLight';
    import Channel from './Channel';
    //import PerfectScrollbar from 'react-perfect-scrollbar';
    import 'react-perfect-scrollbar/dist/css/styles.css';
    import HomeButton from './ui/HomeButton';
    import CategoryName from './ui/CategoryName';
    import {Scrollbars} from 'react-custom-scrollbars';
    class  ChannelList extends Component       {
    constructor(props)                         {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.categVisible = this.categVisible.bind(this);
    this.menuFullScreenAppears = this.menuFullScreenAppears.bind(this);
    this.switchChannel = this.switchChannel.bind(this);
    this.timer = '';
    this.menuTimer = '';
    this.state =    {
                    itemChosen:0,
                    channelId:-1,
                    isClicked:false,
                    programs:[]
                    }
                                               }
    static propTypes    =                      {
    playList:   PropTypes.array.isRequired,
    category:   PropTypes.string.isRequired,
    visibleSetContext:PropTypes.func.isRequired
                                               };
    switchChannel(param='next',i=0)            {
            console.log(i);

            var items = document.getElementsByClassName('menuItemStyle');
            var nextElem = i + 1 >=    items.length ?  0 : i + 1;
            var prevElem = i - 1 < 0 ? items.length - 1 : i - 1;
            if (param === 'next') {
                items[nextElem].focus();
                this.setState({channelId:nextElem});
            }
            if (param === 'prev') {
                items[prevElem].focus();
                this.setState({channelId:prevElem});

            }
                                                }
    handleKey(e,elem)        {
        switch (e.keyCode)   {
            case 40:
                this.switchChannel('next', this.state.channelId);
                break;
            case 38:
                this.switchChannel('prev', this.state.channelId);
                break;
            case 13:
                this.handleClick(this.props.playList[this.state.channelId]);
                break;
            case 37:        {
                this.props.dispatch(setMenusVisible(
                    {
                        channelsMenuVisible: true,
                        categoryMenuVisible: true,
                        settingsVisible: false
                    }
                                                    ));
                $('#categories').focus();
                            }
            break;
            case 39:   {
                this.props.dispatch(setMenusVisible(
                    {
                        channelsMenuVisible: false,
                        categoryMenuVisible: false,
                        settingsVisible: false
                    }
                    ));
                $('#video').focus();
                        }
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
    menuFullScreenAppears()
                                                {
            //Отобразить плей
            clearTimeout(this.timer);
            clearTimeout(this.menuTimer);
            $("#vduppermenu,#vdbottommenu").fadeIn(1);
            //Запустить скрытие
            this.handlePlay();
                                                }

    handleClick (elem)                          {
    this.props.dispatch(changeVideo(elem));
    this.props.dispatch(toggleCategory(elem.category));
    this.props.dispatch(togglePlay(!this.props.autoPlay));
        var appearsVideo = this.menuFullScreenAppears;
        $('#video,#panelDiv').mousemove(function(event) {
            appearsVideo();
                                                        });
    //this.setState({isClicked:true});
    //console.log(this.props.video.channelId);
    var parseProgramsArr = parseProgram(elem.channelId);
    if (parseProgramsArr.length>0)      {
    this.props.dispatch(setMenusVisible(
            {
                programsVisible: true,
                channelsMenuVisible: true,
                categoryMenuVisible: this.props.menus.categoryMenuVisible,
                settingsVisible: false
            }
                                        ));
    this.setState({programs: parseProgram(elem.channelId)});
                                        }
    else this.props.dispatch(setMenusVisible
            (
            {
            programsVisible: false,
            channelsMenuVisible: true,
            categoryMenuVisible: this.props.menus.categoryMenuVisible,
            settingsVisible: false
            }));
    //Execute programm parsing
    //this.setState({programs:parseProgram(this.props.video.channelId)})
                                                }
    categVisible()                              {
    this.props.dispatch(setMenusVisible         (
                                                {
                channelsMenuVisible:true,
                categoryMenuVisible:true,
                settingsVisible:false
                                                }
                                                ));

                                                }

    render()  {
        if (this.props.playList.length)
        return                                  (
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
            <HomeButton  visible  = {this.props.menus.channelsMenuVisible&&!this.props.menus.programsVisible}/>
            </div>:''
            }
            <Scrollbars //style={{overflow:'visible',position:'absolute',width:400}}
                         autoHide


            >
                            {this.props.playList.map((elem, i) =>
                            <Channel
                            key={i}
                            img={elem.img}
                            channelNum      =   {elem.channelNum}
                            channelId       =   {elem.channelId}
                            hiddenChannel   =   {this.props.category==='Locked'}
                            programName     =   {elem.channel}
                            favorite        =   {this.props.category==='Любимые'}
                            chosen          =   {elem.channelId===this.props.video.channelId&&elem.category===this.props.video.category}
                            onClick         =   {e=>this.handleClick(elem)}
                            tabIndex        =   {i}
                            elemChosen      =   {i === this.state.channelId}
                            onKeyDown       =   {e=>this.handleKey(e,elem)}
                            />
               )
               }
            </Scrollbars>
            <div className="menuBottom"/>
            {/*//this.state.isClicked&&this.props.menus.channelsMenuVisible?*/}
            {/*//this.props.menus.programsVisible?*/}
            <ProgramList visible={this.props.menus.programsVisible}
            programs={this.state.programs}/>
            </div>
            </div>
                                                );
            else return (null)
            }
                                                }
        const mapDispatchToProps = (dispatch) => bindActionCreators({
        dispatch,
        changeVideo,
        toggleCategory,
        togglePlay,
        getChannels,
        setMenusVisible
        }, dispatch);
        export default
        connect             (
        state =>            ({
        video:state.videoReducer.video,
        channelCategory:state.channelReducer.chosenCategory,
        autoPlay:state.videoReducer.autoPlay,
        channelsMenuVisible:state.menuReducer.menus.channelsMenuVisible,
        catMenuVisible:state.menuReducer.menus.categoryMenuVisible,
        menus:state.menuReducer.menus,
        channels:state.channelReducer.channels
        //isFavor:state.channelReducer.isFavorite
        //settings:state.settingsReducer
                            }),
        mapDispatchToProps
                            )(ChannelList);




