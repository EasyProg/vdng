import React, { Component } from 'react';
import VideoPlayer from '../components/VideoPlayer';
//import Categories from '../components/Categories';
//import HomeMenu from '../components/HomeMenu';
import Menu from '../components/ui/Menu';
import ContainerMenu from '../containers/ContainerMenu';
import configureStore from '../store/configureStore';
import {Provider} from 'react-redux';
import '../styles/css/main_styles.css';
import * as settings from '../settings.json';
const  store = configureStore();
//var proxy = 'https://cors-anywhere.herokuapp.com/';
class App extends Component  {
// componentWillMount() {
//     const script = document.createElement("script");
//     script.src   = "http://192.168.14.18:8080/target/target-script-min.js#anonymous";//     script.acync = true;
//     document.body.appendChild(script);
//     <script src="http://localhost:8080/target/target-script-min.js#anonymous"/>
// }
    render()                  {
    return (
                <Provider store={store}>
                <div>
                    {/*<ContainerMenu/>*/}
                    <VideoPlayer/>
                    <Menu/>
                </div>
                </Provider>
    );
                              }
                              }

export default App;