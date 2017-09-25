import React,{Component,PropTypes} from 'react';
import 'semantic-ui-css/semantic.min.css';
import userIcon from '../img/user_icon.png';
export default class LoginDiv extends Component {
constructor (props) {
        super(props);
        this.state = {
            userName:'Вася Пупкин',
            logged:true
                     }
                    }
static propTypes = {
        userName: PropTypes.string.isRequired,
        logged:PropTypes.bool

    };
render () {

      return (
          <div className="loginDiv">
              <div className="photoDiv">
              <img className="ui tiny circular image" src={userIcon} width={50} height={50}/>
              </div>
              <div className="imgDiv">
                  {this.props.userName}
                  <br/>
                  <button className="logoutButton">LOG OUT</button>
              </div>

           </div>
              )
  }
                                                }

