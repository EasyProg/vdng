import arr from '../program';
export default function parseProgram (channelId)     {
    var program = {};
    var newArr = [];
    var lstArr = [];
    var obj = {};
    if (arr) {

        program = arr.filter((e, i) =>  {
            //console.log(Number(e['channel_id'])+'     '+channelId);
            return Number(e['channel_id']) === channelId
                                        });
        //console.log(program[0]+'sdsdsdsd111');
             }
        console.log(program[0]);

        if (program[0])                             {
            //console.log('Parsing working');
            newArr = program[0]['list'].map((e, i) => {
                    var parseDt = new Date(e['start_at'] * 1000);
                    var startDt = parseDt.getDate() + '.' + (Number(parseDt.getMonth()) + 1).toString() + '.' + parseDt.getFullYear();
                    var startTime = parseDt.getHours() + ':' + parseDt.getMinutes();
                    return {
                        id: e['id'],
                        title: e['title'],
                        description: e['description'],
                        start_date: startDt,
                        start_time: startTime
                    }
                }
            );


            newArr.forEach(function (item, i)   {
                var str = item['start_date'];
                obj[str] = true;
                                                });

            for (var key in Object.keys(obj)) {
                lstArr.push({date: Object.keys(obj)[key], data: []});
            }
            newArr.forEach(function (item, i) {
                for (var j = 0; j < lstArr.length; j++) {
                    if (item['start_date'] === lstArr[j]['date']) {
                        lstArr[j]['data'].push(item);
                    }
                }

            });
                                                    }
    return lstArr
                                                    }