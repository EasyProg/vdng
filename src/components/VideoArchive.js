import React, {Component,PropTypes} from 'react';
import '../styles/css/main_styles.css';
import underline from '../img/Underline.png';
import eng from '../img/ENG.png';
import backtext from '../img/backtext.png';
import cancel from '../img/cancel.png';
import noimage from '../img/noimage.png';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

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


export default class VideoArchive extends  Component     {
constructor(props)      {
    super(props);
                        }
    render()   {
        return (
                <div className='archDiv'>
                    <div className="searchVideoDiv">
                        <div className="contentDiv">
                            <div className="buttonDiv"><img src={cancel}    width={35} height={25}/></div>
                            <div className="buttonDiv"><img src={backtext}  width={35} height={25}/></div>
                            <div className="buttonDiv"><img src={eng}       width={35} height={20}/></div>
                        </div>
                        <img src={underline} height={5} width={300}/>
                        <div className="contentDiv"></div>
                        <img src={underline} height={5} width={300}/>
                        <input className="backInput"/>
                    </div>
                                            <PerfectScrollbar>
                                            {
                                            arch.map((item,i)=><div  className="archItemDiv" key={i}>
                                            <img src={noimage}/>
                                            <div  className="timeZone">
                                            <span><div>{item.name}</div>{item.date}{' | '}{item.time}</span>
                                            </div>
                                            <span>></span>
                                            </div>)
                                            }
                                            </PerfectScrollbar>
                </div>
                )
                }
                                                        }