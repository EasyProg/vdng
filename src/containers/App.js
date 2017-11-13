import React, { Component } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import Menu from '../components/ui/Menu';
import MainMenu from '../components/ui/MainMenu';
import configureStore from '../store/configureStore';
import MobileApp from '../components/mobileapp/MobileApp';
import {Provider} from 'react-redux';
import '../styles/css/main_styles.css';
const  store = configureStore();
require('events').EventEmitter.defaultMaxListeners = Infinity;
class App extends Component  {
    render()                 {
    return                   (
                <Provider store={store}>
                {window.location.href.indexOf('mobile')===-1?<div>
                    <VideoPlayer/>
                    <Menu/>
                </div>:
                    <MobileApp/>
                }
                </Provider>
                              );
                              }
                              }

export default App;