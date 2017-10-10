import React, {Component,PropTypes} from 'react';
import '../styles/css/main_styles.css';
import hiddenchannel from '../img/nochannel.png';
import nochannel from '../img/noimage.png';
import 'semantic-ui-css/semantic.min.css';
import book from '../img/bookmark-orange.svg';
import Rating from '../components/ui/Rating';
import * as $ from 'jquery';
import ProgramList from '../components/ProgramList';
import programs from '../program';
import parseProgram from '../components/ParseProgramLight';
export default class Channel extends Component      {

    constructor(props)  {
        super(props);
                        }

    static propTypes =  {
        img:            PropTypes.string,
        channelId:      PropTypes.number.isRequired,
        channelNum:     PropTypes.number.isRequired,
        programName:    PropTypes.string.isRequired,
        hiddenChannel:  PropTypes.bool.isRequired,
        chosen:         PropTypes.bool.isRequired,
        favorite:       PropTypes.bool.isRequired,
                        };


    runningString(e)        {
        var str   = $('.pname_hover:hover');
        var width = str.width();
        var con_w = str.css('left');

        function run ()     {
         var con_len = parseInt(con_w) - width + 100;

            str.animate
                        ({left:con_len + 'px'},
                        {duration: 3000,
                        complete: function ()
                        {
                        str.css('left',con_w);
                        //run();
                        }});}
         if (e.currentTarget.textContent.length>15)
                        {
                        run();
                        }}
    stopRun ()          {
         $('.pname_hover').stop(true,true);
                        }

    render()            {
        return          (
            <div  className={this.props.chosen?'menuItemStylefocus':this.props.elemChosen?'menuItemStyleChosen':'menuItemStyle'}
                  onClick={this.props.onClick} onKeyDown={this.props.onKeyDown}>
             <div className="staticItem">
            <span className="spanChannelid">{this.props.channelNum}</span>
            <img  width={100} height={100} src={this.props.hiddenChannel?hiddenchannel:this.props.img} className="tvimg"/>
            <span className="pname" onMouseOver={(e)=>this.runningString(e)} onMouseLeave={(e)=>this.stopRun()}>
            <span className="pname_hover">
            {this.props.programName}
            </span>
            </span>
            {this.props.favorite ? <span className="pnameFav"><img src={book} width={10} height={10}/></span> : ''}
            <Rating maxRate={5} rate={3} chosen={this.props.chosen}/>
            <progress className='progresses' value={50} max={100} min={0}/>
             </div>
            </div>
                        )
                        }
                                                    }