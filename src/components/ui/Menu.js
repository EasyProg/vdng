import React, {Component,PropTypes} from 'react';
import {Icon} from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import {setMenusVisible,getChannels} from '../../actions/actions';
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
import HomeButton from '../ui/HomeButton';
class Menu extends Component                {
    constructor(props)                      {
        super(props);
        this.toggleMenuState = this.toggleMenuState.bind(this);
                                            }
    // componentWillUnmount() {
    // console.log('sdsdsdsd');
    // }
     toggleMenuState(menuType = 'left')     {
     //e.stopPropagation();
     //console.log('Event Log');
     var channelsState = this.props.menus.channelsMenuVisible;
     var settingsState = this.props.menus.settingsVisible;
     //Туггл кнопок если стейт изменился
        if (menuType !== 'left')
        // {  this.props.dispatch(getChannels(parse(hlsArray)));
        //
        //
        //    this.props.dispatch(setMenusVisible
        //                                      ({
        //        channelsMenuVisible:!channelsState,
        //        categoryMenuVisible:false,
        //        settingsVisible:false
        //
        //                                      }));
        // $('#channels').focus();
        // $("#vduppermenu").fadeOut(100);
        // //Unbind mousemove events
        // $('#video,#panelDiv').off('mousemove');
        // }
        // else
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
        return (
        <div id="menu" className="mainMenuDiv">
                <div className="menuDives">
                    <HomeButton visible={this.props.menus.categoryMenuVisible||
                                         this.props.menus.channelsMenuVisible}/>
                    <Categories visible={this.props.menus.categoryMenuVisible}
                                channelVisible={this.props.menus.channelsMenuVisible}
                                toggleMenuStateContext={this.toggleMenuState}
                                channels={this.props.channels}

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
                    <div className="homeButton"
                         onClick={(e) => this.toggleMenuState('right')}>
                         <img src={home} width={40} height={40}/>
                    </div>
                <HomeMenu visible={this.props.menus.settingsVisible} isParentControl/>
                </div>
        </div>
                )
                }

                                        }
const mapDispatchToProps = (dispatch) => bindActionCreators( {
dispatch,setMenusVisible,getChannels
                                                             }, dispatch);
export default connect (
    state => ({fullScreen:state.videoReducer.fullScreen,
               channel:   state.videoReducer.video.channel,
               channels:  state.channelReducer.channels,
               channelId: state.videoReducer.video.channelId,
               channelImg:state.videoReducer.video.img,
               category:  state.channelReducer.chosenCategory,
               menus:     state.menuReducer.menus,
               isParentControl:
                          state.settingsReducer.parentalControl
          }),
                      mapDispatchToProps
                       )(Menu);