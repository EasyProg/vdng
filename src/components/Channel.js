import React, {Component,PropTypes} from 'react';
import '../styles/css/main_styles.css';
import hiddenchannel from '../img/nochannel.png';
import nochannel from    '../img/noimage.png';
import 'semantic-ui-css/semantic.min.css';
import book from '../img/bookmark-orange.svg';
import Rating from       '../components/ui/Rating';
import * as $ from 'jquery';
import ProgramList from  '../components/ProgramList';
import programs from     '../program';
import parseProgram from '../components/ParseProgramLight';
export default class Channel extends Component      {

    constructor(props)  {
        super(props);
    }

    static propTypes =  {
        progress:       PropTypes.number,
        img:            PropTypes.string,
        channelId:      PropTypes.number.isRequired,
        channelNum:     PropTypes.number.isRequired,
        programName:    PropTypes.string.isRequired,
        hiddenChannel:  PropTypes.bool.isRequired,
        chosen:         PropTypes.bool.isRequired,
        favorite:       PropTypes.bool.isRequired,
    };


    runningString(e)    {
        var str   = $('.pname_hover:hover');
        var strCont = $('.pname:hover');
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
        }}
    stopRun ()      {
        $('.pname_hover').stop(true,true);
    }
    // componentDidUpdate() {
    //     $('.menuItemStylefocus').focus();
    // }
    render()            {
        return          (
            <div  className={this.props.chosen?'menuItemStylefocus':this.props.elemChosen?'menuItemStyleChosen':'menuItemStyle'}
                //className={this.props.elemChosen?'menuItemStyleChosen':this.props.chosen?'menuItemStylefocus':'menuItemStyle'}
                  onClick={this.props.onClick}
                  onKeyDown={this.props.onKeyDown}
                  key={this.props.key}
                  tabIndex={this.props.tabIndex}
                  ref={(channel)=>this.channel=channel}
            >
                <div className="staticItem">
                    <span className="spanChannelid">{this.props.channelNum}</span>
                    <img  width={100} height={100} src={this.props.hiddenChannel?hiddenchannel:this.props.img} className="tvimg"/>
                    <div className="menuChannelName">
                        <div className="divForFavorite">
                            {this.props.favorite ? <div className="pnameFav"><img src={book} width={20} height={20}/></div> : ''}
                        </div>
                        <div className="pname" onMouseOver={(e)=>this.runningString(e)} onMouseLeave={(e)=>this.stopRun()}>
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
            </div>
        )
    }
}