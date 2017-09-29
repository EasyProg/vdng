import {combineReducers} from 'redux';
        import * as settings from '../settings.json';


const initialState =   {
        video:       {link:'https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/51/stream.m3u8',
        channelId:51,
        channel: '1+1',
        img:'https://admin.hls.tv/cdn/logo/746d07c80571189d7d991e6810c9d34d.jpg',
        itemChosen:null,
                       },
//Global state variables
        isPlaying:true,
        autoPlay:true,
        fullScreen:false
                       };
const   channelState = {
        chosenCategory   :'All channels',
        channels:[]
                       };
const  menuState =     {
       menus:{
       channelsMenuVisible:false,
       categoryMenuVisible:false,
       settingsVisible:false,
       vdArchVisible:false
       }
};
const  settingsState =  {
        timeShift:       settings.timeshift.status,
        parentalControl: settings.parental_control.status,
        catchUp:         false,
        epgStatus:       false,
};

function videoReducer(state=initialState,action=null)           {
    switch (action.type) {
        case 'CHANGE':
        return {...state,video:action.video||state.video};
        case 'TOGGLE_PLAY':
        return {...state,isPlaying:action.isPlaying};
        case 'TOGGLE_AUTO_PLAY':
        return {...state,autoPlay:action.autoPlay};
        case 'TOGGLE_BUTTONS':
        return {...state,isControlElemsVisible:action.isControlElemsVisible};
        case 'TOGGLE_FULLSCREEN':
        return {...state,fullScreen:action.fullScreen};
        default:
        return state;
                        }
                                                                }
//After adding all channels variables
function channelReducer (state=channelState,action=null)        {
    switch (action.type) {
    case 'TOGGLE_CATEGORY':
        return {...state,chosenCategory:action.category};
        case 'GET_CHANNELS':
        return {...state,channels:action.channelsArr};
        default:
        return state;
                         }
                                                                }
//menu visible
function menuReducer (state=menuState,action=null)              {
    switch (action.type) {
        case 'CHANNELS_MENU_VISIBLE' :
        return {...state,menus:action.menus};
        default:
        return state;
                         }
                                                                }
function settingsReducer(state=settingsState,action=null)       {
        return  state;
}


//Combine reducers
const videoApp = combineReducers({
    videoReducer,
    channelReducer,
    menuReducer,
settingsReducer
                                 });
export default videoApp;