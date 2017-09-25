export function changeVideo(video) {
    //console.log(video);
    return  {
        type: 'CHANGE',
        video: video
            }
}
export function togglePlay(isPlaying)    {
var result = !isPlaying;
    return  {
        type:'TOGGLE_PLAY',
        isPlaying:result
            }
}

export function toggleAutoPlay(isPlaying)    {
    var result = !isPlaying;
    console.log(result);
    return  {
        type:'TOGGLE_AUTO_PLAY',
        autoPlay:result
            }
}
export function toggleButtons(isVisible) {
var result = !isVisible;
    return  {
        type:'TOGGLE_BUTTONS',
        isControlElemsVisible:result
            }
}
export function toggleFullScreen(isFullScreen) {
    var isNotFullScreen = isFullScreen;
    return  {
        type:'TOGGLE_FULLSCREEN',
        fullScreen:isNotFullScreen
            }
}
export function toggleCategory(category) {
    return  {
        type:'TOGGLE_CATEGORY',
        category
            }
}
export function getChannels (channelsArr) {
    return {
        type:'GET_CHANNELS',
        channelsArr
    }

}

export function setChannelsVisible (visibility) {
    return {
        type:'CHANNELS_MENU_VISIBLE',
        menus:visibility
           }

}




