import React, {Component,PropTypes} from 'react';
import '../styles/css/main_styles.css';
export default class ProgramList extends Component
{
constructor(props)
{
super(props);
}
static propTypes = {
    programs: PropTypes.array.isRequired
                   };
    render()    {
    return      (
    <div className="programList">
        {this.props.propgrams.map((e,i)=>
        {

        }
        );
        }
    </div>
                )
                }
}