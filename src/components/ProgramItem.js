import React, {Component} from 'react';
import * as $ from 'jquery';
import '../styles/css/main_styles.css';
import point_right from '../img/arrow-pointing-to-right.gif';
import {bindActionCreators} from 'redux';
import {setMenusVisible} from '../actions/actions';
import {connect} from 'react-redux';
class ProgramItem extends Component {
    constructor(params) {
        super(params);
        this.makeDetailVisible = this.makeDetailVisible.bind(this);
        //this.
    }
    runningString(param){
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
    stopRun ()          {
        $('.programName_hover').stop(true,true);
    }
    makeDetailVisible() {
        this.props.getProgramDetailContext(this.props.item.detail,this.props.item.title);
        this.props.dispatch(setMenusVisible
        ({
            channelsMenuVisible:true,
            programsVisible:true,
            detailMenuVisible:true
        },true));
    }
    render () {
        return (
            <div    key={this.props.index}
                    tabIndex={this.props.index}
                    className={this.props.item.id===this.props.currentProgramId?"programListItemChosen":"programListItem"}
                    onMouseOver={(e)=>this.runningString('hover')}
                    onMouseLeave={(e)=>this.stopRun()}
                    onKeyDown={this.props.onKeyDown}

            >
                <div className="programTime">{this.props.item.start_time_show.substring(this.props.item.start_time_show.indexOf(':'),
                    this.props.item.start_time_show.length-1).length===1?this.props.item.start_time_show+'0':this.props.item.start_time_show}
                </div>
                <div className="programName">
                    <div className="programName_hover">{this.props.item.title}</div>
                </div>
                {this.props.item.detail?<img src={point_right} className="imageArrow" onClick={(e)=>this.makeDetailVisible()}/>:null}
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        dispatch,setMenusVisible
    },  dispatch);
export default connect  (
    state => ({}),
    mapDispatchToProps
)(ProgramItem);