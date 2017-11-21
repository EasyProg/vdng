import React, {Component,PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MobileChannel from './MobileChannel';
import {toggleCategory,getChannels} from '../../actions/actions';
import getCurrentProgram from            '../../components/workingDate'
class  MobileChannels extends Component
{
    isFavorite(channelId)               {
    if (localStorage.getItem(channelId)!==null)
    {
    return true;
    }
    else return false

                                        }
render ()   {
   return   (
       <div className="customMenuDiv">
            {this.props.channels.map(  (elem, i) =>
               <MobileChannel
                   key=                {i}
                   img=                {elem.img}
                   channelNum      =   {elem.channelNum}
                   channelId       =   {elem.channelId}
                   hiddenChannel   =   {this.props.channelCategory==='Locked'}
                   programName     =   {getCurrentProgram(elem.program,elem.channel).title}
                   favorite        =   {this.isFavorite(elem.channelId)}
                   chosen          =   {elem.channelId===this.props.video.channelId}
                   onClick         =   {e=>this.handleClick(elem,e)}
                   tabIndex        =   {i}
                   elemChosen      =   {this.state.itemChosen === i}
                   //elemChosen      =   {this.state.channelId === elem.channelId}
                   onKeyDown       =   {e=>this.handleKey(e,elem,i)}
                   progress        =   {elem.program?getCurrentProgram(elem.program).progressValue===undefined?-1:
                                        getCurrentProgram(elem.program).progressValue:-1}
                   setProgramVisibleContext = {this.setProgramsVisible}
                   program         =   {elem.program}
               />
            )
            }
       </div>
            )
            }

}
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        dispatch,getChannels,toggleCategory
                       },dispatch);
export default connect(
    state =>
        ({  video:state.videoReducer.video,
            channels:state.channelReducer.channels,
        }),
    mapDispatchToProps
)(MobileChannels);