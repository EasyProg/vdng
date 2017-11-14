import React, {Component,PropTypes} from 'react';
import point from '../../img/pointing-to-left.gif';
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
            <div className={this.props.visible?'divCateg':'displayNone'}>
            <div className="menuHeaderCircleDiv" onClick={(e)=>this.props.categVisibleContext()}>
            <img src={this.props.reversed?point_right:point} width={20} height={20}/>
            </div>
            {this.props.categ}
            </div>
            )
            }


                                                    }
