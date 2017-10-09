import  React, {Component,PropTypes} from 'react';
import  '../styles/css/main_styles.css';
import '../components/ui/HoldScreen';
import HoldScreen from "./ui/HoldScreen";

    export default class Video extends Component
                                                    {
    constructor(props)  {
        super(props);
        this.state = {
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
    //this.video.play();
    //this.video.muted = false;


                        }
    isVideoPlaying ()   {
    var c = this;
    setTimeout(
     function () {if (this.video.paused)
     {
        c.setState({playing:false});
     }},2000)
                        }

    handleClick ()      {
    this.video.play();
    this.setState({playing:true});

                        }
    render()            {
        if (this.props.video!=='none')
                        {return      (
                <div id="videoDiv"
                >
                {!this.state.playing?<HoldScreen onClick={(e)=>this.handleClick()}/>:null}
                <video id="video" ref={(video) => this.video = video}
                       autoPlay={this.props.isPlaying}
                       //loop
                       playsInline
                       tabIndex={1}
                       onDoubleClick={this.props.onDblClick}
                       onClick={this.props.onClick}
                />
                </div>
                        )}
        else return     (
                <div   className="errorsDiv">Network error</div>
                        )
                        }
                                                     }

//Merge request to master project