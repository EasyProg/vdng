export function changeVideo(video)          {
    return  {
        type: 'CHANGE',
        video: video
    }
}
export function togglePlay(isPlaying)       {
    var result = !isPlaying;
    return  {
        type:'TOGGLE_PLAY',
        isPlaying:result
    }
}

export function toggleAutoPlay(isPlaying)   {
    var result = !isPlaying;
    return  {
        type:'TOGGLE_AUTO_PLAY',
        autoPlay:result
    }
}
export function toggleButtons(isVisible)    {
    var result = !isVisible;
    return  {
        type:'TOGGLE_BUTTONS',
        isControlElemsVisible:result
    }
}
export function toggleFullScreen(isFullScreen)
{
    var isNotFullScreen = isFullScreen;
    return  {
        type:'TOGGLE_FULLSCREEN',
        fullScreen:isNotFullScreen
    }
}
export function toggleCategory(category)    {
    return  {
        type:'TOGGLE_CATEGORY',
        category
    }
}
export function getChannels (channelsArr)   {
    return {
        type:'GET_CHANNELS',
        channelsArr
    }

}
export function setProgram (channelsArr,programArr)
{
    let newChannels = channelsArr;
    for (var i=0;i<newChannels.length;i++)
    {  //console.log('Shit!!!');
        programArr.forEach(
        function(item,j){
            //console.log(item);
            if (newChannels[i]['channelId']===Number(item['channel_id']))
            {
                newChannels[i]['program'] =   item['list'];
            }
                        }

                        );
                        }
    //newChannels.forEach((item)=>item['channelId']===id?item['programs']=programObj:'');
    return  {
        type:'SET_PROGRAM',
        channelsArr:newChannels
            }

}

export function setMenusVisible (visibility,isOpened)
{
    return  {
        type:'CHANNELS_MENU_VISIBLE',
        menus:visibility,
        isOpened:isOpened
    }

}
export function setFavor (favorite)
{
    return      {
        type:'SET_FAVORITE',
        isFavor:favorite
    }
}
export function receiveData(json)           {
    return {
        //
        type: 'GET_DATA',
        data:  json
    }
}

