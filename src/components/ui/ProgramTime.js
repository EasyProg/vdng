import React,  { Component,PropTypes } from 'react';
export default class ProgramTime extends Component {
    constructor(props)  {
    super(props);
    this.state =        {
    programTime:0
                        };
                        };
    timeParser(time)    {
        let minutes = '00';
        let seconds = '00';
        let hours = '';
        var t = 0;
    if  (time)               {
        //t = (date2 - date1);
        minutes =  Math.round(time/60);
        hours   =  Math.floor(minutes/60)===0?'':Math.floor(minutes/60);
        minutes =  hours ===''?minutes:minutes%60;
        //hours   =
        seconds = '00';
        minutes = minutes.toString().length === 1?'0'+minutes:minutes;
        //seconds = date3.getSeconds().toString().length === 1?'0'+date3.getSeconds():date3.getSeconds();
                             }
        //return t
    return  {
     hours:hours,
     minutes:minutes,
     seconds:seconds
            }
                        }
    static propTypes =  {
                        time:PropTypes.number.isRequired
                        };

    render ()           {
        //this.timeParser(this.props.time);
        return          (
            <div className="videoTime">{this.timeParser(this.props.time).hours+':'+
                                        this.timeParser(this.props.time).minutes+':'+
                                        this.timeParser(this.props.time).seconds}</div>
                        )
                        }
                                                    }