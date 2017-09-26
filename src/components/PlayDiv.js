import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {Button,Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../styles/scss/_controls.scss';
import '../styles/css/styles.css';
import {bindActionCreators} from 'redux';
import {togglePlay} from '../actions/actions';
import VideoPlayer from './VideoPlayer';
class PlayDiv extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        //isVideoPlaying: PropTypes.bool.isRequired
    };
toggle(isPlaying) {
    this.props.dispatch(togglePlay(isPlaying));
}
    render(){
        return (
            <div>
            <VideoPlayer isVideoPlaying={this.props.isPlaying} videoStr={this.props.video.videoStr}/>
             <div className="divPlayer">
                <div className="playerButtonsDiv">
                    <div>
                        <Icon className="inverted step backward"/>
                    </div>
                    <div>
                        <Icon className="inverted backward"/>
                    </div>
                    <Button className="tiny circular ui icon button" onClick={(e)=>this.toggle(this.props.isPlaying)}>
                    <Icon className={this.props.isPlaying?"violet play":"violet pause"}/>
                    </Button>
                    <div>
                        <Icon className="inverted forward"/>
                    </div>
                    <div>
                        <Icon className="inverted step forward"/>
                    </div>
                </div>
                {/*<Button circular icon='pause circle outline' color="white"/>*/}
              </div>
              <div className="divBottomPlayer">
              </div>
            </div>
                )
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
    dispatch,togglePlay
}, dispatch);
export default connect(
    state => ({
        video:state.videoReducer.video,
        isPlaying:state.videoReducer.isPlaying
    }),
    mapDispatchToProps
)(PlayDiv);