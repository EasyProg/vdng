import React, {Component,PropTypes} from 'react';
import point from '../../img/pointing-to-left.gif';
import MenuButton from '../ui/MenuButton';
import point_right from '../../img/arrow-pointing-to-right.gif';
import '../../styles/css/main_styles.css';
import  menu from '../../img/main_menu.gif';
export default class CategoryName extends Component {
    constructor(props) {
        super(props);
    };
    static propTypes = {
        visible:PropTypes.bool.isRequired,
        reversed:PropTypes.bool.isRequired
    };
    render(){
        return  (
            <div className='divCateg'>
                {/*<div className={this.props.visible?'divCateg':'displayNone'}>*/}
                <div className={this.props.visible?'categDisplay':'displayNone'}>
                    <div className="menuHeaderCircleDiv" onClick={(e)=>this.props.categVisibleContext()}>
                        <img src={this.props.reversed?point_right:point}className="menuHeaderCircleDivImg"/>
                    </div>
                    <div className="categoryName">{this.props.categ}</div>
                </div>
                <MenuButton  visible  = {this.props.visible}/>
            </div>
        )
    }


}