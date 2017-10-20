import React,  { Component,PropTypes } from 'react';
export default class CurrentTime extends Component  {
    constructor(props)  {
        super(props);
        this.state =    {
            programTime:0
                        };
                        };
    getTimeNow(time)    {
    let minutes = '00';
    let seconds = '00';
    let hours = '';
    let dt = new Date   ;
    let dt2= new Date   ;
    if (time)           {
     dt.setTime(time*1000);
                        }
    let timeNow = dt2-dt;
    console.log(timeNow);
        if  (time)      {
            minutes =  Math.round(timeNow/1000/60);
            hours   =  Math.floor(minutes/60)===0?'':Math.floor(minutes/60)+':';
            minutes =  hours ===''?minutes:minutes%60;
            seconds = '00';
            minutes = minutes.toString().length === 1?'0'+minutes:minutes;
                        }
        return          hours +  minutes+ ':' + seconds;
                        }
    static propTypes =  {
            startTime:PropTypes.number.isRequired
                        };

    render ()           {
        this.getTimeNow(this.props.startTime);
        return          (
            <div className="videoTime">{this.getTimeNow(this.props.startTime)}</div>
        )
                        }
                                                    }