export default function getCurrentProgram (arr)
    {
    var delta = Date.now()/1000;
    console.log(delta);
    var currentObj = {};
    var timeAfter = 0;
    var timeLeft = 0;
    if (arr)                                    {
        currentObj = arr.filter((item, i) =>    {
        //
        //Определяем дельту
        return item['start_at'] < delta&&item['stop_at'] > delta;
                                                }
                                );
        timeAfter = delta - currentObj[0]['start_at'];
        timeLeft =  currentObj[0]['stop_at'] - delta;
        //console.log(timeAfter   + '   ' + timeLeft);
        var position = (timeAfter/(timeLeft+timeAfter))*100;
        //console.log(position);
                                                }
    return {
            title:currentObj[0].title,
            progressValue:position
           }
    };