import  React, {Component,PropTypes} from 'react';
import  '../styles/css/main_styles.css';

export default class Video extends Component
                                                    {
    constructor(props)  {
        super(props);
                        }

    static propTypes =  {
        fullSize: PropTypes.bool.isRequired,
        isPlaying: PropTypes.bool.isRequired,
        video: PropTypes.object.isRequired
                        };

    componentDidMount() {
    //this.video.play();
    this.video.muted = false;
                        }

    render()            {
        if (this.props.video!=='none')
        {return          (
            <div id="videoDiv" onClick={this.props.onClick}>
                <video id="video" ref={(video) => this.video = video}
                       autoPlay={this.props.isPlaying}
                       //loop
                       muted
                       playsInline
                       tabIndex={1}
                />
            </div>
                        )}
        else return (
            <div className="errorsDiv">Network error</div>
                    )
                        }
                                                     }

//Merge request to master project