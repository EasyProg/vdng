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
        this.state={itemChosen:0};
        this.switchProgram = this.switchProgram.bind(this);
        this.handleKey =     this.handleKey.bind(this);
                                     }

    static propTypes =               {
        programs: PropTypes.array.isRequired,
        visible:  PropTypes.bool.isRequired

                                     };
    handleKey(e,elem)                {
    console.log('oo');
    e.stopPropagation();
    switch (e.keyCode)               {
        case 40:
        this.switchProgram('next', this.state.itemChosen);
        console.log(this.state.itemChosen);
        break;
        case 38:
        this.switchProgram('prev', this.state.itemChosen);
        console.log(this.state.itemChosen);
        break;
        case 37:
        //{this.setState({itemChosen:0});
        $('#channels').focus();
        break;
        default:
        break;
                                     }
                                     }
    switchProgram(param='next',chosen){
        //console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');
        var items = $('.programListItem,.programListItemChosen');
        var i = chosen||0;
        //var i =     $('.programListItemChosen')[0].key||chosen||0;
        //console.log($('.programListItemChosen')[0].key);
        var nextElem = i + 1 >=    items.length ?  0 : i + 1;
        var prevElem = i - 1 <= 0 ? items.length - 1 : i - 1;
        console.log(items.length);
        if (param === 'next'&&items[nextElem])
                                     {
            console.log(items[nextElem]);
            items[nextElem].focus();
            this.setState({itemChosen:nextElem});
                                     }
        if (param === 'prev'&&items[prevElem])
                                     {
            console.log('prev');
            items[prevElem].focus();
            this.setState({itemChosen:prevElem});

                                     }
                                     }
    getDayOfWeek (dt)                {
        var date_parse = new Date(dt.substr(6,4),Number(dt.substr(3,2))-1,dt.substr(0,2));
        switch (date_parse.getDay()) {
            case 0 : return 'Неділя';
                break;
            case 1 : return 'Понеділок';
                break;
            case 2 : return 'Вівторок';
                break;
            case 3 : return 'Середа';
                break;
            case 4 : return 'Четвер';
                break;
            case 5 : return 'П\'ятниця';
                break;
            case 6 : return 'Субота';
                break;

        }
        //return date_parse.getDay();

                                    }
    runningString(e)                {
        var str   =   $('.programName_hover:hover');
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
    componentWillReceiveProps()   {
        $('.programListItemChosen').focus();
    }
    componentDidUpdate ()         {
        //if (this.state.itemChosen===0)
        //$('.programListItemChosen').focus();
                                  }
    //componentWillReceiveProps()   {
        //$('.programListItemChosen').focus();
        //console.log('focused');
      //                            }
// $('.programList').animate({'width':'400'},100);
//                                   }
    render()                      {
        if (this.props.programs.length&&this.props.visible>0)
            return                (
                <div className="programList" id="programList" onKeyDown={(e)=>this.handleKey(e)} tabIndex={1}>
                    <div className="menuHeaderCh">
                        <HomeButton visible={true}/>
                    </div>
                    <CustomScroll>
                        {this.props.programs.map((e,i)=>
                                <div className="blockChainDiv" key={i} tabIndex={1}>
                                <div className="headerProgramDate">
                                    {e.date} <span className="textSpan">
                                    {this.getDayOfWeek(e.date)}</span>
                                    <hr className="hrProgram"/>
                                </div>
                                <div className="dayListItem" tabIndex={1}>
                                {
                                this.props.programs[i]['data'].map
                                        (
                                        (elem,i)=>
                                                <div    key={i}
                                                        tabIndex={i}
                                                        className={elem.id===this.props.currentProgramId?"programListItemChosen":"programListItem"}
                                                        onMouseOver={(e)=>this.runningString(e)}
                                                        onMouseLeave={(e)=>this.stopRun()}
                                                        onKeyDown={(e)=>this.handleKey(e,elem)}
                                                >
                                                        <span className="programTime">{elem.start_time_show.substring(elem.start_time_show.indexOf(':'),
                                                            elem.start_time_show.length-1).length===1?elem.start_time_show+'0':elem.start_time_show}
                                                        </span>
                                                    <span className="programName">
                                                    <span className="programName_hover">{elem.title}</span>
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