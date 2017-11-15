import React, { Component } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import MainMenu from '../components/ui/MainMenu';
import configureStore from '../store/configureStore';
import MobileApp from '../components/mobileapp/MobileApp';
import {Provider} from 'react-redux';
import '../styles/css/main_styles.css';
import Menu from '../components/ui/Menu';
const  store = configureStore();
require('events').EventEmitter.defaultMaxListeners = Infinity;
class App extends Component  {
    render()                 {
    return                   (
                <Provider store={store}>
                {window.location.href.indexOf('mobile')===-1?<div>
                        <VideoPlayer/>

                </div>:
                    <MobileApp/>
                }
                </Provider>
                              );
                              }
                              }

export default App;