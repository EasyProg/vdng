import React, {Component,PropTypes} from 'react';
import MobileMenu from './MobileMenu';

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
            <div>
            <MobileMenu/>
            </div>
            )
            }
            }