import programs from '../program';
export default function ParseProgram (channelId){
var program = {};
if  (arr)                      {

program     = arr.map((e,i)=>  {
return      e['channel_id']===channelId
                               });


program['list'].map            ((e,i) =>        {
            var parseDt = new Date(program['start_at'] * 1000);
            var startDt = parseDt.getDate() + '.' + parseDt.getMonth() + 1 + parseDt.getFullYear();
            var startTime=parseDt.getHours()+':'+parseDt.getMinutes();
            return              {
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