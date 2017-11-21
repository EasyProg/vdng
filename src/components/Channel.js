import React, {Component,PropTypes} from 'react';
import '../styles/css/main_styles.css';
import hiddenchannel from '../img/nochannel.png';
import 'semantic-ui-css/semantic.min.css';
import book from '../img/bookmark-orange.svg';
import * as $ from 'jquery';
import arrow from '../img/angle-arrow-pointing-to-right.svg';
export default class Channel extends Component      {

    constructor(props)   {
        super(props);
        this.state = {visible:false};
    }
    static propTypes =   {
        progress:       PropTypes.number,
        img:            PropTypes.string,
        channelId:      PropTypes.number.isRequired,
        channelNum:     PropTypes.number.isRequired,
        programName:    PropTypes.string.isRequired,
        hiddenChannel:  PropTypes.bool.isRequired,
        chosen:         PropTypes.bool.isRequired,
        favorite:       PropTypes.bool.isRequired,
    };
    runningString(param) {
        if (param==='hover') {
            var str     = $('.pname_hover:hover');
            var strCont = $('.pname:hover');
        }
        if (param==='focus') {
            var str     = $('.menuItemStyle:focus>.staticItem>.pname>.pname_hover');
            var strCont = $('.menuItemStyle:focus>.staticItem>.pname');
        }
        var width = str.width();
        var con_w = str.css('left');

        function run () {
            var con_len = parseInt(con_w) - (width - strCont.width());

            str.animate
            ({left:con_len + 'px'},
                {duration: 2000,
                    complete: function ()
                    {
                        str.css('left',con_w);
                        //run();
                    }});}
        if (width>strCont.width())
        {
            run();
        }                    }
    stopRun      ()      {
        $('.pname_hover').stop(true,true);
    }
    circleVisible(param) {
        console.log('changeState');
        if (param) this.setState({visible: true});
        else this.setState({visible: false})
    }




    render()             {
        return           (
            <div  className={this.props.chosen?'menuItemStyleChosen':'menuItemStyle'}
                  onClick={this.props.onClick}
                  onKeyDown={this.props.onKeyDown}
                  key={this.props.key}
                  tabIndex={this.props.tabIndex}
                  ref={(channel)=>this.channel=channel}
                  onMouseEnter={e=>this.circleVisible(true)}
                  onMouseLeave={e=>this.circleVisible(false)}
                  onFocus={e=>this.circleVisible(true)}
                  onBlur={e=>this.circleVisible(false)}
            >
                <div className="channelDivName">
                    <div className="staticItem">
                        <span className="spanChannelid">{this.props.channelNum}</span>
                        <img src={this.props.hiddenChannel?hiddenchannel:this.props.img} className="tvimg"/>
                        <div className="menuChannelName">
                            <div className="divForFavorite">
                                {this.props.favorite ? <img className="imgFav" src={book} width={20} height={20}/> : ''}
                            </div>
                            <div className="pname"
                                 onMouseOver={(e)=>this.runningString('hover')}
                                 onMouseLeave={(e)=>this.stopRun()}
                            >
                 <span className="pname_hover">
                 {this.props.programName}
                 </span>
                            </div>
                            <div className="progressDives">
                                {this.props.progress!==-1?<progress className='progresses' value={this.props.progress} max={100} min={0}/>:null}
                            </div>
                            {/*<Rating maxRate={5} rate={3} chosen={this.props.chosen}/>*/}
                            {/*{this.props.favorite ? <span className="pnameFav"><img src={book} width={20} height={20}/></span> : ''}*/}
                        </div>
                    </div>
                    {(this.state.visible||this.props.elemChosen)&&this.props.progress!==-1?
                        <div className="epgShowButton" onClick={e=>this.props.setProgramVisibleContext(e,this.props.program)}>
                            <img src={arrow} width={15} height={15}/>
                        </div>
                        :null}
                    {/*this.props.elemChosen*/}
                    {/*<div className={(this.state.visible||this.props.elemChosen)&&this.props.progress!==-1?"epgShowButton":"epgShowButtonInvis"} onClick={e=>this.props.setProgramVisibleContext(e,this.props.program)}>*/}
                    {/*<img src={arrow} width={15} height={15}/>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}
