import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import  menu from '../../img/main_menu.gif';
import {setMenusVisible,getChannels} from '../../actions/actions';
import {bindActionCreators} from 'redux';
import hlsArray from '../../hls';
import parse from '../Parsing';
import * as $ from 'jquery';
class HomeButton extends Component                  {
constructor(props)   {
    super(props);
    //this.bindEvents = this.bindEvents.bind(this);
                     };

// bindEvents()                                        {
// console.log(this);
// if (this.props.menus.settingsVisible||
//     this.props.menus.categoryMenuVisible||
//     this.props.menus.programsVisible||
//     this.props.menus.channelsMenuVisible)
// {
//     $("#video").unbind('mousemove');
//     $("#video").unbind('click');
//     $("#panelDiv").unbind('mousemove');
//     $("#panelDiv").unbind('click');
// }
//
//
//
//                                                     }
toggleMenuState()                                   {
        var channelsState = this.props.menus.channelsMenuVisible;
        var settingsState = this.props.menus.settingsVisible;
        //Туггл кнопок если стейт изменился
            //this.props.dispatch(getChannels(parse(hlsArray)));


            this.props.dispatch(setMenusVisible
            ({
                channelsMenuVisible:!channelsState,
                categoryMenuVisible:false,
                settingsVisible:false

            }));
            //Set focus to menu
            $("#vduppermenu,#vdbottommenu").fadeOut(100);
            //$("#video").unbind('mousemove');
            //$("#video").unbind('click');
            //$("#panelDiv").off('click','mousemove');
            $('#video').focus();
            //this.bindEvents();
                                                    }
setPositionClass()                                  {
if        (this.props.menus.channelsMenuVisible&&
          !this.props.menus.categoryMenuVisible&&
          !this.props.menus.programsVisible) return 'divSideBar_StateChannel';

else if  (this.props.menus.categoryMenuVisible||
          this.props.menus.programsVisible) return 'divSideBar_StateGroup';
          return 'divSideBar';
                                                    }
render()   {
    if      (this.props.visible)
    return (<div
            className={this.setPositionClass()}
            onClick={(e) => this.toggleMenuState()}>
            <img src={menu} height={45} width={30}/>
            </div>);
    else return null
           }
                                                    }
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
    dispatch,setMenusVisible,getChannels
},  dispatch);
export default connect (
    state => ({ menus:state.menuReducer.menus
              }),
    mapDispatchToProps
)(HomeButton);