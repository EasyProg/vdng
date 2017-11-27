import React, {Component,PropTypes} from 'react';
import '../styles/css/main_styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import HomeButton from './ui/MenuButton';
import * as $ from 'jquery';
import CustomScroll from './ui/CustomScroll';
import {connect} from 'react-redux';
import {setMenusVisible} from '../actions/actions';
import {bindActionCreators} from 'redux';
class ProgramList extends Component
                                        {
    constructor(props)                  {
        super(props);
        this.state={itemChosen:0};
        this.switchProgram = this.switchProgram.bind(this);
        this.handleKey =     this.handleKey.bind(this);
                                        }
    static propTypes =                  {
        programs: PropTypes.array.isRequired,
        visible:  PropTypes.bool.isRequired

                                        };
    handleKey(e,elem)                   {
        e.stopPropagation();
        switch (e.keyCode)              {
            case 8:                     {
                this.props.dispatch(setMenusVisible(
                    {channelsMenuVisible: false,
                        categoryMenuVisible: false,
                        settingsVisible: false,
                        programsVisible: false

                    },false));
                $('#video').focus();
                                        }
                break;
            case 27:                            {
                this.props.dispatch(setMenusVisible(
                    {channelsMenuVisible: false,
                        categoryMenuVisible: false,
                        settingsVisible: false,
                        programsVisible: false

                    },false));
                $('#video').focus();
            }
                break;
            case 40:
                this.switchProgram('next', this.state.itemChosen);
                break;
            case 38:
                this.switchProgram('prev', this.state.itemChosen);
                break;
            case 37: {
                this.props.dispatch(setMenusVisible(
                    {
                        channelsMenuVisible: true,
                        categoryMenuVisible: false,
                        settingsVisible: false,
                        programsVisible: false
                    }, true
                ));
                this.setState({itemChosen:-1});
                $('.menuItemStyleChosen').focus();

            }
                //$('#channels').focus();
                break;
            default:
                break;
        }
    }
    disableFocus()                      {
        $('#programlist').focus();
        //this.setState({itemChosen:-1});
        //console.log('disbleFocus');
    }
    switchProgram(param='next',chosen)  {
        var items = $('.programListItem,.programListItemChosen');
        var i = chosen||0;
        var nextElem = i + 1 >=    items.length ?  0 :i + 1;
        var prevElem = i - 1 <= 0 ?items.length - 1 : i - 1;
        if (param === 'next'&&items[nextElem])
        {
            items[nextElem].focus();
            this.setState({itemChosen:nextElem});
            this.runningString('focus');
        }
        if (param === 'prev'&&items[prevElem])
        {
            items[prevElem].focus();
            this.setState({itemChosen:prevElem});
            this.runningString('focus');

        }
    }
    getDayOfWeek (dt)                   {
        //var date_parse = new Date(dt.substr(5,4),Number(dt.substr(2,2))-1,dt.substr(0,2).indexOf('.')===-1?dt.substr(0,2):dt.substr(0,1));
        var date_parse = dt.substr(0,2).indexOf('.')===1?new Date(dt.substr(5,4),Number(dt.substr(2,2))-1,dt.substr(0,1)):new Date(dt.substr(6,4),Number(dt.substr(3,2))-1,dt.substr(0,2));
        switch (date_parse.getDay())    {
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

                                        }
    runningString(param)                {
        if (param==='hover')            {
            var str =     $('.programName_hover:hover');
            var strCont = $('.programName:hover');
                                        }
        if (param==='focus')            {
            this.stopRun();
            var str =     $('.programListItem:focus>.programName>.programName_hover');
            var strCont = $('.programListItem:focus>.programName');
                                        }
        if (param==='focusChosen')      {
            this.stopRun();
            var str =     $('.programListItemChosen:focus>.programName>.programName_hover');
            var strCont = $('.programListItemChosen:focus>.programName');
                                        }
        var width = str.width();
        var con_w = str.css('left');

        function run ()                 {
            var con_len = parseInt(con_w) - (width - strCont.width());
            str.animate
            ({left:con_len + 'px'},
                {duration: 3000,
                    complete: function ()
                    {
                        str.css('left',con_w);
                        //run();
                    }});                }
        if (width>strCont.width())
        {
            run();
        }}
    stopRun ()                          {
        $('.programName_hover').stop(true,true);
                                        }
    componentWillReceiveProps(nextProps){
        this.setState({itemChosen:nextProps.currentProgramId-1});
        //console.log(nextProps.currentProgramId-1);
                                        }
    componentDidUpdate (prevProps,prevState)
                                        {
         if (this.state.itemChosen!==-1)
             setTimeout(y,1000);
         function y()
         {$('.programListItemChosen').focus();}
                                        }
    shouldComponentUpdate(nextProps,nextState)
                                        {
        if  (this.state.itemChosen!==nextState.itemChosen&&nextState.itemChosen!==nextProps.currentProgramId-1)
                                        {
            return false;               }
            else return true
                                        }
    render()                            {
        if (this.props.programs.length>0&&this.props.menus.programsVisible)
            return                          (
                <div className="programList" id="programlist"
                     onKeyDown={(e)=>this.handleKey(e)} tabIndex={1}
                     onMouseOver={e=>this.disableFocus()}
                     onFocus={e=>this.runningString('focusChosen')}
                >
                    {/*<div className="menuHeaderCh">*/}
                    {/*<HomeButton visible={true}/>*/}
                    {/*</div>*/}
                    <CustomScroll //onScroll={(e)=>this.setState({itemChosen:-1})}
                    >
                        {this.props.programs.map((e,i)=>
                            <div className="blockChainDiv" key={i} tabIndex={1}>
                                <div className="headerProgramDate">
                                    {
                                        e.date.substr(0,2).indexOf('.')===-1?
                                            e.date.substr(0,6)+e.date.substr(8,2):'0'+
                                            e.date.substr(0,5)+e.date.substr(7,2)
                                    }
                                    <span className="textSpan">
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
                                                        onMouseOver={(e)=>this.runningString('hover')}
                                                        onMouseLeave={(e)=>this.stopRun()}
                                                        onKeyDown={(e)=>this.handleKey(e,elem)}
                                                        //onFocus={this.runningString('focus')}
                                                >
                                                <div className="programTime">{elem.start_time_show.substring(elem.start_time_show.indexOf(':'),
                                                elem.start_time_show.length-1).length===1?elem.start_time_show+'0':elem.start_time_show}
                                                </div>
                                                <div className="programName">
                                                <span className="programName_hover">{elem.title}</span>
                                                </div>
                                                </div>
                                        )
                                    }
                                </div>
                            </div>
                        )}
                    </CustomScroll>
                </div>
            );
        else return null
    }
                                        }
    const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        dispatch,setMenusVisible
    }, dispatch);
    export default connect              (
    state =>                        ({menus:state.menuReducer.menus}),
    mapDispatchToProps
    )(ProgramList);