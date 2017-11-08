function newParse(arr)
{
    let channels = [];
//Parsing new json

    arr.map((e, i) => {
                channels.push(
                {
                    //channelNum:parseChannelNum,
                    channelId :e['id'],
                    channel   :e['name'],
                    link:      e['link'],
                    //category:parseCategory,
                    img:       e['logo'],
                    aspect:    e['aspect'],
                    favorite:false
                });
                       }
    );
    return channels;
}


export default newParse;