function newParse(arr)
{
    let channels = [];
//Parsing new json

    arr.map((e, i) =>   {
            if (e['type']==='hls')
                        {
                channels.push
                        (
                        {
                        channelId: e['id'],
                        channel: e['name'],
                        link: e['link'],
                        img: e['logo'],
                        aspect: e['aspect'],
                        favorite: false,
                        category:{id:e['ganre']['id'],name:e['ganre']['name']}
                        });
                        }
                        }
    );
    return channels;
}


export default newParse;