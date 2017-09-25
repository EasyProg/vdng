import React, {Component,PropTypes} from 'react';
import '../styles/css/main_styles.css';
import underline from '../img/Underline.png';
import eng from '../img/ENG.png';
import backtext from '../img/backtext.png';
import cancel from '../img/cancel.png';
import noimage from '../img/noimage.png';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import angle from '../img/arrow-pointing-to-right.gif';
var arch =
[
    {name:'Game of thrones',     date:'13.04.2017', time:'15:30'},
    {name:'Doctor Dolittle',     date:'12.04.2017', time:'16:30'},
    {name:'Martin Lawrence Life',date:'20.04.2017', time:'10:30'},
    {name:'Martin Lawrence Life',date:'20.04.2017', time:'10:30'},
    {name:'Martin Lawrence Life',date:'20.04.2017', time:'10:30'},
    {name:'Martin Lawrence Life',date:'20.04.2017', time:'10:30'},
    {name:'Martin Lawrence Life',date:'20.04.2017', time:'10:30'},
    {name:'Martin Lawrence Life',date:'20.04.2017', time:'10:30'},
    {name:'Martin Lawrence Life',date:'20.04.2017', time:'10:30'},
    {name:'Martin Lawrence Life',date:'20.04.2017', time:'10:30'},
    {name:'Game of thrones',     date:'13.04.2017', time:'15:30'},
    {name:'Doctor Dolittle',     date:'12.04.2017', time:'16:30'},
    {name:'Martin Lawrence Life',date:'20.04.2017', time:'10:30'},
    {name:'Martin Lawrence Life',date:'20.04.2017', time:'10:30'},
    {name:'Martin Lawrence Life',date:'20.04.2017', time:'10:30'},
    {name:'Martin Lawrence Life',date:'20.04.2017', time:'10:30'},
    {name:'Martin Lawrence Life',date:'20.04.2017', time:'10:30'},
    {name:'Martin Lawrence Life',date:'20.04.2017', time:'10:30'},
    {name:'Martin Lawrence Life',date:'20.04.2017', time:'10:30'},
    {name:'Martin Lawrence Life',date:'20.04.2017', time:'10:30'}
];

export default class VideoArchive extends  Component            {
constructor(props)                  {
    super(props);
    this.searchVideo = this.searchVideo.bind(this);
    this.state = {videos:arch}
                                    }
searchVideo()                       {
var research = this.input.value;
console.log(research);
if (research!=='')
{var result = this.state.videos.filter(function(item){
             return item.name.indexOf(research)!==-1
});
this.setState({videos:result});}
else this.setState({videos:arch});  }
    render()                        {
        return (
                <div className={this.props.visible?'archDiv':'displayNone'}>
                    <div className="searchVideoDiv">
                        <div className="contentDiv">
                            <div className="buttonDiv"><img src={cancel}    width={35} height={30}/></div>
                            <div className="buttonDiv"><img src={backtext}  width={35} height={30}/></div>
                            <div className="buttonDivEng"><img src={eng}    width={35} height={15}/></div>
                        </div>
                        <img src={underline} height={5} width={300}/>
                        <div className="contentDiv"></div>
                        <img src={underline} height={5} width={300}/>
                        <input className="backInput" onChange={(e)=>this.searchVideo()} ref={(input)=>this.input=input}/>
                    </div>
                                            <PerfectScrollbar>
                                            {
                                            this.state.videos.map((item,i)=><div  className="archItemDiv" key={i}>
                                            <img src={noimage}/>
                                            <div  className="timeZone">
                                            <span><div>{item.name}</div>{item.date}<span className="archViolet">{' | '}</span>{item.time}</span>
                                            </div>
                                            <span><img src={angle} width={15} height={15}/></span>
                                            </div>)
                                            }
                                            </PerfectScrollbar>
                </div>
                )
                }
                                                                }