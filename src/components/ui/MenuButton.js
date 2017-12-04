import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import  menu from '../../img/main-menu-icon.svg';
import {setMenusVisible,getChannels,toggleCategory} from '../../actions/actions';
import {bindActionCreators} from 'redux';
import hlsArray from '../../hls';
import parse from '../Parsing';
import * as $ from 'jquery';
class MenuButton extends Component                      {
    constructor(props)   {
        super(props);
        this.toggleMenuState = this.toggleMenuState.bind(this);
    };

    toggleMenuState()
    {
        var channelsState = this.props.menus.channelsMenuVisible;
        var settingsState = this.props.menus.settingsVisible;
        //Туггл кнопок если стейт изменился
        if (this.props.channels.length===0)
        {this.props.dispatch(toggleCategory('Все жанры'));}
        this.props.dispatch(setMenusVisible
        ({
            channelsMenuVisible: !channelsState,
            categoryMenuVisible: false,
            settingsVisible: false

        },!channelsState));
        //Set focus to menu
        $('#menuCenterText,.bottomShadowDiv').fadeOut(100);
        $("#vduppermenu,#vdbottommenu").fadeOut(100);
        $('#video').focus();
        if (!channelsState===true)
        {
            $('#channels').focus();
            $('.menuItemStyleChosen').focus();
        }

    }
    switchKeyPress(event)                               {
        event.stopPropagation();
        event.preventDefault();
        switch (event.keyCode)                          {
            case 40:
            $('#playpause').focus();
            break;
            case 32:
            this.toggleMenuState();
            break;
            case 13:
            this.toggleMenuState();
            break;
            default:break;
                                                        }
                                                        }
    setPositionClass()                                  {
        if (this.props.isOpened!==true)
        {
            return "divSideBar"
        }
        else return "divSideBar_menu"
    }
    render()          {
        if      (this.props.visible)
            return    (
                <div tabIndex={1}
                    onKeyDown={(e)=>this.switchKeyPress(e)}
                    className={this.setPositionClass()}
                    onClick={(e) => this.toggleMenuState()}>
                    <img src={menu} className="divSideBarMenuImg" id="menubutton"/>
                </div>);
        else return null
    }
}
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        dispatch,setMenusVisible,getChannels,toggleCategory
    },  dispatch);
export default   connect (
    state => ({
        menus:state.menuReducer.menus,
        isOpened:state.menuReducer.isOpened,
        channels:state.channelReducer.channels,
    }),
    mapDispatchToProps
)(MenuButton);