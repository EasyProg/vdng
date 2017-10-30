import React, {Component,PropTypes} from 'react';
import '../styles/css/main_styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import HomeButton from './ui/MenuButton';
import * as $ from 'jquery';
import CustomScroll from './ui/CustomScroll';
export default class ProgramList extends Component
{
    constructor(props)
    {
        super(props);
    }
    static propTypes =               {
        programs: PropTypes.array.isRequired,
        visible:  PropTypes.bool.isRequired

    };
    getDayOfWeek (dt)                {
        var date_parse = new Date(dt.substr(6,4),Number(dt.substr(3,2))-1,dt.substr(0,2));
        console.log(date_parse);
        //console.log(dt.substr(5,4),dt.substr(2,2),dt.substr(0,1));
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
    runningString(e)                {
        var str   = $('.programName_hover:hover');
        var strCont = $('.programName:hover');
        var width = str.width();
        var con_w = str.css('left');

        function run ()           {
            var con_len = parseInt(con_w) - (width - strCont.width());

            str.animate
            ({left:con_len + 'px'},
                {duration: 3000,
                    complete: function ()
                    {
                        str.css('left',con_w);
                        //run();
                    }});          }
        if (width>strCont.width())
        {
            run();
        }}
    stopRun ()                    {
        $('.programName_hover').stop(true,true);
    }
    componentDidMount()           {
        $('.programListItemChosen').focus();
    }
    componentDidUpdate() {
        $('.programListItemChosen').focus();
    }
// $('.programList').animate({'width':'400'},100);
//                                   }
    render()                      {
        if (this.props.programs.length&&this.props.visible>0)
            return                (
                <div className="programList">
                    <div className="menuHeaderCh">
                        <HomeButton visible={true}/>
                    </div>
                    <CustomScroll>
                        {this.props.programs.map((e,i)=>
                            <div className="blockChainDiv" key={i}>
                                <div className="headerProgramDate">
                                    {e.date} <span className="textSpan">{this.getDayOfWeek(e.date)}</span>
                                    <hr className="hrProgram"/>
                                </div>
                                <div className="dayListItem">
                                    {
                                        this.props.programs[i]['data'].map
                                        (
                                            (e,i)=>
                                                <div key={i}
                                                     tabIndex={i}
                                                     className={e.id===this.props.currentProgramId?"programListItemChosen":"programListItem"}
                                                     onMouseOver={(e)=>this.runningString(e)}
                                                     onMouseLeave={(e)=>this.stopRun()}>
                                                        <span className="programTime">{e.start_time_show.substring(e.start_time_show.indexOf(':'),
                                                            e.start_time_show.length-1).length===1?e.start_time_show+'0':e.start_time_show}
                                                        </span>
                                                    <span className="programName">
                                                    <span className="programName_hover">{e.title}</span>
                                                    </span>
                                                </div>
                                        )
                                    }
                                </div>
                            </div>
                        )}
                    </CustomScroll>
                    <div className="menuBottom"/>
                </div>
            );
        else return null
    }
}