    import React, {Component,PropTypes} from 'react';
    import {connect} from 'react-redux';
    import {bindActionCreators} from 'redux';
    import {changeVideo,toggleCategory,togglePlay,getChannels,setMenusVisible} from '../actions/actions';
    import {Button} from 'semantic-ui-react';
    import 'semantic-ui-css/semantic.min.css';
    import '../styles/css/main_styles.css';
    import * as $ from 'jquery';
    //import '../components/Channel';
    import Channel from './Channel';
    import PerfectScrollbar from 'react-perfect-scrollbar';
    import 'react-perfect-scrollbar/dist/css/styles.css';
    import HomeButton from './ui/HomeButton';
    import CategoryName from './ui/CategoryName';
    class  ChannelList extends Component       {
    constructor(props)                         {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.categVisible = this.categVisible.bind(this);
    this.menuFullScreenAppears = this.menuFullScreenAppears.bind(this);
    this.timer = '';
    this.menuTimer = '';
                                               }
    static propTypes    =                      {
    playList:   PropTypes.array.isRequired,
    category:   PropTypes.string.isRequired,
    visibleSetContext:PropTypes.func.isRequired
                                               };
    handleKey(elem,e)                          {
    if (e.keyCode===13)
    {
        this.handleClick (elem);
    }
                                               }
    handlePlay()                               {
            this.timer =
                setTimeout(function()          {
                    //Скрыть плей
                    $("#vduppermenu").fadeOut(1000);
                                                },5000);
            // this.menuTimer = setTimeout (
            //     function()              {
            //         //Скрыть плей
            //         $("#menu").fadeOut(1000);
            //     },8000)

                                              }
    menuFullScreenAppears()
                                              {
            //Отобразить плей
            clearTimeout(this.timer);
            clearTimeout(this.menuTimer);
            $("#vduppermenu,#vdbottommenu").fadeIn(1);
            //Запустить скрытие
            this.handlePlay();
            //Вернуть скрытие обратно
            //var appearsVideo = this.menuFullScreenAppears;
            //$('#video,#panelDiv').mousemove(function(event)
            //                                          {
            //appearsVideo();
            //                                          });
                                                }

    handleClick (elem)                         {
    this.props.dispatch(changeVideo(elem));
    this.props.dispatch(toggleCategory(elem.category));
    this.props.dispatch(togglePlay(!this.props.autoPlay));
    this.props.dispatch(setMenusVisible({
    channelsMenuVisible:false,
    categoryMenuVisible:false,
    settingsVisible:false
    }));
    //Set UI
    //Set mousemove back
        var appearsVideo = this.menuFullScreenAppears;
        $('#video,#panelDiv').mousemove(function(event) {
            appearsVideo();
                                                        });

                                                }
    categVisible()                              {
        this.props.dispatch(setMenusVisible     (
            {
                channelsMenuVisible:true,
                categoryMenuVisible:true,
                settingsVisible:false
            }                                   ));

                                                }

    render()  {
        if (this.props.playList.length)
        return                                  (
        <div>
            <div className={this.props.channelsMenuVisible&&this.props.catMenuVisible?
                        'menuChannelLeft':this.props.channelsMenuVisible&&
                        !this.props.catMenuVisible?'menuChannel':'menuChannelNone'}
                        onClick={this.props.onClick} id="channels">
            {this.props.playList.length?
            <div className="menuHeaderCh">
            <CategoryName visible ={this.props.menus.channelsMenuVisible&&!this.props.menus.categoryMenuVisible}
                          categ   ={this.props.channelCategory}
                          categVisibleContext = {this.categVisible}
                          reversed={false}
            />
            <HomeButton/>
            </div>:''
            }
               <PerfectScrollbar>
               {this.props.playList.map((elem, i) =>
                            <Channel
                            key={i}
                            img={elem.img}
                            channelId       =   {elem.channelNum}
                            hiddenChannel   =   {this.props.category==='Locked'}
                            programName     =   {elem.channel}
                            favorite        =   {this.props.category==='Любимые'}
                            chosen          =   {elem.channelId===this.props.video.channelId&&elem.category===this.props.video.category}
                            onClick         =   {e=>this.handleClick(elem)}
                            onKeyDown       =   {e=>this.handleKey(elem,e)}
                            />
               )
               }
               </PerfectScrollbar>
            <div className="menuBottom"/>
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
        export default connect(
        state => ({
        video:state.videoReducer.video,
        channelCategory:state.channelReducer.chosenCategory,
        autoPlay:state.videoReducer.autoPlay,
        channelsMenuVisible:state.menuReducer.menus.channelsMenuVisible,
        catMenuVisible:state.menuReducer.menus.categoryMenuVisible,
        menus:state.menuReducer.menus
                 }),
        mapDispatchToProps
        )(ChannelList);




