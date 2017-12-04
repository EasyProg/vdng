import React, {Component,PropTypes} from 'react';
import '../../styles/css/main_styles.css';
import CustomScroll from '../ui/CustomScroll';
export default class DetailView extends Component
{
    constructor(props)
    {
        super(props);
        this.state    = {mainimg:''};
        this.setImage = this.setImage.bind(this);
    }
    setImage(img)
    {
        this.setState({mainimg:img});
    }
    render ()  {
        if (this.props.visible)
            return  (
                <div className="detailEpgView">
                    {this.props.detail.images.length>0?
                        <div className="divForEpgImages">
                            <img className="mainEpgImage" src={this.state.mainimg}/>
                            <div className="divForSmallEpgImages">
                                <div className="divForSmallEpgImagesS">
                                    <div className="watchNow">WATCH NOW</div>
                                    {
                                        this.props.detail.images.map(
                                            (e,i)=>
                                                <img width={50} height={50} src={e.thumb.hd}  onClick={this.setImage(e.main.hd)}/>
                                        )
                                    }
                                </div>
                            </div>
                        </div>:null}
                    <div className="textEpgDiv">
                        <div className="headerTextDiv">{this.props.title}</div>
                        <div className="buttonsEpgDiv">
                            {
                                this.props.detail.tags.map((item,i)=><div className="buttonEpgDiv">{item.name}</div>)
                            }

                        </div>
                        <CustomScroll
                        >
                            <div className="divForEpgText">{this.props.detail.desc}</div>
                        </CustomScroll>
                    </div>
                </div>
            );
        else return null
    }
}