import React, {Component,PropTypes} from 'react';
import {Icon} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../styles/css/main_styles.css';
import baby from '../img/smiling-baby.png';
import settings from '../img/settings.png';
import arch from '../img/play.png';
import LoginDiv from '../components/LoginDiv';
import Settings from '../components/Settings';
import ParentalControl from '../components/ParentalControl';
import VideoArchive from '../components/VideoArchive';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import underline from '../img/line.png';

export default class HomeMenu extends Component {
    constructor (props) {
        super(props);
        this.state = {
            itemChosen:null
        };
        this.handleItem = this.handleItem.bind(this);
    };
    handleItem(num) {
        let c = num;
        this.state.itemChosen===c?c = null: c = num;
        this.setState (
            {
                itemChosen:c
            }
        )
    };
    static propTypes =
    {
        isParentControl:PropTypes.bool.isRequired
    };
    ConditionalRendering (item){
        switch (item)          {
            case 1:
                       return  (
                <VideoArchive key={item}/>
                               );
            case 2:
                       return  (
                <ParentalControl key={item}/>
            );
            case 3:    return  (
                <Settings key={item}/>
            );
            default: return <div/>
                                }
                                }
        Parental = props => (
            <div>
            <div className={this.state.itemChosen!==2?"menuItemStyle":"menuItemStylefocus"} onClick={(e)=>this.handleItem(2)}>
            <img src={baby} width="35" height="35" className="imgStyle"/>Parental control</div>
            <ReactCSSTransitionGroup transitionName="settings_transition">
             {this.state.itemChosen===2?this.ConditionalRendering(this.state.itemChosen):null}
            </ReactCSSTransitionGroup>
            </div>
                            );
        Settings = props => (
            <div>
            <div className={this.state.itemChosen!==3?"menuItemStyle":"menuItemStylefocus"} onClick={(e)=>this.handleItem(3)}>
            <img src={settings} width="35" height="35" className="imgStyle"/>Settings</div>
            <ReactCSSTransitionGroup transitionName="settings_transition">
            {(this.state.itemChosen===3)?this.ConditionalRendering(this.state.itemChosen):null}
            </ReactCSSTransitionGroup>
            </div>
                            );

        render() {
        return (
            <div className={this.props.visible?'homeDiv':'homeDivNone'}>
                <LoginDiv userName="Hatori Hanzo"/>
                <img src={underline} height={5} width={300} className='categoryLine'/>
                    {(this.state.itemChosen===1)?this.ConditionalRendering(this.state.itemChosen):null}
                <div className={this.state.itemChosen!==1?"menuItemStyle":"menuItemStylefocus"} onClick={(e)=>this.handleItem(1)}>
                <span><img src={arch} width="35" height="35" className="imgStyle"/></span>Video archive</div>
                {
                this.props.isParentControl?this.Parental:''
                }
                {this.Settings()}
            </div>
               )
                 }
}