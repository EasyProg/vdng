/**
 * Created by Михаил on 16.10.2017.
 */
import React, {Component,PropTypes} from 'react';



export default class ContainerMenu extends Component{
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
        case 0: return 'smKindOfMenu';
        break;
        case 1: return 'smKindOfMenu_state1'
                                        }
                                        }

render() {
    return  (
    <div onClick={(e)=>this.handleClick()} className={this.setClass()}>
    </div>
            )
         }
                                                    }