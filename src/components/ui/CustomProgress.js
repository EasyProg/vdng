import React, {Component,PropTypes} from 'react';
import '../../styles/css/main_styles.css';


export default class CustomProgress extends Component
{
constructor(props)
{
super(props);
// this.state =
// {
// value:0
// }
}
static propTypes ={
value:PropTypes.number,
fullScreen:PropTypes.bool.isRequired
                  };
setCircle()       {
var prog =              document.getElementById('progress-bar');
var t =                 document.getElementsByClassName('circleProgressDiv')[0];
t.style.left =          (this.props.value - 0.5)+ '%';
//t.style.left =  t.style.left + 'px';

                  }
componentDidUpdate()
                  {
if (this.props.value!==0)
                  {
    this.setCircle();
                  }
                  }
render ()
       {
return (
        <div className="divForProgress">
            {this.props.value!==0?<div            className="circleProgressDiv"/>:null}
                <progress       id='progress-bar' min='0' max='100'
                                value={this.props.value}
                                className={this.props.fullScreen?'progressBarFull':'progressBar'} ref={(prog)=>this.prog = prog}/>
        </div>
       )
       }

}