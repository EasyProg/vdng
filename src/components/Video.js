import  React, {Component,PropTypes} from 'react';
import  '../styles/css/main_styles.css';
import '../components/ui/HoldScreen';
import HoldScreen from "./ui/HoldScreen";
import {bindActionCreators} from 'redux';
import {toggleAutoPlay} from '../actions/actions';
import  {connect} from 'react-redux';
import * as $ from 'jquery';
class Video extends Component
{
    constructor(props)  {
        super(props);
        this.state =    {
            playing:true
                        };
        this.isVideoPlaying = this.isVideoPlaying.bind(this);
        this.handleClick = this.handleClick.bind(this);
                        }

    static propTypes =  {
        fullSize: PropTypes.bool.isRequired,
        isPlaying: PropTypes.bool.isRequired,
        video: PropTypes.object.isRequired
                        };

    componentDidMount() {
        this.isVideoPlaying();
                        }
    isVideoPlaying ()   {
        var b = this;
        setTimeout      (
            function    ()
                {
                let vd = document.getElementById('video');
                if      (vd.paused)
                {
                    b.setState({playing:false});
                }},1500 )
//console.log(this.video.prop('autoPlay'));
                        }
    handleKey(e)        {
        if (e.keyCode === 13)
            this.handleClick();
                        }
    handleClick ()      {
        this.video.play();
        this.setState({playing:true});
        this.props.dispatch(toggleAutoPlay(true));
        this.video.focus();
                        }
    render()            {
        if (this.props.video!=='none')
        {return(
            <div id="videoDiv"
            >
                <video id="video"
                       ref={(video) => this.video = video}
                       autoPlay={this.props.isPlaying}
                    //loop
                       playsInline
                       tabIndex={1}
                       onDoubleClick={this.props.onDblClick}
                       onClick={this.props.onClick}
                       onMouseMove={this.props.onMouseMove}
                       src={navigator.userAgent.search(/iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i)!== -1?this.props.video.link:''}

                />
                {   !this.state.playing?
                    <HoldScreen onClick={(e)=>this.handleClick()}
                                onKeyDown={(e)=>this.handleKey(e)}/>
                    :null
                }
            </div>
        )}
        else return     (
            <div   className="errorsDiv">Network error</div>
        )
                        }
}
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        dispatch,toggleAutoPlay
    }, dispatch);
export default connect  (
    state => ({
    }),
    mapDispatchToProps
                        )(Video);
//Merge request to master project