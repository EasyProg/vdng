import React, {Component,PropTypes} from 'react';
import '../../styles/css/main_styles.css';
export default class DetailView extends Component
          {
constructor(props)
          {
super(props);
          }
render () {
    if (this.props.visible)
    return (
           <div className="detailEpgView">
           <div className="divForEpgImages">
           {this.props.detail.images[0]?<img className="mainEpgImage" src={this.props.detail.images[0].main.hd}/>:null}
           <div className="divForSmallEpgImages">
           <div className="watchNow">WATCH NOW</div>
            {
            <img width={50} height={50} src={this.props.detail.images[0].thumb.hd}/>
            }
            </div>
           </div>
           <div className="textEpgDiv">
           <div className="headerTextDiv">{this.props.title}</div>
           <div className="buttonsEpgDiv">
               {
                   this.props.detail.tags.map((item,i)=><div className="buttonEpgDiv">{item.name}</div>)
               }

           </div>
           <div className="divForEpgText">{this.props.detail.desc}</div>
           </div>
           </div>
           );
    else return null
          }
          }