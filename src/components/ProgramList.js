import React, {Component,PropTypes} from 'react';
import '../styles/css/main_styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {Scrollbars} from 'react-custom-scrollbars';
import HomeButton from './ui/MenuButton';
export default class ProgramList extends Component
                                                 {
constructor(props)
                            {
super(props);
                            }
static propTypes =          {
    programs: PropTypes.array.isRequired,
    visible:  PropTypes.bool.isRequired

                            };
getDayOfWeek (dt)           {
    var date_parse = new Date(dt.substr(5,4),Number(dt.substr(2,2))-1,dt.substr(0,1));
    //console.log(date_parse);
    console.log(dt.substr(5,4),dt.substr(2,2),dt.substr(0,1));
    switch (date_parse.getDay()) {
        case 0 : return 'Sunday';
        break;
        case 1 : return 'Monday';
        break;
        case 2 : return 'Tuesday';
        break;
        case 3 : return 'Wednesday';
        break;
        case 4 : return 'Thursday';
        break;
        case 5 : return 'Friday';
        break;
        case 6 : return 'Saturday';
        break;

                                }
    //return date_parse.getDay();

                            }
    render()                {
    if (this.props.programs.length&&this.props.visible>0)
    return                  (
    <div className="programList">
        <div className="menuHeaderCh">
        <HomeButton visible={true}/>
        </div>
        <Scrollbars>
             {this.props.programs.map((e,i)=>
                 <div className="blockChainDiv">
                    <div className="headerProgramDate">
                        {e.date} <span className="textSpan">{this.getDayOfWeek(e.date)}</span>
                        <hr className="hrProgram"/>
                    </div>
                    <div className="dayListItem">
                            {
                     this.props.programs[i]['data'].map
                            (
                     (e,i)=>
                     <div key={i} className="programListItem">
                     <span className="programTime">{e.start_time.substring(e.start_time.indexOf(':'),
                     e.start_time.length-1).length===1?e.start_time+'0':e.start_time}
                     </span><span className="programName">{e.title}</span>
                     </div>
                            )
                            }
                 </div>
                 </div>
             )}
        </Scrollbars>
    </div>
                            );
    else return null
                            }
                                                }