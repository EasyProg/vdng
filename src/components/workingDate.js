export default function getCurrentProgram (arr,channelName)
    {
    let delta = Date.now()/1000;
    let currentObj = [];
    let timeAfter = 0;
    let timeLeft = 0;
    let programTime = 0;
    if (arr)                {
        currentObj = arr.filter((item, i) => {
                //
                //Определяем дельту
                return item['start_at'] < delta && item['stop_at'] > delta;
                                             }
        );
        if (currentObj[0])  {
            timeAfter = delta - currentObj[0]['start_at'];
            timeLeft = currentObj[0]['stop_at'] - delta;
            programTime = currentObj[0]['stop_at'] - currentObj[0]['start_at'];
            var position = (timeAfter / (timeLeft + timeAfter)) * 100;
            //console.log(currentObj[0]);
            return          {
                startTime: currentObj[0]['start_at'],
                prTime: programTime,
                current: currentObj[0],
                progressValue: position,
                title:currentObj[0].title
                            }
                            }
        else return         {
                title:channelName,
                current:currentObj
                            }

                            }
        else return         {
                title:channelName,
                current:currentObj
                            }

    };