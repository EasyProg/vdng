import React, { Component } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import Menu from '../components/ui/Menu';
import configureStore from '../store/configureStore';
import {Provider} from 'react-redux';
import '../styles/css/main_styles.css';
const  store = configureStore();
class App extends Component  {

    render()                 {
    return  (
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