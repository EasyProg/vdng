import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import  menu from '../../img/main_menu.gif';
import {setMenusVisible,getChannels} from '../../actions/actions';
import {bindActionCreators} from 'redux';
import hlsArray from '../../hls';
import parse from '../Parsing';
import * as $ from 'jquery';
class MenuButton extends Component                      {
    constructor(props)   {
        super(props);
        this.toggleMenuState = this.toggleMenuState.bind(this);
    };

    toggleMenuState()                                   {
        var channelsState = this.props.menus.channelsMenuVisible;
        var settingsState = this.props.menus.settingsVisible;
        //Туггл кнопок если стейт изменился
        //this.props.dispatch(getChannels(parse(hlsArray)));
        if (this.props.channels.length>0)               {
            this.props.dispatch(setMenusVisible
            ({
                channelsMenuVisible: !channelsState,
                categoryMenuVisible: false,
                settingsVisible: false

            },!channelsState));
            //Set focus to menu

            $("#vduppermenu,#vdbottommenu").fadeOut(100);
            $('#video').focus();
            $('.hoverDiv').animate({'width':'30vw'},200);
            if (!channelsState===false)
            $('.hoverDiv').animate({'width':'0'},150);
            //set hoverDi
                                                        }
        else                                            {

            {
                this.props.dispatch(setMenusVisible
                ({
                    channelsMenuVisible: false,
                    categoryMenuVisible: true,
                    settingsVisible: false

                }, true));
                $('.hoverDiv').animate({'width':'30vw'},200);
            }
                                                        }
                                                        }
    setPositionClass()                                  {
    if (this.props.isOpened!==true)
    {
     return "divSideBar"
    }
    else return "divSideBar_menu"
                                                        }
    render()    {
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
    state => ({ menus:state.menuReducer.menus,
                isOpened:state.menuReducer.isOpened,
                channels:state.channelReducer.channels,
    }),
    mapDispatchToProps
)(MenuButton);