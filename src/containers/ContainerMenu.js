/**
 * Created by Михаил on 16.10.2017.
 */
import React, {Component,PropTypes} from 'react';
import '../styles/css/main_styles.css';
import  menu from '../img/main_menu.gif';

export default class ContainerMenu extends Component {
    constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state =
    ({
    openedMenuId:0,
    focusedOn:0
                       })
                       }
    handleClick()
    {
    this.setState({openedMenuId:1,focusedOn:1});
    }
    setClass ()
                                        {
    switch (this.state.openedMenuId)    {
        case 1: return 'smKindOfMenu_Channels';
        break;
        case 2: return 'smKindOfMenu_Group';
        break;
        default:return 'defaultStyle'
                                        }
                                        }

render()    {
    if (this.state.openedMenuId===0)
    return  (
        <div
            className="divSideBar"
            onClick={(e)=>this.handleClick()}>
            <img src={menu} height={45} width={30}/>
        </div>
            );
    else return  (
        <div onClick={(e)=>this.handleClick()}
             className={this.setClass()}>
             <div className="menu_header">
             </div>
        </div>
                 )
             }
                                                    }