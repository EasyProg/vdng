import React,{Component} from 'react';
import '../../styles/css/main_styles.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
class  MainMenu extends Component
                 {
constructor(props)
                 {
super(props);
this.returnState = this.returnState.bind(this);
// this.state = {opened:0}
                 }
returnState()    {
if (this.props.isOpened===false)
    return null;
else if  (this.props.menus.channelsMenuVisible&&
         !this.props.menus.categoryMenuVisible&&
         !this.props.menus.programsVisible
         )
return  (<div className="oneMenuOpen">
         </div>);
else if (
         this.props.menus.channelsMenuVisible&&
        (this.props.menus.categoryMenuVisible||
         this.props.menus.programsVisible)
        )
return  (<div className="twoMenuOpen">
        </div>);
                 }
render()         {
    if           (this.props.isOpened===false)
    return null;
    else     return    (<div>{this.returnState()}</div>)

                 }

                 }
export default connect  (
    state =>            ({
        menus:          state.menuReducer.menus,
        isOpened:       state.menuReducer.isOpened
                        })
                        )(MainMenu);