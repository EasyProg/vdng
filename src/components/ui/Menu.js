import React, {Component,PropTypes} from 'react';
import {Icon} from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import {setChannelsVisible} from '../../actions/actions';
import {connect} from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import '../../styles/css/main_styles.css';
import Categories from '../Categories';
import HomeMenu from '../HomeMenu';
import home from '../../img/hm.png';
import menu from '../../img/main_menu.gif';
import * as $ from 'jquery';
class Menu extends Component            {
    constructor(props) {
        super(props);
        this.toggleMenuState = this.toggleMenuState.bind(this);
                       }
    toggleMenuState(menuType = 'left')  {
     var categoryState = this.props.menus.categoryMenuVisible;
     var settingsState = this.props.menus.settingsVisible;
     //Туггл кнопок если стейт изменился
        if (menuType === 'left')
        {
           this.props.dispatch(setChannelsVisible({
               channelsMenuVisible:false,
               categoryMenuVisible:!categoryState,
               settingsVisible:false
                                                  }));
        $('#channels').focus();
        }
        else
        {
            this.props.dispatch(setChannelsVisible({
                channelsMenuVisible:false,
                categoryMenuVisible:false,
                settingsVisible:!settingsState
            }));
        }
                                        }
    render() {
        return (
            <div id="menu" className={this.props.fullScreen ? 'mainMenuDivFull' : "mainMenuDiv"}>
                <div className="menuDives">
                    <div className="divSideBar"
                         onClick={(e) => this.toggleMenuState()}>
                    <img src={menu} height={45} width={30}/>
                         {/*<Icon className="big inverted sidebar"/>*/}
                    </div>
                    <Categories visible={this.props.menus.categoryMenuVisible}
                    channelVisible=     {this.props.menus.channelsMenuVisible}
                    toggleMenuStateContext={this.toggleMenuState}/>
                    <div className={this.props.fullScreen?"menuCenterText":'displayNone'}>
                        <div className="menuCenterTextBig">{this.props.category} {' < '}
                        <span className="menuCenterTextBigBold">{this.props.channelId}{'. '}{this.props.channel}</span></div>
                        <div>А здесь должно быть название того что идет</div>
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
const mapDispatchToProps = (dispatch) => bindActionCreators({
dispatch,setChannelsVisible
                                                            }, dispatch);
export default connect (
state => ({fullScreen:state.videoReducer.fullScreen,
           channel:   state.videoReducer.video.channel,
           channelId: state.videoReducer.video.channelId,
           category:  state.channelReducer.chosenCategory,
           menus:     state.menuReducer.menus,
           isParentControl:
                      state.settingsReducer.parentalControl
          }),
          mapDispatchToProps
                       )(Menu);