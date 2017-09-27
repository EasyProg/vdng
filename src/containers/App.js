import React, { Component } from 'react';
import VideoPlayer from '../components/VideoPlayer';
//import Categories from '../components/Categories';
//import HomeMenu from '../components/HomeMenu';
import Menu from '../components/ui/Menu';
import configureStore from '../store/configureStore';
import {Provider} from 'react-redux';
import '../styles/css/main_styles.css';
    import * as settings from '../settings.json';
const  store = configureStore();
//var proxy = 'https://cors-anywhere.herokuapp.com/';
class App extends Component  {
    render() {
    return (
        <Provider store={store}>
        <div>
            <script src="http://192.168.14.18:8080/target/target-script-min.js#anonymous"/>
            <VideoPlayer/>
            <Menu/>
        </div>
        </Provider>
    );
  }
                              }

export default App;