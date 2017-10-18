function parse(arr)                        {
    var channels = [];
    var t = '';
    var link ='';
    var imgLink ='';
    let parseCategory ='';
    let parseChannelID = 0;
    let parseChannelNum = 0;
    if (arr) {
        arr.map((e, i) => {
            if (typeof e === 'object')    {
                for (var key in e.EXTINF) {
                    if (key !== 'aspect-ratio')
                    {
                        t = key;
                    }
                    else {
                        var c =  e.EXTINF['aspect-ratio'];
                        parseCategory = c.substring(c.indexOf('category=',1)+9,c.indexOf(';keycode',1));
                        parseChannelNum= Number(c.substring(c.indexOf('keycode=',1)+8,c.indexOf(';thumb',1)));
                        parseChannelID= Number(c.substring(c.indexOf('id=',1)+3,c.indexOf(';category',1)));
                        imgLink =  c.substring(c.indexOf('thumb=',1)+6,c.indexOf(';type',1));
                    }
                }
                                          }
            if (typeof e === 'string')    {
                link = e;
                channels.push( {channelNum:parseChannelNum,
                    channelId :parseChannelID,
                    channel: t,
                    link: link,
                    category:parseCategory,
                    img:imgLink,
                    favorite:false});
                                          }
        });
    }
    var serialObj = JSON.stringify(channels);
    localStorage.setItem("channels",serialObj);
    return(channels);
                                          }


export default parse;