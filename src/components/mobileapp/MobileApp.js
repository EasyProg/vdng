import React, {Component,PropTypes} from 'react';

export default class MobileApp extends Component
            {
componentDidMount()
            {
window.addEventListener("orientationchange",function()
            {
            alert(window.orientation);
            },false);
            }
render ()   {
    return  (
            <div>MobileApp</div>
            )
            }
            }