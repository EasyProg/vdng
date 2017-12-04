import React,  { Component,PropTypes } from 'react';
import '../../styles/css/main_styles.css';
export default class CurrentTime extends Component {
    constructor(props)           {
        super(props);
        this.state = {
            programTime: '00:00'
        };
        this.getTimeNow = this.getTimeNow.bind(this);
        this.tick = this.tick.bind(this);
    };

    componentDidMount()          {
        this.int = setInterval(this.tick, 1000);
    }
    componentDidUpdate()         {
        clearInterval(this.int);
        this.int = setInterval(this.tick, 1000);
    }

    componentWillUnmount()       {
        clearInterval(this.int);
    }

    //Allowed new
    getTimeNow(time)             {
        if (time)                {
            var dt = new Date;
            let min = 0;
            let sec = 0;
            let hour = 0;
            dt.setTime(time * 1000);
            var dt2 = Date.now();
            var timeNow = dt2 - dt;
            this.props.setProgressValueContext(timeNow/1000,this.props.wholeTime);
            //Set view to normal data
            hour = Math.floor(   timeNow / 1000 / 60 / 60);
            //min  =  hour === 0 ? Math.round(timeNow / 1000 / 60) : Math.floor(timeNow / 1000 / 60 % 60);
            min  =  hour === 0 ? Math.floor(timeNow / 1000 / 60) : Math.floor(timeNow / 1000 / 60 % 60);
            sec  =  min  === 0 ? Math.round(timeNow / 1000) : Math.floor(timeNow / 1000%60);
            hour = hour.toString().length === 1 ? '0' + hour : hour;
            min  = min.toString().length === 1 ? '0'  + min :  min;
            sec  = sec.toString().length === 1 ? '0'  + sec :  sec;
            hour = hour === '00'?'':hour+':';
            timeNow = hour + min +':'+ sec;
            return timeNow;          }
        else return '00:00'      }


    tick()
    {
        this.setState({programTime: this.getTimeNow(this.props.startTime)})
    }

    static propTypes =
        {
            startTime: PropTypes.number.isRequired
        };

    render() {
        return (
            <div className="videoTime">{this.state.programTime}</div>
        )
    }
}