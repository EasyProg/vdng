import {combineReducers} from 'redux';
import * as settings from '../settings.json';
import hlsArray from '../hls';
import parse from '../components/Parsing';
function getSettings(url)                {
        let context = this;
        fetch(url).then(function(response){
            if (response.status !== 200) {
                console.log('Looks like it was some error ' + response.status);
                return;
                                         }
            if (response)
                                         {
                let data = response;
                if (data[0])
                return data
                                         }
                                         }
                                         )
                                         }

const   initialState  = {
        video:{
            // link:'https://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/51/stream.m3u8',
            // channelNum:1,
            // channel: '1+1',
            // img:'https://admin.hls.tv/cdn/logo/746d07c80571189d7d991e6810c9d34d.jpg',
            // itemChosen:null,
            // category:"Все жанры",
            // channelId:51
        },
        //Global state variables
        isPlaying:true,
        autoPlay:true,
        fullScreen:false

                        };
const   channelState =  {
        chosenCategory   :'Все жанры',
        channels:parse(hlsArray),
        programs:[],
        program:[],
        isFavor:false,
        channelProgram:[]
                        };
const   menuState =    {
    menus:             {
    channelsMenuVisible:false,
    categoryMenuVisible:false,
    programsVisible:false,
    settingsVisible:false,
    vdArchVisible:false
                       },
    isOpened:false,
    elemsVisible:false
                        };
const   settingsState = {
    settings:        getSettings(document.location.href+'/settings.json'),
    timeShift:       settings.timeshift.status,
    parentalControl: settings.parental_control.status,
    catchUp:         false,
    epgStatus:       false,
    isFavorite:      false
                        };
const   epgState = {
    programs:[]
};
//main App reducer
function videoReducer(state=initialState,action=null)       {
    switch (action.type)                                    {
        case 'CHANGE':
            return {...state, video: action.video || state.video};
        case 'TOGGLE_PLAY':
            return {...state, isPlaying: action.isPlaying};
        case 'TOGGLE_AUTO_PLAY':
            return {...state, autoPlay: action.autoPlay};
        case 'TOGGLE_BUTTONS':
            return {...state, isControlElemsVisible: action.isControlElemsVisible};
        case 'TOGGLE_FULLSCREEN':
            return {...state, fullScreen: action.fullScreen};
        default:
            return state;
    }
}
//After adding all channels variables
function channelReducer (state=channelState,action=null)    {
    switch  (action.type)                                   {
        case 'TOGGLE_CATEGORY':
        return {...state,chosenCategory:action.category};
        case 'GET_CHANNELS':
        return {...state,channels:action.channelsArr};
        case 'SET_PROGRAM':
        return {...state,channels:action.channelsArr};
        case 'SET_PROGRAMS':
        return {...state,programs:action.programs,program:action.program};
        case 'SET_FAVORITE' :
        return {...state,isFavor:action.isFavor};
        case 'SET_CHANNEL':
        return {...state,channelProgram:action.data};
        default:
        return state;
                                                            }
                                                            }
//menu visible
function menuReducer (state=menuState,action=null)          {
    switch (action.type)
    {
        case 'CHANNELS_MENU_VISIBLE' :
            return {...state,menus:action.menus,isOpened:action.isOpened};
        case 'SEY_VIS': return {...state,elemsVisible:action.data};
        default:
            return state;
    }
                                                            }
function settingsReducer(state=settingsState,action=null)   {

    return state;
}
function epgReducer (state=epgState,action=null)            {
    switch (action.type)                                    {
        //console.log()
        case 'GET_DATA':
            return {...state,programs:action.data}    ;
        default:
            return state;
                                                            }
                                                            }

//Combine reducers
const videoApp = combineReducers
({
                 videoReducer,
                 channelReducer,
                 menuReducer,
                 settingsReducer
});
export default videoApp;