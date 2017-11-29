import React, {Component} from 'react';
export default class ProgramItem extends Component {
 render () {
    return (
        <div    key={i}
                tabIndex={i}
                className={elem.id===this.props.currentProgramId?"programListItemChosen":"programListItem"}
                onMouseOver={(e)=>this.runningString('hover')}
                onMouseLeave={(e)=>this.stopRun()}
                onKeyDown={(e)=>this.handleKey(e,elem)}
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
}