import arr from '../program';
export default function parseProgram (channelId){
var program = {};
var newArr = [];
if  (arr)                             {

        program =       arr.filter((e, i) =>    {
        console.log(e);
        return Number(e['channel_id']) === channelId
                                                });
        //console.log(program);

        if (program)                  {
        //console.log(program[0]);
        newArr = program[0]['list'].map((e, i) =>
                                      {
                var parseDt = new Date(e['start_at'] * 1000);
                var startDt = parseDt.getDate() + '.' + (Number(parseDt.getMonth()) + 1).toString() +'.'+ parseDt.getFullYear();
                var startTime = parseDt.getHours() + ':' + parseDt.getMinutes();
                //console.log(e['id']+'  '+e['title']+'  '+e['description']+'  '+startDt);
                return                {
                                        id: e['id'],
                                        title:e['title'],
                                        description:e['description'],
                                        start_date:startDt,
                                        start_time:startTime
                                      }
                                      }
                                      )
                                      }
                                      }
        newArr.forEach(function(item,i){

        });


        return newArr
                                                }