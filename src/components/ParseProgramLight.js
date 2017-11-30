export default function parseProgram (arr)   {
    var program = {};
    var newArr = [];
    var lstArr = [];
    var obj = {};

    if (arr)                                 {
        newArr = arr.map((e, i) =>           {
                var parseDt = new Date(e['start_at'] * 1000);
                var startDt = parseDt.getDate() + '.' + (Number(parseDt.getMonth()) + 1).toString() + '.' + parseDt.getFullYear();
                var startTime = parseDt.getHours() + ':' + parseDt.getMinutes();
                return                       {
                    id: e['id'],
                    title: e['title'],
                    description: e['description'],
                    detail:e['detail'],
                    start_date: startDt,
                    start_time_show: startTime,
                    start_time:e['start_at'],
                    stop_time:e['stop_at']
                                             }
                                             }
                                             );


        newArr.forEach(function (item, i)    {
            var str = item['start_date'];
            obj[str] = true;
                                             });

        for (var key in Object.keys(obj))    {
            lstArr.push({date: Object.keys(obj)[key], data: []});
                                             }
        newArr.forEach(function (item, i)    {
            for (var j = 0; j < lstArr.length; j++)
                                             {
                if (item['start_date'] === lstArr[j]['date'])
                                             {
                    lstArr[j]['data'].push(item);
                                             }
                                             }

                                             });
                                             }
    return lstArr
                                             }