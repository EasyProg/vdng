import React,  { Component,PropTypes } from 'react';
export default class Timer extends Component {
    constructor(props)  {
    super(props);
    this.state = {
    currentTime: '00:00',
    wholeTime:   '00:00'
                 };
    this.handleOnPlay   = this.handleOnPlay.bind(this);
                        };
    static propTypes =  {
    isWholeProgramTime:PropTypes.bool.isRequired,
    currentProgramTime:PropTypes.number,
    wholeProgramTime:PropTypes.number
                        };
    componentDidMount() {
    var vd = document.getElementById('video');
    vd.addEventListener('timeupdate', this.handleOnPlay);
                        }
    timeFormat(seconds) {
        var m = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
        var s = Math.floor(seconds - (m * 60)) < 10 ? "0" + Math.floor(seconds - (m * 60)) : Math.floor(seconds - (m * 60));
        var h = Math.floor(m / 60) < 10 ? "0" + Math.floor(m / 60) : Math.floor(m / 60);
        h = h === '00' ? '' : h;
        if (m && s && h)
            return h + ':' + m + ":" + s;
        else if (m && s && !h)
            return m + ":" + s;
        else return '00:00';
                        }
    handleOnPlay()      {
        var         vd = document.getElementById('video');
        var   progress = document.getElementById('progress-bar');
        const time=vd.currentTime||0;
        const dur= vd.duration||100;

        var percentage = Math.floor((100 / dur) * time);
        progress.value = percentage;
        this.setState({currentTime: this.timeFormat(time),
                       wholeTime:   this.timeFormat(dur)});
                        };

    render ()           {
        if (this.props.isWholeProgramTime)
        return        (
                 <div className="videoTime">{this.state.currentTime}</div>
                      );
        else   return (
                 <div className="videoTime">{this.state.wholeTime}</div>
                      )
                        }
                                            }