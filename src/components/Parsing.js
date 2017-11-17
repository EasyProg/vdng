function parse(arr)                        {
    var channels = [];
    var channelName = '';
    var link ='';
    var imgLink ='';
    let parseCategory ='';
    let parseChannelID = 0;
    let parseChannelNum = 0;
    if (arr)     {
        arr.map  ((e, i) =>
                 {
                 let c = e['EXTINF'];
                 link            = c.substring( c.indexOf('https://cdnua01', 1));
                 parseCategory   = c.substring( c.indexOf('category=', 1) + 9, c.indexOf(';keycode', 1));
                 parseChannelNum = Number(    c.substring(c.indexOf('keycode=', 1) + 8, c.indexOf(';thumb', 1)));
                 parseChannelID  = Number(    c.substring(c.indexOf('id=', 1) + 3, c.indexOf(';category', 1)));
                 imgLink         = c.substring( c.indexOf('thumb=', 1) + 6, c.indexOf(';type', 1));
                 channelName     = c.substring(c.indexOf('hls,', 1) + 4,   c.indexOf('https://cdnua01',1));
                     //hls,112 Украинаhttps://cdnua01.hls.tv/hls/79fe07520e89862e02b2d00fecf02ca9/53/stream.m3u8
                    //Set triggered path
                 channels.push         (
                               {
                 channelNum:parseChannelNum,
                 channelId :parseChannelID,
                 channel   :channelName,
                 link: link,
                 category:parseCategory,
                 img:imgLink,
                 favorite:false}       );
                 });
                 }
    var serialObj = JSON.stringify(channels);
    localStorage.setItem("channels",serialObj);
    return(channels);
}


export default parse;

// function parse(arr)                        {
//     var channels = [];
//     var t = '';
//     var link ='';
//     var imgLink ='';
//     let parseCategory ='';
//     let parseChannelID = 0;
//     let parseChannelNum = 0;
//     if (arr) {
//         arr.map((e, i) => {
//             if (typeof e === 'object')    {
//                 for (var key in e.EXTINF) {
//                     if (key !== 'aspect-ratio')
//                     {
//                         t = key;
//                     }
//                     else {
//                         var c =  e.EXTINF['aspect-ratio'];
//                         parseCategory = c.substring(c.indexOf('category=',1)+9,c.indexOf(';keycode',1));
//                         parseChannelNum= Number(c.substring(c.indexOf('keycode=',1)+8,c.indexOf(';thumb',1)));
//                         parseChannelID= Number(c.substring(c.indexOf('id=',1)+3,c.indexOf(';category',1)));
//                         imgLink =  c.substring(c.indexOf('thumb=',1)+6,c.indexOf(';type',1));
//                     }
//                 }
//             }
//             if (typeof e === 'string')    {
//                 link = e;
//                 channels.push( {channelNum:parseChannelNum,
//                     channelId :parseChannelID,
//                     channel: t,
//                     link: link,
//                     category:parseCategory,
//                     img:imgLink,
//                     favorite:false});
//             }
//         });
//     }
//     var serialObj = JSON.stringify(channels);
//     localStorage.setItem("channels",serialObj);
//     return(channels);
// }
//
//
// export default parse;