import { Scrollbars } from 'react-custom-scrollbars';
import React, {Component,PropTypes} from 'react';
export default class CustomScrollbars extends Component
                                        {
    constructor(props) {
    super(props);
    }
    renderThumb({ style, ...props })    {
        const thumbStyle =              {
            width:2,
            height:5,
            position: 'absolute',
            display:'block!important',
            right: '2px',
            bottom: '2px',
            top: '2px',
            borderRadius: '5px',

            backgroundColor:'rgb(94, 94, 94)',
                                        };
        return (
                <div
                style={{ ...style, ...thumbStyle }}
                {...props}/>
                );
                                        }
        renderView({style,...props})    {
        const viewStyle =   {
            // msOverflowX:'visible',
            // overflowX:
            width:'30vw'
                            };
            return  (
                <div

                    style={{ ...style, ...viewStyle }}
                    {...props}/>
                    );
                                        }

        render()                        {
        return (
            <Scrollbars
                renderThumbVertical={this.renderThumb}
                //renderTrackHorizontal={props => <div {...props} className={{display:'none'}}/>}
                renderThumbHorizontal={()=> <div className={{display:'none'}}/>}
                renderView={this.renderView}
            >
                {this.props.children}
            </Scrollbars>
                );
                                        }
                                        }