import React, {Component,PropTypes} from 'react';
import '../styles/css/main_styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
export default class ProgramList extends Component
{
constructor(props)
{
super(props);
}
static propTypes =  {
    programs: PropTypes.array.isRequired
                    };
    render()        {
    return          (
    <div className="programList">
        <PerfectScrollbar>
            {this.props.programs.map((e,i)=>
                <div key={i} className="programListItem">
                <div>{e.start_time}</div>
                <div>{e.title}</div>
                <div>{e.start_date}</div>
                </div>
            )}
        </PerfectScrollbar>
    <div className="menuBottom"/>
    </div>
                    )
                    }
}