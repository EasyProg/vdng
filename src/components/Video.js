import  React, {Component,PropTypes} from 'react';
import  '../styles/css/main_styles.css';


export default class Video extends Component    {
    constructor(props) {
    super(props);
                       }
    static propTypes = {
    fullSize: PropTypes.bool.isRequired,
    isPlaying:PropTypes.bool.isRequired,
    video:    PropTypes.object.isRequired
                       };
    render() {
        return (
                        <div id="videoDiv">
                            <video id="video" ref={(video)=>this.video=video}
                                   autoPlay={this.props.isPlaying}
                                   tabIndex={1}
                            />
                        </div>
               )
             }
                                                }

//Merge request to master project