import React, {Component,PropTypes} from 'react';
import '../styles/css/main_styles.css';
import eye from '../img/eye.png' ;
import eye_close from '../img/eye_close.png';

export default class ParentalControl extends Component      {
    constructor(props){
        super(props);
        this.toggleType = this.toggleType.bind(this);
        this.state =  {
            pass1:true,
            pass2:true
        }
    }

    toggleType(num,state) {
        if (num===1)  {
            this.setState({
                pass1:!state,
            });
        }
        else if (num===2)  {
            this.setState({
                pass2:!state
            });
        }
    }

    render() {
        return (
            <div className="divInputPassword">
                <div className="divInput">
                    <input className="inputPassword" placeholder= "Current password"
                           type={this.state.pass1?'password':'text'} ref={(input)=>this.inputPass = input} required/>
                    <div className="circleButtonSpanInput"
                         onClick={(e)=>this.toggleType(1,this.state.pass1)}>
                        <img src={this.state.pass1?eye_close:eye}  width={20} height={20}/>
                    </div>
                </div>
                <div className="divInput">
                    <input className="inputPassword" placeholder= "New password"
                           ref={(input)=>this.newPass = input}
                           type={this.state.pass2?'password':'text'} required/>
                    <div className="circleButtonSpanInput"
                         onClick={(e)=>this.toggleType(2,this.state.pass2)}>
                        <img src={this.state.pass2?eye_close:eye}  width={20} height={20}/>
                    </div>
                </div>
                <div className="divInput">
                    <input className="inputPassword" placeholder= "Confirm password"
                           ref={(input)=>this.confirmPass = input}
                           type='password' required/>
                </div>
                <button className="saveButton">SAVE ALL</button>
            </div>
        )
    }
}